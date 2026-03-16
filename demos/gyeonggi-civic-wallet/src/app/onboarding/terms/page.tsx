"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

interface TermItem {
  id: string;
  label: string;
  required: boolean;
}

const terms: TermItem[] = [
  { id: "service", label: "서비스 이용약관", required: true },
  { id: "privacy", label: "개인정보 수집 및 이용", required: true },
  { id: "finance", label: "전자금융거래 이용약관", required: true },
  { id: "marketing", label: "마케팅 정보 수신 동의", required: false },
];

export default function TermsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    service: false,
    privacy: false,
    finance: false,
    marketing: false,
  });

  const allChecked = terms.every((t) => checked[t.id]);
  const allRequiredChecked = terms
    .filter((t) => t.required)
    .every((t) => checked[t.id]);

  function handleToggleAll() {
    const next = !allChecked;
    const updated: Record<string, boolean> = {};
    terms.forEach((t) => {
      updated[t.id] = next;
    });
    setChecked(updated);
  }

  function handleToggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/login" className="flex items-center justify-center">
          <ArrowLeft size={22} style={{ color: "var(--color-primary)" }} />
        </Link>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          1/6
        </span>
      </div>

      {/* Heading */}
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        서비스 이용약관
      </h1>
      <p
        className="text-base mb-8"
        style={{ color: "var(--color-text-secondary)" }}
      >
        필수 약관에 동의해 주세요
      </p>

      {/* Terms Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Toggle All */}
        <button
          type="button"
          onClick={handleToggleAll}
          className="w-full flex items-center gap-3 px-5 py-4"
        >
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors"
            style={{
              backgroundColor: allChecked
                ? "var(--color-cta)"
                : "transparent",
              border: allChecked
                ? "none"
                : "2px solid var(--color-border)",
            }}
          >
            {allChecked && <Check size={16} color="#FFFFFF" strokeWidth={3} />}
          </span>
          <span
            className="text-[15px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            전체 동의
          </span>
        </button>

        {/* Divider */}
        <div
          className="mx-5 h-px"
          style={{ backgroundColor: "var(--color-divider)" }}
        />

        {/* Individual Terms */}
        {terms.map((term) => (
          <button
            key={term.id}
            type="button"
            onClick={() => handleToggle(term.id)}
            className="w-full flex items-center gap-3 px-5 py-3.5"
          >
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors"
              style={{
                backgroundColor: checked[term.id]
                  ? "var(--color-cta)"
                  : "transparent",
                border: checked[term.id]
                  ? "none"
                  : "2px solid var(--color-border)",
              }}
            >
              {checked[term.id] && (
                <Check size={16} color="#FFFFFF" strokeWidth={3} />
              )}
            </span>
            <span className="flex items-center gap-2">
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{
                  color: term.required
                    ? "var(--color-cta)"
                    : "var(--color-text-tertiary)",
                  backgroundColor: term.required
                    ? "var(--color-badge-recommend-bg)"
                    : "var(--color-divider)",
                }}
              >
                {term.required ? "필수" : "선택"}
              </span>
              <span
                className="text-[15px]"
                style={{
                  color: term.required
                    ? "var(--color-primary)"
                    : "var(--color-text-tertiary)",
                }}
              >
                {term.label}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6">
        {allRequiredChecked ? (
          <Link
            href="/onboarding/personalization"
            className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
            style={{ backgroundColor: "var(--color-cta)" }}
          >
            동의하고 계속
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white cursor-not-allowed opacity-40"
            style={{ backgroundColor: "var(--color-cta)" }}
          >
            동의하고 계속
          </button>
        )}
      </div>
    </div>
  );
}
