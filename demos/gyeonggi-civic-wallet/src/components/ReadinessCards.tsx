"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Gift,
  FileText,
  Link2,
  Users,
  Map,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  CircleCheck,
  CircleAlert,
  X,
} from "lucide-react";
import {
  benefits,
  personalDocuments,
  allLinkedServices,
  familyMembers,
  partnerCities,
  paymentRequests,
} from "@/data/mock";

type Priority = "high" | "medium" | "low";

type ReadinessCard = {
  id: string;
  icon: typeof Gift;
  iconBg: string;
  iconColor: string;
  status: string;
  action: string;
  href: string;
  done: boolean;
  priority: Priority;
  dismissible: boolean;
};

function getCards(): ReadinessCard[] {
  const eligibleCount = benefits.filter(
    (b) => b.status === "eligible" || b.status === "likely"
  ).length;
  const needsDocs = personalDocuments.filter(
    (d) => d.category === "추가 필요" || d.category === "불러오기 가능"
  ).length;
  const connectedCount = allLinkedServices.filter((s) => s.connected).length;
  const totalServices = allLinkedServices.filter(
    (s) => !s.description.includes("준비중")
  ).length;
  const syncedCount = familyMembers.filter((m) => m.synced).length;
  const activeCities = partnerCities.filter(
    (c) => c.status === "active"
  ).length;
  const pendingPayments = Object.values(paymentRequests).filter(
    (p) => p.status === "pending"
  ).length;

  const cards: ReadinessCard[] = [];

  // 혜택 추천 준비 완료
  cards.push({
    id: "benefits",
    icon: Gift,
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    status:
      eligibleCount > 0
        ? `혜택 ${eligibleCount}건 확인 가능`
        : "혜택 확인 준비 중",
    action: eligibleCount > 0 ? "확인하기" : "정보 입력",
    href: "/benefits",
    done: eligibleCount > 0,
    priority: eligibleCount > 0 ? "high" : "medium",
    dismissible: eligibleCount > 0,
  });

  // 서류 N개 추가 필요 / 서류 준비 완료
  cards.push({
    id: "documents",
    icon: FileText,
    iconBg:
      needsDocs === 0 ? "var(--color-success-bg)" : "var(--color-warning-bg)",
    iconColor:
      needsDocs === 0 ? "var(--color-success)" : "var(--color-warning)",
    status:
      needsDocs === 0 ? "서류 준비 완료" : `서류 ${needsDocs}건 추가 필요`,
    action: needsDocs === 0 ? "확인하기" : "준비하기",
    href: "/my/documents",
    done: needsDocs === 0,
    priority: needsDocs > 0 ? "high" : "low",
    dismissible: needsDocs === 0,
  });

  // 결제 최적화 연결 완료 / 결제 연결 추가 가능
  cards.push({
    id: "payment",
    icon: Link2,
    iconBg:
      connectedCount >= totalServices
        ? "var(--color-success-bg)"
        : "var(--color-badge-recommend-bg)",
    iconColor:
      connectedCount >= totalServices
        ? "var(--color-success)"
        : "var(--color-cta)",
    status:
      connectedCount >= totalServices
        ? "결제 연결 완료"
        : `결제 ${connectedCount}개 연결됨`,
    action: connectedCount >= totalServices ? "관리하기" : "추가 연결",
    href: "/my/linked-services",
    done: connectedCount >= totalServices,
    priority: connectedCount >= totalServices ? "low" : "medium",
    dismissible: connectedCount >= totalServices,
  });

  // 가족 정보 확인 완료
  cards.push({
    id: "family",
    icon: Users,
    iconBg:
      syncedCount === familyMembers.length
        ? "var(--color-success-bg)"
        : "var(--color-badge-recommend-bg)",
    iconColor:
      syncedCount === familyMembers.length
        ? "var(--color-success)"
        : "var(--color-cta)",
    status:
      syncedCount === familyMembers.length
        ? "가족 정보 확인 완료"
        : `가족 ${syncedCount}명 확인됨`,
    action: "확인하기",
    href: "/my/family",
    done: syncedCount === familyMembers.length,
    priority: syncedCount === familyMembers.length ? "low" : "medium",
    dismissible: syncedCount === familyMembers.length,
  });

  // 다른 지역에서도 사용 가능
  if (activeCities > 1) {
    cards.push({
      id: "regions",
      icon: Map,
      iconBg: "var(--color-badge-recommend-bg)",
      iconColor: "var(--color-cta)",
      status: `${activeCities}개 지역에서 사용 가능`,
      action: "지역 보기",
      href: "/regions",
      done: true,
      priority: "low",
      dismissible: true,
    });
  }

  // 본인 확인 필요
  cards.push({
    id: "identity",
    icon: ShieldCheck,
    iconBg: "var(--color-badge-recommend-bg)",
    iconColor: "var(--color-cta)",
    status: "본인 확인 필요",
    action: "설정하기",
    href: "/invest",
    done: false,
    priority: "medium",
    dismissible: true,
  });

  // 결제 요청 대기 가능
  if (pendingPayments > 0) {
    cards.push({
      id: "pending-payments",
      icon: CreditCard,
      iconBg: "var(--color-badge-recommend-bg)",
      iconColor: "var(--color-cta)",
      status: `결제 ${pendingPayments}건 대기 중`,
      action: "결제하기",
      href: "/pay",
      done: false,
      priority: "medium",
      dismissible: false,
    });
  }

  // Sort: high → medium → low
  const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  cards.sort((a, b) => order[a.priority] - order[b.priority]);

  return cards;
}

