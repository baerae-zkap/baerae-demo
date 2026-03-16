"use client";

import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  User,
  ChevronRight,
  Settings,
  Shield,
  Link2,
  LogOut,
  FileText,
  Bell,
  Users,
  MapPin,
  Home,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Landmark,
  Lock,
  UserCog,
} from "lucide-react";
import {
  user,
  allLinkedServices,
  familyMembers,
  personalDocuments,
  notifications,
  consents,
  benefits,
  formatKRW,
} from "@/data/mock";

const connectedServices = allLinkedServices.filter((s) => s.connected);
const syncedFamily = familyMembers.filter((m) => m.synced);
const readyDocs = personalDocuments.filter((d) => d.category === "준비 완료");
const enabledConsents = consents.filter((c) => c.enabled);
const unreadCount = notifications.filter((n) => !n.read).length;
const householdSize =
  1 + (user.household.spouse ? 1 : 0) + user.household.children;
const needsDocCount = personalDocuments.length - readyDocs.length;
const eligibleBenefitCount = benefits.filter(
  (b) => b.status === "eligible" || b.status === "likely"
).length;

const statusItems = [
  {
    done: connectedServices.length >= 1,
    label: connectedServices.length >= 1 ? "결제 수단 연결됨" : "결제 수단 연결하기",
    href: "/my/linked-services",
  },
  {
    done: eligibleBenefitCount > 0,
    label: `받을 수 있는 혜택 ${eligibleBenefitCount}건`,
    href: "/benefits",
  },
  {
    done: needsDocCount === 0,
    label: needsDocCount > 0 ? `서류 ${needsDocCount}건 추가 필요` : "서류 준비 완료",
    href: "/my/documents",
  },
];

export default function MyPage() {
  return (
    <>
      <TopNav title="더보기" showBack showNotification notificationCount={notifications.filter(n => !n.read).length} />

      <div className="pb-8">
        {/* ─── Profile + Balance ─── */}
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--color-badge-recommend-bg)" }}
            >
              <User size={24} style={{ color: "var(--color-cta)" }} />
            </div>
            <div className="min-w-0 flex-1">
              <h2
                className="text-[20px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {user.name}님
              </h2>
              <div className="mt-0.5 flex items-center gap-1.5">
                <MapPin size={12} style={{ color: "var(--color-text-tertiary)" }} />
                <span
                  className="text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {user.residence}
                </span>
                <span style={{ color: "var(--color-text-tertiary)" }}>·</span>
                <Home size={12} style={{ color: "var(--color-text-tertiary)" }} />
                <span
                  className="text-[14px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {householdSize}인 가구
                </span>
              </div>
            </div>
          </div>

          {/* Balance */}
          <Link
            href="/my/wallet"
            className="mt-5 flex items-center justify-between rounded-[16px] px-5 py-4 transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <div>
              <p
                className="text-[13px]"
                style={{ color: "var(--color-cta)" }}
              >
                지역화폐 잔액
              </p>
              <p
                className="mt-0.5 text-[22px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                {formatKRW(user.localBalance)}
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--color-cta)" }} />
          </Link>
        </div>

        {/* ─── Service Status ─── */}
        <div className="px-5 mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            서비스 현황
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {statusItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-3 px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
                style={{
                  borderBottom: i < statusItems.length - 1 ? "1px solid var(--color-divider)" : "none",
                }}
              >
                {item.done ? (
                  <CheckCircle size={16} style={{ color: "var(--color-success)" }} />
                ) : (
                  <AlertCircle size={16} style={{ color: "var(--color-warning)" }} />
                )}
                <span
                  className="flex-1 text-[15px] font-medium"
                  style={{
                    color: item.done ? "var(--color-primary)" : "var(--color-warning)",
                  }}
                >
                  {item.label}
                </span>
                {!item.done && (
                  <ChevronRight size={14} style={{ color: "var(--color-warning)" }} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ─── Personal Information ─── */}
        <div className="px-5 mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            개인 정보
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              {
                href: "/my/settings",
                icon: UserCog,
                label: "개인 정보",
                subtitle: `만 ${user.age}세 · ${user.residence}`,
              },
              {
                href: "/my/family",
                icon: Users,
                label: "가구 정보",
                subtitle: `${syncedFamily.length}/${familyMembers.length}명 동기화됨`,
              },
              {
                href: "/my/documents",
                icon: FileText,
                label: "서류 관리",
                subtitle: `${readyDocs.length}/${personalDocuments.length}건 준비됨`,
              },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: "var(--color-divider)" }}
                  >
                    <Icon size={16} style={{ color: "var(--color-text-secondary)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── Connected Services ─── */}
        <div className="px-5 mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            연결된 서비스
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              {
                href: "/my/linked-services",
                icon: CreditCard,
                label: "결제 수단",
                subtitle: `${connectedServices.length}개 연결됨`,
              },
              {
                href: "/my/wallet",
                icon: Landmark,
                label: "지역화폐",
                subtitle: formatKRW(user.localBalance),
              },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: "var(--color-divider)" }}
                  >
                    <Icon size={16} style={{ color: "var(--color-text-secondary)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── Settings ─── */}
        <div className="px-5 mb-6">
          <p
            className="mb-3 px-1 text-[13px] font-medium"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            설정
          </p>
          <div
            className="rounded-[16px]"
            style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
          >
            {[
              {
                href: "/my/notifications",
                icon: Bell,
                label: "알림 설정",
                subtitle: unreadCount > 0 ? `안 읽음 ${unreadCount}건` : "새 알림 없음",
                badge: unreadCount > 0 ? unreadCount : null,
              },
              {
                href: "/my/settings",
                icon: Lock,
                label: "보안",
                subtitle: "비밀번호, 생체 인증",
                badge: null,
              },
              {
                href: "/my/consents",
                icon: Shield,
                label: "동의 관리",
                subtitle: `${enabledConsents.length}/${consents.length}개 활성`,
                badge: null,
              },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3.5 px-5 py-3.5 transition-opacity duration-200 active:opacity-80"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px solid var(--color-divider)" : "none",
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: "var(--color-divider)" }}
                  >
                    <Icon size={16} style={{ color: "var(--color-text-secondary)" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-[15px] font-medium"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {item.label}
                      </p>
                      {item.badge && (
                        <span
                          className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                          style={{ background: "var(--color-error)" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="mt-0.5 text-[13px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: "var(--color-text-tertiary)" }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── Logout ─── */}
        <div className="px-5">
          <Link
            href="/my/logout"
            className="flex h-[48px] items-center justify-center rounded-[14px] text-[14px] font-medium transition-opacity duration-200 active:opacity-90"
            style={{ color: "var(--color-text-tertiary)", background: "var(--color-divider)" }}
          >
            로그아웃
          </Link>
        </div>
      </div>
    </>
  );
}
