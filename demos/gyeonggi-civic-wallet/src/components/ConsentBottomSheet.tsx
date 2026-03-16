"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export type ConsentSheetConfig = {
  title: string;
  benefits: string[];
  dataUsage: string;
  consentLabel: string;
  required?: boolean;
};

const consentItems = [
  { id: "gov-data", label: "행정정보 공동이용 동의", required: true },
  { id: "personal-info", label: "개인정보 수집 및 이용 동의", required: true },
  { id: "third-party", label: "개인정보 제3자 제공 동의", required: true },
];

export default function ConsentBottomSheet({
  open,
  onClose,
  onConsent,
  config,
}: {
  open: boolean;
  onClose: () => void;
  onConsent: () => void;
  config: ConsentSheetConfig;
}) {
  const [allChecked, setAllChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

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
      // Reset state on open
      setAllChecked(false);
      setExpanded(false);
      setCheckedItems({});
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const handleToggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    const updated: Record<string, boolean> = {};
    for (const item of consentItems) {
      updated[item.id] = next;
    }
    setCheckedItems(updated);
  };

  const handleToggleItem = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    const allOn = consentItems.every((item) => updated[item.id]);
    setAllChecked(allOn);
  };

  const allRequired = consentItems
    .filter((i) => i.required)
    .every((i) => checkedItems[i.id]);

  if (!open) return null;

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
        className="sheet-enter fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-6 pb-8 pt-4"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-modal="true"
        aria-label={config.title}
      >
        {/* Handle bar */}
        <div className="mb-6 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        {/* Title */}
        <h2
          className="mb-2 text-[20px] font-bold leading-snug"
          style={{ color: "var(--color-primary)" }}
        >
          {config.title}
        </h2>

        {/* Subtitle */}
        <p
          className="mb-6 text-[14px] leading-relaxed"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {config.dataUsage}
        </p>

        {/* ─── All consent toggle ─── */}
        <button
          onClick={handleToggleAll}
          className="flex w-full cursor-pointer items-center gap-3 rounded-[16px] px-4 py-4"
          style={{ background: "var(--color-divider)" }}
        >
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
            style={{
              background: allChecked ? "var(--color-cta)" : "transparent",
              border: allChecked ? "none" : "2px solid var(--color-border)",
            }}
          >
            {allChecked && <Check size={14} color="#fff" strokeWidth={3} />}
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span
              className="rounded px-1.5 py-0.5 text-[11px] font-bold text-white"
              style={{ background: "var(--color-cta)" }}
            >
              필수
            </span>
            <span
              className="text-[15px] font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              약관 전체 동의
            </span>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                setExpanded(!expanded);
              }
            }}
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center"
          >
            {expanded ? (
              <ChevronUp size={18} style={{ color: "var(--color-text-tertiary)" }} />
            ) : (
              <ChevronDown size={18} style={{ color: "var(--color-text-tertiary)" }} />
            )}
          </div>
        </button>

        {/* ─── Individual items (expandable) ─── */}
        {expanded && (
          <div className="mt-2 flex flex-col gap-0 px-1">
            {consentItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className="flex w-full cursor-pointer items-center gap-3 py-3"
              >
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                  style={{
                    background: checkedItems[item.id] ? "var(--color-cta)" : "transparent",
                    border: checkedItems[item.id] ? "none" : "2px solid var(--color-border)",
                  }}
                >
                  {checkedItems[item.id] && <Check size={12} color="#fff" strokeWidth={3} />}
                </div>
                <span
                  className="text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item.label}
                </span>
                {item.required && (
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    (필수)
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* ─── CTA ─── */}
        <button
          onClick={() => {
            if (allRequired) onConsent();
          }}
          disabled={!allRequired}
          className="mt-5 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "var(--color-cta)" }}
        >
          동의하고 서류 준비하기
        </button>

        {/* ─── Later ─── */}
        <button
          onClick={onClose}
          className="mt-2 flex w-full cursor-pointer items-center justify-center py-3 text-[14px] font-medium transition-opacity duration-200"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          나중에
        </button>
      </div>
    </>
  );
}
