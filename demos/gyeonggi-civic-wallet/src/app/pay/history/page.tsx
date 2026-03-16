"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { NoPaymentHistory } from "@/components/EdgeStates";
import { recentTransactions, formatKRW } from "@/data/mock";

type FilterType = "all" | "online" | "offline";

const filterLabels: Record<FilterType, string> = {
  all: "전체",
  online: "온라인",
  offline: "오프라인",
};

// Classify transactions
const onlineMerchants = ["충전"];
function isOnline(merchant: string) {
  return onlineMerchants.includes(merchant);
}

function getMethodBadge(method: string) {
  if (method === "지역화폐")
    return { label: "지역", bg: "#EBF5FF", color: "#3182F6", logo: "/gyeonggi-civic-wallet-demo/logos/gyeonggi.svg" };
  if (method === "네이버페이")
    return { label: "N", bg: "#E8F5E9", color: "#03C75A", logo: "/gyeonggi-civic-wallet-demo/logos/naver-pay.svg" };
  if (method === "카카오페이")
    return { label: "K", bg: "#FFF9E0", color: "#3C1E1E", logo: "/gyeonggi-civic-wallet-demo/logos/kakao-pay.svg" };
  if (method === "계좌이체")
    return { label: "충전", bg: "#F1F3F5", color: "#8B95A1", logo: "/gyeonggi-civic-wallet-demo/logos/shinhan.svg" };
  return { label: method.charAt(0), bg: "#F1F3F5", color: "#8B95A1", logo: "/gyeonggi-civic-wallet-demo/logos/gyeonggi.svg" };
}

type Transaction = (typeof recentTransactions)[number];

// Group transactions by date
function groupByDate(txs: Transaction[]) {
  const groups: { date: string; label: string; txs: Transaction[] }[] = [];
  const map = new Map<string, Transaction[]>();

  for (const tx of txs) {
    const existing = map.get(tx.date);
    if (existing) {
      existing.push(tx);
    } else {
      const arr = [tx];
      map.set(tx.date, arr);
    }
  }

  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  for (const [date, txs] of map) {
    const d = new Date(date);
    const day = d.getDate();
    const dayName = dayNames[d.getDay()];
    groups.push({ date, label: `${day}일 ${dayName}`, txs });
  }

  return groups;
}

