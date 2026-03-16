"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  TrendingUp,
  CalendarClock,
  Receipt,
  Heart,
  Info,
} from "lucide-react";
import { investProjectDetails, formatKRW } from "@/data/mock";

export default function WhatIGetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="내가 받는 것" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertTriangle size={28} style={{ color: "var(--color-error)" }} />
          </div>
          <p
            className="mt-4 text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            프로젝트를 찾을 수 없어요
          </p>
          <p
            className="mt-2 text-sm text-center leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            링크가 올바른지 확인하거나 목록으로 돌아가 보세요
          </p>
          <Link
            href="/invest"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            프로젝트 목록으로 돌아가기
          </Link>
        </div>
      </>
    );
  }

  // Calculate example return on 100,000 KRW
  const examplePrincipal = 100000;
  const rateStr = project.projectedReturn; // e.g. "연 4.2%"
  const rateMatch = rateStr.match(/([\d.]+)%/);
  const annualRate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
  const exampleReturn = Math.round(examplePrincipal * annualRate);

  return (
    <>
      <TopNav title="내가 받는 것" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Header */}
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          참여하면 이런 것들을 받아요
        </h2>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          이 프로젝트에 참여하면 어떤 것들이 돌아오는지 알기 쉽게 설명해드려요
        </p>

        {/* Section cards */}
        <section className="mt-6 flex flex-col gap-3">

          {/* 예상 수익 */}
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--color-success-bg)" }}
              >
                <TrendingUp size={16} style={{ color: "var(--color-success)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  예상 수익
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  이 프로젝트의 예상 수익률은{" "}
                  <span className="font-semibold" style={{ color: "var(--color-success)" }}>
                    {project.projectedReturn}
                  </span>
                  입니다.
                </p>
                <div
                  className="mt-3 rounded-xl px-4 py-3"
                  style={{ background: "var(--color-success-bg)" }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-primary)" }}
                  >
                    예를 들어, 10만원을 참여하면 연간 약{" "}
                    <span className="font-bold">{formatKRW(exampleReturn)}</span>의
                    수익이 예상돼요
                  </p>
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  최소 참여 금액은{" "}
                  <span className="font-medium">{formatKRW(project.minInvestment)}</span>
                  부터예요
                </p>
              </div>
            </div>
          </div>

          {/* 만기 개념 */}
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <CalendarClock size={16} style={{ color: "var(--color-cta)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  만기 개념
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--color-primary)" }}>
                    만기란?
                  </span>{" "}
                  참여한 금액과 수익을 돌려받는 시점이에요.
                </p>
                <div
                  className="mt-3 rounded-xl px-4 py-3"
                  style={{ background: "var(--color-badge-recommend-bg)" }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-primary)" }}
                  >
                    이 프로젝트는{" "}
                    <span className="font-bold">{project.maturityPeriod} 후</span>인{" "}
                    <span className="font-bold">{project.maturityDate}</span>에 만기예요
                  </p>
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  만기까지는 금액을 돌려받기 어려울 수 있어요. 여유 자금으로 참여하세요.
                </p>
              </div>
            </div>
          </div>

          {/* 세제 혜택 개념 */}
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <Receipt size={16} style={{ color: "var(--color-cta)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  세제 혜택 개념
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span className="font-semibold" style={{ color: "var(--color-primary)" }}>
                    세제 혜택이란?
                  </span>{" "}
                  지역 공공 프로젝트에 참여하면, 내야 할 세금이 줄어들 수 있어요.
                </p>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {project.taxBenefit}
                </p>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  세제 혜택은 정책에 따라 달라질 수 있어요
                </p>
              </div>
            </div>
          </div>

          {/* 지역 영향 */}
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--color-success-bg)" }}
              >
                <Heart size={16} style={{ color: "var(--color-success)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  지역 영향
                </p>
                <p
                  className="mt-1 text-xs font-medium leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  내 참여가 만드는 변화
                </p>
                <div
                  className="mt-3 rounded-xl px-4 py-3"
                  style={{ background: "var(--color-success-bg)" }}
                >
                  <p
                    className="text-xs font-semibold leading-relaxed"
                    style={{ color: "var(--color-success)" }}
                  >
                    {project.socialImpact}
                  </p>
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  우리 지역이 더 나아지는 데 직접 기여하게 돼요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept disclaimer */}
        <div
          className="mt-6 flex items-start gap-2 rounded-xl px-4 py-3"
          style={{ background: "var(--color-divider)" }}
        >
          <Info
            size={14}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            여기에 표시된 수익과 혜택은 예상 수치이며, 실제와 다를 수 있어요.
            이 내용은 정보 제공 목적이며, 투자 조언이 아닙니다.
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/invest/project/${id}/review`}
          className="mt-6 flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
          style={{ background: "var(--color-cta)" }}
        >
          참여 검토하기
        </Link>
      </div>
    </>
  );
}
