"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Syringe,
  Megaphone,
  Heart,
  Palette,
  ChevronRight,
  X,
  Info,
} from "lucide-react";
import {
  lifeEventTriggers,
  type LifeEventUrgency,
} from "@/data/mock";

function getIcon(name: string, size: number, color: string) {
  const style = { color };
  switch (name) {
    case "GraduationCap":
      return <GraduationCap size={size} style={style} />;
    case "Syringe":
      return <Syringe size={size} style={style} />;
    case "Megaphone":
      return <Megaphone size={size} style={style} />;
    case "Heart":
      return <Heart size={size} style={style} />;
    case "Palette":
      return <Palette size={size} style={style} />;
    default:
      return <Info size={size} style={style} />;
  }
}

const urgencyChip: Record<
  LifeEventUrgency,
  { label: string; color: string; bg: string }
> = {
  urgent: {
    label: "마감 임박",
    color: "var(--color-error)",
    bg: "var(--color-error-bg)",
  },
  upcoming: {
    label: "확인 필요",
    color: "var(--color-warning)",
    bg: "var(--color-warning-bg)",
  },
  info: {
    label: "안내",
    color: "var(--color-cta)",
    bg: "var(--color-badge-recommend-bg)",
  },
};

/** Full list for benefits page — compact rows */
export function LifeEventList() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = lifeEventTriggers.filter((t) => !dismissed.has(t.id));
  const sorted = [...visible].sort((a, b) => {
    const order: Record<LifeEventUrgency, number> = {
      urgent: 0,
      upcoming: 1,
      info: 2,
    };
    return order[a.urgency] - order[b.urgency];
  });

  if (sorted.length === 0) return null;

  return (
    <section className="mb-8" aria-label="지금 확인할 혜택">
      <div className="mb-4 flex items-center gap-2">
        <h2
          className="text-[13px] font-medium"
          style={{ color: "var(--color-primary)" }}
        >
          지금 확인할 혜택
        </h2>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-bold"
          style={{
            background: "var(--color-badge-recommend-bg)",
            color: "var(--color-cta)",
          }}
        >
          {sorted.length}
        </span>
      </div>

      <div
        className="overflow-hidden rounded-[20px]"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid #F1F3F5",
        }}
      >
        {sorted.map((trigger, i) => {
          const chip = urgencyChip[trigger.urgency];
          return (
            <div
              key={trigger.id}
              className="relative"
              style={{
                borderBottom:
                  i < sorted.length - 1
                    ? "1px solid var(--color-divider)"
                    : "none",
              }}
            >
              {trigger.dismissable && (
                <button
                  onClick={() =>
                    setDismissed((prev) => new Set(prev).add(trigger.id))
                  }
                  className="absolute right-3 top-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/5"
                  aria-label="닫기"
                >
                  <X
                    size={11}
                    style={{ color: "var(--color-text-tertiary)" }}
                  />
                </button>
              )}
              <Link
                href={trigger.ctaHref}
                className="flex items-center gap-3 px-6 py-5 pr-10 transition-colors duration-200 active:opacity-95"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: chip.bg }}
                >
                  {getIcon(trigger.iconName, 16, chip.color)}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[16px] font-semibold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {trigger.title}
                  </p>
                  <p
                    className="mt-0.5 truncate text-[13px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {trigger.reason}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ background: chip.bg, color: chip.color }}
                  >
                    {chip.label}
                  </span>
                  <ChevronRight
                    size={14}
                    style={{ color: "var(--color-text-tertiary)" }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
