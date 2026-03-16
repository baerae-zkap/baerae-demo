"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export type InterstitialConfig = {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function RecommendInterstitial({
  open,
  onDismiss,
  config,
}: {
  open: boolean;
  onDismiss: () => void;
  config: InterstitialConfig;
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
        aria-label={config.title}
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

        {/* Content — centered */}
        <div className="flex flex-col items-center text-center">
          {/* Large icon */}
          <div
            className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: config.iconBg }}
          >
            {config.icon}
          </div>

          {/* Headline */}
          <h2
            className="mb-2 text-xl font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {config.title}
          </h2>

          {/* Value statement */}
          <p
            className="mb-8 text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {config.description}
          </p>

          {/* Primary CTA */}
          <Link
            href={config.ctaHref}
            className="mb-3 flex w-full items-center justify-center rounded-2xl py-4 text-base font-semibold text-white transition-colors duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {config.ctaLabel}
          </Link>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="flex w-full cursor-pointer items-center justify-center rounded-2xl py-3 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            괜찮아요
          </button>
        </div>
      </div>
    </>
  );
}
