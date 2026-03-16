"use client";

import Link from "next/link";
import { Lock, Unlock, ChevronRight, Sparkles } from "lucide-react";

interface UnlockPreviewCardProps {
  /** What's locked */
  lockedLabel: string;
  /** How many items unlock */
  unlockCount: number;
  /** What action unlocks it */
  unlockAction: string;
  /** Where the action goes */
  href: string;
  /** Is it already unlocked? */
  unlocked?: boolean;
  /** Optional reason */
  reason?: string;
}

export default function UnlockPreviewCard({
  lockedLabel,
  unlockCount,
  unlockAction,
  href,
  unlocked = false,
  reason,
}: UnlockPreviewCardProps) {
  if (unlocked) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
        style={{
          background: "var(--color-success-bg)",
        }}
      >
        <Unlock
          size={16}
          style={{ color: "var(--color-success)" }}
          aria-hidden="true"
        />
        <p
          className="flex-1 text-sm font-medium"
          style={{ color: "var(--color-success)" }}
        >
          {lockedLabel} 확인 가능
        </p>
        <Sparkles
          size={13}
          style={{ color: "var(--color-success)" }}
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-all duration-200 hover:shadow-sm"
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
        <Lock
          size={16}
          style={{ color: "var(--color-cta)" }}
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-xs font-medium"
          style={{ color: "var(--color-cta)" }}
        >
          {unlockAction}하면
        </p>
        <p
          className="mt-0.5 text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {lockedLabel} {unlockCount}건 확인 가능
        </p>
        {reason && (
          <p
            className="mt-0.5 text-[11px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {reason}
          </p>
        )}
      </div>
      <ChevronRight
        size={14}
        className="shrink-0"
        style={{ color: "var(--color-text-tertiary)" }}
        aria-hidden="true"
      />
    </Link>
  );
}
