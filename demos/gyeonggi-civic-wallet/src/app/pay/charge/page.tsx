"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import { CheckCircle, Info, X, Check } from "lucide-react";
import { user, formatKRW } from "@/data/mock";
import InvestSuggestion from "@/components/InvestSuggestion";
import { useCity } from "@/context/CityContext";

const quickAmounts = [10000, 30000, 50000, 100000, 200000, 300000];

const accounts = [
  { id: "shinhan", name: "신한은행", number: "110-***-****78", logo: "/gyeonggi-civic-wallet-demo/logos/shinhan.svg" },
  { id: "kakao", name: "카카오뱅크", number: "333-***-****12", logo: "/gyeonggi-civic-wallet-demo/logos/kakao-bank.svg" },
];

export default function ChargePage() {
  const { selectedCity } = useCity();
  const [amount, setAmount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [chargeDone, setChargeDone] = useState(false);
  const [showInvest, setShowInvest] = useState(false);
  const cityShort = selectedCity.replace("시", "").replace("군", "");

  const incentiveRate = amount >= 100000 ? 10 : amount >= 50000 ? 7 : amount >= 30000 ? 5 : 0;
  const incentiveAmount = Math.floor(amount * incentiveRate / 100);

  const canCharge = amount >= 10000;

  if (chargeDone) {
    return (
      <>
        <TopNav title="충전" showBack />
        <div className="flex flex-col items-center px-6 pt-16 pb-8">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <CheckCircle size={32} style={{ color: "var(--color-success)" }} />
          </div>
          <p
            className="text-[20px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            충전 완료
          </p>
          <p
            className="mt-2 text-[28px] font-bold"
            style={{ color: "var(--color-cta)" }}
          >
            {formatKRW(amount)}
          </p>
          {incentiveAmount > 0 && (
            <p
              className="mt-1 text-[14px] font-medium"
              style={{ color: "var(--color-success)" }}
            >
              +{formatKRW(incentiveAmount)} 인센티브 적립
            </p>
          )}

          <div
            className="mt-8 w-full rounded-[20px] px-5 py-4"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid #F1F3F5",
            }}
          >
            <div className="flex items-center justify-between py-2">
              <span className="text-[14px]" style={{ color: "var(--color-text-tertiary)" }}>
                충전 후 잔액
              </span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>
                {formatKRW(user.localBalance + amount + incentiveAmount)}
              </span>
            </div>
            <div
              className="flex items-center justify-between py-2"
              style={{ borderTop: "1px solid var(--color-divider)" }}
            >
              <span className="text-[14px]" style={{ color: "var(--color-text-tertiary)" }}>
                출금 계좌
              </span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>
                {selectedAccount.name} {selectedAccount.number}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowInvest(true)}
            className="mt-6 w-full cursor-pointer rounded-[14px] py-4 text-[16px] font-semibold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            확인
          </button>
        </div>

        <InvestSuggestion
          open={showInvest}
          onDismiss={() => {
            setShowInvest(false);
            setChargeDone(false);
          }}
          cityName={cityShort}
          amount={amount}
        />
      </>
    );
  }

  return (
    <>
      <TopNav title="충전" showBack />

      <div className="px-6 pt-2 pb-44">
        {/* Current balance */}
        <div className="mb-6">
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            현재 {user.residence} 지역화폐 잔액
          </p>
          <p
            className="mt-1 text-[28px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {formatKRW(user.localBalance)}
          </p>
        </div>

        {/* Amount input */}
        <div
          className="rounded-[20px] px-5 py-5"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid #F1F3F5",
          }}
        >
          <p
            className="text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            충전 금액
          </p>
          <div className="mt-3">
            <div
              className="flex items-center rounded-[14px] px-4 py-3"
              style={{ background: "var(--color-divider)" }}
            >
              <input
                type="text"
                inputMode="numeric"
                value={amount > 0 ? amount.toLocaleString() : ""}
                onChange={(e) => {
                  const v = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
                  setAmount(isNaN(v) ? 0 : v);
                }}
                placeholder="최소 10,000원"
                className="flex-1 bg-transparent text-[22px] font-bold outline-none placeholder:text-[var(--color-text-tertiary)]"
                style={{ color: "var(--color-primary)" }}
              />
              <span
                className="text-[16px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                원
              </span>
            </div>
          </div>

          {/* Quick amounts */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {quickAmounts.map((qa) => (
              <button
                key={qa}
                onClick={() => setAmount(qa)}
                className="cursor-pointer rounded-[10px] py-2.5 text-[14px] font-medium transition-colors duration-200 active:opacity-90"
                style={{
                  background: amount === qa ? "var(--color-badge-recommend-bg)" : "var(--color-bg-card)",
                  color: amount === qa ? "var(--color-cta)" : "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {qa >= 10000 ? `${(qa / 10000).toLocaleString()}만원` : formatKRW(qa)}
              </button>
            ))}
          </div>
        </div>

        {/* Bonus info */}
        {incentiveRate > 0 && (
          <div
            className="mt-4 rounded-[16px] px-5 py-4"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px]" style={{ color: "var(--color-text-secondary)" }}>
                충전 금액
              </span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>
                {formatKRW(amount)}
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[14px]" style={{ color: "var(--color-text-secondary)" }}>
                추가 혜택 <span className="font-semibold" style={{ color: "var(--color-cta)" }}>{incentiveRate}%</span>
              </span>
              <span className="text-[14px] font-bold" style={{ color: "var(--color-cta)" }}>
                +{formatKRW(incentiveAmount)}
              </span>
            </div>
            <div
              className="mt-3 flex items-center justify-between border-t pt-3"
              style={{ borderColor: "var(--color-divider)" }}
            >
              <span className="text-[14px] font-semibold" style={{ color: "var(--color-primary)" }}>
                총 충전 금액
              </span>
              <span className="text-[16px] font-bold" style={{ color: "var(--color-primary)" }}>
                {formatKRW(amount + incentiveAmount)}
              </span>
            </div>
          </div>
        )}

        {/* Account selector */}
        <div className="mt-5">
          <p
            className="mb-3 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            출금 계좌
          </p>
          <button
            onClick={() => setShowAccountPicker(true)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-[16px] px-5 py-4 transition-opacity duration-200 active:opacity-90"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid #F1F3F5",
            }}
          >
            <img src={selectedAccount.logo} alt={selectedAccount.name} className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1 text-left">
              <p
                className="text-[15px] font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {selectedAccount.name}
              </p>
              <p
                className="text-[13px]"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {selectedAccount.number}
              </p>
            </div>
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--color-cta)" }}
            >
              변경
            </span>
          </button>
        </div>

      </div>

      {/* Account picker bottom sheet */}
      {showAccountPicker && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAccountPicker(false)}
          />
          <div
            className="absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 rounded-t-[20px]"
            style={{ background: "var(--color-bg)" }}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p className="text-[17px] font-bold" style={{ color: "var(--color-primary)" }}>
                출금 계좌 선택
              </p>
              <button
                onClick={() => setShowAccountPicker(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
                aria-label="닫기"
              >
                <X size={18} style={{ color: "var(--color-text-tertiary)" }} />
              </button>
            </div>

            <div className="px-3 pb-8">
              {accounts.map((a) => {
                const isSelected = a.id === selectedAccount.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedAccount(a);
                      setShowAccountPicker(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3.5 rounded-[14px] px-4 py-4 text-left transition-colors duration-200 hover:bg-black/[0.02]"
                    style={{ background: isSelected ? "var(--color-badge-recommend-bg)" : "transparent" }}
                  >
                    <img src={a.logo} alt={a.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[15px] font-semibold"
                        style={{ color: isSelected ? "var(--color-cta)" : "var(--color-primary)" }}
                      >
                        {a.name}
                      </p>
                      <p className="text-[13px]" style={{ color: "var(--color-text-tertiary)" }}>
                        {a.number}
                      </p>
                    </div>
                    {isSelected && (
                      <Check size={16} style={{ color: "var(--color-cta)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom: Notice + CTA */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-3"
        style={{ background: "linear-gradient(to top, var(--color-bg) 60%, transparent)" }}
      >
        <div
          className="mb-3 flex items-start gap-2 rounded-[14px] px-4 py-3"
          style={{ background: "var(--color-divider)" }}
        >
          <Info
            size={14}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            충전된 지역화폐는 {user.residence} 가맹점에서 사용할 수 있어요. 월 최대 충전 한도는 50만원이에요.
          </p>
        </div>
        <button
          onClick={() => {
            if (canCharge) setChargeDone(true);
          }}
          disabled={!canCharge}
          className="w-full cursor-pointer rounded-[14px] py-4 text-[16px] font-semibold text-white transition-opacity duration-200 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "var(--color-cta)" }}
        >
          {amount > 0
            ? `${formatKRW(amount)} 충전하기`
            : "충전할 금액을 입력해주세요"}
        </button>
      </div>
    </>
  );
}
