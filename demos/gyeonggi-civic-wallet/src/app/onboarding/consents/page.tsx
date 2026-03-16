"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  MapPin,
  Gift,
  Landmark,
  Link2,
} from "lucide-react";
import FamilySyncInterstitial from "@/components/FamilySyncInterstitial";

type ConsentGroup = {
  id: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  iconColor: string;
  iconBg: string;
  title: string;
  badge: "필수" | "선택";
  description: string;
  defaultOn: boolean;
};

const consentGroups: ConsentGroup[] = [
  {
    id: "family",
    icon: Users,
    iconColor: "var(--color-cta)",
    iconBg: "var(--color-badge-recommend-bg)",
    title: "가족/가구 정보",
    badge: "선택",
    description: "가족 구성에 맞는 혜택을 찾아드려요",
    defaultOn: true,
  },
  {
    id: "location",
    icon: MapPin,
    iconColor: "var(--color-success)",
    iconBg: "var(--color-success-bg)",
    title: "거주/연령 정보",
    badge: "선택",
    description: "지역과 나이에 맞는 서비스를 안내해요",
    defaultOn: true,
  },
  {
    id: "benefits",
    icon: Gift,
    iconColor: "var(--color-warning)",
    iconBg: "var(--color-warning-bg)",
    title: "공공지원 안내",
    badge: "선택",
    description: "신청 가능한 복지 혜택을 자동으로 찾아요",
    defaultOn: true,
  },
  {
    id: "finance",
    icon: Landmark,
    iconColor: "var(--color-text-secondary)",
    iconBg: "var(--color-divider)",
    title: "금융/자산 정보",
    badge: "선택",
    description: "자산 기준이 필요한 혜택 자격을 확인해요",
    defaultOn: false,
  },
  {
    id: "payment",
    icon: Link2,
    iconColor: "var(--color-cta)",
    iconBg: "var(--color-badge-recommend-bg)",
    title: "결제 서비스 연동",
    badge: "선택",
    description: "결제할 때 유리한 수단을 비교해요",
    defaultOn: true,
  },
];

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className="relative inline-flex h-[28px] w-[48px] shrink-0 items-center rounded-full transition-colors duration-200"
      style={{
        background: enabled ? "var(--color-cta)" : "var(--color-border)",
        cursor: "pointer",
        minWidth: "48px",
        minHeight: "28px",
      }}
    >
      <span
        className="inline-block h-[22px] w-[22px] rounded-full bg-white transition-transform duration-200"
        style={{
          transform: enabled ? "translateX(22px)" : "translateX(3px)",
          boxShadow: "var(--shadow-sm)",
        }}
      />
    </button>
  );
}

export default function OnboardingConsentsPage() {
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of consentGroups) {
      initial[group.id] = group.defaultOn;
    }
    return initial;
  });

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <Link
          href="/onboarding/personalization"
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={22} />
        </Link>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          3/6
        </span>
        <div className="w-10" />
      </div>

      {/* Heading */}
      <div className="px-6 pt-2 pb-6">
        <h1
          className="text-[22px] font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          정보 제공 동의
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          더 좋은 서비스를 위해 정보를 제공해주세요
        </p>
      </div>

      {/* Consent Group Cards */}
      <div className="flex-1 px-5">
        <div className="flex flex-col gap-3">
          {consentGroups.map((group) => {
            const Icon = group.icon;
            const enabled = toggles[group.id];

            return (
              <div
                key={group.id}
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Icon */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: group.iconBg }}
                >
                  <Icon size={20} style={{ color: group.iconColor }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-[15px] font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {group.title}
                    </h3>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        background: "var(--color-badge-recommend-bg)",
                        color: "var(--color-cta)",
                      }}
                    >
                      {group.badge}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {group.description}
                  </p>
                </div>

                {/* Toggle */}
                <div className="shrink-0">
                  <Toggle
                    enabled={enabled}
                    onToggle={() => handleToggle(group.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance text */}
        <p
          className="mt-6 text-xs leading-relaxed text-center px-2"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          동의하지 않아도 기본 서비스를 이용할 수 있어요.
          <br />
          나중에 설정에서 변경할 수 있어요.
        </p>
      </div>

      {/* Bottom CTA — fallback route: primary + manual + defer */}
      <div className="px-6 pt-6 pb-10">
        <button
          onClick={() => setShowInterstitial(true)}
          className="w-full h-14 flex cursor-pointer items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          동의하고 계속
        </button>
        <Link
          href="/onboarding/family-sync"
          className="mt-2 flex w-full h-12 items-center justify-center rounded-2xl text-sm font-medium"
          style={{
            color: "var(--color-text-secondary)",
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          동의 없이 계속하기
        </Link>
        <p
          className="mt-2 text-center text-[11px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          동의하면 가족 기준 혜택까지 확인할 수 있어요
        </p>
      </div>
      <FamilySyncInterstitial
        open={showInterstitial}
        onDismiss={() => setShowInterstitial(false)}
        nextHref="/onboarding/family-sync"
      />
    </div>
  );
}
