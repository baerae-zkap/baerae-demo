"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { personalDocuments, familyMembers, benefits as allBenefits } from "@/data/mock";
import EventInterstitial from "@/components/EventInterstitial";

export default function CompletePage() {
  const readyCount = personalDocuments.filter(
    (d) => d.category === "준비 완료"
  ).length;
  const familyCount = familyMembers.length;

  const summaryItems = [
    {
      label: "맞춤 결제 비교",
      status: "활성화",
    },
    {
      label: "혜택 자동 안내",
      status: "활성화",
    },
    {
      label: "서류 자동 준비",
      status: `${readyCount}건 준비 완료`,
    },
    {
      label: "가구 정보 동기화",
      status: `${familyCount}명 확인`,
    },
  ];

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Success Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "var(--color-success-bg)" }}
      >
        <CheckCircle size={40} style={{ color: "var(--color-success)" }} />
      </div>

      {/* Heading */}
      <h1
        className="text-2xl font-bold mb-2 text-center"
        style={{ color: "var(--color-primary)" }}
      >
        모든 준비가 끝났어요!
      </h1>
      <p
        className="text-base mb-8 text-center"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {allBenefits.length}건의 맞춤 혜택을 찾았어요
      </p>

      {/* Summary Card */}
      <div
        className="w-full rounded-2xl overflow-hidden mb-8"
        style={{
          backgroundColor: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {summaryItems.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle
                  size={20}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  className="text-[15px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-success)" }}
              >
                {item.status}
              </span>
            </div>
            {index < summaryItems.length - 1 && (
              <div
                className="mx-5 h-px"
                style={{ backgroundColor: "var(--color-divider)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="w-full mt-auto">
        <Link
          href="/home"
          className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          홈으로 가기
        </Link>
      </div>
      <EventInterstitial eventType="first-linked-service" />
    </div>
  );
}
