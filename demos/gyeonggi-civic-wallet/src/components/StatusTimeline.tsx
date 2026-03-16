"use client";

import { CircleCheck, Circle, Clock } from "lucide-react";
import { type StatusTimelineEntry } from "@/data/mock";

interface StatusTimelineProps {
  steps: StatusTimelineEntry[];
}

export default function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const isActive = step.status === "current";
        const isDone = step.status === "done";

        return (
          <div key={i} className="flex gap-3">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              {isDone ? (
                <CircleCheck
                  size={18}
                  style={{ color: "var(--color-success)" }}
                  aria-hidden="true"
                />
              ) : isActive ? (
                <Clock
                  size={18}
                  style={{ color: "var(--color-cta)" }}
                  aria-hidden="true"
                />
              ) : (
                <Circle
                  size={18}
                  style={{ color: "var(--color-border)" }}
                  aria-hidden="true"
                />
              )}
              {!isLast && (
                <div
                  className="my-1 w-[2px] flex-1"
                  style={{
                    background: isDone
                      ? "var(--color-success)"
                      : "var(--color-border)",
                    minHeight: 20,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`text-sm leading-snug ${isActive ? "font-semibold" : "font-medium"}`}
                style={{
                  color: isDone || isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-tertiary)",
                }}
              >
                {step.step}
              </p>
              {step.description && (
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {step.description}
                </p>
              )}
              {step.date && (
                <p
                  className="mt-0.5 text-[11px]"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {step.date}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
