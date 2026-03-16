"use client";

import { use, useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { benefitDetails, consents } from "@/data/mock";
import ConsentBottomSheet, {
  type ConsentSheetConfig,
} from "@/components/ConsentBottomSheet";

const benefitEmoji: Record<string, string> = {
  "elementary-prep": "🎒",
  "after-school-care": "📚",
  "child-vaccine": "💉",
  "youth-culture": "🎨",
  "postpartum-care": "🤱",
};

type FeatureRow = { emoji: string; label: string; desc: string };
type StepRow = { title: string; highlight?: string; sub: string };

const benefitFeatures: Record<string, FeatureRow[]> = {
  "elementary-prep": [
    { emoji: "📄", label: "서류는 자동으로", desc: "주민등록등본, 가족관계증명서를 자동으로 불러와요" },
    { emoji: "💰", label: "지역화폐로 바로 지급", desc: "승인되면 수원시 지역화폐로 30만원이 들어와요" },
  ],
  "after-school-care": [
    { emoji: "🏫", label: "학교 돌봄교실 지원", desc: "방과후 돌봄교실 이용 비용을 지원해요" },
    { emoji: "💰", label: "지역화폐로 바로 지급", desc: "승인되면 수원시 지역화폐로 20만원이 들어와요" },
  ],
  "child-vaccine": [
    { emoji: "🏥", label: "지정 의료기관에서 무료", desc: "가까운 지정 병원에서 무료로 접종받을 수 있어요" },
    { emoji: "📋", label: "접종 일정 자동 알림", desc: "자녀 나이에 맞는 접종 일정을 알려드려요" },
  ],
  "youth-culture": [
    { emoji: "🎫", label: "문화생활 바우처", desc: "공연, 영화, 전시 등 문화활동에 사용할 수 있어요" },
    { emoji: "💳", label: "전용 카드로 결제", desc: "문화패스 전용 카드로 바로 결제할 수 있어요" },
  ],
  "postpartum-care": [
    { emoji: "👩‍⚕️", label: "산후 의료 서비스", desc: "산후 회복을 위한 의료 및 돌봄 서비스를 지원해요" },
    { emoji: "💰", label: "의료 바우처 지급", desc: "승인되면 50만원 상당의 의료 바우처를 받아요" },
  ],
};

const benefitSteps: Record<string, StepRow[]> = {
  "elementary-prep": [
    { title: "서류 준비하기를", highlight: "먼저 눌러주세요", sub: "입학통지서만 직접 첨부하면 돼요" },
    { title: "나머지 서류는", highlight: "자동으로 준비돼요", sub: "주민등록등본, 가족관계증명서 자동 발급" },
    { title: "서류 확인 후 신청하면", highlight: "3~5일 내 검토", sub: "별도 방문 없이 앱에서 완료" },
    { title: "지역화폐로 지급!", highlight: "", sub: "승인 후 지역화폐 잔액에 바로 충전" },
  ],
  "after-school-care": [
    { title: "서류 준비하기를", highlight: "먼저 눌러주세요", sub: "돌봄교실 신청서만 직접 첨부하면 돼요" },
    { title: "맞벌이 증빙서류는", highlight: "자동으로 조회돼요", sub: "국세청에서 자동으로 확인" },
    { title: "서류 확인 후 신청하면", highlight: "3~5일 내 검토", sub: "별도 방문 없이 앱에서 완료" },
    { title: "지역화폐로 지급!", highlight: "", sub: "승인 후 지역화폐 잔액에 바로 충전" },
  ],
  "child-vaccine": [
    { title: "자격 확인하기를", highlight: "먼저 눌러주세요", sub: "접종 기록을 확인하면 정확한 안내가 가능해요" },
    { title: "가까운 지정 병원을", highlight: "안내받으세요", sub: "집 근처 접종 가능한 병원을 알려드려요" },
    { title: "병원 방문 후", highlight: "무료로 접종", sub: "별도 비용 없이 접종받을 수 있어요" },
    { title: "접종 완료!", highlight: "", sub: "접종 기록이 자동으로 등록돼요" },
  ],
  "youth-culture": [
    { title: "자격 확인하기를", highlight: "먼저 눌러주세요", sub: "연령과 소득 기준을 확인해요" },
    { title: "문화패스 카드를", highlight: "신청하세요", sub: "전용 카드가 배송돼요" },
    { title: "공연, 영화, 전시 등", highlight: "자유롭게 사용", sub: "문화시설에서 카드로 결제하면 돼요" },
    { title: "10만원 바우처 사용 완료!", highlight: "", sub: "" },
  ],
  "postpartum-care": [
    { title: "자격 확인하기를", highlight: "먼저 눌러주세요", sub: "출산 여부와 거주지를 확인해요" },
    { title: "서류를 준비하고", highlight: "신청하세요", sub: "대부분의 서류는 자동으로 준비돼요" },
    { title: "검토 후 승인되면", highlight: "바우처가 발급돼요", sub: "3~5 영업일 소요" },
    { title: "의료 바우처 사용!", highlight: "", sub: "지정 의료기관에서 사용 가능" },
  ],
};

export default function BenefitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const benefit = benefitDetails[id];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [assetConsented, setAssetConsented] = useState(
    () => consents.find((c) => c.id === "bank-asset")?.enabled ?? false
  );

  const assetConsentConfig: ConsentSheetConfig = {
    title: "자산 정보에 동의하면 자격을 바로 확인할 수 있어요",
    benefits: [
      "소득·자산 기준이 필요한 혜택 자격을 정확히 확인해요",
      "추가 서류 없이 자동으로 조건을 검증해요",
      "동의 내역은 내지갑에서 언제든 관리할 수 있어요",
    ],
    dataUsage:
      "오픈뱅킹을 통해 은행 잔액과 자산 정보를 조회해요. 혜택 자격 확인 외 다른 용도로 사용하지 않아요.",
    consentLabel: "은행/금융 자산 정보 조회 동의",
  };

  if (!benefit) {
    return (
      <>
        <TopNav title="혜택 상세" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertTriangle size={28} style={{ color: "var(--color-error)" }} />
          </div>
          <p className="mt-4 text-base font-semibold" style={{ color: "var(--color-primary)" }}>
            혜택 정보를 찾을 수 없어요
          </p>
          <Link
            href="/benefits"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 목록으로 돌아가기
          </Link>
        </div>
      </>
    );
  }

  const allDocsReady = benefit.documents.every(
    (d) => d.status === "ready" || d.status === "fetchable" || d.status === "uploaded"
  );

  const primaryCta = (() => {
    if (benefit.status === "eligible") {
      return allDocsReady
        ? { label: "신청하기", href: `/benefits/${id}/review` }
        : { label: "서류 준비하기", href: `/benefits/${id}/documents` };
    }
    return { label: "자격 확인하기", href: `/benefits/${id}/why` };
  })();

  const emoji = benefitEmoji[id] ?? "📋";
  const features = benefitFeatures[id] ?? [];
  const steps = benefitSteps[id] ?? [];
  const needsConsent = !assetConsented && benefit.confidenceLabel !== "대상 가능";

  return (
    <>
      <TopNav showBack />

      <div className="pb-36">
        {/* ─── Hero: Title + Subtitle ─── */}
        <div className="px-6 pt-6 text-center">
          <h1
            className="text-[24px] font-bold leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {benefit.title}
          </h1>
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {benefit.plainExplanation}
          </p>
        </div>

        {/* ─── Big 3D Emoji ─── */}
        <div className="flex justify-center py-14">
          <div
            className="flex h-40 w-40 items-center justify-center rounded-[44px]"
            style={{
              background: "var(--color-divider)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.03)",
            }}
          >
            <span className="text-[88px] leading-none">{emoji}</span>
          </div>
        </div>

        {/* ─── Amount ─── */}
        <div className="text-center">
          <p
            className="text-[15px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {benefit.type} · 마감 {benefit.deadline}
          </p>
          <p
            className="mt-1 text-[36px] font-bold tracking-tight"
            style={{ color: "var(--color-cta)" }}
          >
            {benefit.amount}
          </p>
        </div>

        {/* ─── Feature Rows (emoji + text) ─── */}
        <div className="mt-14 px-6">
          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: "var(--color-divider)" }}
                >
                  <span className="text-[28px] leading-none">{f.emoji}</span>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p
                    className="text-[13px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {f.label}
                  </p>
                  <p
                    className="mt-0.5 text-[17px] font-bold leading-snug"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p
            className="mt-6 text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {benefit.status === "eligible"
              ? "서류 검토 후 지급까지 3~5 영업일이 소요될 수 있어요."
              : "자격 조건은 제공된 정보를 기반으로 판단하며, 최종 결과는 다를 수 있어요."}
          </p>
        </div>

        {/* ─── Divider ─── */}
        <div className="my-10 mx-6 h-px" style={{ background: "var(--color-divider)" }} />

        {/* ─── Numbered Steps ─── */}
        <div className="px-6">
          <p
            className="mb-6 text-[18px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            신청 방법
          </p>

          <div className="flex flex-col">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <div key={i} className="flex gap-4">
                  {/* Number + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
                      style={{
                        background: isLast ? "var(--color-cta)" : "var(--color-divider)",
                        color: isLast ? "#FFFFFF" : "var(--color-text-secondary)",
                      }}
                    >
                      {i + 1}
                    </div>
                    {!isLast && (
                      <div
                        className="w-px flex-1"
                        style={{
                          background: "var(--color-border)",
                          minHeight: 32,
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={isLast ? "pb-0" : "pb-6"}>
                    <p
                      className="text-[16px] font-bold leading-snug"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {step.title}
                    </p>
                    {step.highlight && (
                      <p
                        className="text-[16px] font-bold"
                        style={{ color: "var(--color-cta)" }}
                      >
                        {step.highlight}
                      </p>
                    )}
                    {step.sub && (
                      <p
                        className="mt-1 text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {step.sub}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Consent unlock ─── */}
        {needsConsent && (
          <div className="mt-10 px-6">
            <button
              onClick={() => setSheetOpen(true)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-[16px] px-5 py-4 text-left transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold" style={{ color: "var(--color-cta)" }}>
                  자산 정보 동의하면 자격을 바로 확인할 수 있어요
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--color-cta)" }} />
            </button>
          </div>
        )}

        {/* ─── Divider ─── */}
        <div className="my-10 mx-6 h-px" style={{ background: "var(--color-divider)" }} />

        {/* ─── Bottom Utility Links ─── */}
        <div className="px-6">
          <Link
            href={`/benefits/${id}/why`}
            className="flex items-center gap-3 py-4 transition-opacity duration-200 active:opacity-80"
          >
            <span className="text-[24px]">❓</span>
            <span
              className="flex-1 text-[16px] font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              왜 이 혜택이 추천됐나요?
            </span>
            <ChevronRight size={18} style={{ color: "var(--color-text-tertiary)" }} />
          </Link>

          <Link
            href={`/benefits/${id}/documents`}
            className="flex items-center gap-3 py-4 transition-opacity duration-200 active:opacity-80"
            style={{ borderTop: "1px solid var(--color-divider)" }}
          >
            <span className="text-[24px]">📎</span>
            <span
              className="flex-1 text-[16px] font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              필요한 서류 확인하기
            </span>
            <ChevronRight size={18} style={{ color: "var(--color-text-tertiary)" }} />
          </Link>
        </div>
      </div>

      {/* ─── Fixed Bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-20"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 65%, transparent)",
        }}
      >
        <p
          className="mb-3 text-center text-[13px]"
          style={{ color: "var(--color-cta)" }}
        >
          혜택을 받으려면 &lsquo;{primaryCta.label}&rsquo;를 눌러주세요
        </p>
        <Link
          href={primaryCta.href}
          className="flex h-[54px] items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          {primaryCta.label}
        </Link>
      </div>

      <ConsentBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConsent={() => {
          setAssetConsented(true);
          setSheetOpen(false);
        }}
        config={assetConsentConfig}
      />
    </>
  );
}
