"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  PartyPopper,
  MapPin,
  ChevronRight,
  Percent,
  Sparkles,
  ArrowRightLeft,
  Link as LinkIcon,
} from "lucide-react";
import { merchants, formatKRW } from "@/data/mock";

/** Nearby eligible merchants sorted by distance, top 3 */
const nearbyMerchants = merchants
  .filter((m) => m.eligible && m.benefits.length > 0)
  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
  .slice(0, 3);

type PaymentContext = {
  merchantName: string;
  paidAmount: number;
  savings: number;
  method: string;
  /** Whether the user used the optimal (recommended) payment method */
  usedOptimalRoute: boolean;
};

export default function PaymentSuccessInterstitial({
  open,
  onDismiss,
  payment,
}: {
  open: boolean;
  onDismiss: () => void;
  payment: PaymentContext;
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

  const hasSavings = payment.savings > 0;
  const hasNearby = nearbyMerchants.length > 0;

  // Filter out the merchant the user just paid at
  const otherMerchants = nearbyMerchants.filter(
    (m) => m.name !== payment.merchantName
  );

  // Find best savings potential among other nearby merchants
  const bestOther = otherMerchants[0];
  const bestOtherRate = bestOther
    ? parseFloat(
        bestOther.benefits.find((b) => b.recommended)?.benefitRate ?? "0"
      )
    : 0;
  const bestOtherSavings = bestOther
    ? Math.round(payment.paidAmount * (bestOtherRate / 100))
    : 0;

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
        aria-label="결제 완료 안내"
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
          {hasSavings ? (
            <>
              {/* Savings celebration icon */}
              <div
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "var(--color-success-bg)" }}
              >
                <PartyPopper
                  size={36}
                  style={{ color: "var(--color-success)" }}
                />
              </div>
              <h2
                className="mb-1 text-xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {formatKRW(payment.savings)} 아꼈어요
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {payment.merchantName}에서 {payment.method} 할인 적용
              </p>
            </>
          ) : (
            <>
              {/* Non-savings: suggest better route */}
              <div
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <ArrowRightLeft
                  size={36}
                  style={{ color: "var(--color-cta)" }}
                />
              </div>
              <h2
                className="mb-1 text-xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                결제가 완료됐어요
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {payment.merchantName}에서 {formatKRW(payment.paidAmount)} 결제
              </p>
            </>
          )}
        </div>

        {/* Body content — branching by scenario */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Scenario A: Had savings → show nearby merchants to save more */}
          {hasSavings && otherMerchants.length > 0 && (
            <>
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{ background: "var(--color-success-bg)" }}
              >
                <Sparkles
                  size={16}
                  style={{ color: "var(--color-success)" }}
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  같은 방식으로 근처에서 최대{" "}
                  <span className="font-bold">
                    {formatKRW(bestOtherSavings)}
                  </span>{" "}
                  더 아낄 수 있어요
                </p>
              </div>

              {otherMerchants.slice(0, 2).map((m) => {
                const best =
                  m.benefits.find((b) => b.recommended) ?? m.benefits[0];
                return (
                  <Link
                    key={m.id}
                    href={`/pay/merchant/${m.id}`}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]"
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--color-badge-recommend-bg)",
                        }}
                      >
                        <MapPin
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
                          {m.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            {m.distance}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            ·
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            {m.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="flex items-center gap-1 rounded-full px-2.5 py-1"
                        style={{ background: "var(--color-success-bg)" }}
                      >
                        <Percent
                          size={11}
                          style={{ color: "var(--color-success)" }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-xs font-bold"
                          style={{ color: "var(--color-success)" }}
                        >
                          {best.benefitRate}
                        </span>
                      </div>
                      <ChevronRight
                        size={14}
                        style={{ color: "var(--color-text-tertiary)" }}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                );
              })}
            </>
          )}

          {/* Scenario B: No savings, used non-optimal route → suggest compare */}
          {!hasSavings && !payment.usedOptimalRoute && (
            <div
              className="rounded-2xl px-5 py-5"
              style={{ background: "var(--color-bg)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-warning-bg)" }}
                >
                  <ArrowRightLeft
                    size={18}
                    style={{ color: "var(--color-warning)" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    다음엔 더 아낄 수 있어요
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    지역화폐로 결제하면 최대 10% 할인을 받을 수 있어요.
                    결제 전에 비교해보세요.
                  </p>
                </div>
              </div>

              {/* Link service suggestion */}
              <Link
                href="/my/linked-services"
                className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "var(--color-badge-recommend-bg)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <LinkIcon
                    size={16}
                    style={{ color: "var(--color-cta)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-cta)" }}
                  >
                    결제 서비스 더 연결하기
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  style={{ color: "var(--color-cta)" }}
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}

          {/* Scenario C: No savings but used optimal route / general fallback */}
          {!hasSavings && payment.usedOptimalRoute && hasNearby && (
            <div
              className="rounded-2xl px-5 py-5"
              style={{ background: "var(--color-bg)" }}
            >
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--color-cta)" }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    근처 가맹점에서 할인 받을 수 있어요
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    지역화폐 가맹점에서 결제하면 추가 할인을 받을 수 있어요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/pay"
            className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {hasSavings ? "더 찾아보기" : "주변 가맹점 둘러보기"}
          </Link>
          <Link
            href="/pay/history"
            className="flex w-full items-center justify-center rounded-2xl py-3 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            결제 내역 보기
          </Link>
        </div>
      </div>
    </>
  );
}
