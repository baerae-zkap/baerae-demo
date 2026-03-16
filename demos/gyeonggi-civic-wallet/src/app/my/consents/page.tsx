"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import { consents as defaultConsents, type Consent } from "@/data/mock";
import { Lock, Check, AlertTriangle } from "lucide-react";

const categoryMap: Record<string, string> = {
  "기본": "기본 정보 (필수)",
  "가구": "가구 정보",
  "개인": "개인 정보",
  "자산": "자산 정보",
  "서비스": "서비스 연동",
};

const categoryOrder = ["기본", "가구", "개인", "자산", "서비스"];

function Toggle({
  enabled,
  disabled,
  onToggle,
}: {
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200"
      style={{
        background: enabled ? "var(--color-cta)" : "var(--color-border)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <span
        className="inline-block h-5 w-5 rounded-full bg-white transition-transform duration-200"
        style={{
          transform: enabled ? "translateX(22px)" : "translateX(2px)",
          boxShadow: "var(--shadow-sm)",
        }}
      />
    </button>
  );
}

function groupByCategory(consents: Consent[]): Record<string, Consent[]> {
  const groups: Record<string, Consent[]> = {};
  for (const c of consents) {
    if (!groups[c.category]) groups[c.category] = [];
    groups[c.category].push(c);
  }
  return groups;
}

export default function ConsentsPage() {
  const [consentState, setConsentState] = useState<Consent[]>(() => [
    ...defaultConsents,
  ]);

  const handleToggle = (id: string) => {
    setConsentState((prev) =>
      prev.map((c) =>
        c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  const grouped = groupByCategory(consentState);
  const activeCount = consentState.filter((c) => c.enabled).length;
  const totalCount = consentState.length;

  return (
    <>
      <TopNav title="동의 관리" showBack />

      <div className="px-6 pt-2 pb-8">
        {/* Top summary card */}
        <div
          className="mb-8 rounded-[20px] px-6 py-5"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid #F1F3F5",
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2
              className="text-[16px] font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              내 동의 현황
            </h2>
            <span
              className="text-[16px] font-semibold"
              style={{ color: "var(--color-cta)" }}
            >
              {activeCount}/{totalCount} 활성
            </span>
          </div>

          {/* Dot indicator */}
          <div className="mb-4 flex gap-1.5">
            {consentState.map((c) => (
              <div
                key={c.id}
                className="h-2 flex-1 rounded-full"
                style={{
                  background: c.enabled
                    ? "var(--color-cta)"
                    : "var(--color-border)",
                }}
              />
            ))}
          </div>

          <p
            className="text-[16px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            더 많은 정보를 제공할수록 맞춤 서비스가 정확해져요
          </p>
        </div>

        {/* Category sections */}
        <div className="flex flex-col gap-8">
          {categoryOrder
            .filter((cat) => grouped[cat])
            .map((cat) => {
              const items = grouped[cat];
              const activeInCategory = items.filter((c) => c.enabled).length;

              return (
                <section key={cat}>
                  {/* Section header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2
                        className="text-[13px] font-medium"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {categoryMap[cat]}
                      </h2>
                      <span
                        className="text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {activeInCategory}/{items.length}
                      </span>
                    </div>
                  </div>

                  {/* Consent cards */}
                  <div className="flex flex-col gap-4">
                    {items.map((consent) => (
                      <div
                        key={consent.id}
                        className="rounded-[20px] px-6 py-5"
                        style={{
                          background: "var(--color-bg-card)",
                          border: "1px solid #F1F3F5",
                        }}
                      >
                        {/* Top row: title + badge + toggle */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3
                                className="text-[16px] font-semibold"
                                style={{ color: "var(--color-primary)" }}
                              >
                                {consent.title}
                              </h3>
                              {consent.required && (
                                <span
                                  className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                                  style={{
                                    background: "var(--color-error-bg)",
                                    color: "var(--color-error)",
                                  }}
                                >
                                  필수
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 pt-0.5">
                            <Toggle
                              enabled={consent.enabled}
                              disabled={consent.required}
                              onToggle={() => handleToggle(consent.id)}
                            />
                          </div>
                        </div>

                        {/* Benefit / missing message */}
                        {consent.enabled ? (
                          <div
                            className="mt-3 flex items-start gap-2 rounded-[14px] px-3 py-2.5"
                            style={{ background: "var(--color-success-bg)" }}
                          >
                            <Check
                              size={14}
                              className="mt-0.5 shrink-0"
                              style={{ color: "var(--color-success)" }}
                            />
                            <p
                              className="text-[13px] leading-relaxed"
                              style={{ color: "var(--color-success)" }}
                            >
                              {consent.impact}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="mt-3 flex items-start gap-2 rounded-[14px] px-3 py-2.5"
                            style={{ background: "var(--color-warning-bg)" }}
                          >
                            <AlertTriangle
                              size={14}
                              className="mt-0.5 shrink-0"
                              style={{ color: "var(--color-warning)" }}
                            />
                            <p
                              className="text-[13px] leading-relaxed"
                              style={{ color: "var(--color-warning)" }}
                            >
                              {consent.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
        </div>

        {/* Bottom reassurance */}
        <div
          className="mt-8 flex items-center gap-3 rounded-[20px] px-6 py-5"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <Lock size={14} style={{ color: "var(--color-success)" }} />
          </div>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            동의 정보는 안전하게 관리되며, 변경 사항은 즉시 반영돼요
          </p>
        </div>
      </div>
    </>
  );
}
