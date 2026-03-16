"use client";

import { use, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { benefitDetails, user } from "@/data/mock";
import ConsentBottomSheet, { type ConsentSheetConfig } from "@/components/ConsentBottomSheet";

export default function WhyEligiblePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const benefit = benefitDetails[id];

  const [familySheetOpen, setFamilySheetOpen] = useState(false);
  const [familyConsented, setFamilyConsented] = useState(false);

  const familyConsentConfig: ConsentSheetConfig = {
    title: "가구 정보에 동의하면 더 정확히 확인할 수 있어요",
    benefits: [
      "가족 구성에 맞는 혜택 자격을 정확히 확인해요",
      "가구 소득 기준이 필요한 혜택도 자동으로 검토해요",
      "동의 내역은 내지갑에서 언제든 관리할 수 있어요",
    ],
    dataUsage:
      "주민등록등본을 기반으로 가구 구성을 확인해요. 혜택 자격 확인 외 다른 용도로 사용하지 않아요.",
    consentLabel: "가구/가족 정보 조회 동의",
  };

  if (!benefit) {
    return (
      <>
        <TopNav title="자격 확인" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
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
      </>
    );
  }

  const metCriteria = benefit.eligibility.filter((c) => c.met);
  const unmetCriteria = benefit.eligibility.filter((c) => !c.met);
  const needsConsent = unmetCriteria.length > 0 && !familyConsented;

  return (
    <>
      <TopNav showBack />

      <div className="pb-36">
        {/* ─── Title + Badge ─── */}
        <div className="px-6 pt-6">
          <h1
            className="text-[22px] font-bold leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {benefit.title}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-semibold"
              style={{
                background: benefit.confidenceLabel === "대상 가능"
                  ? "var(--color-success-bg)"
                  : "var(--color-badge-recommend-bg)",
                color: benefit.confidenceLabel === "대상 가능"
                  ? "var(--color-success)"
                  : "var(--color-cta)",
              }}
            >
              {benefit.confidenceLabel === "대상 가능" ? (
                <CheckCircle size={13} />
              ) : (
                <AlertCircle size={13} />
              )}
              {benefit.confidenceLabel}
            </span>
          </div>
        </div>

        {/* ─── Reason ─── */}
        <div className="mt-5 px-6">
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {benefit.reason}
          </p>
        </div>

        {/* ─── Eligibility checklist ─── */}
        <div className="mt-8 px-6">
          <p
            className="mb-4 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            자격 조건 확인
          </p>

          <div className="flex flex-col gap-0">
            {metCriteria.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3.5"
                style={{
                  borderBottom:
                    i < metCriteria.length - 1 || unmetCriteria.length > 0
                      ? "1px solid var(--color-divider)"
                      : "none",
                }}
              >
                <CheckCircle size={18} style={{ color: "var(--color-success)" }} />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="mt-0.5 text-[13px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {c.value}
                  </p>
                </div>
              </div>
            ))}

            {unmetCriteria.map((c, i) => (
              <div
                key={`unmet-${i}`}
                className="flex items-center gap-3 py-3.5"
                style={{
                  borderBottom:
                    i < unmetCriteria.length - 1
                      ? "1px solid var(--color-divider)"
                      : "none",
                }}
              >
                <AlertCircle size={18} style={{ color: "var(--color-warning)" }} />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="mt-0.5 text-[13px]"
                    style={{ color: "var(--color-warning)" }}
                  >
                    확인 필요
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Consent nudge (inline, above CTA) ─── */}
        {needsConsent && (
          <div className="mt-6 px-6">
            <p
              className="text-[14px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              가구 정보에 동의하면 나머지 조건도 확인할 수 있어요
            </p>
          </div>
        )}
      </div>

      {/* ─── Fixed Bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-8"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 50%, transparent)",
        }}
      >
        {needsConsent ? (
          <button
            onClick={() => setFamilySheetOpen(true)}
            className="flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            동의하고 확인하기
          </button>
        ) : (
          <Link
            href={`/benefits/${id}/documents`}
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            서류 준비하기
          </Link>
        )}
      </div>

      <ConsentBottomSheet
        open={familySheetOpen}
        onClose={() => setFamilySheetOpen(false)}
        onConsent={() => {
          setFamilyConsented(true);
          setFamilySheetOpen(false);
        }}
        config={familyConsentConfig}
      />
    </>
  );
}
