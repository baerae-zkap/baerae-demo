"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import { QrCode, Barcode, Wallet, Info } from "lucide-react";
import { user, formatKRW } from "@/data/mock";

type CodeMode = "qr" | "barcode";

export default function PayCodePage() {
  const [mode, setMode] = useState<CodeMode>("qr");

  return (
    <>
      <TopNav title="결제" showBack />

      <div className="px-6 pt-2 pb-8">
        {/* QR / Barcode Display Area */}
        <section className="flex flex-col items-center" aria-label="결제 코드">
          {mode === "qr" ? (
            <div
              className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-3 rounded-[20px]"
              style={{
                border: "2px dashed var(--color-border)",
                background: "var(--color-bg-card)",
              }}
            >
              <QrCode
                size={48}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-[16px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                QR 코드
              </span>
            </div>
          ) : (
            <div
              className="flex h-[80px] w-[280px] flex-col items-center justify-center gap-2 rounded-[20px]"
              style={{
                border: "2px dashed var(--color-border)",
                background: "var(--color-bg-card)",
              }}
            >
              <Barcode
                size={36}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-[13px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                바코드
              </span>
            </div>
          )}

          {/* Toggle Buttons */}
          <div
            className="mt-5 flex gap-2 rounded-[14px] p-1"
            style={{ background: "var(--color-divider)" }}
            role="tablist"
            aria-label="코드 유형 선택"
          >
            <button
              role="tab"
              aria-selected={mode === "qr"}
              onClick={() => setMode("qr")}
              className="flex h-9 cursor-pointer items-center rounded-[14px] px-5 text-[16px] font-semibold transition-colors duration-200"
              style={{
                background:
                  mode === "qr" ? "var(--color-bg-card)" : "transparent",
                color:
                  mode === "qr"
                    ? "var(--color-primary)"
                    : "var(--color-text-tertiary)",
              }}
            >
              QR 코드
            </button>
            <button
              role="tab"
              aria-selected={mode === "barcode"}
              onClick={() => setMode("barcode")}
              className="flex h-9 cursor-pointer items-center rounded-[14px] px-5 text-[16px] font-semibold transition-colors duration-200"
              style={{
                background:
                  mode === "barcode" ? "var(--color-bg-card)" : "transparent",
                color:
                  mode === "barcode"
                    ? "var(--color-primary)"
                    : "var(--color-text-tertiary)",
              }}
            >
              바코드
            </button>
          </div>

          {/* Helper Text */}
          <p
            className="mt-5 text-[16px] font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            {mode === "qr"
              ? "가맹점 스캐너에 QR 코드를 보여주세요"
              : "가맹점 스캐너에 바코드를 보여주세요"}
          </p>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            결제 요청이 도착하면 비교할 수 있어요
          </p>
        </section>

        {/* Linked Payment Methods Card */}
        <section className="mt-6" aria-label="연결된 결제수단">
          <div
            className="rounded-[20px] px-6 py-5"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid #F1F3F5",
            }}
          >
            <h2
              className="text-[13px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              연결된 결제수단
            </h2>

            <ul className="mt-3 flex flex-col gap-3">
              {user.linkedServices.map((svc) => (
                <li key={svc.id} className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold"
                    style={{
                      background: svc.color,
                      color:
                        svc.id === "kakao-pay" ? "#3C1E1E" : "#FFFFFF",
                    }}
                  >
                    {svc.icon}
                  </div>
                  <span
                    className="text-[16px]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {svc.name}
                  </span>
                </li>
              ))}
            </ul>

            {/* Local Balance */}
            <div
              className="mt-3 flex items-center gap-3 border-t pt-3"
              style={{ borderColor: "var(--color-divider)" }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <Wallet
                  size={16}
                  style={{ color: "var(--color-cta)" }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <span
                  className="text-[16px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  경기 지역화폐
                </span>
                <span
                  className="ml-2 text-[16px] font-bold"
                  style={{ color: "var(--color-cta)" }}
                >
                  {formatKRW(user.localBalance)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Info */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          <Info
            size={14}
            style={{ color: "var(--color-text-tertiary)" }}
            aria-hidden="true"
          />
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            결제 금액은 가맹점에서 입력합니다
          </p>
        </div>
      </div>
    </>
  );
}
