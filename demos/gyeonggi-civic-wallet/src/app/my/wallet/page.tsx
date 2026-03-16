"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  ChevronRight,
  Wallet,
  Sparkles,
  ReceiptText,
  TrendingDown,
} from "lucide-react";
import {
  user,
  allLinkedServices,
  recentTransactions,
  formatKRW,
} from "@/data/mock";

const connectedServices = allLinkedServices.filter((s) => s.connected);

// This month's savings calculations
const thisMonthTransactions = recentTransactions.filter(
  (tx) => tx.date.startsWith("2026-03")
);
const thisMonthSavings = thisMonthTransactions
  .filter((tx) => tx.savings > 0)
  .reduce((sum, tx) => sum + tx.savings, 0);
const thisMonthSavingsCount = thisMonthTransactions.filter(
  (tx) => tx.savings > 0
).length;
const totalSavings = recentTransactions
  .filter((tx) => tx.savings > 0)
  .reduce((sum, tx) => sum + tx.savings, 0);

// Group transactions by date
function groupByDate(
  transactions: typeof recentTransactions
): { date: string; items: typeof recentTransactions }[] {
  const groups: Record<string, typeof recentTransactions> = {};
  for (const tx of transactions) {
    if (!groups[tx.date]) groups[tx.date] = [];
    groups[tx.date].push(tx);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({ date, items }));
}

const groupedTransactions = groupByDate(recentTransactions);

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
}

function getMethodBadge(method: string) {
  if (method === "지역화폐")
    return {
      label: "지역",
      bg: "var(--color-badge-recommend-bg)",
      color: "var(--color-cta)",
    };
  if (method === "네이버페이")
    return { label: "N", bg: "#E8F5E9", color: "#03C75A" };
  if (method === "카카오페이")
    return { label: "K", bg: "#FFF9E0", color: "#3C1E1E" };
  if (method === "계좌이체")
    return {
      label: "충전",
      bg: "var(--color-divider)",
      color: "var(--color-text-tertiary)",
    };
  return {
    label: method.charAt(0),
    bg: "var(--color-divider)",
    color: "var(--color-text-tertiary)",
  };
}

export default function WalletPage() {
  return (
    <>
      <TopNav title="내 지갑" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* 1. Balance Hero */}
        <section
          className="mb-4 rounded-2xl p-6"
          style={{ background: "var(--color-cta)" }}
        >
          <p className="text-sm font-medium text-white/70">지역화폐 잔액</p>
          <p className="mt-1 text-[32px] font-bold tracking-tight text-white">
            {formatKRW(user.localBalance)}
          </p>
          <button
            type="button"
            className="mt-5 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            충전하기
          </button>
        </section>

        {/* 2. This Month's Savings Summary */}
        {thisMonthSavings > 0 && (
          <section
            className="mb-4 rounded-2xl p-5"
            style={{
              background: "var(--color-success-bg)",
              border: "1px solid #BBF7D0",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "white" }}
              >
                <Sparkles
                  size={16}
                  style={{ color: "var(--color-success)" }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  className="text-base font-bold"
                  style={{ color: "var(--color-success)" }}
                >
                  이번 달 {formatKRW(thisMonthSavings)} 절약했어요
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "#15803D" }}
                >
                  총 {thisMonthSavingsCount}건의 결제에서 할인
                </p>
              </div>
            </div>
            {totalSavings > thisMonthSavings && (
              <div
                className="mt-3 flex items-center gap-1.5 pt-3"
                style={{ borderTop: "1px solid #BBF7D0" }}
              >
                <TrendingDown
                  size={12}
                  style={{ color: "#15803D" }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "#15803D" }}
                >
                  누적 절약 {formatKRW(totalSavings)}
                </span>
              </div>
            )}
          </section>
        )}

        {/* 3. Connected Payment Methods */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-secondary)" }}
            >
              연결된 결제수단
            </h3>
            <Link
              href="/my/linked-services"
              className="flex min-h-[44px] items-center gap-0.5 px-2 text-xs"
              style={{ color: "var(--color-cta)" }}
            >
              관리
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {connectedServices.length > 0 ? (
            <div className="flex flex-col gap-3">
              {connectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-3 rounded-2xl px-5 py-4"
                  style={{
                    background: "var(--color-bg-card)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    {(service as { logo?: string }).logo ? (
                      <img src={(service as { logo?: string }).logo!} alt={service.name} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-sm font-bold"
                        style={{
                          background: service.color + "20",
                          color: service.color === "#FEE500" ? "#3C1E1E" : service.color,
                        }}
                      >
                        {service.icon}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {service.name}
                    </p>
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {service.description}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: "var(--color-success-bg)",
                      color: "var(--color-success)",
                    }}
                  >
                    연결됨
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center rounded-2xl py-8"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Wallet
                size={24}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                연결된 결제수단이 없어요
              </p>
            </div>
          )}
        </section>

        {/* 4. Transaction List — Grouped by Date */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-secondary)" }}
            >
              거래 내역
            </h3>
          </div>

          {groupedTransactions.length > 0 ? (
            <div className="flex flex-col gap-4">
              {groupedTransactions.map((group) => (
                <div key={group.date}>
                  <p
                    className="mb-2 text-xs font-medium"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {formatDateLabel(group.date)}
                  </p>
                  <ul
                    className="overflow-hidden rounded-2xl"
                    style={{
                      background: "var(--color-bg-card)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {group.items.map((tx, i) => {
                      const badge = getMethodBadge(tx.method);
                      return (
                        <li
                          key={tx.id}
                          className="flex min-w-0 items-center justify-between px-5 py-4"
                          style={{
                            borderBottom:
                              i < group.items.length - 1
                                ? "1px solid var(--color-divider)"
                                : "none",
                          }}
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-3 pr-3">
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
                              style={{
                                background: badge.bg,
                                color: badge.color,
                              }}
                            >
                              {badge.label}
                            </div>
                            <div className="min-w-0">
                              <p
                                className="truncate text-sm font-medium"
                                style={{ color: "var(--color-primary)" }}
                              >
                                {tx.merchant}
                              </p>
                              <p
                                className="mt-0.5 text-xs"
                                style={{ color: "var(--color-text-tertiary)" }}
                              >
                                {tx.method}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <p
                              className="text-sm font-semibold"
                              style={{
                                color:
                                  tx.amount > 0
                                    ? "var(--color-success)"
                                    : "var(--color-primary)",
                              }}
                            >
                              {tx.amount > 0 ? "+" : ""}
                              {formatKRW(tx.amount)}
                            </p>
                            {tx.savings > 0 && (
                              <div className="mt-1 flex items-center justify-end gap-1">
                                <Sparkles
                                  size={10}
                                  style={{ color: "var(--color-success)" }}
                                  aria-hidden="true"
                                />
                                <span
                                  className="text-xs font-medium"
                                  style={{ color: "var(--color-success)" }}
                                >
                                  {formatKRW(tx.savings)} 절약
                                </span>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center rounded-2xl py-16"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: "var(--color-divider)" }}
              >
                <ReceiptText
                  size={28}
                  style={{ color: "var(--color-text-tertiary)" }}
                  aria-hidden="true"
                />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                거래 내역이 없어요
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                첫 결제를 시작해보세요
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
