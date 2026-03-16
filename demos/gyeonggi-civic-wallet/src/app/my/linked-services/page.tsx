"use client";

import TopNav from "@/components/TopNav";
import { Shield, Check, ArrowRight, Zap } from "lucide-react";
import { allLinkedServices } from "@/data/mock";

const serviceBenefits: Record<string, { connected: string; missing: string }> = {
  "naver-pay": {
    connected: "네이버페이 포인트 적립이 결제 비교에 반영돼요",
    missing: "연결하면 네이버페이 포인트 적립도 비교할 수 있어요",
  },
  "kakao-pay": {
    connected: "카카오페이 캐시백이 결제 비교에 반영돼요",
    missing: "연결하면 카카오페이 캐시백도 비교할 수 있어요",
  },
  "samsung-pay": {
    connected: "삼성페이 혜택이 결제 비교에 반영돼요",
    missing: "연결하면 삼성페이 혜택도 비교할 수 있어요",
  },
  "local-bank": {
    connected: "지역 은행 연동 서비스 이용 중이에요",
    missing: "지역 은행 연동 서비스 준비 중이에요",
  },
};

export default function LinkedServicesPage() {
  const connected = allLinkedServices.filter((s) => s.connected);
  const available = allLinkedServices.filter((s) => !s.connected);
  const connectedCount = connected.length;
  const totalCount = allLinkedServices.length;

  return (
    <>
      <TopNav title="연결된 서비스" showBack />

      <div className="px-5 pt-2 pb-10">
        {/* Top benefit explanation */}
        <div
          className="mb-6 rounded-2xl p-5"
          style={{
            background: "var(--color-bg-card)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Zap size={18} style={{ color: "var(--color-cta)" }} />
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {connectedCount}/{totalCount} 연결됨
            </span>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            결제 서비스를 연결하면 결제할 때 가장 유리한 수단을 자동으로
            비교해드려요
          </p>
        </div>

        {/* Connected Services */}
        {connected.length > 0 && (
          <section className="mb-8">
            <h3
              className="mb-3 text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              연결됨
            </h3>
            <div className="flex flex-col gap-3">
              {connected.map((service) => {
                const benefit = serviceBenefits[service.id];
                return (
                  <div
                    key={service.id}
                    className="rounded-2xl p-4"
                    style={{
                      background: "var(--color-bg-card)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                          style={{
                            background: service.color + "20",
                            color:
                              service.color === "#FEE500"
                                ? "#3C1E1E"
                                : service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {service.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                        style={{
                          background: "var(--color-success-bg)",
                          color: "var(--color-success)",
                        }}
                      >
                        연결됨
                      </span>
                    </div>

                    {/* Benefit description */}
                    {benefit && (
                      <div
                        className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5"
                        style={{ background: "var(--color-success-bg)" }}
                      >
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--color-success)" }}
                        />
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "var(--color-success)" }}
                        >
                          {benefit.connected}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 flex justify-end">
                      <button
                        className="cursor-pointer text-xs font-medium"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        연결 해제
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Available Services */}
        {available.length > 0 && (
          <section className="mb-8">
            <h3
              className="mb-3 text-xs font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              연결 가능
            </h3>
            <div className="flex flex-col gap-3">
              {available.map((service) => {
                const isComingSoon = service.id === "local-bank";
                const benefit = serviceBenefits[service.id];

                return (
                  <div
                    key={service.id}
                    className="rounded-2xl p-4"
                    style={{
                      background: "var(--color-bg-card)",
                      boxShadow: "var(--shadow-sm)",
                      opacity: isComingSoon ? 0.6 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                          style={{
                            background: service.color + "20",
                            color:
                              service.color === "#FEE500"
                                ? "#3C1E1E"
                                : service.color,
                          }}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {service.name}
                          </p>
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: "var(--color-text-tertiary)" }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                      {isComingSoon ? (
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          (준비중)
                        </span>
                      ) : (
                        <button
                          className="flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all duration-200 active:scale-[0.97]"
                          style={{ background: "var(--color-cta)" }}
                        >
                          연결하기
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>

                    {/* Missing benefit message */}
                    {benefit && (
                      <div
                        className="mt-3 flex items-start gap-2 rounded-xl px-3 py-2.5"
                        style={{
                          background: isComingSoon
                            ? "var(--color-divider)"
                            : "var(--color-warning-bg)",
                        }}
                      >
                        <ArrowRight
                          size={14}
                          className="mt-0.5 shrink-0"
                          style={{
                            color: isComingSoon
                              ? "var(--color-text-tertiary)"
                              : "var(--color-warning)",
                          }}
                        />
                        <p
                          className="text-xs leading-relaxed"
                          style={{
                            color: isComingSoon
                              ? "var(--color-text-tertiary)"
                              : "var(--color-warning)",
                          }}
                        >
                          {benefit.missing}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom privacy note */}
        <div
          className="flex items-center gap-3 rounded-2xl p-4"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <Shield size={14} style={{ color: "var(--color-success)" }} />
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            연결된 서비스 데이터는 결제 비교에만 사용되며, 별도 저장되지
            않습니다
          </p>
        </div>
      </div>
    </>
  );
}
