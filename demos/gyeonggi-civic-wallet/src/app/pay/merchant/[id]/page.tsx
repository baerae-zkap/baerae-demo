"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import { MerchantDetailSkeleton } from "@/components/Skeletons";
import { ServiceUnavailable, MerchantNotEligible } from "@/components/EdgeStates";
import {
  MapPin,
  Clock,
  ChevronRight,
  AlertCircle,
  QrCode,
  ScanLine,
  ShoppingCart,
  Sparkles,
  Link2,
  CheckCircle2,
} from "lucide-react";
import { merchants, user, formatKRW, allLinkedServices } from "@/data/mock";
import ConsentBottomSheet, { type ConsentSheetConfig } from "@/components/ConsentBottomSheet";

function BenefitIcon({ type, methodId }: { type: string; methodId: string }) {
  const letter =
    type === "local" ? "G" : methodId === "naver-pay" ? "N" : "K";
  const bg =
    type === "local"
      ? "var(--color-badge-recommend-bg)"
      : methodId === "naver-pay"
        ? "#E8F5E9"
        : "#FFF9E0";
  const color =
    type === "local"
      ? "var(--color-cta)"
      : methodId === "naver-pay"
        ? "#03C75A"
        : "#3C1E1E";

  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
      style={{ background: bg, color }}
    >
      {letter}
    </div>
  );
}

