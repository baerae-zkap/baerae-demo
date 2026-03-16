"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import { AlertCircle, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import {
  paymentRequests,
  merchants,
  computePaymentOptions,
  formatKRW,
} from "@/data/mock";

export default function PaymentRequestPage() {
  const { id } = useParams<{ id: string }>();
  const request = paymentRequests[id as keyof typeof paymentRequests];

  /* ---------- Error state ---------- */
  if (!request) {
    return (
      <>
        <TopNav title="결제 요청" showBack />
        <div className="flex flex-col items-center px-5 pt-20">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertCircle
              size={28}
              style={{ color: "var(--color-error)" }}
              aria-hidden="true"
            />
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            결제 요청을 찾을 수 없습니다
          </p>
          <Link
            href="/pay"
            className="mt-6 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white"
            style={{ background: "var(--color-cta)" }}
          >
            가맹점 목록으로
          </Link>
        </div>
      </>
    );
  }

  /* ---------- Data lookup ---------- */
  const merchant = merchants.find((m) => m.id === request.merchantId);
  const payment = computePaymentOptions(request.merchantId, request.amount);
  const recommended = payment?.options.find((o) => o.recommended);

  return (
    <>
      <TopNav title="결제 요청" showBack />

      <div className="px-5 pt-2 pb-6">
        {/* ---- Hero section ---- */}
        <section className="mb-5 text-center" aria-label="결제 요청 정보">
          <p
            className="text-lg font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {merchant?.name ?? request.merchantName}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {request.timestamp}
          </p>
          <p
            className="mt-3 text-[28px] font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(request.amount)}
          </p>
        </section>

        {/* ---- Info banner ---- */}
        <section
          className="mb-5 rounded-2xl px-5 py-4"
          style={{ background: "var(--color-badge-recommend-bg)" }}
          aria-label="절약 안내"
        >
          <div className="flex items-start gap-2.5">
            <Sparkles
              size={18}
              style={{ color: "var(--color-cta)" }}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p
                className="text-sm font-medium leading-snug"
                style={{ color: "var(--color-primary)" }}
              >
                이 결제에서 가장 유리한 수단을 찾아드릴게요
              </p>
              {recommended && recommended.savings > 0 && (
                <p
                  className="mt-1.5 text-xs font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  지역화폐로 결제하면 {formatKRW(recommended.savings)} 절약
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ---- Recommended option preview ---- */}
        {recommended && (
          <section
            className="mb-6 rounded-2xl p-5"
            style={{
              background: "var(--color-bg-card)",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
            }}
            aria-label="유리한 결제 수단"
          >
            <div className="flex items-center gap-3">
              {/* G icon */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                style={{
                  background: "var(--color-badge-recommend-bg)",
                  color: "var(--color-cta)",
                }}
              >
                G
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    경기 지역화폐
                  </p>
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background: "var(--color-cta)",
                      color: "#fff",
                    }}
                  >
                    <CheckCircle size={10} aria-hidden="true" />
                    최적
                  </span>
                </div>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {recommended.helperText}
                </p>
              </div>
            </div>

            {/* Amount row */}
            <div
              className="mt-4 flex items-end justify-between rounded-xl px-4 py-3"
              style={{ background: "var(--color-success-bg)" }}
            >
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  최종 결제
                </p>
                <p
                  className="mt-0.5 text-xl font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(recommended.finalAmount)}
                </p>
              </div>
              {recommended.savings > 0 && (
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--color-success)" }}
                >
                  -{formatKRW(recommended.savings)} 절약
                </p>
              )}
            </div>
          </section>
        )}

        {/* ---- CTAs ---- */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/pay/compare/${id}`}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            비교 보기
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          {recommended && (
            <Link
              href={`/pay/confirm/${id}`}
              className="flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--color-divider)",
                color: "var(--color-secondary)",
              }}
            >
              지역화폐로 바로 결제
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
