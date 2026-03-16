"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import { Check, AlertCircle, TrendingDown, Zap } from "lucide-react";
import { NoLinkedServices } from "@/components/EdgeStates";
import {
  paymentRequests,
  merchants,
  computePaymentOptions,
  user,
  formatKRW,
} from "@/data/mock";

function PaymentIcon({ id, type }: { id: string; type: string }) {
  const letter =
    type === "local" ? "G" : id === "naver-pay" ? "N" : "K";
  const bg =
    type === "local"
      ? "var(--color-badge-recommend-bg)"
      : id === "naver-pay"
        ? "#E8F5E9"
        : "#FFF9E0";
  const color =
    type === "local"
      ? "var(--color-cta)"
      : id === "naver-pay"
        ? "#03C75A"
        : "#3C1E1E";

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
      style={{ background: bg, color }}
    >
      {letter}
    </div>
  );
}

export default function ComparePaymentPage() {
  const { id } = useParams<{ id: string }>();

  // Look up payment request → merchant → compute options
  const request = paymentRequests[id as keyof typeof paymentRequests];
  const merchant = request
    ? merchants.find((m) => m.id === request.merchantId)
    : null;
  const data =
    request && merchant
      ? computePaymentOptions(request.merchantId, request.amount)
      : null;

  if (!request || !data) {
    return (
      <>
        <TopNav title="결제 비교" showBack />
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
            결제 정보를 찾을 수 없어요
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

  const recommended = data.options.find((o) => o.recommended);
  const maxSavings = recommended?.savings ?? 0;

  return (
    <>
      <TopNav title="결제 수단 비교" showBack />

      <div className="px-5 pt-2 pb-6">
        {/* Header: merchant + amount */}
        <section className="mb-5" aria-label="결제 정보">
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {data.merchantName}
          </p>
          <p
            className="mt-1 text-2xl font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(data.purchaseAmount)}
          </p>
          {maxSavings > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <TrendingDown
                size={14}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
              <p
                className="text-xs font-medium"
                style={{ color: "var(--color-success)" }}
              >
                최대 {formatKRW(maxSavings)} 절약 가능
              </p>
            </div>
          )}
        </section>

        {/* Comparison Cards */}
        <section aria-label="결제 수단 비교">
          <ul className="flex flex-col gap-3">
            {data.options.map((option) => {
              const isRecommended = option.recommended;
              const insufficientForThis =
                option.type === "local" &&
                user.localBalance < option.finalAmount;

              let reason = "";
              if (isRecommended) {
                reason = "즉시 할인으로 가장 많이 절약";
              } else if (option.expectedBenefit > 0) {
                reason = `${option.benefitLabel} ${formatKRW(option.expectedBenefit)} 예상`;
              }

              return (
                <li key={option.id}>
                  <Link
                    href={
                      insufficientForThis
                        ? "/my"
                        : `/pay/confirm/${id}?method=${option.id}`
                    }
                    className="relative block overflow-hidden rounded-2xl transition-all duration-200 hover:shadow-md"
                    style={{
                      background: "var(--color-bg-card)",
                      border: isRecommended
                        ? "1.5px solid var(--color-cta)"
                        : "1.5px solid var(--color-border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {/* Recommended top bar */}
                    {isRecommended && (
                      <div
                        className="flex items-center gap-1.5 px-5 py-2"
                        style={{ background: "var(--color-cta)" }}
                      >
                        <Check size={12} className="text-white" aria-hidden="true" />
                        <span className="text-xs font-medium text-white">
                          이 결제에서 가장 유리해요
                        </span>
                      </div>
                    )}

                    <div className="p-5">
                      {/* Method info row */}
                      <div className="flex items-center gap-3">
                        <PaymentIcon id={option.id} type={option.type} />
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-base font-semibold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {option.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {option.helperText}
                          </p>
                        </div>
                      </div>

                      {/* Amount + benefit row */}
                      <div
                        className="mt-4 flex items-end justify-between rounded-xl px-4 py-3"
                        style={{
                          background: isRecommended
                            ? "var(--color-success-bg)"
                            : "var(--color-divider)",
                        }}
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
                            {formatKRW(option.finalAmount)}
                          </p>
                        </div>
                        <div className="text-right">
                          {option.savings > 0 && (
                            <p
                              className="text-sm font-bold"
                              style={{ color: "var(--color-success)" }}
                            >
                              -{formatKRW(option.savings)} 절약
                            </p>
                          )}
                          {option.expectedBenefit > 0 && (
                            <p
                              className="text-sm font-medium"
                              style={{ color: "var(--color-cta)" }}
                            >
                              +{formatKRW(option.expectedBenefit)}{" "}
                              {option.benefitLabel}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Reason line */}
                      {reason && (
                        <p
                          className="mt-2.5 text-xs"
                          style={{
                            color: isRecommended
                              ? "var(--color-success)"
                              : "var(--color-text-tertiary)",
                          }}
                        >
                          {reason}
                        </p>
                      )}

                      {/* Insufficient warning */}
                      {insufficientForThis && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <AlertCircle
                            size={12}
                            style={{ color: "var(--color-warning)" }}
                            aria-hidden="true"
                          />
                          <p
                            className="text-xs font-medium"
                            style={{ color: "var(--color-warning)" }}
                          >
                            잔액 부족 · 충전 필요
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Mixed Route Card */}
        {recommended && recommended.savings > 0 && (
          <section className="mt-5" aria-label="최적 결제 조합">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "var(--color-bg-card)",
                border: "1px dashed var(--color-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <Zap
                  size={16}
                  style={{ color: "var(--color-cta)" }}
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  이렇게 결제하면 가장 유리해요
                </p>
              </div>
              <p
                className="mt-2 text-xs leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                지역화폐로 결제하면{" "}
                <strong style={{ color: "var(--color-success)" }}>
                  {formatKRW(recommended.savings)} 즉시 할인
                </strong>
                을 받고, 네이버페이 포인트{" "}
                <strong style={{ color: "var(--color-cta)" }}>
                  {formatKRW(
                    data.options.find((o) => o.id === "naver-pay")
                      ?.expectedBenefit ?? 0
                  )}{" "}
                  적립
                </strong>
                은 다음 결제에서 사용할 수 있어요.
              </p>
              <div
                className="mt-3 flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: "var(--color-divider)" }}
              >
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  이번에 아끼는 금액
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--color-success)" }}
                >
                  {formatKRW(recommended.savings)}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* No linked services */}
        {user.linkedServices.length === 0 && (
          <section className="mt-5">
            <NoLinkedServices />
          </section>
        )}
      </div>
    </>
  );
}
