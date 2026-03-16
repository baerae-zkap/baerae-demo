"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Wallet,
  MapPin,
  ChevronRight,
  Percent,
  Sparkles,
} from "lucide-react";
import { merchants, formatKRW } from "@/data/mock";

/** Nearby eligible merchants sorted by distance, top 3 */
const nearbyMerchants = merchants
  .filter((m) => m.eligible && m.benefits.length > 0)
  .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
  .slice(0, 3);

export default function TopUpInterstitial({
  open,
  onDismiss,
  chargedAmount,
}: {
  open: boolean;
  onDismiss: () => void;
  chargedAmount: number;
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

  const hasNearby = nearbyMerchants.length > 0;

  // Compute max potential savings from best nearby merchant
  const bestMerchant = nearbyMerchants[0];
  const bestRate = bestMerchant
    ? parseFloat(
        bestMerchant.benefits.find((b) => b.recommended)?.benefitRate ?? "0"
      )
    : 0;
  const maxSavings = Math.round(chargedAmount * (bestRate / 100));

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
        aria-label="충전 완료"
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

        {/* Header — icon + title */}
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <Wallet size={36} style={{ color: "var(--color-cta)" }} />
          </div>

          <h2
            className="mb-1 text-xl font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            충전이 완료됐어요
          </h2>

          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            잔액{" "}
            <span className="font-semibold" style={{ color: "var(--color-cta)" }}>
              {formatKRW(chargedAmount)}
            </span>
            {hasNearby
              ? "으로 아낄 수 있는 곳이 있어요"
              : "을 지역화폐로 사용하면 최대 10% 할인을 받을 수 있어요"}
          </p>
        </div>

        {/* Personalized merchant suggestions */}
        {hasNearby ? (
          <div className="mt-6 flex flex-col gap-2.5">
            {/* Savings highlight */}
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
                가장 가까운 곳에서 최대{" "}
                <span className="font-bold">{formatKRW(maxSavings)}</span> 절약
                가능
              </p>
            </div>

            {/* Merchant cards */}
            {nearbyMerchants.map((m) => {
              const best = m.benefits.find((b) => b.recommended) ?? m.benefits[0];
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
                      style={{ background: "var(--color-badge-recommend-bg)" }}
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
          </div>
        ) : (
          /* Fallback: general savings suggestion */
          <div
            className="mt-6 rounded-2xl px-5 py-5"
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
                  주변 가맹점에서 바로 사용할 수 있어요
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  지역화폐로 결제하면 최대 10% 할인을 받을 수 있어요.
                  가까운 가맹점을 확인해보세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/pay"
            className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {hasNearby ? "주변 가맹점 보기" : "가맹점 둘러보기"}
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
