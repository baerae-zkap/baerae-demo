"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ChevronRight } from "lucide-react";
import { benefits, benefitDetails, user, formatKRW } from "@/data/mock";
import BenefitIcon from "@/components/BenefitIcon";

function getStatusTag(b: (typeof benefits)[0]) {
  const detail = benefitDetails[b.id as keyof typeof benefitDetails];
  if (!detail)
    return { label: "확인 필요", color: "var(--color-text-tertiary)", bg: "var(--color-divider)" };
  const allReady = detail.documents.every(
    (d) =>
      d.status === "ready" ||
      d.status === "fetchable" ||
      d.status === "uploaded" ||
      (d.status as string) === "prepared"
  );
  if (b.status === "eligible" && allReady) {
    return { label: "신청 가능", color: "var(--color-success)", bg: "var(--color-success-bg)" };
  }
  if (b.status === "eligible" || b.status === "likely") {
    return { label: "준비 필요", color: "var(--color-cta)", bg: "var(--color-badge-recommend-bg)" };
  }
  return { label: "확인 필요", color: "var(--color-text-tertiary)", bg: "var(--color-divider)" };
}

const sortOrder = { eligible: 0, likely: 1, "more-info": 2 };

export default function BenefitsInboxPage() {
  const sorted = [...benefits].sort(
    (a, b) => sortOrder[a.status] - sortOrder[b.status]
  );

  const totalAmount = sorted.reduce((sum, b) => {
    const num = parseInt(b.amount.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? sum : sum + num;
  }, 0);

  return (
    <>
      <TopNav title="전체 혜택" showBack />

      <div className="px-5 pt-3 pb-8">
        {/* Header */}
        <section className="mb-6">
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {user.name}님이 받을 수 있는 혜택 {sorted.length}건
          </p>
          <p
            className="mt-1 text-[28px] font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(totalAmount)}
          </p>
        </section>

        {/* Benefit list */}
        <section className="flex flex-col gap-2.5" aria-label="혜택 목록">
          {sorted.map((benefit) => {
            const detail =
              benefitDetails[benefit.id as keyof typeof benefitDetails];
            const tag = getStatusTag(benefit);
            const totalDocs = detail?.documents.length ?? 0;
            const readyDocs =
              detail?.documents.filter(
                (d) =>
                  d.status === "ready" ||
                  d.status === "fetchable" ||
                  d.status === "uploaded" ||
                  (d.status as string) === "prepared"
              ).length ?? 0;
            const nextTodo = detail?.userTodo[0] ?? null;

            return (
              <Link
                key={benefit.id}
                href={`/benefits/${benefit.id}`}
                className="flex items-center gap-3.5 rounded-[16px] px-4 py-4 transition-opacity duration-200 active:opacity-90"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-divider)",
                }}
              >
                {/* Emoji */}
                <BenefitIcon id={benefit.id} type={benefit.type} />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[15px] font-semibold leading-snug"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {benefit.title}
                  </p>
                  <p
                    className="mt-0.5 text-[17px] font-bold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    {benefit.amount}
                  </p>

                  {/* Preparation status */}
                  {totalDocs > 0 && (
                    <p
                      className="mt-1.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      앱 준비 {readyDocs}/{totalDocs}
                      {nextTodo && (
                        <span style={{ color: "var(--color-text-secondary)" }}>
                          {" · "}
                          {nextTodo}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {/* Status tag + arrow */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{ background: tag.bg, color: tag.color }}
                  >
                    {tag.label}
                  </span>
                  <ChevronRight
                    size={14}
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
}
