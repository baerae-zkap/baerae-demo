"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Users,
  Gift,
  FileText,
  CircleCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { benefits, familyMembers } from "@/data/mock";

export default function FamilySyncInterstitial({
  open,
  onDismiss,
  nextHref,
}: {
  open: boolean;
  onDismiss: () => void;
  /** Where the primary CTA leads (e.g. next onboarding step or /benefits) */
  nextHref: string;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const memberCount = familyMembers.length;
  const eligibleBenefits = benefits.filter(
    (b) => b.status === "eligible" || b.status === "likely"
  );
  const benefitCount = eligibleBenefits.length;

  // Unlocked capabilities summary
  const unlocked = [
    {
      icon: Gift,
      label: `맞춤 혜택 ${benefitCount}건 발견`,
      detail: "가구 구성에 맞는 혜택을 찾았어요",
      color: "var(--color-cta)",
      bg: "var(--color-badge-recommend-bg)",
    },
    {
      icon: FileText,
      label: "서류 자동 준비 가능",
      detail: "가족관계증명서, 주민등록등본 등",
      color: "var(--color-success)",
      bg: "var(--color-success-bg)",
    },
    {
      icon: Users,
      label: `가구원 ${memberCount}명 확인 완료`,
      detail: familyMembers.map((m) => `${m.name}(${m.relationship})`).join(", "),
      color: "var(--color-cta)",
      bg: "var(--color-badge-recommend-bg)",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="sheet-enter fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-6 pb-10 pt-8"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-modal="true"
        aria-label="가구 정보 확인 완료"
      >
        {/* Handle bar */}
        <div className="mb-6 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
          style={{ background: "var(--color-divider)" }}
          aria-label="닫기"
        >
          <X size={16} style={{ color: "var(--color-text-tertiary)" }} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <CircleCheck size={36} style={{ color: "var(--color-success)" }} />
          </div>

          <h2
            className="mb-1 text-xl font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            이제 받을 수 있는 혜택을 찾아드릴게요
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            가족·거주 정보를 바탕으로 지원 가능 혜택을 정리했어요
          </p>
        </div>

        {/* Unlocked capabilities */}
        <div className="mt-6 flex flex-col gap-2.5">
          {/* Highlight banner */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <Sparkles
              size={16}
              style={{ color: "var(--color-cta)" }}
              aria-hidden="true"
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-cta)" }}
            >
              정보 확인으로{" "}
              <span className="font-bold">{benefitCount}건의 혜택</span>이
              열렸어요
            </p>
          </div>

          {/* Capability cards */}
          {unlocked.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: item.bg }}
                >
                  <Icon size={18} style={{ color: item.color }} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-0.5 truncate text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Preview: top benefit */}
          {eligibleBenefits[0] && (
            <Link
              href={`/benefits/${eligibleBenefits[0].id}`}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "var(--color-success-bg)",
                border: "1px solid var(--color-success)",
                borderColor: "color-mix(in srgb, var(--color-success) 30%, transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                <Gift
                  size={18}
                  style={{ color: "var(--color-success)" }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {eligibleBenefits[0].title}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--color-success)" }}
                  >
                    {eligibleBenefits[0].amount} · {eligibleBenefits[0].type}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={nextHref}
            className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            계속하기
          </Link>
          <button
            onClick={onDismiss}
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            나중에
          </button>
        </div>
      </div>
    </>
  );
}
