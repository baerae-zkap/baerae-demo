"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  ChevronRight,
  Sun,
  Home,
  Building2,
  Info,
} from "lucide-react";
import {
  investProjects,
  investPortfolio,
  formatCompactKRW,
  formatKRW,
} from "@/data/mock";

function getProjectEmoji(category: string) {
  if (category === "에너지") return "☀️";
  if (category === "주거") return "🏠";
  if (category === "공공시설") return "🏛️";
  return "📊";
}

const categories = ["전체", "에너지", "주거", "공공시설"] as const;
type Category = (typeof categories)[number];

const categoryIcons: Record<string, React.ElementType> = {
  에너지: Sun,
  주거: Home,
  공공시설: Building2,
};

const totalInvested = investPortfolio.reduce(
  (sum, item) => sum + item.participationAmount,
  0
);
const totalCurrentValue = investPortfolio.reduce(
  (sum, item) => sum + item.currentValue,
  0
);
const totalProfit = totalCurrentValue - totalInvested;

export default function InvestPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("전체");

  const openProjects = investProjects.filter(
    (p) => p.status === "open" || p.status === "nearly-funded"
  );
  const closingSoon = investProjects.filter(
    (p) => p.status === "nearly-funded"
  );
  const availableNow = investProjects.filter((p) => p.status === "open");

  const featured = closingSoon[0] ?? availableNow[0] ?? null;

  const filteredProjects =
    activeCategory === "전체"
      ? investProjects
      : investProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <TopNav title="투자" largeTitle />

      <div className="pb-8">
        {/* ─── Featured Investment ─── */}
        {featured && (() => {
          const progress = Math.round(
            (featured.currentAmount / featured.targetAmount) * 100
          );
          const isClosing = featured.status === "nearly-funded";
          return (
            <div className="px-5 pt-4 pb-2">
              <Link
                href={`/invest/project/${featured.id}`}
                className="block overflow-hidden rounded-[20px] transition-opacity duration-200 active:opacity-95"
                style={{
                  background: "linear-gradient(135deg, #1B64DA 0%, #3B82F6 100%)",
                }}
              >
                {/* Big emoji visual */}
                <div className="flex justify-center pt-8 pb-2">
                  <div
                    className="flex h-24 w-24 items-center justify-center rounded-[28px]"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <span className="text-[48px]">{getProjectEmoji(featured.category)}</span>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[12px] font-bold"
                      style={{
                        background: isClosing ? "rgba(255,180,50,0.25)" : "rgba(255,255,255,0.2)",
                        color: isClosing ? "#FFD666" : "rgba(255,255,255,0.9)",
                      }}
                    >
                      {isClosing ? "마감 임박" : "투자 가능"}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {featured.category} · {featured.region}
                    </span>
                  </div>

                  <h2 className="text-[22px] font-bold leading-tight text-white">
                    {featured.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[15px] font-semibold text-white">
                      {featured.projectedReturn}
                    </span>
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {featured.maturityPeriod} 만기
                    </span>
                  </div>

                  <div className="mt-5">
                    <div
                      className="h-2.5 overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          background: "rgba(255,255,255,0.9)",
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[14px] font-bold text-white">
                        {progress}% 달성
                      </span>
                      <span
                        className="text-[13px]"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {formatCompactKRW(featured.currentAmount)} / {formatCompactKRW(featured.targetAmount)}
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-5 flex h-[48px] items-center justify-center rounded-[14px] text-[16px] font-bold"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      color: "#1B64DA",
                    }}
                  >
                    투자하기
                  </div>
                </div>
              </Link>
            </div>
          );
        })()}

        {/* ─── My Investment Summary ─── */}
        {investPortfolio.length > 0 && (
          <div className="mt-5 px-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                내 투자
              </p>
              <Link
                href="/invest/portfolio"
                className="flex items-center gap-0.5 text-[13px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                전체보기
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Value summary */}
            <div
              className="rounded-[16px] px-5 pt-5 pb-1"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
            >
              <p
                className="text-[28px] font-bold tracking-tight"
                style={{ color: "var(--color-primary)" }}
              >
                {formatKRW(totalCurrentValue)}
              </p>
              <p
                className="mt-0.5 text-[14px] font-semibold"
                style={{ color: "var(--color-success)" }}
              >
                +{formatKRW(totalProfit)}
              </p>

              {/* Investment project rows */}
              <div className="mt-4">
                {investPortfolio.map((item, i) => {
                  const project = investProjects.find((p) => p.id === item.projectId);
                  return (
                    <Link
                      key={item.id}
                      href={`/invest/portfolio/${item.id}`}
                      className="flex items-center gap-3.5 py-4 transition-opacity duration-200 active:opacity-80"
                      style={{
                        borderTop: "1px solid var(--color-divider)",
                      }}
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                        style={{ background: "var(--color-divider)" }}
                      >
                        <span className="text-[20px]">{getProjectEmoji(item.category)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-[15px] font-medium"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {item.projectTitle}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-[13px]">
                          <span style={{ color: "var(--color-cta)", fontWeight: 600 }}>
                            {item.expectedReturn}
                          </span>
                          <span style={{ color: "var(--color-text-tertiary)" }}>
                            {project?.maturityPeriod ?? ""}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p
                          className="text-[15px] font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {formatKRW(item.currentValue)}
                        </p>
                        <p
                          className="mt-0.5 text-[12px] font-medium"
                          style={{ color: "var(--color-success)" }}
                        >
                          +{formatKRW(item.currentValue - item.participationAmount)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── Available Opportunities ─── */}
        <div className="mt-7 px-5">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            투자 기회
          </p>

          {/* Category filter */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const Icon = cat !== "전체" ? categoryIcons[cat] : null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-200"
                  style={{
                    background: isActive ? "var(--color-cta)" : "var(--color-bg-card)",
                    color: isActive ? "#FFFFFF" : "var(--color-text-secondary)",
                    border: isActive ? "1px solid var(--color-cta)" : "1px solid var(--color-border)",
                  }}
                >
                  {Icon && <Icon size={13} style={{ opacity: isActive ? 1 : 0.6 }} />}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Project list */}
          {filteredProjects.length === 0 ? (
            <div
              className="flex flex-col items-center rounded-[16px] px-6 py-10"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
            >
              <p className="text-[15px]" style={{ color: "var(--color-text-secondary)" }}>
                이 분야의 프로젝트는 아직 준비 중이에요
              </p>
              <button
                onClick={() => setActiveCategory("전체")}
                className="mt-4 cursor-pointer rounded-[12px] px-5 py-2.5 text-[14px] font-medium text-white"
                style={{ background: "var(--color-cta)" }}
              >
                전체 보기
              </button>
            </div>
          ) : (
            <div
              className="rounded-[16px]"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
            >
              {filteredProjects.map((project, i) => {
                const progress = Math.round(
                  (project.currentAmount / project.targetAmount) * 100
                );
                const isClosed = project.status === "closed";
                const isClosing = project.status === "nearly-funded";
                return (
                  <Link
                    key={project.id}
                    href={`/invest/project/${project.id}`}
                    className="flex items-center gap-3.5 px-4 py-4 transition-opacity duration-200 active:opacity-80"
                    style={{
                      borderBottom: i < filteredProjects.length - 1 ? "1px solid var(--color-divider)" : "none",
                      opacity: isClosed ? 0.55 : 1,
                    }}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                      style={{ background: "var(--color-divider)" }}
                    >
                      <span className="text-[20px]">{getProjectEmoji(project.category)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[15px] font-medium"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {project.title}
                      </p>
                      <div className="mt-1">
                        <div
                          className="h-1.5 overflow-hidden rounded-full"
                          style={{ background: "var(--color-divider)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${progress}%`,
                              background: isClosed
                                ? "var(--color-text-tertiary)"
                                : "var(--color-cta)",
                            }}
                          />
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[13px]">
                          <span
                            style={{
                              color: isClosed ? "var(--color-text-tertiary)" : "var(--color-cta)",
                              fontWeight: 600,
                            }}
                          >
                            {project.projectedReturn}
                          </span>
                          <span style={{ color: "var(--color-text-tertiary)" }}>
                            {progress}% · {formatCompactKRW(project.currentAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isClosed ? (
                      <span
                        className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold"
                        style={{ background: "var(--color-divider)", color: "var(--color-text-tertiary)" }}
                      >
                        마감
                      </span>
                    ) : isClosing ? (
                      <span
                        className="shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold"
                        style={{ background: "var(--color-warning-bg)", color: "var(--color-warning)" }}
                      >
                        마감 임박
                      </span>
                    ) : (
                      <ChevronRight size={16} className="shrink-0" style={{ color: "var(--color-text-tertiary)" }} />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Disclaimer ─── */}
        <div className="mt-6 px-5">
          <div
            className="flex items-start gap-2 rounded-[14px] px-4 py-3"
            style={{ background: "var(--color-divider)" }}
          >
            <Info
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              컨셉 데모로, 실제 금융 상품이 아닙니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
