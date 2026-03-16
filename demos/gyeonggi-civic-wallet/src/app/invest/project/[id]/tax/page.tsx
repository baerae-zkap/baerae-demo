"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  Receipt,
  BadgeCheck,
  ListChecks,
  TriangleAlert,
  Info,
} from "lucide-react";
import { investProjectDetails } from "@/data/mock";

export default function TaxBenefitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  if (!project) {
    return (
      <>
        <TopNav title="세제 혜택" showBack />
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
      <TopNav title="세제 혜택" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Hero section */}
        <h2
          className="text-lg font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          세제 혜택 안내
        </h2>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          공공 프로젝트에 참여하면 관련 정책에 따라 세금 혜택을 받을 수
          있습니다. 아래에서 이 프로젝트의 세제 혜택 정보를 확인해 보세요.
        </p>

        {/* Tax benefit highlight card */}
        <section
          className="mt-6 rounded-2xl px-5 py-5"
          style={{
            background: "var(--color-success-bg)",
            border: "1px solid var(--color-success)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--color-bg-card)" }}
            >
              <Receipt size={18} style={{ color: "var(--color-success)" }} />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-success)" }}
              >
                이 프로젝트의 세제 혜택
              </p>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: "var(--color-primary)" }}
              >
                {project.taxBenefit}
              </p>
            </div>
          </div>
        </section>

        {/* Explanation sections */}
        <section className="mt-6 flex flex-col gap-3">
          {/* What is tax credit */}
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
                <BadgeCheck
                  size={16}
                  style={{ color: "var(--color-cta)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  세액공제란?
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  세액공제는 내야 할 세금에서 일정 금액을 직접 빼주는 제도입니다.
                  예를 들어, 10만원의 세액공제를 받으면 내야 할 세금이 10만원
                  줄어듭니다. 소득공제와 달리 세금 자체가 줄어드는 것이므로 체감
                  혜택이 큽니다.
                </p>
              </div>
            </div>
          </div>

          {/* Conditions */}
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
                <ListChecks
                  size={16}
                  style={{ color: "var(--color-warning)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  적용 조건
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  세제 혜택은 정부 및 지방자치단체의 정책에 따라 결정되며, 참여
                  시점의 조례와 법령에 따라 달라질 수 있습니다. 혜택이 확정되지
                  않은 경우도 있으며, 확정 시 별도로 안내해 드립니다. 실제 공제
                  금액은 개인의 소득 수준과 납세 상황에 따라 다릅니다.
                </p>
              </div>
            </div>
          </div>

          {/* Caution */}
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
                <TriangleAlert
                  size={16}
                  style={{ color: "var(--color-error)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  주의사항
                </p>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  이 페이지의 내용은 정책 개념 수준의 설명이며, 구체적인 세무
                  상담을 대체하지 않습니다. 실제 세제 혜택 적용 여부와 금액은
                  세무사 또는 관할 세무서에 문의하시기 바랍니다. 정책 변경에 따라
                  안내 내용이 달라질 수 있습니다.
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
            이 내용은 정책 개념 설명이며, 세무 상담을 대체하지 않습니다.
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
