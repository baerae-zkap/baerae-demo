"use client";

import Link from "next/link";
import { CreditCard, Gift, FileText } from "lucide-react";

export default function WelcomePage() {
  const features = [
    {
      icon: CreditCard,
      label: "더 유리한 결제",
      desc: "결제할 때 가장 아끼는 방법을 알려드려요",
      color: "var(--color-cta)",
      bg: "var(--color-badge-recommend-bg)",
    },
    {
      icon: Gift,
      label: "맞춤 혜택 안내",
      desc: "받을 수 있는 혜택을 자동으로 찾아드려요",
      color: "var(--color-success)",
      bg: "var(--color-success-bg)",
    },
    {
      icon: FileText,
      label: "서류 자동 준비",
      desc: "필요한 서류를 미리 준비해드려요",
      color: "var(--color-warning)",
      bg: "var(--color-warning-bg)",
    },
  ];

  return (
    <div
      className="min-h-[100dvh] flex flex-col justify-between px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Section */}
      <div className="pt-8">
        <p
          className="text-sm font-medium tracking-wide mb-4"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          경기 시민지갑
        </p>
        <h1
          className="text-[28px] leading-tight font-bold whitespace-pre-line"
          style={{ color: "var(--color-primary)" }}
        >
          {"결제, 혜택, 서류를\n한 곳에서"}
        </h1>
        <p
          className="text-base mt-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          경기도가 만든 시민을 위한 생활 금융 서비스
        </p>
      </div>

      {/* Middle Section — Feature Preview Cards */}
      <div className="flex flex-col gap-3 my-10">
        {features.map(({ icon: Icon, label, desc, color, bg }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl"
            style={{
              backgroundColor: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Icon size={20} className="shrink-0 mt-0.5" style={{ color }} />
            <div>
              <span
                className="text-[15px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {label}
              </span>
              <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-tertiary)" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col items-center gap-4">
        <Link
          href="/login"
          className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          시작하기
        </Link>
        <p
          className="text-sm"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium"
            style={{ color: "var(--color-cta)" }}
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
