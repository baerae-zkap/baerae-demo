"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell } from "lucide-react";

interface TopNavProps {
  title?: string;
  largeTitle?: boolean;
  showBack?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
  transparent?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export default function TopNav({
  title,
  largeTitle = false,
  showBack = false,
  showNotification = false,
  notificationCount = 0,
  transparent = false,
  leftSlot,
  rightSlot,
}: TopNavProps) {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-40 flex h-14 items-center justify-between px-5"
      style={{
        background: transparent ? "transparent" : "var(--color-bg)",
      }}
    >
      <div className="flex items-center gap-2" style={{ minWidth: 40 }}>
        {showBack && (
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} style={{ color: "var(--color-primary)" }} />
          </button>
        )}
        {leftSlot}
        {title && largeTitle && (
          <h1
            className="text-[22px] font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {title}
          </h1>
        )}
      </div>
      {title && !largeTitle && (
        <h1
          className="text-base font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h1>
      )}
      <div className="flex items-center justify-end" style={{ minWidth: 40 }}>
        {showNotification && (
          <Link
            href="/my/notifications"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
            aria-label={`알림 ${notificationCount}건`}
          >
            <Bell size={22} style={{ color: "var(--color-primary)" }} />
            {notificationCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </Link>
        )}
        {rightSlot}
      </div>
    </header>
  );
}
