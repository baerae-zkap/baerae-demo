"use client";

import { ShieldCheck, Unlock, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ConsentValueCardProps {
  consentLabel: string;
  unlockCount: number;
  unlockDescription: string;
  href: string;
  granted?: boolean;
}

export default function ConsentValueCard({
  consentLabel,
  unlockCount,
  unlockDescription,
  href,
  granted = false,
}: ConsentValueCardProps) {
  if (granted) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
        style={{
          background: "var(--color-success-bg)",
          border: "1px solid var(--color-success)",
        }}
      >
        <ShieldCheck
          size={18}
          style={{ color: "var(--color-success)" }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-success)" }}
          >
            {consentLabel} 동의 완료
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {unlockDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 hover:shadow-sm"
      style={{
        background: "var(--color-bg-card)",
        boxShadow: "var(--shadow-sm)",
        border: "1px dashed var(--color-border)",
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "var(--color-badge-recommend-bg)" }}
      >
        <Unlock
          size={18}
          style={{ color: "var(--color-cta)" }}
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {consentLabel} 동의하면
        </p>
        <p
          className="mt-0.5 text-xs"
          style={{ color: "var(--color-cta)" }}
        >
          {unlockCount}건의 혜택을 더 확인할 수 있어요
        </p>
      </div>
      <ChevronRight
        size={14}
        style={{ color: "var(--color-text-tertiary)" }}
        aria-hidden="true"
      />
    </Link>
  );
}