/** Horizontal scrollable cards for Home */
export default function ReadinessCards() {
  const cards = getCards();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = cards.filter((c) => !dismissed.has(c.id));
  if (visible.length === 0) return null;

  return (
    <div className="-mx-5 px-5">
      <div
        className="flex gap-2.5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {visible.map((card) => {
          const Icon = card.icon;
          const canDismiss = card.dismissible && card.priority === "low";
          return (
            <div key={card.id} className="relative w-[156px] shrink-0">
              {canDismiss && (
                <button
                  onClick={() =>
                    setDismissed((prev) => new Set(prev).add(card.id))
                  }
                  className="absolute -right-1 -top-1 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full"
                  style={{ background: "var(--color-divider)" }}
                  aria-label="닫기"
                >
                  <X
                    size={10}
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </button>
              )}
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl px-3.5 py-3 transition-all duration-200 hover:shadow-md"
                style={{
                  background: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: card.iconBg }}
                  >
                    <Icon
                      size={15}
                      style={{ color: card.iconColor }}
                      aria-hidden="true"
                    />
                  </div>
                  {card.done ? (
                    <CircleCheck
                      size={14}
                      style={{ color: "var(--color-success)" }}
                      aria-hidden="true"
                    />
                  ) : (
                    <CircleAlert
                      size={14}
                      style={{ color: "var(--color-cta)" }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {card.status}
                </p>
                <span
                  className="mt-1.5 flex items-center gap-0.5 text-[11px] font-medium"
                  style={{
                    color: card.done
                      ? "var(--color-success)"
                      : "var(--color-cta)",
                  }}
                >
                  {card.action}
                  <ChevronRight size={11} aria-hidden="true" />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Vertical stacked cards for My page */
export function ReadinessCardStack() {
  const cards = getCards();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = cards.filter((c) => !dismissed.has(c.id));
  if (visible.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {visible.map((card) => {
        const Icon = card.icon;
        const canDismiss = card.dismissible && card.priority === "low";
        return (
          <div
            key={card.id}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              background: "var(--color-bg-card)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Link
              href={card.href}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: card.iconBg }}
              >
                <Icon
                  size={15}
                  style={{ color: card.iconColor }}
                  aria-hidden="true"
                />
              </div>
              <p
                className="min-w-0 flex-1 text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {card.status}
              </p>
            </Link>
            {canDismiss ? (
              <button
                onClick={() =>
                  setDismissed((prev) => new Set(prev).add(card.id))
                }
                className="shrink-0 cursor-pointer text-xs font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                나중에
              </button>
            ) : (
              <Link
                href={card.href}
                className="flex shrink-0 items-center gap-0.5 text-xs font-medium"
                style={{
                  color: card.done
                    ? "var(--color-success)"
                    : "var(--color-cta)",
                }}
              >
                {card.action}
                <ChevronRight size={13} aria-hidden="true" />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
