"use client";

import { useState } from "react";
import { ArrowDown, CheckCircle, Loader2, X } from "lucide-react";
import { formatKRW } from "@/data/mock";

interface CurrencySwapSheetProps {
  open: boolean;
  onClose: () => void;
  onSwap: () => void;
  onOtherMethod: () => void;
  fromCity: string;
  toCity: string;
  amount: number;
  fromBalance: number;
}

export default function CurrencySwapSheet({
  open,
  onClose,
  onSwap,
  onOtherMethod,
  fromCity,
  toCity,
  amount,
  fromBalance,
}: CurrencySwapSheetProps) {
  const [phase, setPhase] = useState<"prompt" | "swapping" | "done">("prompt");

  if (!open) return null;

  const fromPay = fromCity.replace("시", "").replace("군", "") + "페이";
  const toPay = toCity.replace("시", "").replace("군", "") + "페이";

  const handleSwap = () => {
    setPhase("swapping");
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => {
        onSwap();
        setPhase("prompt");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => { onClose(); setPhase("prompt"); }}
      />
      {/* Sheet */}
      <div
        className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[24px] bg-white px-6 pb-10 pt-6"
      >
        {/* Handle bar */}
        <div className="absolute left-1/2 top-2.5 h-[4px] w-10 -translate-x-1/2 rounded-full bg-gray-200" />

        {/* Close button */}
        <button
          onClick={() => { onClose(); setPhase("prompt"); }}
          className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
          aria-label="닫기"
        >
          <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
        </button>

        {phase === "done" ? (
          <div className="flex flex-col items-center pt-4 pb-2">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "var(--color-success-bg)" }}
            >
              <CheckCircle size={32} style={{ color: "var(--color-success)" }} />
            </div>
            <p
              className="text-[18px] font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              전환 완료!
            </p>
            <p
              className="mt-1 text-[15px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {toPay}로 결제를 진행할게요
            </p>
          </div>
        ) : (
          <>
            {/* Emoji */}
            <div className="mb-4 flex justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-[20px]"
                style={{ background: "#EBF5FF" }}
              >
                <span className="text-[36px] leading-none">🔄</span>
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-center text-[20px] font-bold leading-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {toCity}에서 결제하려고 하시네요
            </h2>

            {/* Description */}
            <p
              className="mt-2 text-center text-[15px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              현재 {fromPay}가 있어요.
              <br />
              {toPay}로 바꿔서 결제할까요?
            </p>

            {/* Swap preview card */}
            <div
              className="mt-6 rounded-[16px] px-5 py-5"
              style={{ background: "var(--color-divider)" }}
            >
              {/* From */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ background: "#fff" }}
                  >
                    <span className="text-[16px] leading-none">💰</span>
                  </div>
                  <div>
                    <p
                      className="text-[14px] font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {fromPay}
                    </p>
                    <p
                      className="text-[12px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      잔액 {formatKRW(fromBalance)}
                    </p>
                  </div>
                </div>
                <p
                  className="text-[17px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(amount)}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center py-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: "var(--color-cta)" }}
                >
                  <ArrowDown size={14} color="#fff" />
                </div>
              </div>

              {/* To */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full"
                    style={{ background: "#fff" }}
                  >
                    <span className="text-[16px] leading-none">✨</span>
                  </div>
                  <p
                    className="text-[14px] font-semibold"
                    style={{ color: "var(--color-cta)" }}
                  >
                    {toPay}
                  </p>
                </div>
                <p
                  className="text-[17px] font-bold"
                  style={{ color: "var(--color-cta)" }}
                >
                  {formatKRW(amount)}
                </p>
              </div>
            </div>

            {/* Fee notice */}
            <p
              className="mt-3 text-center text-[13px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              수수료 없이 바로 전환돼요
            </p>

            {/* Primary CTA */}
            <button
              onClick={handleSwap}
              disabled={phase === "swapping"}
              className="mt-5 flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
              style={{ background: "var(--color-cta)" }}
            >
              {phase === "swapping" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  전환하는 중...
                </>
              ) : (
                `${toPay}로 바꾸기`
              )}
            </button>

            {/* Secondary action */}
            <button
              onClick={onOtherMethod}
              className="mt-2.5 flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[14px] text-[15px] font-semibold transition-opacity duration-200 active:opacity-80"
              style={{ color: "var(--color-text-secondary)" }}
            >
              다른 결제 수단 사용
            </button>
          </>
        )}
      </div>
    </div>
  );
}
