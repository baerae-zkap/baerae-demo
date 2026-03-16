"use client";

import { useState, useEffect } from "react";
import { X, QrCode, ScanLine, ChevronRight } from "lucide-react";
import { usePaymentMode } from "@/context/PaymentModeContext";
import { useCity } from "@/context/CityContext";
import { cityBalances, formatKRW } from "@/data/mock";

type PayTab = "barcode" | "qr";

export default function PaymentOverlay() {
  const { isPaymentMode, closePaymentMode } = usePaymentMode();
  const { selectedCity } = useCity();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<PayTab>("qr");

  const balance = cityBalances[selectedCity] ?? 0;
  const points = 1214;

  // Slide-up animation
  useEffect(() => {
    if (isPaymentMode) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isPaymentMode]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(closePaymentMode, 300);
  };

  if (!isPaymentMode) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center"
      style={{ background: "#E2E8F0" }}
    >
      <div
        className="relative w-full max-w-[430px] overflow-hidden"
        style={{
          background: "var(--color-cta)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <p className="text-[22px] font-bold text-white">결제하기</p>
          <button
            onClick={handleClose}
            className="flex cursor-pointer items-center justify-center rounded-full transition-opacity duration-200 active:opacity-70"
            style={{
              width: 36,
              height: 36,
              background: "rgba(255,255,255,0.2)",
            }}
          >
            <X size={20} color="#fff" strokeWidth={2.5} />
          </button>
        </div>

        {/* ─── Segmented Control ─── */}
        <div className="px-5 pb-5">
          <div
            className="flex rounded-[12px] p-1"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            {[
              { key: "barcode" as PayTab, label: "바코드", icon: QrCode },
              { key: "qr" as PayTab, label: "QR 스캔", icon: ScanLine },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] py-2.5 text-[14px] font-semibold transition-all duration-200"
                style={{
                  background:
                    activeTab === tab.key ? "#fff" : "transparent",
                  color:
                    activeTab === tab.key
                      ? "var(--color-cta)"
                      : "rgba(255,255,255,0.7)",
                }}
              >
                <tab.icon size={16} strokeWidth={2} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Main Content ─── */}
        <div className="flex flex-1 flex-col px-5">
          {/* Payment Card */}
          <div className="rounded-[24px] bg-white px-6 py-7">
            {activeTab === "barcode" ? (
              /* Barcode view */
              <div className="flex flex-col items-center">
                <div className="mb-4 flex items-end gap-[2px]">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: i % 3 === 0 ? 3 : 2,
                        height: 64,
                        background:
                          i % 5 === 0 ? "#9CA3AF" : "var(--color-cta)",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="mb-5 grid grid-cols-9 gap-[2px] rounded-[8px] p-3"
                  style={{ background: "#F8FAFC" }}
                >
                  {[
                    1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
                    1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
                    1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                    1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
                    1, 0, 1, 0, 0, 1, 0, 1, 0,
                  ].map((filled, i) => (
                    <div
                      key={i}
                      className="h-3.5 w-3.5 rounded-[1px]"
                      style={{
                        background: filled
                          ? "var(--color-cta)"
                          : "transparent",
                      }}
                    />
                  ))}
                </div>
                <p
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  바코드를 리더기에 보여주세요
                </p>
              </div>
            ) : (
              /* QR scan placeholder */
              <div className="flex flex-col items-center py-4">
                <div
                  className="mb-4 flex items-center justify-center rounded-[20px]"
                  style={{
                    width: 160,
                    height: 160,
                    background: "#F8FAFC",
                  }}
                >
                  <ScanLine
                    size={64}
                    strokeWidth={1.5}
                    style={{ color: "var(--color-cta)" }}
                  />
                </div>
                <p
                  className="text-[14px] font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  가맹점 QR코드를 스캔해주세요
                </p>
              </div>
            )}
          </div>

          {/* Balance Info Card */}
          <div className="mt-4 rounded-[20px] bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-[12px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  지역화폐
                </p>
                <p
                  className="mt-1 text-[22px] font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {formatKRW(balance)}
                </p>
              </div>
              <div
                className="rounded-full px-3 py-1 text-[12px] font-semibold"
                style={{
                  background: "var(--color-badge-recommend-bg)",
                  color: "var(--color-cta)",
                }}
              >
                {selectedCity}
              </div>
            </div>

            <div
              className="my-4"
              style={{ height: 1, background: "var(--color-divider)" }}
            />

            {/* Coupons */}
            <button className="flex w-full cursor-pointer items-center justify-between">
              <p
                className="text-[14px] font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                내 쿠폰 및 주변 혜택
              </p>
              <ChevronRight
                size={16}
                style={{ color: "var(--color-text-tertiary)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
