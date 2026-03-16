"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import { ArrowDownUp, ChevronDown, CheckCircle, X, Check, MapPin } from "lucide-react";
import { partnerCities, cityBalances, formatKRW } from "@/data/mock";
import { useCity } from "@/context/CityContext";
import InvestSuggestion from "@/components/InvestSuggestion";

const cities = partnerCities
  .filter((c) => c.status === "active")
  .map((c) => ({
    name: c.name + c.suffix,
    label: c.name + "페이",
    balance: cityBalances[c.name + c.suffix] ?? 0,
  }));

const quickAmounts = [10000, 30000, 50000, 100000];

export default function SwapPage() {
  return (
    <Suspense>
      <SwapPageInner />
    </Suspense>
  );
}

function SwapPageInner() {
  const { selectedCity } = useCity();
  const searchParams = useSearchParams();
  const paramFrom = searchParams.get("from");
  const paramTo = searchParams.get("to");

  const defaultFrom = (paramFrom && cities.find((c) => c.name === paramFrom))
    || cities.find((c) => c.name === selectedCity) || cities[0];
  const defaultTo = (paramTo && cities.find((c) => c.name === paramTo))
    || cities.find((c) => c.name !== defaultFrom.name) || cities[1];

  const [fromCity, setFromCity] = useState(defaultFrom);
  const [toCity, setToCity] = useState(defaultTo);
  const [amount, setAmount] = useState(0);
  const [pickerTarget, setPickerTarget] = useState<"from" | "to" | null>(null);
  const [swapDone, setSwapDone] = useState(false);
  const [showInvest, setShowInvest] = useState(false);

  const canSwap = amount > 0 && amount <= fromCity.balance && fromCity.name !== toCity.name;

  const handleSwapDirection = () => {
    const tmp = fromCity;
    setFromCity(toCity);
    setToCity(tmp);
    setAmount(0);
  };

  const handleSwap = () => {
    if (!canSwap) return;
    setSwapDone(true);
  };

  const handlePickCity = (city: typeof cities[number]) => {
    if (pickerTarget === "from") {
      setFromCity(city);
      if (city.name === toCity.name) {
        setToCity(fromCity);
      }
      setAmount(0);
    } else {
      setToCity(city);
      if (city.name === fromCity.name) {
        setFromCity(toCity);
      }
    }
    setPickerTarget(null);
  };

  // ─── Success State ───
  if (swapDone) {
    return (
      <>
        <TopNav showBack />
        <div className="flex flex-col items-center px-6 pt-16 pb-8">
          <div
            className="mb-5 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <CheckCircle size={40} style={{ color: "var(--color-success)" }} />
          </div>
          <p className="text-[22px] font-bold" style={{ color: "var(--color-primary)" }}>
            전환 완료
          </p>
          <p className="mt-2 text-[15px]" style={{ color: "var(--color-text-secondary)" }}>
            {fromCity.label} → {toCity.label}
          </p>
          <p className="mt-2 text-[28px] font-bold" style={{ color: "var(--color-cta)" }}>
            {formatKRW(amount)}
          </p>
          <p className="mt-1 text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
            수수료는 경기도가 부담했어요
          </p>

          <div
            className="mt-8 w-full rounded-[20px] px-5 py-1"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <div className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid var(--color-divider)" }}>
              <span className="text-[14px]" style={{ color: "var(--color-text-tertiary)" }}>{fromCity.label} 잔액</span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>{formatKRW(fromCity.balance - amount)}</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <span className="text-[14px]" style={{ color: "var(--color-text-tertiary)" }}>{toCity.label} 잔액</span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-cta)" }}>{formatKRW(toCity.balance + amount)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowInvest(true)}
            className="mt-6 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            확인
          </button>
        </div>

        <InvestSuggestion
          open={showInvest}
          onDismiss={() => setShowInvest(false)}
          cityName={toCity.label.replace("페이", "")}
          amount={amount}
        />
      </>
    );
  }

  // ─── Main Swap UI ───
  return (
    <>
      <TopNav showBack />

      <div className="px-5 pt-2 pb-36">
        <h1 className="mb-6 text-[22px] font-bold" style={{ color: "var(--color-primary)" }}>
          지역화폐 전환
        </h1>

        {/* ─── FROM Card ─── */}
        <div className="relative">
          <div
            className="rounded-[20px] px-5 pb-5 pt-4"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <p className="mb-3 text-[12px] font-semibold tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
              보내는 지역
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="shrink-0">
                <button
                  onClick={() => setPickerTarget("from")}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--color-badge-recommend-bg)" }}
                  >
                    <span className="text-[16px]">💰</span>
                  </div>
                  <span className="whitespace-nowrap text-[18px] font-bold" style={{ color: "var(--color-primary)" }}>
                    {fromCity.label}
                  </span>
                  <ChevronDown size={16} style={{ color: "var(--color-text-tertiary)" }} />
                </button>
                <p className="mt-1.5 pl-11 text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                  잔액 {formatKRW(fromCity.balance)}
                </p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={amount > 0 ? amount.toLocaleString() : ""}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
                  setAmount(isNaN(v) ? 0 : Math.min(v, fromCity.balance));
                }}
                placeholder="0"
                className="w-0 min-w-0 flex-1 bg-transparent text-right text-[32px] font-bold outline-none placeholder:text-[var(--color-border)]"
                style={{ color: "var(--color-primary)" }}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setAmount(fromCity.balance)}
                className="cursor-pointer rounded-[8px] px-2.5 py-1.5 text-[12px] font-bold transition-colors duration-200 active:opacity-80"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-primary)" }}
              >
                MAX
              </button>
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => setAmount(Math.min(qa, fromCity.balance))}
                  className="cursor-pointer rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-200 active:opacity-80"
                  style={{
                    background: amount === qa ? "var(--color-badge-recommend-bg)" : "transparent",
                    border: "1px solid var(--color-border)",
                    color: amount === qa ? "var(--color-cta)" : "var(--color-text-tertiary)",
                  }}
                >
                  {qa >= 10000 ? `${qa / 10000}만` : formatKRW(qa)}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Swap Direction Button ─── */}
          <div className="relative z-10 flex justify-center" style={{ marginTop: -16, marginBottom: -16 }}>
            <button
              onClick={handleSwapDirection}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-all duration-200 active:scale-95"
              style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
              aria-label="방향 전환"
            >
              <ArrowDownUp size={18} style={{ color: "var(--color-cta)" }} />
            </button>
          </div>

          {/* ─── TO Card ─── */}
          <div
            className="rounded-[20px] px-5 pb-5 pt-4"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <p className="mb-3 text-[12px] font-semibold tracking-wide" style={{ color: "var(--color-text-tertiary)" }}>
              받는 지역
            </p>

            <div className="flex items-center justify-between gap-4">
              <div className="shrink-0">
                <button
                  onClick={() => setPickerTarget("to")}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#E6FCF5" }}
                  >
                    <span className="text-[16px]">✨</span>
                  </div>
                  <span className="whitespace-nowrap text-[18px] font-bold" style={{ color: "var(--color-primary)" }}>
                    {toCity.label}
                  </span>
                  <ChevronDown size={16} style={{ color: "var(--color-text-tertiary)" }} />
                </button>
                <p className="mt-1.5 pl-11 text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                  잔액 {formatKRW(toCity.balance)}
                </p>
              </div>

              <p
                className="text-[32px] font-bold"
                style={{ color: amount > 0 ? "var(--color-cta)" : "var(--color-border)" }}
              >
                {amount > 0 ? amount.toLocaleString() : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fixed Bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-4"
        style={{ background: "linear-gradient(to top, var(--color-bg) 50%, transparent)" }}
      >
        <p
          className="mb-4 text-center text-[13px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          수수료는 경기도가 부담할게요 ✌️
        </p>
        <button
          onClick={handleSwap}
          disabled={!canSwap}
          className="flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "var(--color-cta)" }}
        >
          {amount > 0
            ? `${toCity.label}로 ${formatKRW(amount)} 전환`
            : "금액을 입력해주세요"}
        </button>
      </div>

      {/* ─── City Picker Bottom Sheet ─── */}
      {pickerTarget && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setPickerTarget(null)}
          />
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[20px] bg-white"
            style={{ maxHeight: "70vh" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p className="text-[17px] font-bold" style={{ color: "var(--color-primary)" }}>
                {pickerTarget === "from" ? "보내는 지역" : "받는 지역"} 선택
              </p>
              <button
                onClick={() => setPickerTarget(null)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
                aria-label="닫기"
              >
                <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
              </button>
            </div>

            <div className="overflow-y-auto px-3 pb-8" style={{ maxHeight: "calc(70vh - 60px)" }}>
              {cities.map((city) => {
                const isSelected = pickerTarget === "from"
                  ? city.name === fromCity.name
                  : city.name === toCity.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => handlePickCity(city)}
                    className="flex w-full cursor-pointer items-center gap-3.5 rounded-[14px] px-4 py-3.5 text-left transition-colors duration-200 hover:bg-black/[0.02]"
                    style={{ background: isSelected ? "var(--color-badge-recommend-bg)" : "transparent" }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: isSelected ? "var(--color-cta)" : "var(--color-divider)" }}
                    >
                      <MapPin size={14} style={{ color: isSelected ? "#fff" : "var(--color-text-tertiary)" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[15px] font-semibold"
                        style={{ color: isSelected ? "var(--color-cta)" : "var(--color-primary)" }}
                      >
                        {city.label}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {city.balance > 0 && (
                        <span className="text-[14px] font-medium" style={{ color: "var(--color-cta)" }}>
                          {formatKRW(city.balance)}
                        </span>
                      )}
                      {isSelected && <Check size={16} style={{ color: "var(--color-cta)" }} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
