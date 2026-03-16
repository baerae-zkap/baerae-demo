"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ChevronRight, ClipboardList, AlertCircle } from "lucide-react";
import { benefitApplications, type BenefitApplication } from "@/data/mock";

const statusConfig: Record<
  BenefitApplication["status"],
  { label: string; color: string; bg: string }
> = {
  submitted: {
    label: "신청 완료",
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
  },
  reviewing: {
    label: "검토 중",
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
  },
  "additional-docs": {
    label: "서류 추가",
    color: "var(--color-warning)",
    bg: "var(--color-warning-bg)",
  },
  approved: {
    label: "승인",
    color: "var(--color-success)",
    bg: "var(--color-success-bg)",
  },
  rejected: {
    label: "반려",
    color: "var(--color-error)",
    bg: "var(--color-error-bg)",
  },
};

function formatDate(dateStr: string): string {
  return dateStr
    .replace(/(\d{4})-(\d{2})-(\d{2})/, "$1년 $2월 $3일")
    .replace(/년 0/, "년 ")
    .replace(/월 0/, "월 ");
}

const sorted = [...benefitApplications].sort(
  (a, b) =>
    new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
);

export default function BenefitsHistoryPage() {
  if (sorted.length === 0) {
    return (
      <>
        <TopNav title="신청 내역" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-divider)" }}
          >
            <ClipboardList size={30} style={{ color: "var(--color-text-tertiary)" }} />
          </div>
          <p
            className="mt-4 text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            신청 내역이 없어요
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            혜택을 신청하면 여기에 표시돼요
          </p>
          <Link
            href="/benefits"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-white transition-colors duration-200"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 찾아보기
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav title="신청 내역" showBack />

      <div className="px-5 pt-2 pb-10">
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          지금까지 {sorted.length}건 신청했어요
        </p>

        {/* Status summary */}
        <div className="mb-5 grid grid-cols-3 gap-2">
          <div
            className="rounded-xl px-3 py-3 text-center"
            style={{ background: "var(--color-success-bg)" }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-success)" }}
            >
              {sorted.filter((a) => a.status === "approved").length}
            </p>
            <p
              className="text-[11px]"
              style={{ color: "var(--color-success)" }}
            >
              승인
            </p>
          </div>
          <div
            className="rounded-xl px-3 py-3 text-center"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <p
              className="text-lg font-bold"
              style={{ color: "var(--color-cta)" }}
            >
              {sorted.filter((a) => a.status === "reviewing" || a.status === "submitted").length}
            </p>
            <p
              className="text-[11px]"
              style={{ color: "var(--color-cta)" }}
            >
              검토 중
            </p>
          </div>
          <div
            className="rounded-xl px-3 py-3 text-center"
            style={{
              background:
                sorted.some((a) => a.status === "additional-docs")
                  ? "var(--color-warning-bg)"
                  : "var(--color-divider)",
            }}
          >
            <p
              className="text-lg font-bold"
              style={{
                color: sorted.some((a) => a.status === "additional-docs")
                  ? "var(--color-warning)"
                  : "var(--color-text-tertiary)",
              }}
            >
              {sorted.filter((a) => a.status === "additional-docs").length}
            </p>
            <p
              className="text-[11px]"
              style={{
                color: sorted.some((a) => a.status === "additional-docs")
                  ? "var(--color-warning)"
                  : "var(--color-text-tertiary)",
              }}
            >
              내 할 일
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {sorted.map((app) => {
            const status = statusConfig[app.status];
            const isAdditionalDocs = app.status === "additional-docs";

            return (
              <Link
                key={app.id}
                href={`/benefits/${app.benefitId}/status`}
                className="block rounded-2xl p-5 transition-all duration-200 hover:shadow-md"
                style={{
                  background: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Header row: status chip + arrow */}
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-semibold"
                    style={{ background: status.bg, color: status.color }}
                  >
                    {status.label}
                  </span>
                  <ChevronRight
                    size={16}
                    style={{ color: "var(--color-text-tertiary)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Benefit title */}
                <h3
                  className="mt-2.5 text-base font-semibold leading-snug"
                  style={{ color: "var(--color-primary)" }}
                >
                  {app.benefitTitle}
                </h3>

                {/* Amount + date row */}
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    {app.amount}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {formatDate(app.submittedDate)} 신청
                  </span>
                </div>

                {/* Additional docs hint */}
                {isAdditionalDocs && (
                  <div
                    className="mt-3 flex items-center gap-1.5 rounded-lg px-3 py-2"
                    style={{ background: "var(--color-warning-bg)" }}
                  >
                    <AlertCircle
                      size={13}
                      style={{ color: "var(--color-warning)" }}
                    />
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--color-warning)" }}
                    >
                      서류를 추가로 제출해주세요
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
