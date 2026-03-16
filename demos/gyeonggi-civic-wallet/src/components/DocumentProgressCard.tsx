"use client";

import Link from "next/link";
import { FileText, CircleCheck, CircleAlert, ChevronRight } from "lucide-react";

interface DocumentProgressCardProps {
  readyCount: number;
  totalCount: number;
  missingCount: number;
  autoFetchAvailable?: boolean;
  href?: string;
}

export default function DocumentProgressCard({
  readyCount,
  totalCount,
  missingCount,
  autoFetchAvailable = false,
  href = "/my/documents",
}: DocumentProgressCardProps) {
  const allReady = missingCount === 0;
  const progress = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;

  return (
    <Link
      href={href}
      className="block rounded-2xl px-5 py-4 transition-all duration-200 hover:shadow-md"
      style={{
        background: "var(--color-bg-card)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: allReady ? "var(--color-success-bg)" : "var(--color-warning-bg)",
          }}
        >
          <FileText
            size={18}
            style={{
              color: allReady ? "var(--color-success)" : "var(--color-warning)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {allReady ? (
              <CircleCheck
                size={13}
                style={{ color: "var(--color-success)" }}
                aria-hidden="true"
              />
            ) : (
              <CircleAlert
                size={13}
                style={{ color: "var(--color-warning)" }}
                aria-hidden="true"
              />
            )}
            <span
              className="text-xs font-semibold"
              style={{
                color: allReady ? "var(--color-success)" : "var(--color-warning)",
              }}
            >
              {allReady
                ? "서류 준비 완료"
                : `서류 ${missingCount}개만 더 준비하면 돼요`}
            </span>
          </div>
          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            {readyCount}/{totalCount}건 준비됨
          </p>

          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full"
              style={{ background: "var(--color-border)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: allReady
                    ? "var(--color-success)"
                    : "var(--color-warning)",
                }}
              />
            </div>
            <span
              className="text-[11px] font-medium"
              style={{
                color: allReady ? "var(--color-success)" : "var(--color-warning)",
              }}
            >
              {progress}%
            </span>
          </div>

          {!allReady && autoFetchAvailable && (
            <p
              className="mt-1.5 text-[11px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              자동으로 가져올 수 있는 서류가 있어요
            </p>
          )}
        </div>
        <ChevronRight
          size={14}
          className="mt-1 shrink-0"
          style={{ color: "var(--color-text-tertiary)" }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
