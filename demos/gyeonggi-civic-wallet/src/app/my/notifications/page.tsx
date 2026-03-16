"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { DigestItemCard } from "@/components/WeeklyDigestCard";
import {
  Bell,
  CheckCheck,
} from "lucide-react";
import {
  weeklyDigest,
  notifications,
  type DigestItem,
  type DigestCategory,
} from "@/data/mock";

const categoryMeta: Record<DigestCategory, { color: string; label: string }> = {
  benefit: { color: "var(--color-success)", label: "혜택" },
  document: { color: "#EA580C", label: "서류" },
  payment: { color: "var(--color-cta)", label: "절약" },
  project: { color: "var(--color-cta)", label: "프로젝트" },
};

type TabKey = "all" | DigestCategory;

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "benefit", label: "혜택" },
  { key: "document", label: "서류" },
  { key: "payment", label: "절약" },
  { key: "project", label: "프로젝트" },
];

function formatDate(dateStr: string): string {
  const today = "2026-03-10";
  if (dateStr === today) return "오늘";
  const todayDate = new Date(today);
  const yesterday = new Date(todayDate);
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateStr === yesterday.toISOString().split("T")[0]) return "어제";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(weeklyDigest.items.filter((i) => i.read).map((i) => i.id))
  );
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const allItems = weeklyDigest.items;

  const filteredItems =
    activeTab === "all"
      ? allItems
      : allItems.filter((i) => i.category === activeTab);

  const sortedItems = [...filteredItems].sort((a, b) => {
    const urgencyOrder = { urgent: 0, normal: 1, info: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  const unreadCount = allItems.filter((i) => !readIds.has(i.id)).length;

  // Count per category for tab badges
  const countByCategory = allItems.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {}
  );

  const handleMarkAllRead = () => {
    setReadIds(new Set(allItems.map((i) => i.id)));
  };

  // Empty state
  if (allItems.length === 0) {
    return (
      <>
        <TopNav title="알림" showBack />
        <div className="flex flex-col items-center justify-center px-6 pt-24 pb-8">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-divider)" }}
          >
            <Bell size={28} style={{ color: "var(--color-text-tertiary)" }} />
          </div>
          <p
            className="text-[16px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            이번 주는 새로운 소식이 없어요
          </p>
          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            새 혜택이나 변경사항이 생기면 알려드릴게요
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav title="알림" showBack />

      <div className="px-5 pt-2 pb-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p
              className="text-[16px] font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              {weeklyDigest.weekLabel}
            </p>
            <p
              className="mt-0.5 text-[13px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {allItems.length}건
              {unreadCount > 0 && ` · 읽지 않음 ${unreadCount}`}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200"
              style={{
                color: "var(--color-cta)",
                background: "var(--color-badge-recommend-bg)",
              }}
            >
              <CheckCheck size={13} />
              모두 읽음
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-5 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {tabs
            .filter((t) => t.key === "all" || (countByCategory[t.key] ?? 0) > 0)
            .map((tab) => {
              const isActive = activeTab === tab.key;
              const count =
                tab.key === "all" ? allItems.length : countByCategory[tab.key] ?? 0;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
                  style={{
                    background: isActive
                      ? "var(--color-primary)"
                      : "var(--color-divider)",
                    color: isActive ? "#fff" : "var(--color-text-secondary)",
                  }}
                >
                  {tab.label}
                  <span
                    className="text-[11px]"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
        </div>

        {/* Notification Items */}
        <div className="flex flex-col gap-2.5">
          {sortedItems.map((item) => (
            <DigestItemCard
              key={item.id}
              item={{ ...item, read: readIds.has(item.id) }}
            />
          ))}
        </div>

        {/* Empty filtered state */}
        {sortedItems.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center">
            <p
              className="text-[14px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              이 카테고리에는 알림이 없어요
            </p>
          </div>
        )}

        {/* Past notifications */}
        {notifications.length > 0 && activeTab === "all" && (
          <section className="mt-6" aria-label="지난 알림">
            <p
              className="mb-3 text-[13px] font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              지난 알림
            </p>
            <div
              className="overflow-hidden rounded-[16px]"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid #F1F3F5",
              }}
            >
              {notifications.slice(0, 4).map((n, i) => {
                const inner = (
                  <div className="flex items-center gap-3 px-5 py-3">
                    <p
                      className="min-w-0 flex-1 truncate text-[13px]"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {n.title}
                    </p>
                    <span
                      className="shrink-0 text-[10px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {formatDate(n.date)}
                    </span>
                  </div>
                );
                return (
                  <div
                    key={n.id}
                    style={{
                      borderBottom:
                        i < 3 ? "1px solid var(--color-divider)" : "none",
                    }}
                  >
                    {n.link ? (
                      <Link
                        href={n.link}
                        className="block transition-colors duration-200 active:opacity-95"
                      >
                        {inner}
                      </Link>
                    ) : (
                      inner
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
