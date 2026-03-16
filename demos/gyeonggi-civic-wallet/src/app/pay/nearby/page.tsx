"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ChevronRight, Locate, Search, Settings } from "lucide-react";
import { merchants, formatKRW } from "@/data/mock";

type Category = "all" | "mart" | "food" | "pharmacy" | "cafe";

const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "all", label: "전체", emoji: "" },
  { id: "mart", label: "마트", emoji: "🛒" },
  { id: "food", label: "음식점", emoji: "🍽️" },
  { id: "pharmacy", label: "약국", emoji: "💊" },
  { id: "cafe", label: "카페", emoji: "☕" },
];

const categoryMap: Record<string, Category> = {
  마트: "mart",
  음식점: "food",
  약국: "pharmacy",
  카페: "cafe",
};

// Mock map pin positions for merchants (percentage-based)
const pinPositions: Record<string, { top: string; left: string }> = {
  "suwon-green-market": { top: "32%", left: "28%" },
  "gwanggyo-pharmacy": { top: "48%", left: "62%" },
  "yongin-bukgarden": { top: "22%", left: "72%" },
  "gapyeong-forest-cafe": { top: "58%", left: "38%" },
};

const pinColors: Record<string, string> = {
  마트: "#FF6B6B",
  음식점: "#FFB84D",
  약국: "#4DABF7",
  카페: "#A78BFA",
};

