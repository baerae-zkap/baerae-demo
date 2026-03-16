"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ArrowRight, FileCheck } from "lucide-react";
import { benefitDetails, user } from "@/data/mock";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const benefit = benefitDetails[id];

  if (!benefit) {
    return (
      <>
        <TopNav title="신청 확인" showBack />
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <p className="text-[16px] font-semibold" style={{ color: "var(--color-primary)" }}>
            혜택 정보를 찾을 수 없어요
          </p>
          <Link
            href="/benefits"
            className="mt-6 rounded-[14px] px-6 py-2.5 text-[14px] font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 목록으로
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav showBack />

      <div className="pb-36">
        {/* ─── Hero ─── */}
        <div className="px-6 pt-6 pb-8 text-center">
          <p
            className="text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            신청 혜택
          </p>
          <h1
            className="mt-2 text-[22px] font-bold leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {benefit.title}
          </h1>
          <p
            className="mt-3 text-[28px] font-bold"
            style={{ color: "var(--color-cta)" }}
          >
            {benefit.amount}
          </p>
          <span
            className="mt-2 inline-block rounded-full px-3 py-1 text-[12px] font-medium"
            style={{
              background: "var(--color-badge-recommend-bg)",
              color: "var(--color-cta)",
            }}
          >
            {benefit.type}
          </span>
        </div>

        {/* ─── Applicant info ─── */}
        <div className="mx-6 mb-6">
          <p
            className="mb-3 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            신청자 정보
          </p>
          <div
            className="rounded-[16px] px-5 py-1"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              { label: "이름", value: user.name },
              { label: "거주지", value: `경기도 ${user.residence}` },
              { label: "나이", value: `만 ${user.age}세` },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3.5"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--color-divider)" : "none",
                }}
              >
                <span
                  className="text-[14px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Documents ready confirmation ─── */}
        <div className="mx-6 mb-6">
          <div
            className="flex items-center gap-3 rounded-[14px] px-5 py-4"
            style={{ background: "var(--color-success-bg)" }}
          >
            <FileCheck size={20} style={{ color: "var(--color-success)" }} />
            <p
              className="text-[14px] font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              서류 {benefit.documents.length}건 준비 완료
            </p>
          </div>
        </div>

        {/* ─── Notice ─── */}
        <div className="mx-6">
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            신청하기를 누르면 준비된 서류가 자동으로 제출돼요.
          </p>
        </div>
      </div>

      {/* ─── Fixed bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-8"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 50%, transparent)",
        }}
      >
        <Link
          href={`/benefits/${id}/submitted`}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          신청하기
          <ArrowRight size={18} />
        </Link>
      </div>
    </>
  );
}
