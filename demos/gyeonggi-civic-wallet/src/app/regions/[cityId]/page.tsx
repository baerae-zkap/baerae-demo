"use client";

import { use } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { partnerCities, regionOffers } from "@/data/mock";
import {
  Store,
  Tag,
  Calendar,
  ChevronRight,
  MapPinOff,
  Clock,
} from "lucide-react";

export default function CityDetailPage({
  params,
}: {
  params: Promise<{ cityId: string }>;
}) {
  const { cityId } = use(params);

  const city = partnerCities.find((c) => c.id === cityId);

  if (!city) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <TopNav title="지역 정보" showBack />
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
            지역을 찾을 수 없어요
          </p>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            올바른 지역 링크인지 확인해주세요.
          </p>
        </div>
      </div>
    );
  }

  const isComing = city.status === "coming";
  const cityOffers = regionOffers.filter((o) => o.cityId === cityId);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <TopNav title={city.name} showBack />

      <main className="px-4 pb-8">
        {/* City Header */}
        <section
          className="mb-5 rounded-2xl p-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {city.name}
            </h2>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                background: isComing
                  ? "var(--color-border)"
                  : "var(--color-success-bg)",
                color: isComing
                  ? "var(--color-text-tertiary)"
                  : "var(--color-success)",
              }}
            >
              {isComing ? "준비 중" : "이용 가능"}
            </span>
          </div>
          {!isComing && (
            <div
              className="mb-2 flex items-center gap-1 text-sm"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <Store size={14} />
              <span>가맹점 {city.merchantCount.toLocaleString("ko-KR")}곳</span>
            </div>
          )}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {city.description}
          </p>
        </section>

        {isComing ? (
          /* Coming Soon State */
          <section
            className="rounded-2xl p-8 text-center"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Clock
              size={40}
              className="mx-auto mb-3"
              style={{ color: "var(--color-text-tertiary)" }}
            />
            <p
              className="text-base font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              준비 중입니다
            </p>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              곧 이 지역에서도 사용할 수 있어요.
              <br />
              서비스가 열리면 알려드릴게요.
            </p>
          </section>
        ) : (
          <>
            {/* Categories */}
            <section className="mb-6">
              <h3
                className="mb-3 text-sm font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                이용 가능 카테고리
              </h3>
              <div className="flex flex-wrap gap-2">
                {city.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: "var(--color-badge-recommend-bg)",
                      color: "var(--color-cta)",
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </section>

            {/* Featured Merchants */}
            <section className="mb-6">
              <h3
                className="mb-3 text-sm font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                주요 가맹점
              </h3>
              <div
                className="rounded-xl"
                style={{
                  background: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {city.featuredMerchants.map((merchant, idx) => (
                  <div
                    key={merchant.name}
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      borderBottom:
                        idx < city.featuredMerchants.length - 1
                          ? "1px solid var(--color-divider)"
                          : "none",
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {merchant.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs"
                      style={{
                        background: "var(--color-border)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {merchant.category}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Offers */}
            <section className="mb-8">
              <h3
                className="mb-3 text-sm font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                진행 중인 혜택
              </h3>
              {cityOffers.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {cityOffers.map((offer) => (
                    <Link
                      key={offer.id}
                      href={`/regions/${cityId}/offers/${offer.id}`}
                      className="block rounded-xl p-4 transition-shadow duration-200"
                      style={{
                        background: "var(--color-bg-card)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span
                          className="flex-1 text-sm font-semibold leading-snug"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {offer.title}
                        </span>
                        <span
                          className="ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
                          style={{
                            background: "var(--color-warning-bg)",
                            color: "var(--color-warning)",
                          }}
                        >
                          {offer.discount}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center gap-1 text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          <Calendar size={12} />
                          <span>~ {offer.expiryDate} 까지</span>
                        </div>
                        <ChevronRight
                          size={16}
                          className="ml-auto"
                          style={{ color: "var(--color-text-tertiary)" }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-xl p-6 text-center"
                  style={{
                    background: "var(--color-bg-card)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <Tag
                    size={28}
                    className="mx-auto mb-2"
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    현재 진행 중인 혜택이 없어요
                  </p>
                </div>
              )}
            </section>

            {/* CTA */}
            <Link
              href="/pay"
              className="block w-full rounded-xl py-3.5 text-center text-base font-bold transition-opacity duration-200 hover:opacity-90"
              style={{
                background: "var(--color-cta)",
                color: "#FFFFFF",
              }}
            >
              이 지역에서 쓰기
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
