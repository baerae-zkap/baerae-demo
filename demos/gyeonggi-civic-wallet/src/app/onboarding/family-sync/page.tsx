"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Shield } from "lucide-react";
import { familyMembers } from "@/data/mock";
import FamilySyncInterstitial from "@/components/FamilySyncInterstitial";

export default function OnboardingFamilySyncPage() {
  const [showInterstitial, setShowInterstitial] = useState(false);

  return (
    <div
      className="min-h-[100dvh] flex flex-col"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <Link
          href="/onboarding/consents"
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={22} />
        </Link>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          4/6
        </span>
        <div className="w-10" />
      </div>

      {/* Heading */}
      <div className="px-6 pt-2 pb-6">
        <h1
          className="text-[22px] font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          가구 정보 확인
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          가구 정보를 확인하면 맞춤 혜택을 찾아드릴 수 있어요
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-5">
        {/* Family Members Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {familyMembers.map((member, index) => (
            <div key={member.id}>
              {index > 0 && (
                <div
                  className="mx-4"
                  style={{
                    height: "1px",
                    backgroundColor: "var(--color-divider)",
                  }}
                />
              )}
              <div className="flex items-center justify-between px-5 py-4">
                {/* Left: Name + relationship + age */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-[15px] font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {member.name}
                    </h3>
                    <span
                      className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: "var(--color-badge-recommend-bg)",
                        color: "var(--color-cta)",
                      }}
                    >
                      {member.relationship}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    만 {member.age}세
                  </p>
                </div>

                {/* Right: Check status */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <CheckCircle
                    size={16}
                    style={{ color: "var(--color-success)" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-success)" }}
                  >
                    확인 완료
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div
          className="mt-4 flex items-start gap-3 rounded-2xl p-4"
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--color-success-bg)" }}
          >
            <Shield size={18} style={{ color: "var(--color-success)" }} />
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              이 정보가 왜 필요한가요?
            </p>
            <p
              className="mt-1.5 text-xs leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              가구 구성은 복지 혜택 자격 판단에 사용돼요. 예를 들어, 자녀가
              있는 가구는 아동 관련 지원을 안내받을 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="px-6 pt-6 pb-10 flex flex-col items-center gap-3">
        <button
          onClick={() => setShowInterstitial(true)}
          className="w-full h-14 flex cursor-pointer items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          확인하고 계속
        </button>
        <Link
          href="/onboarding/document-setup"
          className="text-sm font-medium py-2"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          나중에 확인하기
        </Link>
      </div>
      <FamilySyncInterstitial
        open={showInterstitial}
        onDismiss={() => setShowInterstitial(false)}
        nextHref="/onboarding/document-setup"
      />
    </div>
  );
}
