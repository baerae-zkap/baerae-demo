"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Clock,
  HardHat,
  Info,
} from "lucide-react";
import { investProjectDetails } from "@/data/mock";

export default function WhatToKnowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="참여 전 알아둘 점" showBack />
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

  return (
    <>
      <TopNav title="참여 전 알아둘 점" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Header */}
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          참여하기 전에 알아두세요
        </h2>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          투명하게 안내해드려요
        </p>

        {/* Project-specific risks */}
        <section className="mt-6 flex flex-col gap-3">
          {project.risks.map((risk, index) => (
            <div
              key={index}
              className="rounded-2xl px-5 py-4"
              style={{
                background: "var(--color-bg-card)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-warning-bg)" }}
                >
                  <ShieldAlert
                    size={16}
                    style={{ color: "var(--color-warning)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {risk.title}
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* General info sections */}
        <section className="mt-3 flex flex-col gap-3">

          {/* 원금에 대해 */}
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
                <ShieldCheck
                  size={16}
                  style={{ color: "var(--color-success)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  원금에 대해
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  이 프로젝트는 원금을 보장하지 않아요.
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  다만, 공공 프로젝트이기 때문에 지방자치단체가 관리하고 있어요.
                  민간 상품보다 안정적인 구조를 갖추도록 설계되어 있어요.
                </p>
              </div>
            </div>
          </div>

          {/* 만기 전에는 */}
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
                <Clock size={16} style={{ color: "var(--color-cta)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  만기 전에는
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  만기({project.maturityPeriod}) 전에는 참여 금액을 돌려받기
                  어려울 수 있어요.
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  여유 자금으로 참여하시는 걸 권해드려요.
                </p>
              </div>
            </div>
          </div>

          {/* 프로젝트 진행 */}
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
                style={{ background: "var(--color-warning-bg)" }}
              >
                <HardHat size={16} style={{ color: "var(--color-warning)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  프로젝트 진행
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  프로젝트 진행 중 날씨, 자재 등의 이유로 일정이 바뀔 수 있어요.
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  진행 상황은 앱에서 계속 안내해드릴게요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom disclaimer */}
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
            이 내용은 정보 제공 목적이며, 투자 조언이 아닙니다. 이 서비스는
            컨셉 데모입니다.
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
