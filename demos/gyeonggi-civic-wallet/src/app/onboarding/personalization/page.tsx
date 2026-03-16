"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, Gift, FileText } from "lucide-react";

const benefits = [
  {
    icon: CreditCard,
    title: "더 유리한 결제 안내",
    description:
      "결제할 때 가장 많이 아낄 수 있는 수단을 자동으로 비교해요",
    iconColor: "var(--color-cta)",
    iconBg: "var(--color-badge-recommend-bg)",
  },
  {
    icon: Gift,
    title: "받을 수 있는 혜택 안내",
    description:
      "가구 정보를 기반으로 신청 가능한 복지 혜택을 찾아드려요",
    iconColor: "var(--color-success)",
    iconBg: "var(--color-success-bg)",
  },
  {
    icon: FileText,
    title: "필요한 서류 자동 준비",
    description:
      "혜택 신청에 필요한 서류를 자동으로 불러오거나 안내해드려요",
    iconColor: "var(--color-warning)",
    iconBg: "var(--color-warning-bg)",
  },
];

export default function PersonalizationPage() {
  return (
    <div
      className="min-h-[100dvh] flex flex-col px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <Link
          href="/onboarding/terms"
          className="flex items-center justify-center"
        >
          <ArrowLeft size={22} style={{ color: "var(--color-primary)" }} />
        </Link>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          2/6
        </span>
      </div>

      {/* Heading */}
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        맞춤 설정을 시작할게요
      </h1>
      <p
        className="text-base mb-10 whitespace-pre-line"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {"몇 가지 정보만 알려주시면\n결제, 혜택, 서류를 맞춤으로 준비해 드려요"}
      </p>

      {/* Benefit Cards */}
      <div className="flex flex-col gap-4">
        {benefits.map(({ icon: Icon, title, description, iconColor, iconBg }) => (
          <div
            key={title}
            className="flex items-start gap-4 px-5 py-5 rounded-2xl"
            style={{
              backgroundColor: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: iconBg }}
            >
              <Icon size={22} style={{ color: iconColor }} />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span
                className="text-[15px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {title}
              </span>
              <span
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6">
        <Link
          href="/onboarding/consents"
          className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          맞춤 설정 시작
        </Link>
      </div>
    </div>
  );
}
