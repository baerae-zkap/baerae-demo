"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { formatKRW } from "@/data/mock";

interface InvestSuggestionProps {
  open: boolean;
  onDismiss: () => void;
  cityName?: string;
  amount?: number;
}

export default function InvestSuggestion({ open, onDismiss, cityName = "수원", amount = 100000 }: InvestSuggestionProps) {
  const [visible, setVisible] = useState(false);

  // 연 4.2% → 월 수익 계산
  const monthlyReturn = Math.floor(amount * 0.042 / 12);
  const displayAmount = amount >= 10000
    ? `${(amount / 10000).toLocaleString()}만원`
    : formatKRW(amount);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Match the app's outer background */}
      <div className="absolute inset-0" style={{ background: "#E2E8F0" }} />

      {/* Mobile frame */}
      <div
        className="relative flex h-full w-full max-w-[430px] flex-col overflow-hidden"
        style={{ background: "var(--color-bg)", boxShadow: "0 0 40px rgba(0,0,0,0.1)" }}
      >
        {/* Slide-up panel */}
        <div
          className="flex flex-1 flex-col transition-transform duration-300 ease-out"
          style={{ transform: visible ? "translateY(0)" : "translateY(60%)" }}
        >
          {/* Close button */}
          <div className="flex justify-end px-5 pt-4">
            <button
              onClick={handleDismiss}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
              aria-label="닫기"
            >
              <X size={20} style={{ color: "var(--color-text-tertiary)" }} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center justify-center px-8 pb-8">
            {/* Hero illustration */}
            <div
              className="mb-8 flex h-40 w-40 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #EBF2FF 0%, #DBEAFE 50%, #C7D9F7 100%)" }}
            >
              <span className="text-[72px]">☀️</span>
            </div>

            {/* Tangible benefit */}
            <h1
              className="text-center text-[24px] font-bold leading-snug"
              style={{ color: "var(--color-primary)" }}
            >
              {displayAmount} 참여하면
              <br />
              매달 약 <span style={{ color: "var(--color-cta)" }}>{formatKRW(monthlyReturn)}</span>을 받을 수 있어요
            </h1>

            {/* Project label */}
            <p
              className="mt-3 text-center text-[15px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {cityName} 시민들이 함께 만드는 태양광 프로젝트
            </p>

            {/* Return rate badge */}
            <div
              className="mt-5 rounded-full px-4 py-2"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <span
                className="text-[14px] font-semibold"
                style={{ color: "var(--color-cta)" }}
              >
                연 4.2% 예상 수익 · 24개월 만기
              </span>
            </div>
          </div>

          {/* Bottom section: progress + CTAs */}
          <div className="px-6 pb-10">
            {/* Progress inline with CTA */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                  모집 현황
                </span>
                <span className="text-[12px] font-semibold" style={{ color: "var(--color-cta)" }}>
                  77% 달성
                </span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full"
                style={{ background: "var(--color-divider)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: "77%", background: "var(--color-cta)" }}
                />
              </div>
              <p className="mt-1.5 text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                마감이 얼마 남지 않았어요
              </p>
            </div>

            <Link
              href="/invest/project/suwon-solar"
              onClick={handleDismiss}
              className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-cta)" }}
            >
              프로젝트 참여하기
            </Link>
            <button
              onClick={handleDismiss}
              className="mt-3 flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[12px] text-[15px] font-medium transition-opacity duration-200 active:opacity-80"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              나중에 볼게요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
