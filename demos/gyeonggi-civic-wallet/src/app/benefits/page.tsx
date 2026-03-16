"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ChevronRight } from "lucide-react";
import { benefits, benefitDetails, benefitApplications, governmentBenefits, user, consents, formatKRW } from "@/data/mock";
import ConsentBottomSheet, { type ConsentSheetConfig } from "@/components/ConsentBottomSheet";
import BenefitIcon from "@/components/BenefitIcon";

const applicationStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  submitted: { label: "검토 중", color: "var(--color-text-secondary)", bg: "var(--color-divider)" },
  reviewing: { label: "검토 중", color: "var(--color-text-secondary)", bg: "var(--color-divider)" },
  "additional-docs": { label: "서류 추가", color: "var(--color-cta)", bg: "var(--color-badge-recommend-bg)" },
  approved: { label: "승인", color: "var(--color-success)", bg: "var(--color-success-bg)" },
  rejected: { label: "반려", color: "var(--color-text-secondary)", bg: "var(--color-divider)" },
};

function BenefitCard({ b, actionLabel, actionStyle }: {
  b: typeof benefits[number];
  actionLabel?: string;
  actionStyle?: { bg: string; color: string };
}) {
  const detail = benefitDetails[b.id as keyof typeof benefitDetails];
  const desc = detail?.description ?? "";
  const shortDesc = desc.length > 40 ? desc.slice(0, 40) + "…" : desc;

  return (
    <Link
      href={`/benefits/${b.id}`}
      className="flex flex-col rounded-[18px] px-5 py-5 transition-opacity duration-200 active:opacity-90"
      style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
    >
      <div className="flex items-start gap-4">
        <BenefitIcon id={b.id} type={b.type} size={40} />
        <div className="min-w-0 flex-1">
          <p
            className="text-[16px] font-semibold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {b.title}
          </p>
          <p
            className="mt-1 text-[20px] font-bold"
            style={{ color: "var(--color-cta)" }}
          >
            {b.amount}
          </p>
          {shortDesc && (
            <p
              className="mt-1.5 text-[13px] leading-relaxed"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {shortDesc}
            </p>
          )}
        </div>
        {!actionLabel && (
          <ChevronRight size={18} className="mt-1 shrink-0" style={{ color: "var(--color-text-tertiary)" }} />
        )}
      </div>
      {actionLabel && actionStyle && (
        <div
          className="mt-4 flex items-center justify-center rounded-[12px] py-2.5 text-[14px] font-semibold"
          style={{ background: actionStyle.bg, color: actionStyle.color }}
        >
          {actionLabel}
        </div>
      )}
    </Link>
  );
}

