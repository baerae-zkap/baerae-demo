"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  MapPin,
  Locate,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import {
  merchants,
  recentTransactions,
  user,
  cityBalances,
  partnerCities,
  formatKRW,
} from "@/data/mock";
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

const recentPayments = recentTransactions
  .filter((tx) => tx.amount < 0)
  .slice(0, 3);

const onlineBenefits = [
  {
    id: "swap",
    icon: "🔄",
    iconBg: "#E3F2FD",
    name: "다른 시·군 지역화폐",
    desc: "수수료 없이 전환",
    href: "/pay/swap",
  },
  {
    id: "charge",
    icon: "💳",
    iconBg: "#FFF3E0",
    name: "지역화폐 충전",
    desc: "최대 10% 인센티브",
    href: "/pay/charge",
  },
];

const pinData = [
  { top: "32%", left: "28%", color: "#FF6B6B" },
  { top: "48%", left: "62%", color: "#4DABF7" },
  { top: "22%", left: "72%", color: "#FFB84D" },
  { top: "58%", left: "38%", color: "#A78BFA" },
];

export default function WalletPage() {
  const [localPayOn, setLocalPayOn] = useState(true);
  const { selectedCity, setSelectedCity } = useCity();
  const [citySheetOpen, setCitySheetOpen] = useState(false);

  const balance = cityBalances[selectedCity] ?? 0;
  const cityName = selectedCity.replace("시", "").replace("군", "");

  const payMethods = [
    {
      id: "local",
      logo: "/gyeonggi-civic-wallet-demo/logos/gyeonggi.svg",
      name: "지역화폐 전액 사용",
      sub: formatKRW(balance),
      type: "toggle" as const,
      connected: true,
    },
    ...user.linkedServices.map((s) => ({
      id: s.id,
      logo: (s as { logo?: string }).logo ?? "",
      name: s.name,
      sub: "연결됨",
      type: "change" as const,
      connected: true,
    })),
    {
      id: "samsung-pay",
      logo: "/gyeonggi-civic-wallet-demo/logos/samsung-pay.svg",
      name: "삼성페이",
      sub: "연결 안됨",
      type: "change" as const,
      connected: false,
    },
  ];

  return (
    <>
      <TopNav title="지역화폐" largeTitle />

      <div className="px-5 pt-1 pb-8">
        {/* ─── Header Row ─── */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p
              className="text-[22px] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {cityName}페이
            </p>
            <button
              onClick={() => setCitySheetOpen(true)}
              className="flex cursor-pointer items-center gap-0.5 rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors duration-200 active:opacity-80"
              style={{ background: "var(--color-divider)", color: "var(--color-text-secondary)" }}
            >
              변경
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/pay/history"
              className="text-[15px] font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              내역
            </Link>
            <Link
              href="/my"
              className="text-[15px] font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              설정
            </Link>
          </div>
        </div>

        {/* ─── Main Payment Card ─── */}
        <div
          className="overflow-hidden rounded-[24px]"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid #F1F3F5",
          }}
        >
          {/* Balance info banner */}
          <div
            className="px-5 pt-5 pb-4"
            style={{ background: "var(--color-divider)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {selectedCity} 지역화폐
                </p>
                <p
                  className="mt-0.5 flex items-center gap-1 text-[13px]"
                  style={{ color: "var(--color-cta)" }}
                >
                  <span className="inline-block h-[14px] w-[14px] rounded-full text-center text-[10px] font-bold leading-[14px] text-white" style={{ background: "var(--color-cta)" }}>!</span>
                  잔액 {formatKRW(balance)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/pay/swap"
                  className="flex h-9 items-center rounded-[10px] px-3.5 text-[13px] font-semibold transition-opacity duration-200 active:opacity-90"
                  style={{ border: "1px solid var(--color-border)", color: "var(--color-primary)" }}
                >
                  전환
                </Link>
                <Link
                  href="/pay/charge"
                  className="flex h-9 items-center rounded-[10px] px-4 text-[13px] font-semibold text-white"
                  style={{ background: "var(--color-cta)" }}
                >
                  충전하기
                </Link>
              </div>
            </div>
          </div>

          {/* Pay methods */}
          <div className="px-5 pt-4">
            {payMethods.map((pm, i) => (
              <div
                key={pm.id}
                className="flex items-center gap-3.5 py-4"
                style={{
                  borderTop: i > 0 ? "1px solid var(--color-divider)" : "none",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={pm.logo}
                    alt={pm.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {pm.name}
                  </p>
                  <p
                    className="text-[13px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {pm.sub}
                  </p>
                </div>

                {pm.type === "toggle" ? (
                  <button
                    onClick={() => setLocalPayOn(!localPayOn)}
                    className="relative h-[30px] w-[52px] shrink-0 cursor-pointer rounded-full transition-colors duration-200"
                    style={{
                      background: localPayOn ? "var(--color-cta)" : "#D1D5DB",
                    }}
                    aria-label="지역화폐 사용 토글"
                  >
                    <div
                      className="absolute top-[3px] h-[24px] w-[24px] rounded-full bg-white shadow-sm transition-all duration-200"
                      style={{
                        left: localPayOn ? 25 : 3,
                      }}
                    />
                  </button>
                ) : (
                  <button
                    className="shrink-0 cursor-pointer rounded-[8px] px-3 py-1.5 text-[13px] font-medium"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: pm.connected ? "var(--color-text-secondary)" : "var(--color-cta)",
                    }}
                  >
                    {pm.connected ? "변경" : "연결"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── 오프라인 혜택 ─── */}
        <div className="mt-5">
          <div
            className="overflow-hidden rounded-[24px]"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid #F1F3F5",
            }}
          >
            <div className="px-5 pt-5 pb-3">
              <p
                className="text-[17px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                오프라인 혜택
              </p>
            </div>

            <Link
              href="/pay/nearby"
              className="flex items-center gap-3 px-5 py-3 transition-opacity duration-200 active:opacity-80"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: "#EBF5FF" }}
              >
                <MapPin size={18} style={{ color: "var(--color-cta)" }} />
              </div>
              <p
                className="flex-1 text-[15px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {bestRate ? `최대 ${bestRate}` : "할인"} 적립 매장 찾아보기
              </p>
            </Link>

            {/* Mini map thumbnail */}
            <div className="px-5 pb-5 pt-2">
              <Link
                href="/pay/nearby"
                className="relative block h-40 overflow-hidden rounded-[16px]"
                style={{ background: "#F5F1EB" }}
              >
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 220" preserveAspectRatio="xMidYMid slice">
                  <rect x="0" y="90" width="430" height="8" fill="#E8E4DE" rx="1" />
                  <rect x="0" y="160" width="430" height="6" fill="#E8E4DE" rx="1" />
                  <rect x="120" y="0" width="6" height="220" fill="#E8E4DE" rx="1" />
                  <rect x="280" y="0" width="8" height="220" fill="#E8E4DE" rx="1" />
                  <rect x="0" y="120" width="430" height="12" fill="#DEDBD5" rx="2" />
                  <rect x="180" y="0" width="10" height="220" fill="#DEDBD5" rx="2" />
                  <rect x="20" y="15" width="80" height="50" fill="#E6E2DC" rx="6" />
                  <rect x="210" y="25" width="55" height="45" fill="#E6E2DC" rx="6" />
                  <rect x="300" y="15" width="100" height="55" fill="#E6E2DC" rx="6" />
                  <rect x="30" y="140" width="70" height="50" fill="#E6E2DC" rx="6" />
                  <rect x="300" y="140" width="90" height="55" fill="#E6E2DC" rx="6" />
                  <rect x="135" y="55" width="40" height="30" fill="#D5E8D4" rx="8" />
                </svg>

                {pinData.map((pin, i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <div
                      className="h-6 w-6 rounded-full shadow-md"
                      style={{ background: pin.color, border: "2px solid white" }}
                    />
                  </div>
                ))}

                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: "50%", left: "50%" }}
                >
                  <div className="relative">
                    <div
                      className="h-10 w-10 animate-ping rounded-full opacity-20"
                      style={{ background: "var(--color-cta)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-4 w-4 rounded-full shadow-md"
                        style={{ background: "var(--color-cta)", border: "3px solid white" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                  <Locate size={16} style={{ color: "var(--color-cta)" }} />
                </div>

                <div className="absolute right-3 bottom-14">
                  <div
                    className="rounded-[10px] bg-white px-3.5 py-2 text-[12px] font-semibold shadow-sm"
                    style={{ color: "var(--color-primary)" }}
                  >
                    내 근처 매장 보기
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ─── 온라인 혜택 ─── */}
        <div className="mt-5">
          <div
            className="overflow-hidden rounded-[24px]"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid #F1F3F5",
            }}
          >
            <div className="px-5 pt-5 pb-2">
              <p
                className="text-[17px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                온라인 혜택
              </p>
            </div>

            {onlineBenefits.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3.5 px-5 py-4 transition-opacity duration-200 active:opacity-80"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{ background: item.iconBg }}
                >
                  <span className="text-[22px] leading-none">{item.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[13px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-[16px] font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── 최근 결제 ─── */}
        {recentPayments.length > 0 && (
          <div className="mt-5">
            <div
              className="overflow-hidden rounded-[24px]"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid #F1F3F5",
              }}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-2">
                <p
                  className="text-[17px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  최근 결제
                </p>
                <Link
                  href="/pay/history"
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  전체보기
                </Link>
              </div>

              {recentPayments.map((tx, i) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{
                    borderTop: i > 0 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p
                      className="truncate text-[15px] font-semibold"
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
                      className="text-[15px] font-semibold"
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
          </div>
        )}
      </div>

      {/* ─── City Selection Bottom Sheet ─── */}
      {citySheetOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCitySheetOpen(false)}
          />
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[20px] bg-white"
            style={{ maxHeight: "70vh" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p
                className="text-[17px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                지역 변경
              </p>
              <button
                onClick={() => setCitySheetOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
                aria-label="닫기"
              >
                <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
              </button>
            </div>

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
                        <Check size={16} style={{ color: "var(--color-cta)" }} />
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
