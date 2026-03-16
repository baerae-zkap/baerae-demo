"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  Inbox,
  ChevronRight,
  Leaf,
  CalendarDays,
  Layers,
} from "lucide-react";
import {
  investPortfolio,
  formatKRW,
  type InvestPortfolioItem,
} from "@/data/mock";

const statusConfig: Record<
  InvestPortfolioItem["status"],
  { label: string; color: string; bg: string }
> = {
  active: {
    label: "운영 중",
    color: "var(--color-success)",
    bg: "var(--color-success-bg)",
  },
  matured: {
    label: "만기 완료",
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
  },
  redeemed: {
    label: "상환 완료",
    color: "var(--color-text-tertiary)",
    bg: "var(--color-divider)",
  },
};

export default function PortfolioPage() {
  // Empty state
  if (investPortfolio.length === 0) {
    return (
      <>
        <TopNav title="나의 참여" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-divider)" }}
          >
            <Inbox
              size={28}
              style={{ color: "var(--color-text-tertiary)" }}
              aria-hidden="true"
            />
          </div>
          <p
            className="mt-4 text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            참여 중인 프로젝트가 없어요
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            지역 프로젝트에 참여하면 여기서 확인할 수 있어요
          </p>
          <Link
            href="/invest"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-white transition-colors duration-200"
            style={{ background: "var(--color-cta)" }}
          >
            프로젝트 둘러보기
          </Link>
        </div>
      </>
    );
  }

  const totalParticipated = investPortfolio.reduce(
    (sum, item) => sum + item.participationAmount,
    0
  );
  const activeCount = investPortfolio.filter(
    (item) => item.status === "active"
  ).length;

  // Nearest maturity date among active items
  const nearestMaturity = investPortfolio
    .filter((item) => item.status === "active")
    .map((item) => item.maturityDate)
    .sort()[0];

  return (
    <>
      <TopNav title="나의 참여" showBack />

      <div className="px-5 pt-2 pb-10">

        {/* Summary Card — calm, informational */}
        <section
          className="mb-6 rounded-2xl px-5 py-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-md)",
          }}
          aria-label="참여 요약"
        >
          <p
            className="mb-1 text-xs font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            총 참여 금액
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(totalParticipated)}
          </p>

          <div
            className="my-4 h-px"
            style={{ background: "var(--color-divider)" }}
          />

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Layers
                size={14}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  운영 중
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {activeCount}개 프로젝트
                </p>
              </div>
            </div>
            {nearestMaturity && (
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={14}
                  style={{ color: "var(--color-text-tertiary)" }}
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    가장 빠른 만기
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {nearestMaturity}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Portfolio Item Cards */}
        <section className="flex flex-col gap-4" aria-label="참여 프로젝트 목록">
          {investPortfolio.map((item) => {
            const status = statusConfig[item.status];
            // Most recent update
            const latestUpdate =
              item.updates.length > 0
                ? [...item.updates].sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )[0]
                : null;

            return (
              <Link
                key={item.id}
                href={`/invest/portfolio/${item.id}`}
                className="block rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                style={{
                  background: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Status + Arrow */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-semibold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{ color: "var(--color-text-tertiary)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Title + Category */}
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.projectTitle}
                </h3>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {item.category} · {item.participationDate} 참여
                </p>

                {/* Info rows */}
                <div
                  className="mt-3 rounded-xl px-3.5 py-3 flex flex-col gap-2"
                  style={{ background: "var(--color-bg)" }}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "var(--color-text-tertiary)" }}>
                      참여 금액
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {formatKRW(item.participationAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "var(--color-text-tertiary)" }}>
                      예상 수익
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--color-success)" }}
                    >
                      {item.expectedReturn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "var(--color-text-tertiary)" }}>
                      만기일
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.maturityDate}
                    </span>
                  </div>
                </div>

                {/* Social Impact */}
                <div className="mt-3">
                  <span
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs"
                    style={{
                      background: "var(--color-success-bg)",
                      color: "var(--color-success)",
                    }}
                  >
                    <Leaf size={11} aria-hidden="true" />
                    {item.socialImpact}
                  </span>
                </div>

                {/* Latest Update */}
                {latestUpdate && (
                  <div
                    className="mt-3 border-t pt-3"
                    style={{ borderColor: "var(--color-divider)" }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      최근 소식 · {latestUpdate.date}
                    </p>
                    <p
                      className="mt-0.5 text-xs font-medium"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {latestUpdate.title}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
}
