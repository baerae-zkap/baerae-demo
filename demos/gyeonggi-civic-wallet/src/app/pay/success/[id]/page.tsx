"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CircleCheck,
  Receipt,
  AlertCircle,
  RotateCcw,
  ClipboardList,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { recentTransactions, user, formatKRW } from "@/data/mock";
import TopUpInterstitial from "@/components/TopUpInterstitial";
import PaymentSuccessInterstitial from "@/components/PaymentSuccessInterstitial";

export default function PaymentSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const tx = recentTransactions.find((t) => t.id === id);

  // Error state
  if (!tx) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5">
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
          href="/home"
          className="mt-6 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white"
          style={{ background: "var(--color-cta)" }}
        >
          홈으로
        </Link>
      </div>
    );
  }

  const paidAmount = Math.abs(tx.amount);
  const originalAmount = tx.originalAmount || paidAmount + tx.savings;
  const remainingBalance = user.localBalance - paidAmount;

  const [showInterstitial, setShowInterstitial] = useState(true);

  const isTopUp = tx.amount > 0;

  // Determine if user used the optimal (recommended) route
  const usedOptimalRoute = tx.method === "지역화폐";

  return (
    <div className="flex min-h-[100dvh] flex-col px-5 pt-10 pb-6">
      {/* Success Hero */}
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "var(--color-success-bg)" }}
        >
          <CircleCheck
            size={44}
            style={{ color: "var(--color-success)" }}
            aria-hidden="true"
          />
        </div>
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          결제가 완료됐어요
        </h1>
        <p
          className="mt-1.5 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {tx.merchant}
        </p>
      </div>

      {/* Savings Celebration */}
      {tx.savings > 0 ? (
        <div
          className="mt-6 flex flex-col items-center rounded-2xl px-5 py-6"
          style={{ background: "var(--color-cta)" }}
        >
          <p className="text-sm font-medium text-white/80">
            이번 결제에서
          </p>
          <p className="mt-2 text-[32px] font-bold tracking-tight text-white">
            {formatKRW(tx.savings)}
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            아꼈어요!
          </p>
          <p className="mt-3 text-xs text-white/50">
            {tx.method} 할인 혜택 적용 · {formatKRW(paidAmount)} 결제
          </p>
        </div>
      ) : (
        <div
          className="mt-6 flex flex-col items-center rounded-2xl px-5 py-6"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(paidAmount)}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {tx.method}로 결제 완료
          </p>
        </div>
      )}

      {/* Compact Receipt */}
      <section
        className="mt-5 rounded-2xl p-5"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
        aria-label="결제 요약"
      >
        <div className="flex flex-col gap-2.5">
          {tx.savings > 0 && (
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                원래 금액
              </span>
              <span
                className="text-xs line-through"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {formatKRW(originalAmount)}
              </span>
            </div>
          )}
          {tx.savings > 0 && (
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: "var(--color-success)" }}
              >
                절약 금액
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-success)" }}
              >
                -{formatKRW(tx.savings)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              결제 금액
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {formatKRW(paidAmount)}
            </span>
          </div>

          <div
            style={{ borderTop: "1px solid var(--color-divider)" }}
            className="my-0.5"
          />

          <div className="flex items-center justify-between">
            <span
              className="text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              결제 수단
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--color-primary)" }}
            >
              {tx.method}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              결제 일시
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--color-primary)" }}
            >
              {tx.date}
            </span>
          </div>
          {tx.method === "지역화폐" && (
            <div className="flex items-center justify-between">
              <span
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                남은 잔액
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-cta)" }}
              >
                {formatKRW(remainingBalance)}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Nearby Recommendation */}
      <Link
        href="/pay"
        className="mt-5 flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-200 hover:shadow-md"
        style={{
          background: "var(--color-badge-recommend-bg)",
        }}
      >
        <div className="flex items-center gap-3">
          <MapPin
            size={18}
            style={{ color: "var(--color-cta)" }}
            aria-hidden="true"
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              근처에서 더 아낄 곳이 있어요
            </p>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--color-cta)" }}
            >
              가맹점 둘러보기
            </p>
          </div>
        </div>
        <ChevronRight
          size={16}
          style={{ color: "var(--color-cta)" }}
          aria-hidden="true"
        />
      </Link>

      {/* Action CTAs */}
      <div className="mt-auto flex flex-col gap-2.5 pt-6">
        <button
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors duration-200"
          style={{
            background: "var(--color-bg-card)",
            color: "var(--color-primary)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Receipt size={16} aria-hidden="true" />
          영수증 보기
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/pay"
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl text-xs font-medium transition-colors duration-200"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-secondary)",
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            다시 결제하기
          </Link>
          <Link
            href="/pay/history"
            className="flex h-12 items-center justify-center gap-1.5 rounded-xl text-xs font-medium transition-colors duration-200"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-secondary)",
            }}
          >
            <ClipboardList size={14} aria-hidden="true" />
            결제 내역 보기
          </Link>
        </div>
      </div>
      {isTopUp ? (
        <TopUpInterstitial
          open={showInterstitial}
          onDismiss={() => setShowInterstitial(false)}
          chargedAmount={tx.amount}
        />
      ) : (
        <PaymentSuccessInterstitial
          open={showInterstitial}
          onDismiss={() => setShowInterstitial(false)}
          payment={{
            merchantName: tx.merchant,
            paidAmount: paidAmount,
            savings: tx.savings,
            method: tx.method,
            usedOptimalRoute,
          }}
        />
      )}
    </div>
  );
}
