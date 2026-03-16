"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import {
  MapPin,
  Home,
  Calendar,
  Lock,
  Fingerprint,
} from "lucide-react";
import { user, familyMembers } from "@/data/mock";

const householdSize =
  1 + (user.household.spouse ? 1 : 0) + user.household.children;

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200"
      style={{
        background: enabled ? "var(--color-cta)" : "var(--color-border)",
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

export default function SettingsPage() {
  const [appLock, setAppLock] = useState(true);
  const [biometric, setBiometric] = useState(true);

  return (
    <>
      <TopNav title="개인 정보" showBack />

      <div className="px-5 pt-2 pb-10">
        {/* ─── 내 정보 ─── */}
        <section className="mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            내 정보
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              { icon: MapPin, label: "거주지", value: user.residence },
              { icon: Calendar, label: "나이", value: `만 ${user.age}세` },
              { icon: Home, label: "가구", value: `${householdSize}인 가구` },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} style={{ color: "var(--color-text-secondary)" }} />
                    <span
                      className="text-[15px]"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    className="text-[15px]"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 보안 ─── */}
        <section className="mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            보안
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              {
                icon: Lock,
                label: "앱 잠금",
                subtitle: "앱 실행 시 잠금 해제 필요",
                enabled: appLock,
                onToggle: () => setAppLock((v) => !v),
              },
              {
                icon: Fingerprint,
                label: "생체 인증",
                subtitle: "지문 또는 Face ID",
                enabled: biometric,
                onToggle: () => setBiometric((v) => !v),
              },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} style={{ color: "var(--color-text-secondary)" }} />
                    <div>
                      <p
                        className="text-[15px]"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="mt-0.5 text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <Toggle enabled={item.enabled} onToggle={item.onToggle} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
