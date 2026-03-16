"use client";

import TopNav from "@/components/TopNav";
import { Shield } from "lucide-react";
import { user } from "@/data/mock";

const infoRows = [
  { label: "이름", value: user.name },
  { label: "나이", value: `${user.age}세` },
  { label: "거주지", value: user.residence },
  {
    label: "가족",
    value: [
      user.household.spouse ? "배우자" : null,
      user.household.children > 0
        ? `자녀 ${user.household.children}명`
        : null,
    ]
      .filter(Boolean)
      .join(", "),
  },
  { label: "연결된 서비스", value: `${user.linkedServices.length}개` },
];

export default function AccountPage() {
  return (
    <>
      <TopNav title="계정 정보" showBack />

      <div className="px-5 pt-6 pb-8">
        {/* Profile Circle */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
            style={{
              background: "var(--color-badge-recommend-bg)",
              color: "var(--color-cta)",
            }}
          >
            {user.name.charAt(0)}
          </div>
          <p
            className="mt-3 text-lg font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            {user.name}
          </p>
        </div>

        {/* Info Card */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {infoRows.map((row, i) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderBottom:
                  i < infoRows.length - 1
                    ? "1px solid var(--color-divider)"
                    : "none",
              }}
            >
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {row.label}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div
          className="mt-6 flex items-start gap-2.5 rounded-2xl px-5 py-4"
          style={{
            background: "var(--color-secondary)",
          }}
        >
          <Shield
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            개인정보는 경기도 시민지갑에서 안전하게 관리됩니다
          </p>
        </div>
      </div>
    </>
  );
}
