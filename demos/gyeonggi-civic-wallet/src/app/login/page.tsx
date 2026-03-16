"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    <div
      className="min-h-[100dvh] flex flex-col px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Back Link */}
      <Link
        href="/welcome"
        className="text-sm font-medium mb-10"
        style={{ color: "var(--color-text-secondary)" }}
      >
        &larr; 뒤로
      </Link>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col">
        <p
          className="text-sm font-medium tracking-wide mb-2"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          경기 시민지갑
        </p>
        <h1
          className="text-2xl font-bold mb-8"
          style={{ color: "var(--color-primary)" }}
        >
          로그인
        </h1>

        {/* Phone Number Input */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            휴대폰 번호
          </label>
          <input
            type="tel"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 rounded-xl text-base outline-none transition-colors"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-primary)",
            }}
          />
        </div>

        {/* Verification Code Input */}
        <div className="mb-3">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            인증번호
          </label>
          <input
            type="text"
            placeholder="6자리 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full h-12 px-4 rounded-xl text-base outline-none transition-colors"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-primary)",
            }}
          />
        </div>
        <p
          className="text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          데모 버전이에요. 아무 값이나 입력하면 돼요
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6">
        <Link
          href="/onboarding/terms"
          className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
