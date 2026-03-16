"use client";

import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { type DigestItem, type DigestCategory, formatKRW } from "@/data/mock";

const urgencyColor = {
  urgent: "#EA580C",
  normal: "var(--color-cta)",
  info: "#94A3B8",
};

/** Individual digest item — minimal, scan-friendly card */
export function DigestItemCard({ item }: { item: DigestItem }) {
  const dotColor = urgencyColor[item.urgency];

  return (
    <Link
      href={item.ctaHref}
      className="flex items-start gap-3.5 rounded-[16px] px-5 py-4 transition-colors duration-200 active:opacity-90"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid #F1F3F5",
      }}
    >
      {/* Status dot */}
      <div className="flex pt-1.5">
        <div
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            background: item.read ? "transparent" : dotColor,
          }}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {item.urgency === "urgent" && (
          <span
            className="mb-1 inline-block text-[11px] font-bold"
            style={{ color: "#EA580C" }}
          >
            긴급
          </span>
        )}
        <p
          className="text-[15px] font-semibold leading-snug"
          style={{
            color: item.read
              ? "var(--color-text-secondary)"
              : "var(--color-primary)",
          }}
        >
          {item.title}
        </p>
        <p
          className="mt-0.5 text-[13px] leading-relaxed"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {item.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="flex pt-2">
        <ChevronRight
          size={16}
          style={{ color: "var(--color-text-tertiary)" }}
        />
      </div>
    </Link>
  );
}

/** Summary card for home page */
export function DigestSummaryCard({
  weekLabel,
  benefitCount,
  documentCount,
  savingsAmount,
  projectUpdateCount,
  unreadCount,
}: {
  weekLabel: string;
  benefitCount: number;
  documentCount: number;
  savingsAmount: number;
  projectUpdateCount: number;
  unreadCount: number;
}) {
  const items = [
    benefitCount > 0 && `확인할 혜택 ${benefitCount}개`,
    documentCount > 0 && `추가 서류 요청 ${documentCount}건`,
    savingsAmount > 0 && `${formatKRW(savingsAmount)} 절약`,
    projectUpdateCount > 0 && `프로젝트 소식 ${projectUpdateCount}건`,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <Link
      href="/my/notifications"
      className="block rounded-[20px] px-6 py-5 transition-colors duration-200 active:opacity-95"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid #F1F3F5",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles
            size={14}
            style={{ color: "var(--color-cta)" }}
            aria-hidden="true"
          />
          <span
            className="text-[13px] font-semibold"
            style={{ color: "var(--color-cta)" }}
          >
            {weekLabel} 요약
          </span>
        </div>
        {unreadCount > 0 && (
          <span
            className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
            style={{ background: "var(--color-error)" }}
          >
            {unreadCount}
          </span>
        )}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
        {items.map((text, i) => (
          <span
            key={i}
            className="text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {text}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-1">
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--color-cta)" }}
        >
          알림 확인하기
        </span>
        <ChevronRight
          size={12}
          style={{ color: "var(--color-cta)" }}
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
