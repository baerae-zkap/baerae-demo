"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import { LogOut, Shield, Sparkles } from "lucide-react";
import {
  recentTransactions,
  benefitApplications,
  formatKRW,
} from "@/data/mock";

const totalSavings = recentTransactions
  .filter((tx) => tx.savings > 0)
  .reduce((sum, tx) => sum + tx.savings, 0);

const totalApplications = benefitApplications.length;

export default function LogoutPage() {
  return (
    <>
      <TopNav title="로그아웃" showBack />

      <div className="flex flex-col items-center px-5 pt-16 pb-10">
        {/* Icon */}
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "var(--color-border)" }}
        >
          <LogOut
            size={32}
            style={{ color: "var(--color-text-tertiary)" }}
          />
        </div>

        {/* Title */}
        <h2
          className="mt-6 text-xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          로그아웃 하시겠어요?
        </h2>

        {/* Subtitle */}
        <p
          className="mt-3 text-center text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          언제든 다시 로그인할 수 있어요
        </p>

        {/* Value summary */}
        <div
          className="mt-6 flex w-full items-center gap-3 rounded-2xl p-4"
          style={{
            background: "var(--color-badge-recommend-bg)",
            border: "1px solid #BAE6FD",
          }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: "white" }}
          >
            <Sparkles size={16} style={{ color: "var(--color-cta)" }} />
          </div>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              지금까지 {formatKRW(totalSavings)} 절약
            </p>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {totalApplications}건 혜택 신청
            </p>
          </div>
        </div>

        {/* Data safety note */}
        <div
          className="mt-3 flex w-full items-center gap-3 rounded-2xl p-4"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <Shield size={14} style={{ color: "var(--color-success)" }} />
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            로그아웃해도 데이터는 안전하게 보관됩니다
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col gap-3">
          {/* Cancel -- primary CTA, visually dominant */}
          <Link
            href="/my"
            className="flex h-12 items-center justify-center rounded-2xl text-base font-semibold transition-colors duration-200"
            style={{
              background: "var(--color-cta)",
              color: "white",
            }}
          >
            취소
          </Link>

          {/* Logout -- secondary, subdued */}
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-2xl text-base font-medium transition-colors duration-200"
            style={{
              background: "transparent",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            로그아웃
          </Link>
        </div>
      </div>
    </>
  );
}
