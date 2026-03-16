"use client";

import { useState, useMemo } from "react";
import {
  Wallet,
  Store,
  Users,
  FileCheck,
  Gift,
  Link as LinkIcon,
  TrendingUp,
} from "lucide-react";
import RecommendInterstitial, {
  type InterstitialConfig,
} from "@/components/RecommendInterstitial";
import {
  type InterstitialEventType,
  type InterstitialEventConfig,
  interstitialEventHistory,
  interstitialEventConfigs,
} from "@/data/mock";

const iconMap: Record<string, React.ReactNode> = {};

function getIcon(name: string, color: string) {
  const size = 36;
  const style = { color };
  switch (name) {
    case "Wallet":
      return <Wallet size={size} style={style} />;
    case "Store":
      return <Store size={size} style={style} />;
    case "Users":
      return <Users size={size} style={style} />;
    case "FileCheck":
      return <FileCheck size={size} style={style} />;
    case "Gift":
      return <Gift size={size} style={style} />;
    case "Link":
      return <LinkIcon size={size} style={style} />;
    case "TrendingUp":
      return <TrendingUp size={size} style={style} />;
    default:
      return <Gift size={size} style={style} />;
  }
}

function shouldShowEvent(
  eventType: InterstitialEventType,
  config: InterstitialEventConfig
): boolean {
  const history = interstitialEventHistory.filter(
    (e) => e.eventType === eventType
  );

  // One-time events (cooldownHours === 0): only show if never shown before
  if (config.cooldownHours === 0) {
    return history.length === 0;
  }

  // Recurring events: check cooldown
  const lastShown = history
    .filter((e) => e.shown)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];

  if (!lastShown) return true;

  // Check if snoozed
  if (lastShown.snoozedUntil) {
    const snoozeEnd = new Date(lastShown.snoozedUntil).getTime();
    if (Date.now() < snoozeEnd) return false;
  }

  const hoursSince =
    (Date.now() - new Date(lastShown.timestamp).getTime()) / (1000 * 60 * 60);
  return hoursSince >= config.cooldownHours;
}

/**
 * Hook to manage event-triggered interstitials.
 * Returns { show, config, dismiss } for a given event type.
 * One interstitial per event, no stacking.
 */
export function useEventInterstitial(eventType: InterstitialEventType) {
  const eventConfig = useMemo(
    () => interstitialEventConfigs.find((c) => c.eventType === eventType),
    [eventType]
  );

  const eligible = useMemo(
    () => (eventConfig ? shouldShowEvent(eventType, eventConfig) : false),
    [eventType, eventConfig]
  );

  const [open, setOpen] = useState(eligible);

  const config: InterstitialConfig | null = useMemo(() => {
    if (!eventConfig) return null;
    return {
      icon: getIcon(eventConfig.iconName, eventConfig.iconColor),
      iconBg: eventConfig.iconBg,
      title: eventConfig.title,
      description: eventConfig.description,
      ctaLabel: eventConfig.ctaLabel,
      ctaHref: eventConfig.ctaHref,
    };
  }, [eventConfig]);

  const dismiss = () => setOpen(false);

  return { open, config, dismiss };
}

/**
 * Drop-in component — renders the interstitial for a given event type.
 * Usage: <EventInterstitial eventType="first-investment" />
 */
export default function EventInterstitial({
  eventType,
}: {
  eventType: InterstitialEventType;
}) {
  const { open, config, dismiss } = useEventInterstitial(eventType);

  if (!config) return null;

  return (
    <RecommendInterstitial open={open} onDismiss={dismiss} config={config} />
  );
}
