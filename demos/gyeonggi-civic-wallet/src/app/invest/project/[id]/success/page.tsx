"use client";

import { use } from "react";
import Link from "next/link";
import {
  CircleCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
  Leaf,
  CircleDollarSign,
  Bell,
  BarChart3,
} from "lucide-react";
import { investProjectDetails, formatKRW } from "@/data/mock";
import EventInterstitial from "@/components/EventInterstitial";

export default function InvestSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5">
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "var(--color-warning-bg)" }}
        >
          <AlertTriangle
            size={28}
            style={{ color: "var(--color-warning)" }}
          />
        </div>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          프로젝트를 찾을 수 없어요
        </p>
        <Link
          href="/invest"
          className="mt-6 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white"
          style={{ background: "var(--color-cta)" }}
        >
          프로젝트 목록으로
        </Link>
      </div>
    );
  }

  // Parse rate for expected return calculation
  const rateMatch = project.projectedReturn.match(/([\d.]+)/);
  const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
  const estimatedReturn = Math.round(project.minInvestment * rate);

  return (
    <div className="flex min-h-[100dvh] flex-col px-5 pt-16 pb-8">
      {/* Success hero — centered, calm */}
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
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
          참여가 완료됐어요
        </h1>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.title}
        </p>
      </div>

      {/* Summary card */}
      <section
        className="mt-8 rounded-2xl px-5 py-5"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
        aria-label="참여 요약"
      >
        <div className="flex flex-col gap-3">
          {/* Participation amount */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDollarSign
                size={15}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                참여 금액
              </span>
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {formatKRW(project.minInvestment)}
            </span>
          </div>

          <div style={{ borderBottom: "1px solid var(--color-divider)" }} />

          {/* Expected return */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={15}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                연간 예상 수익
              </span>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              약 {formatKRW(estimatedReturn)}{" "}
              <span
                className="text-xs font-normal"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                ({project.projectedReturn})
              </span>
            </span>
          </div>

          <div style={{ borderBottom: "1px solid var(--color-divider)" }} />

          {/* Maturity period */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock
                size={15}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                만기
              </span>
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {project.maturityPeriod}
            </span>
          </div>

          <div style={{ borderBottom: "1px solid var(--color-divider)" }} />

          {/* Social impact */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <Leaf
                size={15}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                내 참여가 만드는 변화
              </span>
            </div>
            <span
              className="text-right text-sm font-medium"
              style={{ color: "var(--color-success)" }}
            >
              {project.socialImpact}
            </span>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section
        className="mt-4 rounded-2xl px-5 py-5"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3
          className="mb-4 text-sm font-semibold"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          다음 단계
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <BarChart3
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-cta)" }}
              aria-hidden="true"
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              포트폴리오에서 진행 상황을 확인할 수 있어요
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Bell
              size={16}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-cta)" }}
              aria-hidden="true"
            />
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              프로젝트 소식은 알림으로 안내해드릴게요
            </p>
          </div>
        </div>
      </section>

      {/* CTAs pushed to bottom */}
      <div className="mt-auto flex flex-col gap-3 pt-8">
        <Link
          href="/invest/portfolio"
          className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
          style={{ background: "var(--color-cta)" }}
        >
          포트폴리오 보기
        </Link>
        <Link
          href="/invest"
          className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold transition-colors duration-200"
          style={{
            background: "var(--color-bg-card)",
            color: "var(--color-cta)",
            border: "1px solid var(--color-border)",
          }}
        >
          다른 프로젝트 보기
        </Link>
      </div>
      <EventInterstitial eventType="first-investment" />
    </div>
  );
}
