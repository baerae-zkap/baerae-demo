"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  Users,
  Leaf,
  ChevronRight,
  ShieldAlert,
  FileText,
  TrendingUp,
  Calculator,
} from "lucide-react";
import {
  investProjectDetails,
  formatCompactKRW,
  formatKRW,
} from "@/data/mock";

function getProjectEmoji(category: string) {
  if (category === "에너지") return "☀️";
  if (category === "주거") return "🏠";
  if (category === "공공시설") return "🏛️";
  return "📊";
}

function parseReturnRate(str: string): number {
  const match = str.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export default function InvestProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="프로젝트" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24">
          <AlertTriangle size={28} style={{ color: "var(--color-text-tertiary)" }} />
          <p
            className="mt-4 text-[16px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            프로젝트를 찾을 수 없어요
          </p>
          <Link
            href="/invest"
            className="mt-6 rounded-[14px] px-6 py-2.5 text-[14px] font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            투자 목록으로
          </Link>
        </div>
      </>
    );
  }

  const progress = Math.round(
    (project.currentAmount / project.targetAmount) * 100
  );
  const isClosed = project.status === "closed";
  const isClosing = project.status === "nearly-funded";

  // Simulation: 100만원 투자 시
  const simAmount = 1000000;
  const returnRate = parseReturnRate(project.projectedReturn);
  const maturityMonths = parseInt(project.maturityPeriod) || 24;
  const simReturn = Math.round(simAmount * (returnRate / 100) * (maturityMonths / 12));
  const simTotal = simAmount + simReturn;

  return (
    <>
      <TopNav showBack />

      <div className="pb-36">
        {/* ─── Hero ─── */}
        <div
          className="px-6 pt-6 pb-8"
          style={{
            background: "linear-gradient(180deg, #F0F4FF 0%, var(--color-bg) 100%)",
          }}
        >
          <div className="flex justify-center pb-5">
            <div
              className="flex h-28 w-28 items-center justify-center rounded-[32px]"
              style={{
                background: "white",
                boxShadow: "0 8px 32px rgba(27,100,218,0.1)",
              }}
            >
              <span className="text-[56px]">{getProjectEmoji(project.category)}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-3">
            {isClosing && (
              <span
                className="rounded-full px-3 py-1 text-[12px] font-bold"
                style={{ background: "var(--color-warning-bg)", color: "var(--color-warning)" }}
              >
                마감 임박
              </span>
            )}
            <span
              className="rounded-full px-3 py-1 text-[12px] font-medium"
              style={{ background: "var(--color-divider)", color: "var(--color-text-secondary)" }}
            >
              {project.category} · {project.region}
            </span>
          </div>

          <h1
            className="text-center text-[24px] font-bold leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {project.title}
          </h1>

          <p
            className="mt-3 text-center text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {project.summary}
          </p>
        </div>

        {/* ─── Investment Summary Card ─── */}
        <div className="px-5 -mt-2">
          <div
            className="rounded-[20px] px-5 py-6"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {/* Primary metrics — big numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p
                  className="text-[28px] font-bold tracking-tight"
                  style={{ color: "var(--color-cta)" }}
                >
                  {project.projectedReturn}
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
                  className="text-[28px] font-bold tracking-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {project.maturityPeriod}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  투자 기간
                </p>
              </div>
            </div>

            <div
              className="my-5 h-px"
              style={{ background: "var(--color-divider)" }}
            />

            {/* Secondary metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p
                  className="text-[18px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(project.minInvestment)}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  최소 투자금
                </p>
              </div>
              <div className="text-center">
                <p
                  className="text-[18px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {project.maturityDate}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  만기일
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Funding Progress ─── */}
        <div className="mt-6 px-5">
          <div
            className="rounded-[16px] px-5 py-5"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <div className="flex items-end justify-between mb-3">
              <div>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  모집 현황
                </p>
                <p
                  className="mt-0.5 text-[24px] font-bold"
                  style={{ color: isClosed ? "var(--color-text-tertiary)" : "var(--color-cta)" }}
                >
                  {progress}%
                </p>
              </div>
              <p
                className="text-[14px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {formatCompactKRW(project.currentAmount)} / {formatCompactKRW(project.targetAmount)}
              </p>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full"
              style={{ background: "var(--color-divider)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: isClosed ? "var(--color-text-tertiary)" : "var(--color-cta)",
                }}
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Users size={14} style={{ color: "var(--color-text-tertiary)" }} />
              <span
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.participantCount.toLocaleString()}명 참여 중
              </span>
            </div>
          </div>
        </div>

        {/* ─── Investment Simulation ─── */}
        <div className="mt-6 px-5">
          <div
            className="rounded-[16px] px-5 py-5"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calculator size={16} style={{ color: "var(--color-cta)" }} />
              <p
                className="text-[14px] font-semibold"
                style={{ color: "var(--color-cta)" }}
              >
                투자 시뮬레이션
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {formatKRW(simAmount)} 투자 시
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-[22px] font-bold"
                  style={{ color: "var(--color-cta)" }}
                >
                  {formatKRW(simTotal)}
                </p>
                <p
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  +{formatKRW(simReturn)} 예상 수익
                </p>
              </div>
            </div>
            <p
              className="mt-3 text-[12px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              * {project.maturityPeriod} 만기 기준, 실제 수익은 달라질 수 있어요
            </p>
          </div>
        </div>

        {/* ─── Project Story ─── */}
        <div className="mt-6 px-5">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            왜 이 프로젝트인가요?
          </p>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {project.whyThisProject}
          </p>
        </div>

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
                {project.socialImpact}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Risk & Documents ─── */}
        <div className="mt-6 px-5">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            투자 전 알아둘 점
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {project.risks.map((risk, i) => (
              <div
                key={i}
                className="px-5 py-3.5"
                style={{ borderBottom: "1px solid var(--color-divider)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShieldAlert size={14} style={{ color: "var(--color-warning)" }} />
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {risk.title}
                  </p>
                </div>
                <p
                  className="pl-[22px] text-[13px] leading-relaxed"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {risk.description}
                </p>
              </div>
            ))}

            <div className="px-5 py-3.5" style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} style={{ color: "var(--color-cta)" }} />
                <p
                  className="text-[14px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  세제 혜택
                </p>
              </div>
              <p
                className="pl-[22px] text-[13px] leading-relaxed"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {project.taxBenefit}
              </p>
            </div>

            <Link
              href={`/invest/project/${id}/what-to-know`}
              className="flex items-center justify-between px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
            >
              <div className="flex items-center gap-2">
                <FileText size={14} style={{ color: "var(--color-text-tertiary)" }} />
                <p
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  투자 설명서 및 유의사항
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Fixed Bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-8"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 50%, transparent)",
        }}
      >
        {isClosed ? (
          <div
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-text-tertiary)",
            }}
          >
            모집이 완료됐어요
          </div>
        ) : (
          <Link
            href={`/invest/project/${id}/review`}
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            투자하기
          </Link>
        )}
      </div>
    </>
  );
}
