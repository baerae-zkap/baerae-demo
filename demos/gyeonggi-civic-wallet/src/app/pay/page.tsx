"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { QrCode, ScanLine, ChevronRight } from "lucide-react";
import { user, cityBalances, formatKRW } from "@/data/mock";
import CurrencySwapSheet from "@/components/CurrencySwapSheet";
import { useCity } from "@/context/CityContext";

// Simulated merchant location scenario
const merchantCity = "가평군";
const payAmount = 15000;

export default function PayPage() {
  const { selectedCity, setSelectedCity } = useCity();
  const [swapSheetOpen, setSwapSheetOpen] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [payMode, setPayMode] = useState(false);

  const balance = cityBalances[selectedCity] ?? 0;
  const merchantBalance = cityBalances[merchantCity] ?? 0;
  const cityName = selectedCity.replace("시", "").replace("군", "");
  const merchantName = merchantCity.replace("시", "").replace("군", "");

  // Determine nudge type when in a different city
  const isSameCity = selectedCity === merchantCity;
  const merchantHasEnough = merchantBalance >= payAmount;
  const currentHasEnough = balance >= payAmount;

  // Find another city with enough balance to swap from
  const richCity = Object.entries(cityBalances).find(
    ([city, bal]) => city !== merchantCity && city !== selectedCity && bal >= payAmount
  );
  const richCityName = richCity ? richCity[0].replace("시", "").replace("군", "") : null;
  const richCityBalance = richCity ? richCity[1] : 0;

  const handleSwapComplete = () => {
    setSwapSheetOpen(false);
    setSelectedCity(merchantCity);
    setSwapped(true);
  };

  const handleSwitchCity = () => {
    setSelectedCity(merchantCity);
    setSwapped(true);
  };

  // ─── Pay Mode: inverted full-screen barcode ───
  if (payMode) {
    return (
      <div
        className="flex min-h-screen flex-col"
        style={{ background: "var(--color-cta)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <p className="text-[20px] font-bold text-white">결제</p>
          <button
            onClick={() => setPayMode(false)}
            className="cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-semibold transition-opacity duration-200 active:opacity-80"
            style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
          >
            닫기
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center px-5 pt-4 pb-8">
          {/* City & Balance */}
          <div className="rounded-full px-3 py-1" style={{ background: "rgba(255,255,255,0.15)" }}>
            <span className="text-[13px] font-medium text-white/80">
              {selectedCity} 지역화폐
            </span>
          </div>
          <p className="mt-2 text-[34px] font-bold tracking-tight text-white">
            {formatKRW(balance)}
          </p>

          {/* Barcode + QR Card */}
          <div className="mt-6 w-full rounded-[24px] bg-white px-6 py-8">
            <div className="flex flex-col items-center">
              {/* Barcode */}
              <div className="mb-4 flex items-end gap-[2px]">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: i % 3 === 0 ? 3 : 2,
                      height: 64,
                      background: i % 5 === 0 ? "#9CA3AF" : "var(--color-cta)",
                    }}
                  />
                ))}
              </div>

              {/* QR */}
              <div
                className="mb-5 grid grid-cols-9 gap-[2px] rounded-[8px] p-3"
                style={{ background: "#F8FAFC" }}
              >
                {[1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,0,0,1,0,1,0].map((filled, i) => (
                  <div
                    key={i}
                    className="h-3.5 w-3.5 rounded-[1px]"
                    style={{ background: filled ? "var(--color-cta)" : "transparent" }}
                  />
                ))}
              </div>

              <p className="text-[14px] font-medium" style={{ color: "var(--color-text-secondary)" }}>
                바코드 또는 QR을 리더기에 보여주세요
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-5 flex w-full gap-2.5">
            <Link
              href="/pay/code"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[15px] font-semibold transition-opacity duration-200 active:opacity-80"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
            >
              <QrCode size={16} />
              QR/바코드
            </Link>
            <Link
              href="/pay/scan"
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[15px] font-semibold transition-opacity duration-200 active:opacity-80"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
            >
              <ScanLine size={16} />
              QR 스캔
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Normal Mode ───
  return (
    <>
      <TopNav title="결제" largeTitle />

      <div className="flex flex-col items-center px-5 pt-6 pb-8">
        {/* ─── Balance ─── */}
        <div
          className="flex items-center gap-1 rounded-full px-3 py-1"
          style={{ background: "var(--color-divider)" }}
        >
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {selectedCity} 지역화폐
          </span>
        </div>
        <p
          className="mt-2 text-[32px] font-bold tracking-tight"
          style={{ color: "var(--color-primary)" }}
        >
          {formatKRW(balance)}
        </p>
        <Link
          href="/pay/charge"
          className="mt-2 rounded-full px-4 py-1.5 text-[13px] font-medium"
          style={{ background: "var(--color-divider)", color: "var(--color-text-secondary)" }}
        >
          충전
        </Link>

        {/* ─── Merchant location hint ─── */}
        {!isSameCity && !swapped && merchantHasEnough && (
          /* Case 1: 가평에 이미 잔액 충분 → 도시만 변경 */
          <button
            onClick={handleSwitchCity}
            className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-success-bg)" }}
          >
            <span className="text-[18px]">💰</span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold" style={{ color: "var(--color-success)" }}>
                {merchantName}페이 잔액으로 바로 결제 가능
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                잔액 {formatKRW(merchantBalance)}
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--color-success)" }} />
          </button>
        )}

        {!isSameCity && !swapped && !merchantHasEnough && currentHasEnough && (
          /* Case 2: 현재 도시에서 전환 가능 → swap sheet */
          <button
            onClick={() => setSwapSheetOpen(true)}
            className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <span className="text-[18px]">🔄</span>
            <p className="min-w-0 flex-1 text-[14px] font-semibold" style={{ color: "var(--color-cta)" }}>
              {merchantName}페이로 전환해서 결제
            </p>
            <ChevronRight size={16} style={{ color: "var(--color-cta)" }} />
          </button>
        )}

        {!isSameCity && !swapped && !merchantHasEnough && !currentHasEnough && richCity && (
          /* Case 3a: 다른 지역에 잔액 있음 → 전환 안내 */
          <Link
            href={`/pay/swap?from=${encodeURIComponent(richCity[0])}&to=${encodeURIComponent(selectedCity)}`}
            className="mt-4 flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5 transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <span className="text-[18px]">💰</span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold" style={{ color: "var(--color-cta)" }}>
                {richCityName}페이에 잔액이 있어요
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                {formatKRW(richCityBalance)} → {cityName}페이로 전환 후 결제
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--color-cta)" }} />
          </Link>
        )}

        {!isSameCity && !swapped && !merchantHasEnough && !currentHasEnough && !richCity && (
          /* Case 3b: 어디에도 잔액 없음 → 충전 안내 */
          <Link
            href="/pay/charge"
            className="mt-4 flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5 transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-divider)" }}
          >
            <span className="text-[18px]">💳</span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>
                {merchantName}페이 충전이 필요해요
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "var(--color-text-tertiary)" }}>
                충전 후 결제할 수 있어요
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
          </Link>
        )}

        {swapped && (
          <div
            className="mt-4 flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5"
            style={{ background: "var(--color-success-bg)" }}
          >
            <span className="text-[18px]">✅</span>
            <p className="text-[14px] font-semibold" style={{ color: "var(--color-success)" }}>
              {merchantCity} 지역화폐로 결제 준비 완료
            </p>
          </div>
        )}

        {/* ─── QR Code Area ─── */}
        <div className="mt-6 w-full">
          <div
            className="flex flex-col items-center rounded-[24px] px-6 py-8"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {/* Simulated barcode */}
            <div className="mb-4 flex items-end gap-[2px]">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: i % 3 === 0 ? 3 : 2,
                    height: 56,
                    background: i % 5 === 0 ? "var(--color-text-tertiary)" : "var(--color-primary)",
                  }}
                />
              ))}
            </div>

            {/* Simulated QR code */}
            <div
              className="mb-5 grid grid-cols-9 gap-[2px] rounded-[8px] p-3"
              style={{ background: "white" }}
            >
              {/* Deterministic QR pattern to avoid hydration mismatch */}
              {[1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,0,0,1,0,1,0].map((filled, i) => (
                <div
                  key={i}
                  className="h-3 w-3 rounded-[1px]"
                  style={{
                    background: filled ? "var(--color-primary)" : "transparent",
                  }}
                />
              ))}
            </div>

            <p
              className="text-[14px] font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              바코드 또는 QR을 리더기에 보여주세요
            </p>
          </div>
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="mt-5 flex w-full gap-2.5">
          <Link
            href="/pay/code"
            className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[16px] font-semibold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            <QrCode size={18} />
            QR/바코드
          </Link>
          <Link
            href="/pay/scan"
            className="flex flex-1 items-center justify-center gap-2 rounded-[14px] py-3.5 text-[16px] font-semibold transition-opacity duration-200 active:opacity-90"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-primary)",
            }}
          >
            <ScanLine size={18} />
            QR 스캔
          </Link>
        </div>

        {/* ─── Quick links ─── */}
        <div className="mt-6 w-full">
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <Link
              href="/pay/history"
              className="flex items-center justify-between px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
              style={{ borderBottom: "1px solid var(--color-divider)" }}
            >
              <p
                className="text-[15px] font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                결제 내역
              </p>
              <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
            </Link>
            <Link
              href="/wallet"
              className="flex items-center justify-between px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
            >
              <p
                className="text-[15px] font-medium"
                style={{ color: "var(--color-primary)" }}
              >
                지역화폐 관리
              </p>
              <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
            </Link>
          </div>
        </div>
      </div>

      <CurrencySwapSheet
        open={swapSheetOpen}
        onClose={() => setSwapSheetOpen(false)}
        onSwap={handleSwapComplete}
        onOtherMethod={() => setSwapSheetOpen(false)}
        fromCity={selectedCity}
        toCity={merchantCity}
        amount={payAmount}
        fromBalance={cityBalances[selectedCity] ?? 0}
      />
    </>
  );
}
