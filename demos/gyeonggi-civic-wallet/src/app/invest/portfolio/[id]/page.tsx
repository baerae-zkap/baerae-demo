"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  Leaf,
  ChevronRight,
  Users,
} from "lucide-react";
import {
  investPortfolio,
  investProjects,
  formatKRW,
  formatCompactKRW,
  type InvestPortfolioItem,
} from "@/data/mock";

function getProjectEmoji(category: string) {
  if (category === "에너지") return "☀️";
  if (category === "주거") return "🏠";
  if (category === "공공시설") return "🏛️";
  return "📊";
}

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

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = investPortfolio.find((p) => p.id === id);

  if (!item) {
    return (
      <>
        <TopNav title="투자 상세" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
          <AlertTriangle size={28} style={{ color: "var(--color-text-tertiary)" }} />
          <p
            className="mt-4 text-[16px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            투자 정보를 찾을 수 없어요
          </p>
          <Link
            href="/invest/portfolio"
            className="mt-6 rounded-[14px] px-6 py-2.5 text-[14px] font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            투자 목록으로
          </Link>
        </div>
      </>
    );
  }

  const project = investProjects.find((p) => p.id === item.projectId);
  const status = statusConfig[item.status];
  const profit = item.currentValue - item.participationAmount;
  const profitRate = ((profit / item.participationAmount) * 100).toFixed(1);

  const sortedUpdates = [...item.updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const projectProgress = project
    ? Math.round((project.currentAmount / project.targetAmount) * 100)
    : 0;

  return (
    <>
      <TopNav showBack />

      <div className="pb-10">
        {/* ─── My Investment Hero ─── */}
        <div
          className="px-6 pt-6 pb-8"
          style={{
            background: "linear-gradient(180deg, #F0F4FF 0%, var(--color-bg) 100%)",
          }}
        >
          {/* Emoji + status */}
          <div className="flex items-center justify-between mb-5">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-[18px]"
              style={{
                background: "white",
                boxShadow: "0 4px 16px rgba(27,100,218,0.08)",
              }}
            >
              <span className="text-[28px]">{getProjectEmoji(item.category)}</span>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[12px] font-bold"
              style={{ background: status.bg, color: status.color }}
            >
              {status.label}
            </span>
          </div>

          {/* Project name */}
          <p
            className="text-[15px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {item.projectTitle}
          </p>

          {/* Big investment value */}
          <p
            className="mt-2 text-[32px] font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(item.currentValue)}
          </p>

          {/* Profit */}
          <div className="mt-1 flex items-center gap-2">
            <span
              className="text-[16px] font-semibold"
              style={{ color: profit >= 0 ? "var(--color-success)" : "var(--color-error)" }}
            >
              {profit >= 0 ? "+" : ""}{formatKRW(profit)}
            </span>
            <span
              className="text-[14px]"
              style={{ color: profit >= 0 ? "var(--color-success)" : "var(--color-error)" }}
            >
              ({profit >= 0 ? "+" : ""}{profitRate}%)
            </span>
          </div>
        </div>

        {/* ─── Investment Details Card ─── */}
        <div className="px-5 -mt-2">
          <div
            className="rounded-[20px] px-5 py-5"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p
                  className="text-[22px] font-bold"
                  style={{ color: "var(--color-cta)" }}
                >
                  {item.expectedReturn}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  예상 수익률
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-[22px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(item.participationAmount)}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  투자 원금
                </p>
              </div>
            </div>

            <div
              className="my-4 h-px"
              style={{ background: "var(--color-divider)" }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p
                  className="text-[16px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.maturityDate}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  만기일
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-[16px] font-bold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.participationDate}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  투자일
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Project Progress ─── */}
        {project && (
          <div className="mt-6 px-5">
            <div
              className="rounded-[16px] px-5 py-4"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
            >
              <div className="flex items-end justify-between mb-2">
                <p
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  프로젝트 진행률
                </p>
                <p
                  className="text-[14px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {formatCompactKRW(project.currentAmount)} / {formatCompactKRW(project.targetAmount)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="h-2.5 flex-1 overflow-hidden rounded-full"
                  style={{ background: "var(--color-divider)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${projectProgress}%`,
                      background: "var(--color-cta)",
                    }}
                  />
                </div>
                <span
                  className="text-[15px] font-bold"
                  style={{ color: "var(--color-cta)" }}
                >
                  {projectProgress}%
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <Users size={13} style={{ color: "var(--color-text-tertiary)" }} />
                <span
                  className="text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {project.participantCount.toLocaleString()}명 참여 중
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── Updates Timeline ─── */}
        {sortedUpdates.length > 0 && (
          <div className="mt-6 px-5">
            <p
              className="mb-4 px-1 text-[13px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              프로젝트 소식
            </p>

            <div className="relative pl-6">
              {sortedUpdates.length > 1 && (
                <div
                  className="absolute left-[7px] top-3 w-px"
                  style={{
                    background: "var(--color-divider)",
                    height: "calc(100% - 1.75rem)",
                  }}
                />
              )}

              <div className="flex flex-col gap-6">
                {sortedUpdates.map((update, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className="absolute -left-6 top-0.5 h-3.5 w-3.5 rounded-full border-2"
                      style={{
                        background: idx === 0 ? "var(--color-cta)" : "var(--color-bg-card)",
                        borderColor: idx === 0 ? "var(--color-cta)" : "var(--color-border)",
                      }}
                    />
                    <p
                      className="text-[12px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {update.date}
                    </p>
                    <p
                      className="mt-0.5 text-[15px] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {update.title}
                    </p>
                    <p
                      className="mt-0.5 text-[14px] leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {update.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Social Impact ─── */}
        <div className="mt-6 px-5">
          <div
            className="flex items-center gap-3.5 rounded-[16px] px-5 py-4"
            style={{ background: "var(--color-success-bg)" }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
              style={{ background: "white" }}
            >
              <Leaf size={20} style={{ color: "var(--color-success)" }} />
            </div>
            <div>
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--color-success)" }}
              >
                사회적 가치
              </p>
              <p
                className="mt-0.5 text-[16px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {item.socialImpact}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Project link ─── */}
        <div className="mt-6 px-5">
          <Link
            href={`/invest/project/${item.projectId}`}
            className="flex items-center justify-between rounded-[14px] px-5 py-4 transition-opacity duration-200 active:opacity-80"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <p
              className="text-[15px] font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              프로젝트 상세 보기
            </p>
            <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </Link>
        </div>
      </div>
    </>
  );
}
