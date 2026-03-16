"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  CircleCheck,
  Clock,
  Bell,
  Gift,
  ChevronRight,
} from "lucide-react";
import { benefits } from "@/data/mock";

export default function BenefitSubmittedInterstitial({
  open,
  onDismiss,
  benefitId,
  benefitTitle,
  reviewTime,
}: {
  open: boolean;
  onDismiss: () => void;
  benefitId: string;
  benefitTitle: string;
  /** e.g. "3~5 영업일 소요" */
  reviewTime: string;
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

  // Find other eligible benefits (excluding the one just submitted)
  const otherBenefits = benefits.filter(
    (b) => b.id !== benefitId && (b.status === "eligible" || b.status === "likely")
  );
  const nextBenefit = otherBenefits[0] ?? null;

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
        aria-label="신청 완료"
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
            신청이 완료됐어요
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {benefitTitle}
          </p>
        </div>

        {/* Next steps summary */}
        <div className="mt-6 flex flex-col gap-2.5">
          {/* Review timeline */}
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <Clock
                size={18}
                style={{ color: "var(--color-cta)" }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {reviewTime.includes("알려드릴게요")
                  ? reviewTime
                  : `${reviewTime} 내에 결과를 알려드릴게요`}
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                검토가 시작되면 알림을 보내드려요
              </p>
            </div>
          </div>

          {/* Notification assurance */}
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--color-success-bg)" }}
            >
              <Bell
                size={18}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                진행 상황을 놓치지 않아요
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                승인·추가서류·지급 단계마다 알림으로 안내해요
              </p>
            </div>
          </div>

          {/* Other benefit recommendation */}
          {nextBenefit && (
            <Link
              href={`/benefits/${nextBenefit.id}`}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]"
              style={{
                background: "var(--color-badge-recommend-bg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-bg-card)" }}
                >
                  <Gift
                    size={18}
                    style={{ color: "var(--color-cta)" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--color-cta)" }}
                  >
                    함께 받을 수 있는 혜택
                  </p>
                  <p
                    className="mt-0.5 text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {nextBenefit.title}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {nextBenefit.amount} · {nextBenefit.type}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                style={{ color: "var(--color-cta)" }}
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={`/benefits/${benefitId}/status`}
            className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            진행 상태 보기
          </Link>
          <Link
            href="/benefits"
            className="flex w-full items-center justify-center rounded-2xl py-3 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            다른 혜택 보기
          </Link>
        </div>
      </div>
    </>
  );
}
