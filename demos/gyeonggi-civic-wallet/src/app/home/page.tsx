"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Menu,
  X,
  Check,
} from "lucide-react";
import {
  user,
  merchants,
  benefits,
  recentTransactions,
  lifeEventTriggers,
  resumeTasks,
  partnerCities,
  cityBalances,
  formatKRW,
  type LifeEventUrgency,
} from "@/data/mock";
import BenefitIcon from "@/components/BenefitIcon";
import { useCity } from "@/context/CityContext";

// Best savings merchant
const bestMerchant = merchants
  .filter((m) => m.eligible && m.benefits.some((b) => b.recommended))
  .sort((a, b) => {
    const rateA = parseFloat(
      a.benefits.find((x) => x.recommended)?.benefitRate ?? "0"
    );
    const rateB = parseFloat(
      b.benefits.find((x) => x.recommended)?.benefitRate ?? "0"
    );
    return rateB - rateA;
  })[0];

const bestRate = bestMerchant?.benefits.find((b) => b.recommended)?.benefitRate;

// March savings
const marchSaved = recentTransactions
  .filter((tx) => tx.date.startsWith("2026-03"))
  .reduce((sum, tx) => sum + tx.savings, 0);

// Top 2 benefits — map life events to amounts + icons
const urgencyOrder: Record<LifeEventUrgency, number> = {
  urgent: 0,
  upcoming: 1,
  info: 2,
};

const eventEmoji: Record<string, string> = {
  "school-entry": "🎒",
  vaccination: "💉",
  "new-program": "🎉",
  childcare: "📚",
  housing: "🏠",
  culture: "🎨",
};

const topBenefits = [...lifeEventTriggers]
  .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
  .slice(0, 3)
  .map((trigger) => {
    const benefit = benefits.find((b) => b.id === trigger.linkedBenefitId);
    return {
      ...trigger,
      amount: benefit?.amount ?? null,
      emoji: eventEmoji[trigger.eventType] ?? "📋",
    };
  });

// Resume task — enrich with benefit amount
const _resumeTask = resumeTasks.find((t) => t.status === "active");
const resumeTask = _resumeTask
  ? {
      ..._resumeTask,
      amount: benefits.find((b) => _resumeTask.href.includes(b.id))?.amount ?? null,
    }
  : null;

// Recent activity — last 3 spending
const recentActivity = recentTransactions
  .filter((tx) => tx.amount < 0)
  .slice(0, 3);

// Flat card style — no shadow, subtle border
const card = {
  background: "var(--color-bg-card)",
  border: "1px solid #F1F3F5",
} as const;

