"use client";

import Link from "next/link";
import {
  LinkIcon,
  AlertCircle,
  WifiOff,
  Receipt,
  Store,
  RefreshCw,
} from "lucide-react";

interface EdgeStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function EdgeState({
  icon,
  title,
  description,
  action,
  secondaryAction,
}: EdgeStateProps) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--color-divider)" }}
      >
        {icon}
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-primary)" }}
      >
        {title}
      </p>
      <p
        className="mt-1.5 max-w-[240px] text-xs leading-relaxed"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          {action.label}
        </Link>
      )}
      {secondaryAction && (
        <Link
          href={secondaryAction.href}
          className="mt-2 flex min-h-[44px] items-center px-4 text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {secondaryAction.label}
        </Link>
      )}
    </div>
  );
}

// --- Specific Edge States ---

export function NoLinkedServices() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--color-bg-card)",
        border: "1px dashed var(--color-border)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--color-divider)" }}
        >
          <LinkIcon
            size={18}
            style={{ color: "var(--color-text-tertiary)" }}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            연결된 결제 서비스가 없어요
          </p>
          <p
            className="mt-1 text-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            결제 서비스를 연결하면 가장 유리한 결제수단을 자동으로 비교해드려요
          </p>
          <Link
            href="/my"
            className="mt-3 inline-flex h-9 items-center rounded-lg px-4 text-xs font-medium text-white"
            style={{ background: "var(--color-cta)" }}
          >
            서비스 연결하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServiceUnavailable({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--color-warning-bg)" }}
      >
        <WifiOff
          size={28}
          style={{ color: "var(--color-warning)" }}
          aria-hidden="true"
        />
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-primary)" }}
      >
        일시적으로 이용할 수 없어요
      </p>
      <p
        className="mt-1.5 max-w-[240px] text-xs leading-relaxed"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        잠시 후 다시 시도해주세요
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 flex h-11 cursor-pointer items-center gap-2 rounded-xl px-6 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--color-cta)" }}
        >
          <RefreshCw size={14} aria-hidden="true" />
          다시 시도하기
        </button>
      )}
      <Link
        href="/pay"
        className="mt-2 flex min-h-[44px] items-center px-4 text-xs font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        근처 가맹점 보기
      </Link>
    </div>
  );
}

export function NoPaymentHistory() {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--color-divider)" }}
      >
        <Receipt
          size={28}
          style={{ color: "var(--color-text-tertiary)" }}
          aria-hidden="true"
        />
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-primary)" }}
      >
        아직 결제 내역이 없어요
      </p>
      <p
        className="mt-1.5 max-w-[240px] text-xs leading-relaxed"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        지역화폐로 결제하면 최대 10% 할인받을 수 있어요
      </p>
      <Link
        href="/pay"
        className="mt-5 flex h-11 items-center rounded-xl px-6 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
        style={{ background: "var(--color-cta)" }}
      >
        가맹점 찾아보기
      </Link>
    </div>
  );
}

export function SearchEmpty() {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--color-divider)" }}
      >
        <Store
          size={28}
          style={{ color: "var(--color-text-tertiary)" }}
          aria-hidden="true"
        />
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-primary)" }}
      >
        검색 결과가 없어요
      </p>
      <p
        className="mt-1.5 max-w-[240px] text-xs leading-relaxed"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        다른 이름이나 카테고리로 검색해보세요
      </p>
    </div>
  );
}

export function MerchantNotEligible({
  merchantName,
}: {
  merchantName: string;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "var(--color-warning-bg)",
        border: "1px solid var(--color-warning)",
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          size={20}
          style={{ color: "var(--color-warning)" }}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            지역화폐 결제 불가
          </p>
          <p
            className="mt-1 text-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {merchantName}은(는) 아직 지역화폐 가맹점이 아니에요
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href="/pay"
              className="flex h-9 items-center rounded-lg px-4 text-xs font-medium text-white"
              style={{ background: "var(--color-cta)" }}
            >
              다른 가맹점 보기
            </Link>
            <Link
              href="/pay"
              className="flex h-9 items-center rounded-lg px-4 text-xs font-medium"
              style={{
                background: "var(--color-divider)",
                color: "var(--color-secondary)",
              }}
            >
              다른 결제수단 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
