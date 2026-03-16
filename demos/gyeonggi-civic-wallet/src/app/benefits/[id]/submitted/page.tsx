"use client";

import { use } from "react";
import Link from "next/link";
import { CircleCheck, ChevronRight, AlertTriangle } from "lucide-react";
import { benefitDetails, benefits } from "@/data/mock";
import BenefitIcon from "@/components/BenefitIcon";

export default function SubmittedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const benefit = benefitDetails[id];

  if (!benefit) {
    return (
      <div
        className="flex min-h-dvh flex-col items-center justify-center px-6"
        style={{ background: "var(--color-bg)" }}
      >
        <AlertTriangle size={28} style={{ color: "var(--color-text-tertiary)" }} />
        <p
          className="mt-4 text-[16px] font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          혜택 정보를 찾을 수 없어요
        </p>
        <Link
          href="/benefits"
          className="mt-6 rounded-[14px] px-6 py-2.5 text-[14px] font-semibold text-white"
          style={{ background: "var(--color-cta)" }}
        >
          혜택 목록으로
        </Link>
      </div>
    );
  }

  const reviewStep = benefit.timeline.find(
    (t) => t.step === "검토 중" && t.description
  );
  const reviewTime = reviewStep?.description ?? "3~5 영업일";

  const otherBenefits = benefits.filter(
    (b) => b.id !== id && (b.status === "eligible" || b.status === "likely")
  );
  const nextBenefit = otherBenefits[0] ?? null;

  return (
    <div
      className="flex min-h-dvh flex-col px-6"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ─── Top content ─── */}
      <div className="flex flex-1 flex-col items-center pt-28">
        {/* Success Icon */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "var(--color-success-bg)" }}
        >
          <CircleCheck size={40} style={{ color: "var(--color-success)" }} />
        </div>

        {/* Title */}
        <h1
          className="mt-7 text-[24px] font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          신청이 완료됐어요
        </h1>

        {/* Benefit name */}
        <p
          className="mt-2 text-[15px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {benefit.title}
        </p>

        {/* Explanation */}
        <p
          className="mt-6 text-[14px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {reviewTime} 안에 결과를 알려드릴게요
        </p>

        {/* ─── Other benefit suggestion ─── */}
        {nextBenefit && (
          <div className="mt-10 w-full">
            <p
              className="mb-3 text-[13px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              받을 수 있는 다른 혜택
            </p>
            <Link
              href={`/benefits/${nextBenefit.id}`}
              className="flex items-center gap-3 rounded-[14px] px-4 py-3.5 transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
            >
              <BenefitIcon id={nextBenefit.id} type={nextBenefit.type} size={40} />
              <div className="min-w-0 flex-1">
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {nextBenefit.title}
                </p>
                <p
                  className="mt-0.5 text-[13px]"
                  style={{ color: "var(--color-cta)" }}
                >
                  {nextBenefit.amount} 받을 수 있어요
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
            </Link>
          </div>
        )}
      </div>

      {/* ─── Bottom CTAs ─── */}
      <div className="w-full pb-10 pt-4">
        <Link
          href={`/benefits/${id}/status`}
          className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          진행 상태 보기
        </Link>
        <Link
          href="/home"
          className="mt-2 flex h-[44px] w-full items-center justify-center text-[14px] font-medium transition-opacity duration-200"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
