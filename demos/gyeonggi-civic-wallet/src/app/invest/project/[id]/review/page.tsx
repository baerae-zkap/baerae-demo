"use client";

import { use, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  AlertTriangle,
  Info,
  CircleCheck,
  Clock,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { investProjectDetails, formatKRW } from "@/data/mock";
import ConsentBottomSheet, { type ConsentSheetConfig } from "@/components/ConsentBottomSheet";

const FIXED_PRESETS = [100000, 300000, 500000] as const;

export default function InvestReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = investProjectDetails[id];

  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [isCustom, setIsCustom] = useState(false);
  const [identitySheetOpen, setIdentitySheetOpen] = useState(false);
  const [identityConsented, setIdentityConsented] = useState(false);

  const identityConsentConfig: ConsentSheetConfig = {
    title: "본인 확인에 동의하면 바로 참여할 수 있어요",
    benefits: [
      "본인 확인 후 프로젝트에 참여할 수 있어요",
      "참여 내역을 안전하게 관리할 수 있어요",
      "동의 내역은 내지갑에서 언제든 관리할 수 있어요",
    ],
    dataUsage:
      "본인 확인을 위해 이름과 생년월일을 조회해요. 프로젝트 참여 외 다른 용도로 사용하지 않아요.",
    consentLabel: "본인 확인 정보 조회 동의",
    required: true,
  };

  if (!project) {
    return (
      <>
        <TopNav title="참여 검토" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-warning-bg)" }}
          >
            <AlertTriangle
              size={28}
              style={{ color: "var(--color-warning)" }}
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

  // Parse projected return rate for calculation (e.g. "연 4.2%" → 0.042)
  const rateMatch = project.projectedReturn.match(/([\d.]+)/);
  const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
  const estimatedReturn = Math.round(selectedAmount * rate);

  const handleCustom = () => {
    setIsCustom(true);
    setSelectedAmount(project.minInvestment);
  };

  const handlePreset = (amount: number) => {
    setIsCustom(false);
    setSelectedAmount(amount);
  };

  return (
    <>
      <TopNav title="참여 검토" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Project Summary Card */}
        <section
          className="mb-4 rounded-2xl px-5 py-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="rounded-md px-2 py-0.5 text-xs font-semibold"
              style={{
                background: "var(--color-badge-recommend-bg)",
                color: "var(--color-cta)",
              }}
            >
              {project.category}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {project.region}
            </span>
          </div>
          <h2
            className="text-lg font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {project.title}
          </h2>
        </section>

        {/* Amount Selection */}
        <section
          className="mb-4 rounded-2xl px-5 py-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h3
            className="mb-1 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            참여 금액을 선택해주세요
          </h3>
          <p
            className="mb-4 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            최소 참여 금액: {formatKRW(project.minInvestment)}
          </p>

          {/* 4-chip preset row */}
          <div className="grid grid-cols-4 gap-2">
            {FIXED_PRESETS.map((amount) => {
              const isActive = !isCustom && selectedAmount === amount;
              return (
                <button
                  key={amount}
                  onClick={() => handlePreset(amount)}
                  className="flex h-10 cursor-pointer items-center justify-center rounded-xl text-xs font-semibold transition-colors duration-150"
                  style={{
                    background: isActive
                      ? "var(--color-cta)"
                      : "var(--color-bg)",
                    color: isActive ? "#FFFFFF" : "var(--color-primary)",
                    border: isActive
                      ? "1.5px solid var(--color-cta)"
                      : "1.5px solid var(--color-border)",
                  }}
                >
                  {amount === 100000
                    ? "10만원"
                    : amount === 300000
                    ? "30만원"
                    : "50만원"}
                </button>
              );
            })}
            {/* 직접 입력 chip */}
            <button
              onClick={handleCustom}
              className="flex h-10 cursor-pointer items-center justify-center rounded-xl text-xs font-semibold transition-colors duration-150"
              style={{
                background: isCustom ? "var(--color-cta)" : "var(--color-bg)",
                color: isCustom ? "#FFFFFF" : "var(--color-primary)",
                border: isCustom
                  ? "1.5px solid var(--color-cta)"
                  : "1.5px solid var(--color-border)",
              }}
            >
              직접 입력
            </button>
          </div>

          {/* Selected amount display */}
          <div
            className="mt-4 flex items-center justify-between rounded-xl px-4 py-3"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <span
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              선택 금액
            </span>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--color-cta)" }}
            >
              {formatKRW(selectedAmount)}
            </span>
          </div>
        </section>

        {/* Participation Summary */}
        <section
          className="mb-4 rounded-2xl px-5 py-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h3
            className="mb-4 text-sm font-semibold"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            참여 요약
          </h3>
          <div className="flex flex-col gap-3">
            {/* Selected amount */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                참여 금액
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {formatKRW(selectedAmount)}
              </span>
            </div>
            <div style={{ borderBottom: "1px solid var(--color-divider)" }} />

            {/* Expected annual return */}
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                연간 예상 수익
              </span>
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

            {/* Maturity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock
                  size={14}
                  style={{ color: "var(--color-text-tertiary)" }}
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
                {project.maturityPeriod}{" "}
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  ({project.maturityDate})
                </span>
              </span>
            </div>
            <div style={{ borderBottom: "1px solid var(--color-divider)" }} />

            {/* Social impact */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Leaf
                  size={14}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  사회적 영향
                </span>
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-success)" }}
              >
                {project.socialImpact}
              </span>
            </div>
          </div>
        </section>

        {/* Tax benefit note */}
        <div
          className="mb-4 flex items-start gap-2.5 rounded-xl px-4 py-3"
          style={{ background: "var(--color-badge-recommend-bg)" }}
        >
          <CircleCheck
            size={15}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-cta)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-cta)" }}
          >
            세제 혜택이 적용될 수 있어요.{" "}
            <Link
              href={`/invest/project/${id}/tax`}
              className="underline underline-offset-2"
              style={{ color: "var(--color-cta)" }}
            >
              세금 혜택 확인
            </Link>
          </p>
        </div>

        {/* Concept disclaimer */}
        <div
          className="mb-8 flex items-start gap-2.5 rounded-xl px-4 py-4"
          style={{ background: "var(--color-divider)" }}
        >
          <Info
            size={15}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            이 서비스는 컨셉 데모입니다. 실제 금융 상품이 아닙니다.
          </p>
        </div>

        {/* Identity verification unlock preview */}
        {!identityConsented && (
          <div
            className="mb-4 overflow-hidden rounded-2xl"
            style={{
              background: "var(--color-bg-card)",
              border: "1.5px solid var(--color-cta)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <ShieldCheck size={13} style={{ color: "var(--color-cta)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--color-cta)" }}>
                본인 확인 후 참여할 수 있어요
              </span>
            </div>
            <div className="px-4 py-3">
              <div
                className="flex flex-col gap-2.5"
                style={{ opacity: 0.4, filter: "blur(2px)", pointerEvents: "none" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--color-success-bg)" }}
                  >
                    <CircleCheck size={14} style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      참여 확정 및 내역 관리
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      참여 후 실시간 현황 확인
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--color-success-bg)" }}
                  >
                    <Leaf size={14} style={{ color: "var(--color-success)" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      세제 혜택 자동 적용
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                      지방세 공제 혜택 안내
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                본인 확인은 이름과 생년월일만 조회해요
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {identityConsented ? (
            <Link
              href={`/invest/project/${id}/success`}
              className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
              style={{ background: "var(--color-cta)" }}
            >
              참여하기
            </Link>
          ) : (
            <button
              onClick={() => setIdentitySheetOpen(true)}
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl text-base font-semibold text-white transition-colors duration-200"
              style={{ background: "var(--color-cta)" }}
            >
              참여하기
            </button>
          )}
          <Link
            href={`/invest/project/${id}`}
            className="flex h-14 items-center justify-center rounded-2xl text-base font-semibold transition-colors duration-200"
            style={{
              background: "var(--color-bg-card)",
              color: "var(--color-cta)",
              border: "1px solid var(--color-border)",
            }}
          >
            다시 확인하기
          </Link>
        </div>
      </div>

      <ConsentBottomSheet
        open={identitySheetOpen}
        onClose={() => setIdentitySheetOpen(false)}
        onConsent={() => {
          setIdentityConsented(true);
          setIdentitySheetOpen(false);
        }}
        config={identityConsentConfig}
      />
    </>
  );
}