export default function HomePage() {
  const [citySheetOpen, setCitySheetOpen] = useState(false);
  const { selectedCity, setSelectedCity } = useCity();

  return (
    <>
      <TopNav
        showNotification
        notificationCount={user.notificationsCount}
        leftSlot={
          <img
            src="/gyeonggi-civic-wallet-demo/logos/gyeonggi-local-currency.png"
            alt="경기지역화폐"
            className="h-[38px]"
          />
        }
        rightSlot={
          <Link
            href="/my"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            aria-label="더보기"
          >
            <Menu size={22} style={{ color: "var(--color-primary)" }} />
          </Link>
        }
      />

      <div className="px-6 pt-2 pb-8">
        {/* 1. Balance */}
        <section className="mb-8" aria-label="잔액">
          <button
            onClick={() => setCitySheetOpen(true)}
            className="mb-2 flex cursor-pointer items-center gap-1 py-1 text-[13px] font-medium transition-colors duration-200 hover:opacity-70"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {selectedCity} 지역화폐
            <ChevronDown size={13} aria-hidden="true" />
          </button>

          <div className="flex items-center justify-between">
            <p
              className="text-[34px] font-bold leading-tight tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {formatKRW(cityBalances[selectedCity] ?? 0)}
            </p>
            <Link
              href="/pay/charge"
              className="flex h-8 items-center rounded-lg px-3 text-[13px] font-medium transition-colors duration-200 active:opacity-90"
              style={{
                background: "var(--color-divider)",
                color: "var(--color-text-secondary)",
              }}
            >
              충전
            </Link>
          </div>
          {marchSaved > 0 && (
            <p
              className="mt-1 text-[13px] font-medium"
              style={{ color: "var(--color-success)" }}
            >
              이번 달 {formatKRW(marchSaved)} 절약
            </p>
          )}

          <div className="mt-5 flex gap-2.5">
            <Link
              href="/pay"
              className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] text-[15px] font-semibold text-white transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-cta)" }}
            >
              결제하기
            </Link>
            <Link
              href="/pay/swap"
              className="flex h-[48px] items-center justify-center gap-1.5 rounded-[14px] px-5 text-[15px] font-semibold transition-opacity duration-200 active:opacity-90"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-primary)" }}
            >
              🔄 전환
            </Link>
          </div>
        </section>

        {/* 2. Resume banner */}
        {resumeTask && (
          <Link
            href={resumeTask.href}
            className="mb-8 block overflow-hidden rounded-[20px] transition-opacity duration-200 active:opacity-95"
            style={{
              background: "var(--color-badge-recommend-bg)",
            }}
          >
            <div className="flex items-center">
              {/* Text side */}
              <div className="flex-1 px-6 py-6">
                {resumeTask.amount && (
                  <p
                    className="text-[22px] font-bold leading-tight"
                    style={{ color: "var(--color-cta)" }}
                  >
                    {resumeTask.amount}
                  </p>
                )}
                <p
                  className="mt-1 text-[16px] font-semibold leading-snug"
                  style={{ color: "var(--color-primary)" }}
                >
                  {resumeTask.title}
                </p>
                <p
                  className="mt-1.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {resumeTask.description}
                </p>
                <div
                  className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-[13px] font-bold text-white"
                  style={{ background: "var(--color-cta)" }}
                >
                  이어서 신청하기
                </div>
              </div>
              {/* Emoji visual */}
              <div className="flex shrink-0 items-center justify-center pr-5">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-[22px]"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                  }}
                >
                  <span className="text-[44px]">🎒</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 3. 받을 수 있는 혜택 */}
        {topBenefits.length > 0 && (
          <section className="mb-8" aria-label="받을 수 있는 혜택">
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                받을 수 있는 혜택
              </h2>
              {lifeEventTriggers.length > 2 && (
                <Link
                  href="/benefits"
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  전체 보기
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {topBenefits.map((trigger) => (
                <Link
                  key={trigger.id}
                  href={trigger.ctaHref}
                  className="flex items-center gap-4 rounded-[20px] px-5 py-5 transition-colors duration-200 active:opacity-95"
                  style={card}
                >
                  <BenefitIcon
                    id={trigger.linkedBenefitId ?? ""}
                    type={trigger.eventType}
                    size={48}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[15px] font-semibold leading-snug"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {trigger.title}
                    </p>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {trigger.reason}
                    </p>
                    {trigger.amount && (
                      <p
                        className="mt-1.5 text-[18px] font-bold"
                        style={{ color: "var(--color-cta)" }}
                      >
                        {trigger.amount}
                      </p>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0"
                    style={{ color: "var(--color-text-tertiary)" }}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 4. 오늘 더 아낄 수 있는 곳 */}
        {bestMerchant && bestRate && (
          <section className="mb-8" aria-label="절약">
            <h2
              className="mb-4 text-[13px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              오늘 더 아낄 수 있는 곳
            </h2>
            <Link
              href={`/pay/merchant/${bestMerchant.id}`}
              className="block overflow-hidden rounded-[20px] transition-colors duration-200 active:opacity-95"
              style={card}
            >
              {/* Place thumbnail */}
              <div
                className="relative h-36 w-full overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop"
                  alt={bestMerchant.name}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute top-3 left-3 flex items-center gap-1 rounded-lg px-2.5 py-1"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <MapPin size={12} className="text-white" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-white">
                    {bestMerchant.distance}
                  </span>
                </div>
                <div
                  className="absolute top-3 right-3 rounded-lg px-2.5 py-1 text-[13px] font-bold"
                  style={{
                    background: "var(--color-success)",
                    color: "#FFFFFF",
                  }}
                >
                  최대 {bestRate} 할인
                </div>
              </div>
              {/* Info */}
              <div className="px-5 py-4">
                <p
                  className="text-[16px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {bestMerchant.name}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {bestMerchant.category} · {bestMerchant.location}
                </p>
              </div>
            </Link>

            <Link
              href="/pay/swap"
              className="mt-2 flex items-center justify-between px-6 py-3 transition-colors duration-200 active:opacity-80"
            >
              <p
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                자주 가던 용인시에서도 사용할 수 있어요
              </p>
              <ChevronRight
                size={14}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
            </Link>
          </section>
        )}

        {/* 5. 최근 활동 */}
        {recentActivity.length > 0 && (
          <section aria-label="최근 활동">
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                최근 활동
              </h2>
              <Link
                href="/pay/history"
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                전체 보기
              </Link>
            </div>
            <div
              className="overflow-hidden rounded-[20px]"
              style={card}
            >
              {recentActivity.map((tx, i) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-6 py-4"
                  style={{
                    borderBottom:
                      i < recentActivity.length - 1
                        ? "1px solid #F1F3F5"
                        : "none",
                  }}
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <p
                      className="truncate text-[16px] font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {tx.merchant}
                    </p>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {tx.method} · {tx.date.slice(5).replace("-", "/")}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className="text-[16px] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {formatKRW(tx.amount)}
                    </p>
                    {tx.savings > 0 && (
                      <p
                        className="mt-0.5 text-[13px] font-medium"
                        style={{ color: "var(--color-success)" }}
                      >
                        {formatKRW(tx.savings)} 절약
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─── City Selection Bottom Sheet ─── */}
      {citySheetOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCitySheetOpen(false)}
          />
          {/* Sheet */}
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[20px] bg-white"
            style={{ maxHeight: "70vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p
                className="text-[17px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                시·군 변경
              </p>
              <button
                onClick={() => setCitySheetOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
                aria-label="닫기"
              >
                <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
              </button>
            </div>

            {/* City list */}
            <div className="overflow-y-auto px-3 pb-8" style={{ maxHeight: "calc(70vh - 60px)" }}>
              {partnerCities.map((city) => {
                const cityLabel = city.name + city.suffix;
                const isSelected = selectedCity === cityLabel;
                const bal = cityBalances[cityLabel] ?? 0;
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(cityLabel);
                      setCitySheetOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3.5 rounded-[14px] px-4 py-3.5 text-left transition-colors duration-200 hover:bg-black/[0.02]"
                    style={{
                      background: isSelected ? "var(--color-badge-recommend-bg)" : "transparent",
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isSelected ? "var(--color-cta)" : "var(--color-divider)",
                      }}
                    >
                      <MapPin
                        size={14}
                        style={{ color: isSelected ? "#fff" : "var(--color-text-tertiary)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[15px] font-semibold"
                        style={{
                          color: isSelected ? "var(--color-cta)" : "var(--color-primary)",
                        }}
                      >
                        {cityLabel}
                      </p>
                      <p
                        className="mt-0.5 text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        가맹점 {city.merchantCount.toLocaleString()}개
                        {city.status === "coming" && " · 준비 중"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {bal > 0 && (
                        <span
                          className="text-[14px] font-medium"
                          style={{ color: "var(--color-cta)" }}
                        >
                          {formatKRW(bal)}
                        </span>
                      )}
                      {isSelected && (
                        <Check size={18} style={{ color: "var(--color-cta)" }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
