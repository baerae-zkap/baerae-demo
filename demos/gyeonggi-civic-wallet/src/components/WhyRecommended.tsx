"use client";

import { useState, useEffect, useCallback } from "react";
import { HelpCircle, X, CheckCircle, ChevronRight } from "lucide-react";

export type WhyReason = {
  label: string;
  met: boolean;
};

type WhyRecommendedSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  reasons: WhyReason[];
  footer?: string;
};

function WhyRecommendedSheet({
  open,
  onClose,
  title,
  reasons,
  footer,
}: WhyRecommendedSheetProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
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

  const metCount = reasons.filter((r) => r.met).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className="sheet-enter fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-6 pb-10 pt-6"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Handle bar */}
        <div className="mb-5 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
          style={{ background: "var(--color-divider)" }}
          aria-label="닫기"
        >
          <X size={16} style={{ color: "var(--color-text-tertiary)" }} />
        </button>

        {/* Icon */}
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: "var(--color-badge-recommend-bg)" }}
        >
          <HelpCircle size={22} style={{ color: "var(--color-cta)" }} />
        </div>

        {/* Title */}
        <h2
          className="mb-1 text-lg font-bold leading-snug"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h2>

        {/* Met count summary */}
        <p
          className="mb-5 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {metCount}가지 조건이 확인됐어요
        </p>

        {/* Reasons list */}
        <ul className="mb-5 flex flex-col gap-3">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="mt-0.5 shrink-0"
                style={{
                  color: reason.met
                    ? "var(--color-success)"
                    : "var(--color-border)",
                }}
              />
              <span
                className="text-sm leading-relaxed"
                style={{
                  color: reason.met
                    ? "var(--color-primary)"
                    : "var(--color-text-tertiary)",
                }}
              >
                {reason.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer explanation */}
        {footer && (
          <div
            className="mb-5 rounded-xl px-4 py-3"
            style={{ background: "var(--color-divider)" }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {footer}
            </p>
          </div>
        )}

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="flex w-full cursor-pointer items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          확인했어요
        </button>
      </div>
    </>
  );
}

// --- Trigger variants ---

/** Inline chip trigger: "왜 안내됐나요?" */
export function WhyChip({
  title,
  reasons,
  footer,
  label,
}: {
  title: string;
  reasons: WhyReason[];
  footer?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors duration-200 hover:bg-black/[0.03]"
        style={{
          color: "var(--color-cta)",
          background: "var(--color-badge-recommend-bg)",
        }}
        aria-label={label ?? "왜 안내됐나요?"}
      >
        <HelpCircle size={11} aria-hidden="true" />
        {label ?? "왜 안내됐나요?"}
      </button>
      <WhyRecommendedSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        reasons={reasons}
        footer={footer}
      />
    </>
  );
}

/** Inline text link trigger */
export function WhyLink({
  title,
  reasons,
  footer,
  label,
}: {
  title: string;
  reasons: WhyReason[];
  footer?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex cursor-pointer items-center gap-0.5 text-[11px] font-medium transition-colors duration-200"
        style={{ color: "var(--color-text-tertiary)" }}
        aria-label={label ?? "왜 이렇게 안내됐나요?"}
      >
        {label ?? "왜 안내됐나요?"}
        <ChevronRight size={10} aria-hidden="true" />
      </button>
      <WhyRecommendedSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        reasons={reasons}
        footer={footer}
      />
    </>
  );
}

export default WhyRecommendedSheet;
