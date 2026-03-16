"use client";

import Link from "next/link";
import { ChevronRight, Zap, Upload, Clock } from "lucide-react";
import { type FallbackOption } from "@/data/mock";

function getTypeIcon(type: FallbackOption["type"]) {
  switch (type) {
    case "primary":
      return <Zap size={15} style={{ color: "white" }} aria-hidden="true" />;
    case "manual":
      return <Upload size={15} style={{ color: "var(--color-cta)" }} aria-hidden="true" />;
    case "defer":
      return <Clock size={15} style={{ color: "var(--color-text-tertiary)" }} aria-hidden="true" />;
  }
}

interface FallbackRouteCardProps {
  context: string;
  options: FallbackOption[];
  onDefer?: () => void;
}

export default function FallbackRouteCard({
  context,
  options,
  onDefer,
}: FallbackRouteCardProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "var(--color-bg-card)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="px-5 pt-4 pb-2">
        <p
          className="text-xs font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          {context}
        </p>
      </div>

      <div className="flex flex-col">
        {options.map((opt, i) => {
          const isDeferWithCallback = opt.type === "defer" && onDefer;

          const content = (
            <div
              className="flex items-center gap-3.5 px-5 py-3.5 transition-colors duration-200 hover:bg-black/[0.02]"
              style={{
                borderTop: i > 0 ? "1px solid var(--color-divider)" : "none",
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    opt.type === "primary"
                      ? "var(--color-cta)"
                      : opt.type === "manual"
                        ? "var(--color-badge-recommend-bg)"
                        : "var(--color-divider)",
                }}
              >
                {getTypeIcon(opt.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold"
                  style={{
                    color:
                      opt.type === "defer"
                        ? "var(--color-text-tertiary)"
                        : "var(--color-primary)",
                  }}
                >
                  {opt.label}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {opt.description}
                </p>
                {opt.tradeoff && (
                  <p
                    className="mt-0.5 text-[11px]"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {opt.tradeoff}
                  </p>
                )}
              </div>
              <ChevronRight
                size={14}
                className="shrink-0"
                style={{ color: "var(--color-text-tertiary)" }}
                aria-hidden="true"
              />
            </div>
          );

          if (isDeferWithCallback) {
            return (
              <button
                key={opt.id}
                onClick={onDefer}
                className="w-full cursor-pointer text-left"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={opt.id} href={opt.href} className="block">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
