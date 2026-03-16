"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  ShieldAlert,
  Clock,
  ShieldCheck,
  HardHat,
  Info,
} from "lucide-react";
import { investProjectDetails } from "@/data/mock";

export default function RiskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="위험 및 보호" showBack />
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
      <TopNav title="위험 및 보호" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Header */}
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          알아두셔야 할 사항
        </h2>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          모든 참여에는 위험이 따릅니다. 아래 내용을 꼼꼼히 확인하시고 충분히
          이해하신 후 참여를 결정해 주세요.
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
        <section className="mt-6 flex flex-col gap-3">
          {/* Maturity explanation */}
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
                  만기란 무엇인가요?
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  만기는 참여한 금액과 수익이 돌아오는 시점을 말합니다. 이
                  프로젝트의 만기는 {project.maturityPeriod}이며, 만기일은{" "}
                  {project.maturityDate}입니다. 만기 전에는 참여 금액을 돌려받기
                  어려울 수 있으니, 여유 자금으로 참여하시는 것을 권합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Principal protection */}
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
                  원금 보호에 대해
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  이 프로젝트는 원금을 보장하지 않습니다. 다만, 공공 프로젝트
                  특성상 지방자치단체의 관리 하에 운영되며, 안정적인 수익 구조를
                  갖추도록 설계되었습니다. 그럼에도 예상치 못한 상황으로 인해
                  원금 손실이 발생할 수 있다는 점을 이해해 주세요.
                </p>
              </div>
            </div>
          </div>

          {/* Construction/execution uncertainty */}
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
                style={{ background: "var(--color-error-bg)" }}
              >
                <HardHat size={16} style={{ color: "var(--color-error)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  프로젝트 완료 불확실성
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  프로젝트 시공이나 실행 과정에서 자재 수급, 인허가, 날씨 등
                  여러 요인으로 일정이 지연될 수 있습니다. 이 경우 수익 발생
                  시점이 늦어지거나 예상 수익률이 달라질 수 있습니다. 프로젝트
                  진행 상황은 앱을 통해 정기적으로 안내해 드립니다.
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
            이 페이지는 정보 제공 목적이며, 투자 조언이 아닙니다.
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/invest/project/${id}`}
          className="mt-8 flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
          style={{ background: "var(--color-cta)" }}
        >
          프로젝트로 돌아가기
        </Link>
      </div>
    </>
  );
}