export default function MerchantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [paymentConsented, setPaymentConsented] = useState(false);
  const demo = searchParams.get("demo");
  const merchant = merchants.find((m) => m.id === id);

  const paymentConsentConfig: ConsentSheetConfig = {
    title: "결제 서비스를 연동하면 더 유리한 결제를 찾아드려요",
    benefits: [
      "연결된 모든 결제 수단의 혜택을 한눈에 비교해요",
      "가맹점별로 유리한 결제 방법을 자동으로 찾아드려요",
      "동의 내역은 마이에서 언제든 관리할 수 있어요",
    ],
    dataUsage: "연동된 결제 서비스의 포인트와 혜택 정보만 조회해요. 결제 내역이나 개인정보는 수집하지 않아요.",
    consentLabel: "결제 서비스 데이터 연동 동의",
  };

  const unconnectedServices = allLinkedServices.filter(s => !s.connected && !s.description.includes("준비중"));

  // Demo: loading skeleton (?demo=loading)
  if (demo === "loading") {
    return (
      <>
        <TopNav title="가맹점" showBack />
        <MerchantDetailSkeleton />
      </>
    );
  }

  // Demo: service unavailable (?demo=unavailable)
  if (demo === "unavailable") {
    return (
      <>
        <TopNav title="가맹점" showBack />
        <div className="px-5 pt-2">
          <ServiceUnavailable />
        </div>
      </>
    );
  }

  // Error state: merchant not found
  if (!merchant) {
    return (
      <>
        <TopNav title="가맹점" showBack />
        <div className="flex flex-col items-center px-5 pt-20">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertCircle
              size={28}
              style={{ color: "var(--color-error)" }}
              aria-hidden="true"
            />
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            가맹점 정보를 찾을 수 없어요
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            잘못된 경로이거나 삭제된 가맹점이에요
          </p>
          <Link
            href="/pay"
            className="mt-6 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white"
            style={{ background: "var(--color-cta)" }}
          >
            가맹점 목록으로
          </Link>
        </div>
      </>
    );
  }

  // Not eligible state
  if (!merchant.eligible) {
    return (
      <>
        <TopNav title={merchant.name} showBack />
        <div className="px-5 pt-2 pb-6">
          <section className="mb-6">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold"
              style={{
                background: "var(--color-error-bg)",
                color: "var(--color-text-tertiary)",
              }}
            >
              {merchant.name.charAt(0)}
            </div>
            <h2
              className="mt-4 text-xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {merchant.name}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <MapPin
                size={14}
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
              <span
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {merchant.location}
              </span>
            </div>
          </section>

          <MerchantNotEligible merchantName={merchant.name} />
        </div>
      </>
    );
  }

  const benefits = merchant.benefits;
  const recommended = benefits.find((b) => b.recommended);

  return (
    <>
      <TopNav title={merchant.name} showBack />

      <div className="px-5 pt-2 pb-6">
        {/* Merchant Info */}
        <section className="mb-5">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold"
              style={{
                background: "var(--color-divider)",
                color: "var(--color-secondary)",
              }}
            >
              {merchant.name.charAt(0)}
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {merchant.name}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <MapPin size={12} aria-hidden="true" />
                  {merchant.location}
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <Clock size={12} aria-hidden="true" />
                  영업중 · {merchant.category}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits by Payment Method */}
        {benefits.length > 0 && (
          <section className="mb-5" aria-label="결제 혜택">
            <h3
              className="mb-3 text-sm font-semibold"
              style={{ color: "var(--color-text-secondary)" }}
            >
              이 가맹점 결제 혜택
            </h3>

            {/* Recommended benefit */}
            {recommended && (
              <div
                className="mb-3 overflow-hidden rounded-2xl"
                style={{
                  border: "1.5px solid var(--color-cta)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-5 py-2"
                  style={{ background: "var(--color-cta)" }}
                >
                  <Sparkles size={12} className="text-white" aria-hidden="true" />
                  <span className="text-xs font-medium text-white">
                    이 가맹점에서 가장 유리해요
                  </span>
                </div>
                <div
                  className="px-5 py-4"
                  style={{ background: "var(--color-badge-recommend-bg)" }}
                >
                  <div className="flex items-center gap-3">
                    <BenefitIcon type={recommended.type} methodId={recommended.methodId} />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {recommended.methodName}
                      </p>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {recommended.benefitDescription}
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-lg font-bold"
                      style={{ color: "var(--color-success)" }}
                    >
                      {recommended.benefitRate}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Other benefits */}
            <div className="flex flex-col gap-2.5">
              {benefits
                .filter((b) => !b.recommended)
                .map((b) => (
                  <div
                    key={b.methodId}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5"
                    style={{
                      background: "var(--color-bg-card)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <BenefitIcon type={b.type} methodId={b.methodId} />
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {b.methodName}
                        </p>
                        <p
                          className="mt-0.5 text-xs"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {b.benefitDescription}
                        </p>
                      </div>
                    </div>
                    <span
                      className="shrink-0 text-sm font-bold"
                      style={{ color: "var(--color-cta)" }}
                    >
                      {b.benefitRate}
                    </span>
                  </div>
                ))}
            </div>

            {!paymentConsented && unconnectedServices.length > 0 && (
              <div
                className="mt-3 overflow-hidden rounded-2xl"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1.5px solid var(--color-cta)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: "var(--color-badge-recommend-bg)" }}
                >
                  <Link2 size={13} style={{ color: "var(--color-cta)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-cta)" }}>
                    연결하면 더 유리한 결제를 비교할 수 있어요
                  </span>
                </div>
                <div className="px-4 py-3">
                  <div
                    className="flex flex-col gap-2.5"
                    style={{ opacity: 0.4, filter: "blur(2px)", pointerEvents: "none" }}
                  >
                    {unconnectedServices.slice(0, 2).map((svc) => (
                      <div key={svc.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                            style={{ background: "#E8EDF3", color: svc.color }}
                          >
                            {svc.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                              {svc.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                              혜택 비교 가능
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold" style={{ color: "var(--color-text-tertiary)" }}>
                          ?%
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSheetOpen(true)}
                    className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 active:opacity-80"
                    style={{ background: "var(--color-cta)" }}
                  >
                    연결하고 더 정확히 보기
                  </button>
                </div>
              </div>
            )}

            {paymentConsented && unconnectedServices.length > 0 && (
              <div
                className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "var(--color-success-bg)" }}
              >
                <CheckCircle2 size={16} style={{ color: "var(--color-success)" }} />
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-success)" }}
                >
                  {unconnectedServices[0].name} 연동이 완료됐어요
                </p>
              </div>
            )}
          </section>
        )}

        {/* Balance Context */}
        <div
          className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "var(--color-divider)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold"
            style={{ background: "var(--color-badge-recommend-bg)", color: "var(--color-cta)" }}
          >
            G
          </div>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            지역화폐 잔액 {formatKRW(user.localBalance)}
          </p>
        </div>

        {/* Why recommended */}
        {recommended && (
          <div
            className="mb-5 rounded-xl px-4 py-3"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--color-cta)" }}
            >
              {recommended.methodName}로 결제하면 {recommended.benefitRate}{" "}
              {recommended.benefitDescription.includes("할인") ? "할인" : "혜택"}을
              받을 수 있어요
            </p>
          </div>
        )}

        {/* CTAs — action-oriented, not checkout */}
        <div className="flex flex-col gap-3">
          <Link
            href="/pay/code"
            className="flex h-14 items-center justify-center gap-2 rounded-2xl text-base font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            <QrCode size={20} aria-hidden="true" />
            QR/바코드 열기
          </Link>
          <Link
            href="/pay/scan"
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-primary)",
            }}
          >
            <ScanLine size={18} aria-hidden="true" />
            QR 스캔하기
          </Link>
          {merchant.supportsOnlineOrder && (
            <Link
              href={`/pay/merchant/${merchant.id}?online=true`}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                color: "var(--color-primary)",
              }}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              온라인 주문 결제
            </Link>
          )}
          <Link
            href={`https://map.naver.com/v5/search/${encodeURIComponent(merchant.name)}`}
            className="flex min-h-[44px] items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-secondary)",
            }}
          >
            <MapPin size={16} className="mr-1.5" aria-hidden="true" />
            지도 보기
          </Link>
        </div>
      </div>

      <ConsentBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConsent={() => {
          setPaymentConsented(true);
          setSheetOpen(false);
        }}
        config={paymentConsentConfig}
      />
    </>
  );
}
