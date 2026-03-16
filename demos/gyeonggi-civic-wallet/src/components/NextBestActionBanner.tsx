"use client";

import Link from "next/link";
import {
  Gift,
  FileText,
  CreditCard,
  Settings,
  Building2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { type NextBestAction } from "@/data/mock";

const typeConfig: Record<
  NextBestAction["type"],
  { icon: typeof Gift; color: string; bg: string }
> = {
  benefit: { icon: Gift, color: "var(--color-success)", bg: "var(--color-success-bg)" },
  document: { icon: FileText, color: "var(--color-warning)", bg: "var(--color-warning-bg)" },
  payment: { icon: CreditCard, color: "var(--color-cta)", bg: "var(--color-badge-recommend-bg)" },
  setup: { icon: Settings, color: "var(--color-cta)", bg: "var(--color-badge-recommend-bg)" },
  project: { icon: Building2, color: "var(--color-cta)", bg: "var(--color-badge-recommend-bg)" },
};

interface NextBestActionBannerProps {
  action: NextBestAction;
  compact?: boolean;
}

export default function NextBestActionBanner({
  action,
  compact = false,
}: NextBestActionBannerProps) {
  const config = typeConfig[action.type];
  const Icon = config.icon;

  if (compact) {
    return (
      <Link
        href={action.href}
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-sm"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: config.bg }}
        >
          <Icon size={14} style={{ color: config.color }} aria-hidden="true" />
        </div>
        <p
          className="min-w-0 flex-1 truncate text-xs font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {action.label}
        </p>
        <ChevronRight
          size={13}
          style={{ color: "var(--color-text-tertiary)" }}
          aria-hidden="true"
        />
      </Link>
    );
  }

  return (
    <Link
      href={action.href}
      className="block rounded-2xl px-5 py-4 transition-all duration-200 hover:shadow-md"
      style={{
        background: "var(--color-bg-card)",
        boxShadow: "var(--shadow-sm)",
        borderLeft: `3px solid ${config.color}`,
      }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: config.bg }}
        >
          <Icon size={18} style={{ color: config.color }} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles
              size={11}
              style={{ color: config.color }}
              aria-hidden="true"
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: config.color }}
            >
              다음에 할 일
            </span>
          </div>
          <p
            className="text-sm font-semibold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {action.label}
          </p>
          <p
            className="mt-0.5 text-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {action.description}
          </p>
          {action.recommendedBecause && (
            <p
              className="mt-1.5 text-[11px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {action.recommendedBecause}
            </p>
          )}
        </div>
        <ChevronRight
          size={14}
          className="mt-1 shrink-0"
          style={{ color: "var(--color-text-tertiary)" }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
