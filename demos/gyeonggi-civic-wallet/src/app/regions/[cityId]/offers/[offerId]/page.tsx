"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { partnerCities, regionOffers } from "@/data/mock";
import {
  MapPin,
  MapPinOff,
  Store,
  CreditCard,
  Calendar,
  Info,
} from "lucide-react";

export default function OfferDetailPage({
  params,
}: {
  params: Promise<{ cityId: string; offerId: string }>;
}) {
  const { cityId, offerId } = use(params);

  const offer = regionOffers.find((o) => o.id === offerId);
  const city = partnerCities.find((c) => c.id === cityId);

  if (!offer || !city) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <TopNav title="혜택 정보" showBack />
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <MapPinOff
            size={48}
            className="mb-4"
            style={{ color: "var(--color-text-tertiary)" }}
          />
          <p
            className="text-base font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            혜택을 찾을 수 없어요
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            올바른 링크인지 확인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <TopNav title={offer.title} showBack />

      <main className="px-4 pb-8">
        {/* Offer Hero */}
        <section
          className="mb-5 rounded-2xl p-5 text-center"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2
            className="mb-4 text-xl font-bold leading-snug"
            style={{ color: "var(--color-primary)" }}
          >
            {offer.title}
          </h2>
          <span
            className="inline-block rounded-full px-5 py-2 text-base font-bold"
            style={{
              background: "var(--color-warning-bg)",
              color: "var(--color-warning)",
            }}
          >
            {offer.discount}
          </span>
        </section>

        {/* Info Cards */}
        <div className="mb-5 flex flex-col gap-3">
          {/* Region */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={16} style={{ color: "var(--color-cta)" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                참여 지역
              </span>
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {city.name}
            </p>
          </div>

          {/* Usage Locations */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Store size={16} style={{ color: "var(--color-cta)" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                사용 가능 장소
              </span>
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {offer.usageLocations}
            </p>
          </div>

          {/* Eligible Methods */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <CreditCard size={16} style={{ color: "var(--color-cta)" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                사용 가능 결제 수단
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {offer.eligibleMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: "var(--color-badge-recommend-bg)",
                    color: "var(--color-cta)",
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Expiry Date */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Calendar size={16} style={{ color: "var(--color-cta)" }} />
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                혜택 기간
              </span>
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              ~ {offer.expiryDate} 까지
            </p>
          </div>
        </div>

        {/* Value Explanation */}
        <section
          className="mb-8 rounded-xl p-4"
          style={{
            background: "var(--color-success-bg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Info size={16} style={{ color: "var(--color-success)" }} />
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--color-success)" }}
            >
              혜택 상세
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-primary)" }}
          >
            {offer.description}
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/pay"
            className="block w-full rounded-xl py-3.5 text-center text-base font-bold transition-opacity duration-200 hover:opacity-90"
            style={{
              background: "var(--color-cta)",
              color: "#FFFFFF",
            }}
          >
            결제하러 가기
          </Link>
          <Link
            href={`/regions/${cityId}`}
            className="block w-full rounded-xl border py-3.5 text-center text-base font-bold transition-opacity duration-200 hover:opacity-80"
            style={{
              borderColor: "var(--color-cta)",
              color: "var(--color-cta)",
              background: "transparent",
            }}
          >
            지역 상세 보기
          </Link>
        </div>
      </main>
    </div>
  );
}