export default function NearbyPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeTab, setActiveTab] = useState<"coupon" | "benefit">("benefit");

  const filtered =
    activeCategory === "all"
      ? merchants
      : merchants.filter((m) => categoryMap[m.category] === activeCategory);

  const eligibleFiltered = filtered.filter((m) => m.eligible);

  return (
    <>
      <TopNav showBack rightSlot={
        <div className="flex items-center gap-3">
          <button className="cursor-pointer p-1" aria-label="검색">
            <Search size={22} style={{ color: "var(--color-primary)" }} />
          </button>
          <button className="cursor-pointer p-1" aria-label="설정">
            <Settings size={22} style={{ color: "var(--color-primary)" }} />
          </button>
        </div>
      } />

      {/* ─── Category Chips ─── */}
      <div
        className="flex gap-2 overflow-x-auto px-5 pb-3 pt-1"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200"
            style={{
              background:
                activeCategory === cat.id ? "var(--color-cta)" : "var(--color-bg-card)",
              color:
                activeCategory === cat.id ? "#FFFFFF" : "var(--color-text-secondary)",
              border:
                activeCategory === cat.id ? "none" : "1px solid var(--color-border)",
            }}
          >
            {cat.emoji && <span className="text-[14px]">{cat.emoji}</span>}
            {cat.label}
          </button>
        ))}
      </div>

      {/* ─── Map Area ─── */}
      <div
        className="relative"
        style={{
          height: "52vh",
          background: "#F5F1EB",
        }}
      >
        {/* Mock map background - roads and blocks */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 430 500" preserveAspectRatio="xMidYMid slice">
          {/* Roads */}
          <rect x="0" y="180" width="430" height="8" fill="#E8E4DE" rx="1" />
          <rect x="0" y="320" width="430" height="6" fill="#E8E4DE" rx="1" />
          <rect x="120" y="0" width="6" height="500" fill="#E8E4DE" rx="1" />
          <rect x="280" y="0" width="8" height="500" fill="#E8E4DE" rx="1" />
          <rect x="200" y="100" width="5" height="200" fill="#E8E4DE" rx="1" />
          {/* Main road */}
          <rect x="0" y="240" width="430" height="14" fill="#DEDBD5" rx="2" />
          <rect x="180" y="0" width="12" height="500" fill="#DEDBD5" rx="2" />
          {/* Buildings */}
          <rect x="20" y="30" width="80" height="60" fill="#E6E2DC" rx="6" />
          <rect x="20" y="200" width="85" height="50" fill="#E6E2DC" rx="6" />
          <rect x="135" y="30" width="40" height="80" fill="#E6E2DC" rx="6" />
          <rect x="210" y="50" width="55" height="50" fill="#E6E2DC" rx="6" />
          <rect x="300" y="30" width="100" height="70" fill="#E6E2DC" rx="6" />
          <rect x="300" y="200" width="110" height="55" fill="#E6E2DC" rx="6" />
          <rect x="30" y="340" width="70" height="60" fill="#E6E2DC" rx="6" />
          <rect x="135" y="340" width="50" height="50" fill="#E6E2DC" rx="6" />
          <rect x="300" y="340" width="90" height="70" fill="#E6E2DC" rx="6" />
          <rect x="210" y="330" width="60" height="45" fill="#E6E2DC" rx="6" />
          {/* Green areas */}
          <rect x="135" y="130" width="40" height="35" fill="#D5E8D4" rx="8" />
          <rect x="30" y="430" width="60" height="40" fill="#D5E8D4" rx="8" />
          {/* Labels */}
          <text x="45" y="68" fontSize="9" fill="#9E9A94" fontWeight="500">주민센터</text>
          <text x="310" y="75" fontSize="9" fill="#9E9A94" fontWeight="500">영통초등학교</text>
          <text x="310" y="235" fontSize="9" fill="#9E9A94" fontWeight="500">광교호수공원</text>
          <text x="145" y="155" fontSize="8" fill="#7CAF7A" fontWeight="500">공원</text>
        </svg>

        {/* Merchant pins */}
        {filtered.map((m) => {
          const pos = pinPositions[m.id];
          if (!pos) return null;
          const color = pinColors[m.category] ?? "var(--color-cta)";
          return (
            <div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ top: pos.top, left: pos.left }}
            >
              {/* Pin */}
              <div className="flex flex-col items-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full shadow-md"
                  style={{ background: color }}
                >
                  <span className="text-[16px]">
                    {m.category === "마트" ? "🛒" : m.category === "음식점" ? "🍽️" : m.category === "약국" ? "💊" : "☕"}
                  </span>
                </div>
                <div
                  className="h-0 w-0"
                  style={{
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `8px solid ${color}`,
                  }}
                />
                {/* Name label */}
                <div
                  className="mt-0.5 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "var(--color-primary)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {m.name}
                </div>
              </div>
            </div>
          );
        })}

        {/* My location button */}
        <button
          className="absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
          aria-label="내 위치"
        >
          <Locate size={20} style={{ color: "var(--color-cta)" }} />
        </button>
      </div>

      {/* ─── Bottom Sheet (pull handle) ─── */}
      <div
        className="relative rounded-t-[20px] bg-white"
        style={{
          marginTop: -16,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* Pull handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="h-1 w-10 rounded-full" style={{ background: "var(--color-border)" }} />
        </div>

        {/* Tabs */}
        <div
          className="mx-5 flex overflow-hidden rounded-[12px]"
          style={{ background: "var(--color-divider)" }}
        >
          <button
            onClick={() => setActiveTab("coupon")}
            className="flex-1 cursor-pointer py-3 text-center text-[14px] font-semibold transition-colors duration-200"
            style={{
              background: activeTab === "coupon" ? "var(--color-bg-card)" : "transparent",
              color: activeTab === "coupon" ? "var(--color-primary)" : "var(--color-text-tertiary)",
              borderRadius: activeTab === "coupon" ? 12 : 0,
            }}
          >
            내 쿠폰함
          </button>
          <button
            onClick={() => setActiveTab("benefit")}
            className="flex-1 cursor-pointer py-3 text-center text-[14px] font-semibold transition-colors duration-200"
            style={{
              background: activeTab === "benefit" ? "var(--color-bg-card)" : "transparent",
              color: activeTab === "benefit" ? "var(--color-primary)" : "var(--color-text-tertiary)",
              borderRadius: activeTab === "benefit" ? 12 : 0,
            }}
          >
            이번 달 혜택
          </button>
        </div>

        {/* Section title */}
        <div className="px-5 pt-6 pb-2">
          <p
            className="text-[20px] font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            모든 매장
          </p>
          <p
            className="text-[20px] font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            경기페이 최대 10% 캐시백
          </p>
        </div>

        {/* Merchant list */}
        <div className="px-5 pb-8">
          {eligibleFiltered.map((m) => (
            <Link
              key={m.id}
              href={`/pay/merchant/${m.id}`}
              className="flex items-center gap-3.5 py-4 transition-opacity duration-200 active:opacity-80"
              style={{ borderBottom: "1px solid var(--color-divider)" }}
            >
              {/* Icon circle */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: pinColors[m.category] + "20" }}
              >
                <span className="text-[24px]">
                  {m.category === "마트" ? "🛒" : m.category === "음식점" ? "🍽️" : m.category === "약국" ? "💊" : "☕"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-[16px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {m.name}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {m.distance} · {m.category}
                </p>
              </div>
              <ChevronRight
                size={18}
                className="shrink-0"
                style={{ color: "var(--color-text-tertiary)" }}
              />
            </Link>
          ))}

          {/* Ineligible merchants */}
          {filtered.filter((m) => !m.eligible).map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3.5 py-4 opacity-40"
              style={{ borderBottom: "1px solid var(--color-divider)" }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: "var(--color-divider)" }}
              >
                <span className="text-[24px] grayscale">
                  {m.category === "카페" ? "☕" : "🏪"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-[16px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {m.name}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {m.distance} · {m.category}
                </p>
                <p
                  className="mt-0.5 text-[12px] font-medium"
                  style={{ color: "var(--color-error)" }}
                >
                  지역화폐 이용 불가
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
