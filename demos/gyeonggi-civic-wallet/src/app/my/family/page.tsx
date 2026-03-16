"use client";

import TopNav from "@/components/TopNav";
import { familyMembers } from "@/data/mock";
import {
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  User,
  Heart,
  Baby,
} from "lucide-react";

const memberHints: Record<string, string> = {
  "fm-001": "거주지 및 연령 기반 혜택 자격의 기준이에요",
  "fm-002": "가구 소득 및 세대 구성 확인에 반영돼요",
  "fm-003": "아동 관련 혜택 자격을 자동으로 찾아드려요",
};

function getRelationshipIcon(relationship: string) {
  switch (relationship) {
    case "본인":
      return User;
    case "배우자":
      return Heart;
    case "자녀":
      return Baby;
    default:
      return User;
  }
}

export default function FamilyPage() {
  const hasMembers = familyMembers.length > 0;
  const allSynced = familyMembers.every((m) => m.synced);

  return (
    <>
      <TopNav title="가구 정보" showBack />

      <div className="px-5 pt-2 pb-10">
        {/* Family summary hero */}
        <div
          className="mb-5 rounded-2xl p-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                우리 가구
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                총 {familyMembers.length}명의 가구원
              </p>
            </div>
            {allSynced && (
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background: "var(--color-success-bg)" }}
              >
                <CheckCircle
                  size={14}
                  style={{ color: "var(--color-success)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  전체 동기화 완료
                </span>
              </div>
            )}
          </div>

          {/* Avatar row */}
          <div className="mt-4 flex items-center gap-3">
            {familyMembers.map((member) => {
              const Icon = getRelationshipIcon(member.relationship);
              return (
                <div key={member.id} className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: "var(--color-badge-recommend-bg)",
                      border: "2px solid var(--color-border)",
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--color-cta)" }} />
                  </div>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {member.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {hasMembers && (
          <>
            {/* Why this matters card */}
            <div
              className="mb-5 rounded-2xl p-4"
              style={{
                background: "var(--color-success-bg)",
                border: "1px solid #BBF7D0",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#DCFCE7" }}
                >
                  <Lightbulb size={16} style={{ color: "var(--color-success)" }} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    가구 구성이 혜택 안내에 반영돼요
                  </p>
                  <p
                    className="mt-2 text-[13px] leading-relaxed"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    자녀 유무, 연령대 등 가구 구성 정보로 받을 수 있는 혜택을 찾아요.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <div
                      className="rounded-xl px-3 py-2.5"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    >
                      <p
                        className="text-[13px] leading-snug"
                        style={{ color: "var(--color-primary)" }}
                      >
                        자녀(만 7세)가 있어서 <span className="font-semibold">초등학교 입학 지원금</span>을 찾았어요
                      </p>
                    </div>
                    <div
                      className="rounded-xl px-3 py-2.5"
                      style={{ background: "rgba(255,255,255,0.7)" }}
                    >
                      <p
                        className="text-[13px] leading-snug"
                        style={{ color: "var(--color-primary)" }}
                      >
                        배우자 정보가 <span className="font-semibold">가구 소득 기준 확인</span>에 사용돼요
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family member cards */}
            <div className="flex flex-col gap-3">
              {familyMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--color-bg-card)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
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
                        className="mt-1.5 text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        만 {member.age}세
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      {member.synced ? (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle
                            size={14}
                            style={{ color: "var(--color-success)" }}
                          />
                          <span
                            className="text-xs font-medium"
                            style={{ color: "var(--color-success)" }}
                          >
                            동기화 완료
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle
                            size={14}
                            style={{ color: "var(--color-warning)" }}
                          />
                          <span
                            className="text-xs font-medium"
                            style={{ color: "var(--color-warning)" }}
                          >
                            동기화 필요
                          </span>
                        </div>
                      )}
                      {member.synced && member.syncDate && (
                        <p
                          className="mt-1 text-[11px]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          {member.syncDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* What this member's info enables */}
                  {memberHints[member.id] && (
                    <div
                      className="mt-3 rounded-xl px-3 py-2.5"
                      style={{
                        background: "var(--color-divider)",
                      }}
                    >
                      <p
                        className="text-[12px] leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {memberHints[member.id]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div
              className="mt-6 flex items-center gap-2.5 rounded-2xl px-4 py-3.5"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-divider)",
              }}
            >
              <Info
                size={16}
                style={{ color: "var(--color-text-tertiary)" }}
                className="shrink-0"
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                가구 정보는 주민등록등본을 기반으로 합니다
              </p>
            </div>
          </>
        )}

        {!hasMembers && (
          <div
            className="flex flex-col items-center justify-center rounded-2xl px-6 py-16"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: "var(--color-warning-bg)" }}
            >
              <Users size={28} style={{ color: "var(--color-warning)" }} />
            </div>
            <p
              className="text-base font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              등록된 가구원이 없어요
            </p>
            <p
              className="mt-2 text-center text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              가구 정보를 등록하면 받을 수 있는 혜택을 찾아드려요
            </p>
          </div>
        )}
      </div>
    </>
  );
}
