"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import {
  Check,
  AlertCircle,
  Bell,
  Clock,
  FileText,
  PartyPopper,
} from "lucide-react";
import {
  benefitDetails,
  benefitApplications,
  applicationTimelines,
  type StatusTimelineEntry,
} from "@/data/mock";

export default function StatusPage() {
  const { id } = useParams<{ id: string }>();
  const benefit = benefitDetails[id];

  if (!benefit) {
    return (
      <>
        <TopNav title="진행 상태" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertCircle size={28} style={{ color: "var(--color-error)" }} />
          </div>
          <p
            className="mt-4 text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            혜택 정보를 찾을 수 없어요
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            잘못된 경로이거나 삭제된 혜택이에요
          </p>
          <Link
            href="/benefits"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl px-8 text-sm font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 목록으로
          </Link>
        </div>
      </>
    );
  }

  const app = benefitApplications.find((a) => a.benefitId === id);
  const timeline: StatusTimelineEntry[] = app
    ? (applicationTimelines[app.id] ?? benefit.timeline)
    : benefit.timeline;

  const submittedDate = app?.submittedDate ?? null;
  const isApproved = app?.status === "approved";
  const isAdditionalDocs = app?.status === "additional-docs";

  const currentStep = timeline.find((t) => t.status === "current");
  const additionalDocsDescription =
    isAdditionalDocs && currentStep ? currentStep.description : null;

  return (
    <>
      <TopNav title="진행 상태" showBack />

      <div className="px-5 pt-2 pb-10">
        {/* Benefit Info Card */}
        <div
          className="mb-6 rounded-2xl p-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <p
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {benefit.title}
          </p>
          <p
            className="mt-1 text-xl font-bold"
            style={{ color: "var(--color-cta)" }}
          >
            {benefit.amount}
          </p>
          {submittedDate && (
            <div className="mt-2 flex items-center gap-1.5">
              <Clock size={13} style={{ color: "var(--color-text-tertiary)" }} />
              <p
                className="text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {submittedDate.replace(
                  /(\d{4})-(\d{2})-(\d{2})/,
                  "$1년 $2월 $3일"
                ).replace(/년 0/, "년 ").replace(/월 0/, "월 ")} 신청
              </p>
            </div>
          )}
        </div>

        {/* Approved celebration banner */}
        {isApproved && (
          <div
            className="mb-6 flex items-center gap-3 rounded-2xl p-4"
            style={{ background: "var(--color-success-bg)" }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--color-bg-card)" }}
            >
              <PartyPopper size={18} style={{ color: "var(--color-success)" }} />
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              축하해요! 혜택이 승인됐어요
            </p>
          </div>
        )}

        {/* Timeline */}
        <section className="mb-6">
          <h2
            className="mb-5 text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            신청 진행 상태
          </h2>

          <div className="relative pl-9">
            {timeline.map((entry, index) => {
              const isLast = index === timeline.length - 1;
              const isDone = entry.status === "done";
              const isCurrent = entry.status === "current";
              const isUpcoming = entry.status === "upcoming";

              return (
                <div key={`${entry.step}-${index}`} className="relative pb-8 last:pb-0">
                  {/* Vertical connector line */}
                  {!isLast && (
                    <div
                      className="absolute"
                      style={{
                        left: "-21px",
                        top: "22px",
                        bottom: "0",
                        width: "2px",
                        borderLeft: isUpcoming
                          ? "2px dashed var(--color-border)"
                          : isDone
                          ? "2px solid var(--color-success)"
                          : "2px solid var(--color-cta)",
                      }}
                    />
                  )}

                  {/* Circle indicator */}
                  <div
                    className="absolute flex items-center justify-center"
                    style={{ left: "-30px", top: "2px", width: "20px", height: "20px" }}
                  >
                    {isDone && (
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full"
                        style={{ background: "var(--color-success)" }}
                      >
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="relative flex h-5 w-5 items-center justify-center">
                        <div
                          className="absolute h-5 w-5 rounded-full"
                          style={{
                            background: "var(--color-cta)",
                            opacity: 0.2,
                            animation: "pulse-ring 2s ease-in-out infinite",
                          }}
                        />
                        <div
                          className="relative h-2.5 w-2.5 rounded-full"
                          style={{ background: "var(--color-cta)" }}
                        />
                      </div>
                    )}
                    {isUpcoming && (
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{
                          border: "2px dashed var(--color-border)",
                          background: "var(--color-bg)",
                        }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div>
                    <p
                      className="text-sm font-semibold leading-tight"
                      style={{
                        color: isUpcoming
                          ? "var(--color-text-tertiary)"
                          : "var(--color-primary)",
                      }}
                    >
                      {entry.step}
                    </p>
                    {entry.date && (
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {entry.date.replace(
                          /(\d{4})-(\d{2})-(\d{2})/,
                          "$1년 $2월 $3일"
                        ).replace(/년 0/, "년 ").replace(/월 0/, "월 ")}
                      </p>
                    )}
                    {entry.description && (
                      <p
                        className="mt-1 text-xs leading-relaxed"
                        style={{
                          color: isCurrent
                            ? "var(--color-cta)"
                            : "var(--color-text-tertiary)",
                          fontWeight: isCurrent ? 500 : 400,
                        }}
                      >
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Additional docs action card */}
        {isAdditionalDocs && (
          <div
            className="mb-6 rounded-2xl p-5"
            style={{
              background: "var(--color-warning-bg)",
              border: "1px solid var(--color-warning)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--color-bg-card)" }}
              >
                <FileText size={18} style={{ color: "var(--color-warning)" }} />
              </div>
              <div className="flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-warning)" }}
                >
                  추가 서류가 필요해요
                </p>
                {additionalDocsDescription && (
                  <p
                    className="mt-0.5 text-xs leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {additionalDocsDescription}
                  </p>
                )}
              </div>
            </div>
            <Link
              href={`/benefits/${id}/documents`}
              className="mt-4 flex h-11 items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors duration-200"
              style={{ background: "var(--color-warning)" }}
            >
              서류 다시 제출하기
            </Link>
          </div>
        )}

        {/* Notification info card */}
        {!isApproved && (
          <div
            className="mb-6 flex items-center gap-3 rounded-2xl p-4"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--color-bg-card)" }}
            >
              <Bell size={16} style={{ color: "var(--color-cta)" }} />
            </div>
            <p
              className="text-xs font-medium leading-relaxed"
              style={{ color: "var(--color-cta)" }}
            >
              검토가 완료되면 알림으로 안내해드릴게요
            </p>
          </div>
        )}

        {/* CTA */}
        <Link
          href="/home"
          className="flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200"
          style={{ background: "var(--color-cta)" }}
        >
          홈으로
        </Link>
      </div>
    </>
  );
}
