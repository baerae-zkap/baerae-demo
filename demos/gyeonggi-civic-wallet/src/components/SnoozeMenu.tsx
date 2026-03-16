"use client";

import { useState, useCallback, useEffect } from "react";
import { Clock, EyeOff, X, BellOff } from "lucide-react";

type SnoozeOption = {
  label: string;
  action: "snoozed" | "dismissed" | "permanently-hidden";
  snoozeDays?: number;
};

const defaultOptions: SnoozeOption[] = [
  { label: "내일 다시 알려주기", action: "snoozed", snoozeDays: 1 },
  { label: "이번 주는 안 볼래요", action: "snoozed", snoozeDays: 7 },
  { label: "그만 보기", action: "dismissed" },
  { label: "다시 보지 않기", action: "permanently-hidden" },
];

interface SnoozeMenuProps {
  open: boolean;
  onClose: () => void;
  onSelect: (action: "snoozed" | "dismissed" | "permanently-hidden", snoozedUntil?: string) => void;
  options?: SnoozeOption[];
  title?: string;
}

export default function SnoozeMenu({
  open,
  onClose,
  onSelect,
  options = defaultOptions,
  title = "이 알림을 어떻게 할까요?",
}: SnoozeMenuProps) {
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

  function getSnoozedUntil(days: number): string {
    const d = new Date("2026-03-10");
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  function getIcon(action: SnoozeOption["action"]) {
    switch (action) {
      case "snoozed":
        return <Clock size={15} style={{ color: "var(--color-cta)" }} />;
      case "dismissed":
        return <BellOff size={15} style={{ color: "var(--color-text-tertiary)" }} />;
      case "permanently-hidden":
        return <EyeOff size={15} style={{ color: "var(--color-error)" }} />;
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="sheet-enter fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[430px] rounded-t-3xl px-5 pb-8 pt-6"
        style={{ background: "var(--color-bg-card)" }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-5 flex justify-center">
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
          style={{ background: "var(--color-divider)" }}
          aria-label="닫기"
        >
          <X size={16} style={{ color: "var(--color-text-tertiary)" }} />
        </button>

        <p
          className="mb-4 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </p>

        <div className="flex flex-col gap-1">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => {
                const until = opt.snoozeDays
                  ? getSnoozedUntil(opt.snoozeDays)
                  : undefined;
                onSelect(opt.action, until);
                onClose();
              }}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors duration-200 hover:bg-black/[0.03]"
            >
              {getIcon(opt.action)}
              <span
                className="text-sm"
                style={{
                  color:
                    opt.action === "permanently-hidden"
                      ? "var(--color-error)"
                      : "var(--color-primary)",
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-3 flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          취소
        </button>
      </div>
    </>
  );
}