export default function PayHistoryPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = March, -1 = Feb

  if (recentTransactions.length === 0) {
    return (
      <>
        <TopNav title="결제 내역" showBack />
        <div className="px-6 pt-2">
          <NoPaymentHistory />
        </div>
      </>
    );
  }

  // Current viewing month
  const baseMonth = new Date(2026, 2 + monthOffset); // March 2026 + offset
  const monthStr = `${baseMonth.getFullYear()}-${String(baseMonth.getMonth() + 1).padStart(2, "0")}`;
  const monthDisplay = `${baseMonth.getMonth() + 1}월`;

  // Filter by month first
  const monthTxs = recentTransactions.filter((tx) => tx.date.startsWith(monthStr));

  // Then apply filter
  const filtered =
    filter === "all"
      ? monthTxs
      : filter === "online"
        ? monthTxs.filter((tx) => isOnline(tx.merchant))
        : monthTxs.filter((tx) => !isOnline(tx.merchant));

  // Monthly savings
  const marchSaved = recentTransactions
    .filter((tx) => tx.date.startsWith("2026-03"))
    .reduce((sum, tx) => sum + tx.savings, 0);

  const currentMonthSaved = monthTxs.reduce((sum, tx) => sum + tx.savings, 0);

  const dateGroups = groupByDate(filtered);

  // Previous month label
  const prevMonth = new Date(2026, 2 + monthOffset - 1);
  const prevMonthLabel = `${prevMonth.getMonth() + 1}월 기록 보기`;

  return (
    <>
      <TopNav showBack />

      <div className="pb-8">
        {/* ─── Month Selector ─── */}
        <div className="flex items-center justify-center gap-4 py-3">
          <button
            onClick={() => setMonthOffset(monthOffset - 1)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            aria-label="이전 달"
          >
            <ChevronLeft size={20} style={{ color: "var(--color-text-secondary)" }} />
          </button>
          <p
            className="text-[18px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {monthDisplay}
          </p>
          <button
            onClick={() => {
              if (monthOffset < 0) setMonthOffset(monthOffset + 1);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            style={{ opacity: monthOffset >= 0 ? 0.3 : 1 }}
            aria-label="다음 달"
            disabled={monthOffset >= 0}
          >
            <ChevronRight size={20} style={{ color: "var(--color-text-secondary)" }} />
          </button>
        </div>

        {/* ─── Savings Banner (only for current month view) ─── */}
        {monthOffset === 0 && marchSaved > 0 && (
          <div className="mx-5 mb-5">
            <div
              className="overflow-hidden rounded-[20px]"
              style={{ background: "var(--color-cta)" }}
            >
              <div className="px-5 py-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-white/70" aria-hidden="true" />
                  <p className="text-[13px] font-medium text-white/70">
                    이번 달 절약한 금액
                  </p>
                </div>
                <p className="mt-1.5 text-[32px] font-bold text-white">
                  {formatKRW(marchSaved)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── Filter Chips ─── */}
        <div className="flex gap-2 px-5 pb-4">
          {(Object.keys(filterLabels) as FilterType[]).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="flex h-9 shrink-0 cursor-pointer items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-200"
              style={{
                background:
                  filter === key ? "var(--color-primary)" : "var(--color-bg-card)",
                color:
                  filter === key ? "#FFFFFF" : "var(--color-text-secondary)",
                border:
                  filter === key ? "none" : "1px solid var(--color-border)",
              }}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>

        {/* ─── Transaction List grouped by date ─── */}
        {dateGroups.length > 0 ? (
          <div className="px-5">
            {dateGroups.map((group) => (
              <div key={group.date} className="mb-6">
                {/* Date header */}
                <p
                  className="mb-3 text-[13px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {group.label}
                </p>

                {/* Transactions */}
                {group.txs.map((tx) => {
                  const badge = getMethodBadge(tx.method);
                  return (
                    <button
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="flex w-full cursor-pointer items-center gap-3.5 py-4 text-left transition-colors duration-150 active:opacity-80"
                    >
                      {/* Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full">
                        <img src={badge.logo} alt={tx.method} className="h-full w-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-[16px] font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {tx.merchant}
                        </p>
                        {tx.savings > 0 && (
                          <p
                            className="mt-0.5 text-[13px]"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            {tx.method}
                          </p>
                        )}
                      </div>

                      {/* Amount */}
                      <div className="shrink-0 text-right">
                        <p
                          className="text-[16px] font-bold"
                          style={{
                            color: tx.amount > 0 ? "var(--color-cta)" : "var(--color-primary)",
                          }}
                        >
                          {tx.amount > 0 ? "+" : ""}
                          {Math.abs(tx.amount).toLocaleString()}원
                        </p>
                        <p
                          className="mt-0.5 text-[13px]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {tx.method}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Previous month link */}
            {monthOffset === 0 && (
              <div className="flex justify-center pt-2 pb-4">
                <button
                  onClick={() => setMonthOffset(-1)}
                  className="cursor-pointer text-[14px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {prevMonthLabel}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16">
            <p
              className="text-[15px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              이 달의 내역이 없어요
            </p>
          </div>
        )}
      </div>

      {/* ─── Transaction Detail Bottom Sheet ─── */}
      {selectedTx && (
        <TransactionDetail
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </>
  );
}

function TransactionDetail({
  tx,
  onClose,
}: {
  tx: Transaction;
  onClose: () => void;
}) {
  const paidAmount = Math.abs(tx.amount);
  const originalAmount = tx.originalAmount || paidAmount + tx.savings;
  const badge = getMethodBadge(tx.method);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-6 pb-8 pt-3"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-label="결제 상세"
      >
        <div className="mb-4 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full">
              <img src={badge.logo} alt={tx.method} className="h-full w-full object-cover" />
            </div>
            <div>
              <p
                className="text-[16px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {tx.merchant}
              </p>
              <div
                className="mt-1 flex items-center gap-1.5 text-[13px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                <Calendar size={12} aria-hidden="true" />
                {tx.date}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            style={{ background: "var(--color-divider)" }}
            aria-label="닫기"
          >
            <X size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </button>
        </div>

        <div
          className="mb-5 rounded-[20px] p-5"
          style={{ background: "var(--color-divider)" }}
        >
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[13px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                결제 금액
              </p>
              <p
                className="mt-1 text-[32px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {formatKRW(paidAmount)}
              </p>
            </div>
            {tx.savings > 0 && (
              <div
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                style={{ background: "var(--color-success-bg)" }}
              >
                <TrendingDown
                  size={14}
                  style={{ color: "var(--color-success)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[16px] font-bold"
                  style={{ color: "var(--color-success)" }}
                >
                  {formatKRW(tx.savings)} 절약
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {tx.savings > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                  원래 금액
                </span>
                <span className="text-[13px] line-through" style={{ color: "var(--color-text-tertiary)" }}>
                  {formatKRW(originalAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px]" style={{ color: "var(--color-success)" }}>
                  할인 금액
                </span>
                <span className="text-[13px] font-medium" style={{ color: "var(--color-success)" }}>
                  -{formatKRW(tx.savings)}
                </span>
              </div>
            </>
          )}
          <div className="flex items-center justify-between">
            <span className="text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
              최종 결제
            </span>
            <span className="text-[16px] font-bold" style={{ color: "var(--color-primary)" }}>
              {formatKRW(paidAmount)}
            </span>
          </div>
          <div className="my-0.5" style={{ borderTop: "1px solid var(--color-divider)" }} />
          <div className="flex items-center justify-between">
            <span className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
              결제 수단
            </span>
            <span className="text-[13px]" style={{ color: "var(--color-primary)" }}>
              {tx.method}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
