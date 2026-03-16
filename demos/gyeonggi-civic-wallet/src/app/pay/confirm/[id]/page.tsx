"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import { Shield, AlertCircle, ArrowRight, Wallet } from "lucide-react";
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

export default function ConfirmPaymentPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const methodParam = searchParams.get("method");

  // Look up request → merchant → compute options
  const request = paymentRequests[id as keyof typeof paymentRequests];
  const data =
    request
      ? computePaymentOptions(request.merchantId, request.amount)
      : null;

  const selected = data?.options.find((o) =>
    methodParam ? o.id === methodParam : o.recommended
  );

  if (!request || !data || !selected) {
    return (
      <>
        <TopNav title="결제 확인" showBack />
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
            결제 정보를 찾을 수 없습니다
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

  const insufficientBalance =
    selected.type === "local" && user.localBalance < selected.finalAmount;
  const shortfall = selected.finalAmount - user.localBalance;
  const remainingBalance = user.localBalance - selected.finalAmount;

  // Find best alternative for insufficient balance
  const bestAlternative = insufficientBalance
    ? data.options
        .filter((o) => o.type === "linked")
        .sort((a, b) => b.expectedBenefit - a.expectedBenefit)[0]
    : null;

  // --- Insufficient Balance State ---
  if (insufficientBalance) {
    return (
      <>
        <TopNav title="결제 확인" showBack />

        <div className="px-5 pt-2 pb-6">
          {/* Merchant + Amount */}
          <section className="mb-5">
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
          </section>

          {/* Insufficient Warning Card */}
          <section
            className="mb-5 rounded-2xl p-5"
            style={{
              background: "var(--color-warning-bg)",
              border: "1px solid var(--color-warning)",
            }}
            aria-label="잔액 부족 안내"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                size={20}
                style={{ color: "var(--color-warning)" }}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  지역화폐 잔액이 부족해요
                </p>
                <p
                  className="mt-1.5 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  현재 잔액 {formatKRW(user.localBalance)}으로는{" "}
                  {formatKRW(selected.finalAmount)} 결제가 어렵습니다.{" "}
                  {formatKRW(shortfall)}이 부족해요.
                </p>
              </div>
            </div>

            {/* Balance visual */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1">
                <div
                  className="h-2 overflow-hidden rounded-full"
                  style={{ background: "var(--color-border)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "var(--color-warning)",
                      width: `${Math.min((user.localBalance / selected.finalAmount) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <span
                className="shrink-0 text-xs font-medium"
                style={{ color: "var(--color-warning)" }}
              >
                {Math.round((user.localBalance / selected.finalAmount) * 100)}%
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span
                className="text-[10px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                현재 {formatKRW(user.localBalance)}
              </span>
              <span
                className="text-[10px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                필요 {formatKRW(selected.finalAmount)}
              </span>
            </div>
          </section>

          {/* Recommended Alternative */}
          {bestAlternative && (
            <section className="mb-5" aria-label="대안 결제 수단">
              <h3
                className="mb-3 text-sm font-semibold"
                style={{ color: "var(--color-text-secondary)" }}
              >
                대신 이렇게 결제할 수 있어요
              </h3>
              <Link
                href={`/pay/confirm/${id}?method=${bestAlternative.id}`}
                className="block rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1.5px solid var(--color-cta)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex items-center gap-3">
                  <PaymentIcon
                    id={bestAlternative.id}
                    type={bestAlternative.type}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {bestAlternative.name}으로 결제
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {bestAlternative.helperText}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    style={{ color: "var(--color-cta)" }}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className="mt-3 flex items-center justify-between rounded-xl px-3.5 py-2.5"
                  style={{ background: "var(--color-divider)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    결제 금액
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {formatKRW(bestAlternative.finalAmount)}
                  </span>
                </div>
                {bestAlternative.expectedBenefit > 0 && (
                  <p
                    className="mt-2 text-xs"
                    style={{ color: "var(--color-cta)" }}
                  >
                    +{formatKRW(bestAlternative.expectedBenefit)}{" "}
                    {bestAlternative.benefitLabel} 혜택도 받을 수 있어요
                  </p>
                )}
              </Link>
            </section>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Link
              href="/my"
              className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--color-cta)" }}
            >
              <Wallet size={18} className="mr-2" aria-hidden="true" />
              지역화폐 충전하기
            </Link>
            <Link
              href={`/pay/compare/${id}`}
              className="flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--color-divider)",
                color: "var(--color-secondary)",
              }}
            >
              다시 비교하기
            </Link>
          </div>
        </div>
      </>
    );
  }

  // --- Normal Confirm State ---
  return (
    <>
      <TopNav title="결제 확인" showBack />

      <div className="px-5 pt-2 pb-6">
        {/* Summary Card */}
        <section
          className="mb-6 overflow-hidden rounded-2xl"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-md)",
          }}
          aria-label="결제 요약"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <p
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {data.merchantName}에서
            </p>
            <p
              className="mt-2 text-[28px] font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {formatKRW(selected.finalAmount)}
            </p>
          </div>

          {/* Breakdown */}
          <div
            className="mx-4 mb-4 rounded-xl p-4"
            style={{ background: "var(--color-divider)" }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                원래 금액
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {formatKRW(data.purchaseAmount)}
              </span>
            </div>
            {selected.savings > 0 && (
              <div className="mt-2.5 flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  즉시 할인 ({selected.discountRate})
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  -{formatKRW(selected.savings)}
                </span>
              </div>
            )}
            {selected.expectedBenefit > 0 && (
              <div className="mt-2.5 flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-cta)" }}
                >
                  {selected.benefitLabel} 예정
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-cta)" }}
                >
                  +{formatKRW(selected.expectedBenefit)}
                </span>
              </div>
            )}
          </div>

          {/* Remaining Balance */}
          {selected.type === "local" && (
            <div
              className="mx-4 mb-5 flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <span
                className="text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                결제 후 남은 잔액
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-cta)" }}
              >
                {formatKRW(remainingBalance)}
              </span>
            </div>
          )}
        </section>

        {/* Payment Method */}
        <section
          className="mb-6 rounded-2xl p-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
          aria-label="결제 수단"
        >
          <p
            className="mb-3 text-xs font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            결제 수단
          </p>
          <div className="flex items-center gap-3">
            <PaymentIcon id={selected.id} type={selected.type} />
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {selected.name}
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {selected.type === "local"
                  ? `잔액 ${formatKRW(user.localBalance)}`
                  : selected.helperText}
              </p>
            </div>
            <Link
              href={`/pay/compare/${id}`}
              className="flex min-h-[44px] shrink-0 items-center px-2 text-xs font-medium"
              style={{ color: "var(--color-cta)" }}
            >
              변경
            </Link>
          </div>
        </section>

        {/* Reassurance */}
        <div
          className="mb-8 flex items-center gap-2.5 rounded-xl px-4 py-3"
          style={{ background: "var(--color-divider)" }}
        >
          <Shield
            size={16}
            style={{ color: "var(--color-success)" }}
            aria-hidden="true"
          />
          <span
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            경기도가 운영하는 안전한 결제 시스템이에요.
            결제 내역은 내 지갑에서 확인할 수 있습니다.
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/pay/success/tx-001"
            className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {formatKRW(selected.finalAmount)} 결제 승인
          </Link>
          <Link
            href={`/pay/compare/${id}`}
            className="flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-secondary)",
            }}
          >
            다시 비교하기
          </Link>
        </div>
      </div>
    </>
  );
}
