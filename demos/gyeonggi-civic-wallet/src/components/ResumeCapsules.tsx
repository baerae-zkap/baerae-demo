"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Gift,
  CreditCard,
  FileText,
  TrendingUp,
  ChevronRight,
  X,
  Clock,
} from "lucide-react";
import { resumeTasks, type ResumeTask, type ResumeTaskType } from "@/data/mock";

const typeConfig: Record<
  ResumeTaskType,
  { icon: typeof Gift; color: string; bg: string; label: string }
> = {
  benefit: {
    icon: Gift,
    color: "var(--color-success)",
    bg: "var(--color-success-bg)",
    label: "혜택",
  },
  payment: {
    icon: CreditCard,
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
    label: "결제",
  },
  document: {
    icon: FileText,
    color: "var(--color-warning)",
    bg: "var(--color-warning-bg)",
    label: "서류",
  },
  invest: {
    icon: TrendingUp,
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
    label: "참여",
  },
};

function getActiveTasks(tasks: ResumeTask[]): ResumeTask[] {
  const now = new Date().toISOString();
  return tasks.filter((t) => {
    if (t.status === "completed" || t.status === "dismissed" || t.status === "expired") return false;
    if (t.status === "snoozed" && t.snoozedUntil && t.snoozedUntil > now.slice(0, 10)) return false;
    if (t.expiresAt && t.expiresAt < now.slice(0, 10)) return false;
    return true;
  });
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

/** Compact capsule card for Home — shows the most recent active task */
export default function ResumeCapsuleHome() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const tasks = getActiveTasks(resumeTasks).filter((t) => !dismissed.has(t.id));

  const handleDismiss = useCallback((id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  }, []);

  if (tasks.length === 0) return null;

  const task = tasks[0];
  const config = typeConfig[task.type];
  const Icon = config.icon;

  return (
    <section className="mb-3" aria-label="이어하기">
      <div
        className="relative flex items-center rounded-xl px-4 py-3"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <Link
          href={task.href}
          className="flex min-w-0 flex-1 items-center gap-2"
        >
          <span
            className="shrink-0 text-[11px] font-semibold"
            style={{ color: config.color }}
          >
            이어하기
          </span>
          <p
            className="min-w-0 truncate text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            {task.description}
          </p>
          {task.progress && (
            <span
              className="shrink-0 text-[11px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {task.progress.current}/{task.progress.total}
            </span>
          )}
          <ChevronRight
            size={14}
            className="shrink-0"
            style={{ color: "var(--color-text-tertiary)" }}
            aria-hidden="true"
          />
        </Link>
        <button
          onClick={() => handleDismiss(task.id)}
          className="ml-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
          aria-label="닫기"
        >
          <X size={12} style={{ color: "var(--color-text-tertiary)" }} />
        </button>
      </div>
    </section>
  );
}

/** List of all active resume tasks for My page */
export function ResumeTaskList() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [snoozed, setSnoozed] = useState<Set<string>>(new Set());
  const tasks = getActiveTasks(resumeTasks).filter(
    (t) => !dismissed.has(t.id) && !snoozed.has(t.id)
  );

  if (tasks.length === 0) return null;

  return (
    <section className="mb-5" aria-label="이어서 하기">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--color-primary)" }}
        >
          이어서 하기
        </h3>
        <span
          className="text-[11px]"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {tasks.length}건
        </span>
      </div>
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {tasks.map((task, i) => {
          const config = typeConfig[task.type];
          const Icon = config.icon;

          return (
            <div
              key={task.id}
              className="relative"
              style={{
                borderBottom:
                  i < tasks.length - 1
                    ? "1px solid var(--color-divider)"
                    : "none",
              }}
            >
              <Link
                href={task.href}
                className="flex items-center gap-3.5 px-5 py-3.5 transition-colors duration-200 hover:bg-black/[0.02]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: config.bg }}
                >
                  <Icon
                    size={16}
                    style={{ color: config.color }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="rounded px-1 py-0.5 text-[10px] font-semibold"
                      style={{ background: config.bg, color: config.color }}
                    >
                      {config.label}
                    </span>
                    {task.progress && (
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {task.progress.current}/{task.progress.total}
                      </span>
                    )}
                    <span
                      className="ml-auto text-[10px]"
                      style={{ color: "var(--color-text-tertiary)" }}
                    >
                      {timeAgo(task.updatedAt)}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {task.description}
                  </p>
                  <p
                    className="mt-0.5 text-[11px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {task.title}
                    {task.expiresAt && ` · 마감 ${task.expiresAt.slice(5).replace("-", "/")}`}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="shrink-0"
                  style={{ color: "var(--color-text-tertiary)" }}
                  aria-hidden="true"
                />
              </Link>

            </div>
          );
        })}
      </div>
    </section>
  );
}
