"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import { ScanLine, Keyboard } from "lucide-react";

export default function ScanPage() {
  return (
    <>
      <TopNav title="QR 스캔" showBack />

      <div className="px-6 pt-2 pb-8">
        {/* Scanner Area */}
        <section aria-label="QR 스캐너">
          <div
            className="relative mx-auto flex flex-col items-center justify-center overflow-hidden rounded-[20px]"
            style={{
              background: "#1A1A2E",
              height: 300,
            }}
          >
            {/* Scan Frame */}
            <div
              className="relative"
              style={{ width: 180, height: 180 }}
            >
              {/* Corner brackets */}
              {/* Top-left */}
              <div
                className="absolute left-0 top-0"
                style={{
                  width: 32,
                  height: 32,
                  borderTop: "3px solid rgba(255,255,255,0.8)",
                  borderLeft: "3px solid rgba(255,255,255,0.8)",
                  borderRadius: "4px 0 0 0",
                }}
              />
              {/* Top-right */}
              <div
                className="absolute right-0 top-0"
                style={{
                  width: 32,
                  height: 32,
                  borderTop: "3px solid rgba(255,255,255,0.8)",
                  borderRight: "3px solid rgba(255,255,255,0.8)",
                  borderRadius: "0 4px 0 0",
                }}
              />
              {/* Bottom-left */}
              <div
                className="absolute bottom-0 left-0"
                style={{
                  width: 32,
                  height: 32,
                  borderBottom: "3px solid rgba(255,255,255,0.8)",
                  borderLeft: "3px solid rgba(255,255,255,0.8)",
                  borderRadius: "0 0 0 4px",
                }}
              />
              {/* Bottom-right */}
              <div
                className="absolute bottom-0 right-0"
                style={{
                  width: 32,
                  height: 32,
                  borderBottom: "3px solid rgba(255,255,255,0.8)",
                  borderRight: "3px solid rgba(255,255,255,0.8)",
                  borderRadius: "0 0 4px 0",
                }}
              />

              {/* Scanning line */}
              <div
                className="absolute left-2 right-2"
                style={{
                  height: 2,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  animation: "scan 2.5s ease-in-out infinite",
                }}
              />
            </div>

            {/* Helper text inside scanner */}
            <p
              className="mt-6 text-center text-[16px]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              가맹점 QR 코드를 스캔하세요
            </p>
          </div>
        </section>

        {/* Helper text below scanner */}
        <p
          className="mt-4 text-center text-[13px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          가맹점에 비치된 QR 코드를 카메라에 비춰주세요
        </p>

        {/* Demo: Scan Complete CTA */}
        <div className="mt-8">
          <Link
            href="/pay/request/req-001"
            className="flex w-full items-center justify-center gap-2 rounded-[14px] py-4 text-[16px] font-semibold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            <ScanLine size={20} aria-hidden="true" />
            Demo: 스캔 완료
          </Link>
        </div>

        {/* Manual Entry */}
        <div className="mt-3">
          <Link
            href="/pay"
            className="flex w-full items-center justify-center gap-2 rounded-[14px] py-4 text-[16px] font-medium transition-colors duration-200"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-secondary)",
            }}
          >
            <Keyboard size={18} aria-hidden="true" />
            직접 입력
          </Link>
        </div>
      </div>

      {/* Scan line animation */}
      <style jsx>{`
        @keyframes scan {
          0%,
          100% {
            top: 0;
          }
          50% {
            top: calc(100% - 2px);
          }
        }
      `}</style>
    </>
  );
}
