"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  FileCheck,
  CheckCircle,
  Upload,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type DocSummary = {
  autoFetched: number;
  alreadyReady: number;
  manualRemaining: number;
  totalDocs: number;
};

export default function DocumentReadyInterstitial({
  open,
  onDismiss,
  docs,
  ctaHref,
  ctaLabel,
  /** Optional benefit title for context */
  benefitTitle,
}: {
  open: boolean;
  onDismiss: () => void;
  docs: DocSummary;
  ctaHref: string;
  ctaLabel?: string;
  benefitTitle?: string;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const allReady = docs.manualRemaining === 0;
  const readyCount = docs.autoFetched + docs.alreadyReady;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="sheet-enter fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-6 pb-10 pt-8"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-modal="true"
        aria-label="서류 준비 완료"
      >
        {/* Handle bar */}
        <div className="mb-6 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
          style={{ background: "var(--color-divider)" }}
          aria-label="닫기"
        >
          <X size={16} style={{ color: "var(--color-text-tertiary)" }} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <FileCheck size={36} style={{ color: "var(--color-success)" }} />
          </div>

          <h2
            className="mb-1 text-xl font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {allReady
              ? "서류가 모두 준비됐어요"
              : "서류 준비가 거의 끝났어요"}
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {allReady
              ? "이제 바로 신청할 수 있어요"
              : `${docs.manualRemaining}개만 더 확인하면 바로 신청할 수 있어요`}
          </p>
        </div>

        {/* Summary cards */}
        <div className="mt-6 flex flex-col gap-2.5">
          {/* Auto-fetch celebration */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-3"
            style={{ background: "var(--color-success-bg)" }}
          >
            <Sparkles
              size={16}
              style={{ color: "var(--color-success)" }}
              aria-hidden="true"
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-success)" }}
            >
              자동으로{" "}
              <span className="font-bold">{docs.autoFetched}건</span> 불러왔어요
            </p>
          </div>

          {/* Ready count */}
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--color-success-bg)" }}
            >
              <CheckCircle
                size={18}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {readyCount}/{docs.totalDocs}건 준비 완료
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                직접 방문이나 출력 없이 자동 준비됐어요
              </p>
            </div>
          </div>

          {/* Remaining manual docs hint */}
          {docs.manualRemaining > 0 && (
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-warning)",
                borderColor:
                  "color-mix(in srgb, var(--color-warning) 30%, transparent)",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "var(--color-warning-bg)" }}
              >
                <Upload
                  size={18}
                  style={{ color: "var(--color-warning)" }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  직접 첨부 {docs.manualRemaining}건만 남았어요
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  사진 찍거나 파일로 올려주세요
                </p>
              </div>
            </div>
          )}

          {/* Benefit context */}
          {benefitTitle && (
            <p
              className="mt-1 text-center text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {benefitTitle} 신청을 위한 서류예요
            </p>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href={ctaHref}
            className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {ctaLabel ?? (allReady ? "신청서 확인하기" : "이어서 진행하기")}
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={onDismiss}
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            나중에
          </button>
        </div>
      </div>
    </>
  );
}