export default function BenefitsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [propertyConsented, setPropertyConsented] = useState(() => consents.find(c => c.id === "property-asset")?.enabled ?? false);

  const propertyConsentConfig: ConsentSheetConfig = {
    title: "주택 정보에 동의하면 더 많은 혜택을 찾을 수 있어요",
    benefits: [
      "주택 보유 여부에 따른 추가 혜택을 안내해드려요",
      "주거 관련 지원금 자격을 자동으로 확인해요",
      "동의 내역은 마이에서 언제든 관리할 수 있어요",
    ],
    dataUsage: "부동산 보유 현황을 조회해요. 혜택 자격 확인 외 다른 용도로 사용하지 않아요.",
    consentLabel: "부동산 자산 정보 조회 동의",
  };

  // IDs of benefits already applied for
  const appliedIds = new Set(benefitApplications.map((a) => a.benefitId));

  // Categorize benefits (exclude already applied)
  const readyToApply = benefits.filter((b) => {
    if (appliedIds.has(b.id)) return false;
    if (b.status !== "eligible") return false;
    const detail = benefitDetails[b.id as keyof typeof benefitDetails];
    if (!detail) return false;
    return detail.documents.every((d) => d.status === "fetchable" || d.status === "ready" || d.status === "uploaded" || (d.status as string) === "prepared");
  });

  const needsPrep = benefits.filter((b) => {
    if (appliedIds.has(b.id)) return false;
    if (b.status !== "eligible" && b.status !== "likely") return false;
    if (readyToApply.some((r) => r.id === b.id)) return false;
    return true;
  });

  const totalAmount = [...readyToApply, ...needsPrep].reduce((sum, b) => {
    const num = parseInt(b.amount.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? sum : sum + num;
  }, 0);

  const recentApps = benefitApplications.slice(0, 2);

  return (
    <>
      <TopNav title="혜택" largeTitle />

      <div className="pb-8">
        {/* ─── YouTube Ad Banner ─── */}
        <div className="pb-4">
          <div
            className="overflow-hidden"
            style={{ aspectRatio: "16/9", background: "#000" }}
          >
            <iframe
              src="https://www.youtube.com/embed/VmUXnwbYhUc?autoplay=1&mute=1&loop=1&playlist=VmUXnwbYhUc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
              title="경기도 혜택 안내"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>

        {/* ─── Value Summary ─── */}
        <div className="px-6 pt-4 pb-2">
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {user.name}님이 받을 수 있는 금액
          </p>
          <p
            className="mt-1 text-[34px] font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(totalAmount)}
          </p>
        </div>

        {/* ─── Application status (inline) ─── */}
        {recentApps.length > 0 && (
          <div className="px-5 pb-5">
            <div className="flex items-center gap-2.5 overflow-x-auto py-2" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
              {recentApps.map((app) => {
                const appStatus = applicationStatusConfig[app.status];
                const appHref = app.status === "additional-docs"
                  ? `/benefits/${app.benefitId}/documents`
                  : `/benefits/${app.benefitId}/status`;
                return (
                  <Link
                    key={app.id}
                    href={appHref}
                    className="flex shrink-0 items-center gap-3 rounded-[14px] px-4 py-3 transition-opacity duration-200 active:opacity-80"
                    style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
                  >
                    <BenefitIcon id={app.benefitId} type="" size={32} />
                    <div className="min-w-0">
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {app.benefitTitle}
                      </p>
                      <p className="mt-0.5 text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                        {app.submittedDate}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{ background: appStatus.bg, color: appStatus.color }}
                    >
                      {appStatus.label}
                    </span>
                  </Link>
                );
              })}
              <Link
                href="/benefits/history"
                className="flex shrink-0 items-center gap-1 px-2 text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                전체
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* ─── 1. Ready to apply NOW ─── */}
        {readyToApply.length > 0 && (
          <div className="px-5">
            <p
              className="mb-3 px-1 text-[15px] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              지금 바로 받을 수 있는 혜택
            </p>
            <div className="flex flex-col gap-3">
              {readyToApply.slice(0, 3).map((b) => (
                <BenefitCard
                  key={b.id}
                  b={b}
                  actionLabel="신청 가능"
                  actionStyle={{ bg: "var(--color-cta)", color: "#fff" }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── 2. Needs small preparation ─── */}
        {needsPrep.length > 0 && (
          <div className="mt-7 px-5">
            <p
              className="mb-3 px-1 text-[15px] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              지금 바로 신청 가능한 혜택
            </p>
            <div className="flex flex-col gap-3">
              {needsPrep.slice(0, 3).map((b) => (
                <BenefitCard
                  key={b.id}
                  b={b}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Property consent nudge ─── */}
        {!propertyConsented && (
          <div className="mt-7 px-5">
            <button
              onClick={() => setSheetOpen(true)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <span className="text-[18px]">🏠</span>
              <p className="min-w-0 flex-1 text-[14px] font-semibold" style={{ color: "var(--color-cta)" }}>
                주택 정보 동의하면 혜택 2건 추가
              </p>
              <ChevronRight size={16} style={{ color: "var(--color-cta)" }} />
            </button>
          </div>
        )}

        {/* ─── Government benefits ─── */}
        <div className="mt-7 px-5">
          <p
            className="mb-3 px-1 text-[15px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            정부 지원 혜택
          </p>
          <div className="flex flex-col gap-3">
            {governmentBenefits.map((gb) => (
              <Link
                key={gb.id}
                href={`/benefits/gov/${gb.id}`}
                className="flex items-center gap-4 rounded-[18px] px-5 py-4 transition-opacity duration-200 active:opacity-90"
                style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
              >
                <BenefitIcon id={gb.id} type={gb.type} size={40} />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {gb.title}
                  </p>
                  <p
                    className="mt-0.5 text-[14px] font-bold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    {gb.amount}
                  </p>
                </div>
                <ChevronRight size={16} className="shrink-0" style={{ color: "var(--color-text-tertiary)" }} />
              </Link>
            ))}
          </div>
        </div>

      </div>

      <ConsentBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConsent={() => {
          setPropertyConsented(true);
          setSheetOpen(false);
        }}
        config={propertyConsentConfig}
      />
    </>
  );
}
