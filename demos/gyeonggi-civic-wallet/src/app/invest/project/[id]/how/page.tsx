"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  Info,
  Coins,
  TrendingUp,
  CalendarClock,
  Users,
  Hammer,
  Sparkles,
  HandCoins,
} from "lucide-react";
import { investProjectDetails, formatKRW } from "@/data/mock";

const STEPS = [
  {
    icon: Users,
    title: "주민이 참여해요",
    description: "원하는 금액을 선택하고 프로젝트에 참여합니다",
  },
  {
    icon: Hammer,
    title: "프로젝트가 진행돼요",
    description: "모집이 완료되면 실제 프로젝트가 시작됩니다",
  },
  {
    icon: Sparkles,
    title: "성과가 발생해요",
    description: "프로젝트 운영을 통해 수익이 발생합니다",
  },
  {
    icon: HandCoins,
    title: "만기에 돌려받아요",
    description: "만기가 되면 참여 금액과 수익을 함께 받습니다",
  },
];

export default function HowItWorksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="쉬운 설명" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertTriangle
              size={28}
              style={{ color: "var(--color-error)" }}
            />
          </div>
          <p
            className="mt-4 text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            프로젝트를 찾을 수 없어요
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

  return (
    <>
      <TopNav title="쉬운 설명" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Header */}
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          어떻게 작동하나요?
        </h2>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.title}
        </p>

        {/* 4 Step Cards */}
        <section className="mt-6 flex flex-col gap-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl px-5 py-5"
                style={{
                  background: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Step number */}
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "var(--color-cta)" }}
                >
                  {index + 1}
                </div>
                {/* Icon + text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      size={16}
                      style={{ color: "var(--color-cta)" }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {step.title}
                    </p>
                  </div>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Key info summary */}
        <section className="mt-8">
          <h3
            className="mb-3 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            주요 정보 요약
          </h3>
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <Coins size={16} style={{ color: "var(--color-cta)" }} />
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  최소 참여 금액
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(project.minInvestment)}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: "var(--color-success-bg)" }}
              >
                <TrendingUp
                  size={16}
                  style={{ color: "var(--color-success)" }}
                />
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  예상 수익률
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {project.projectedReturn}
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-4"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: "var(--color-warning-bg)" }}
              >
                <CalendarClock
                  size={16}
                  style={{ color: "var(--color-warning)" }}
                />
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  만기
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {project.maturityPeriod} ({project.maturityDate})
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Concept disclaimer */}
        <section
          className="mt-6 rounded-2xl px-5 py-4"
          style={{ background: "var(--color-divider)" }}
        >
          <div className="flex items-start gap-3">
            <Info
              size={18}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-text-secondary)" }}
              >
                이 서비스는 컨셉 데모입니다
              </p>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                실제 금융 상품이 아닌, 시민 참여형 공공 프로젝트의 가능성을
                보여주기 위한 데모예요. 실제 자금이 이동하지 않습니다.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <Link
          href={`/invest/project/${id}/review`}
          className="mt-8 flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
          style={{ background: "var(--color-cta)" }}
        >
          참여 검토하기
        </Link>
      </div>
    </>
  );
}
