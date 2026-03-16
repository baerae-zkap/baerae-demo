"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import { partnerCities, regionOffers } from "@/data/mock";
import { MapPin, Store, ChevronRight, Tag } from "lucide-react";

export default function RegionsPage() {
  const sortedCities = [...partnerCities].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const featuredOffers = regionOffers.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <TopNav title="다른 지역에서 쓰기" showBack />

      <main className="px-4 pb-8">
        {/* Hero Section */}
        <section
          className="mb-6 rounded-2xl p-5 text-center"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <MapPin size={24} style={{ color: "var(--color-success)" }} />
          </div>
          <h2
            className="mb-2 text-lg font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            다른 지역에서도 사용할 수 있어요
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            경기도 파트너 도시에서 지역화폐를 사용하고
            <br />
            혜택을 받아보세요
          </p>
        </section>

        {/* Partner Cities */}
        <section className="mb-8">
          <h3
            className="mb-3 text-base font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            파트너 도시
          </h3>
          <div className="flex flex-col gap-3">
            {sortedCities.map((city) => {
              const isComing = city.status === "coming";
              return (
                <Link
                  key={city.id}
                  href={`/regions/${city.id}`}
                  className="block rounded-xl p-4 transition-shadow duration-200"
                  style={{
                    background: "var(--color-bg-card)",
                    boxShadow: "var(--shadow-sm)",
                    opacity: isComing ? 0.55 : 1,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span
                          className="text-base font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {city.name}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
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
                          className="mb-1 flex items-center gap-1 text-xs"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          <Store size={12} />
                          <span>가맹점 {city.merchantCount.toLocaleString("ko-KR")}곳</span>
                        </div>
                      )}
                      <p
                        className="text-sm leading-snug"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {city.description}
                      </p>
                    </div>
                    <ChevronRight
                      size={20}
                      className="ml-2 mt-1 shrink-0"
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Offers */}
        <section>
          <h3
            className="mb-3 text-base font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            지금 진행 중인 혜택
          </h3>
          <div className="flex flex-col gap-3">
            {featuredOffers.map((offer) => {
              const city = partnerCities.find((c) => c.id === offer.cityId);
              return (
                <Link
                  key={offer.id}
                  href={`/regions/${offer.cityId}/offers/${offer.id}`}
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
                  <div className="flex items-center gap-1.5">
                    <Tag
                      size={12}
                      style={{ color: "var(--color-text-tertiary)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {city?.name ?? ""}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
