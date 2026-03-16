"use client";

import { useState, useCallback } from "react";
import {
  suppressionHistory,
  suppressionRules,
  type PromptType,
  type SuppressionAction,
  type SuppressionRecord,
} from "@/data/mock";

const NOW = "2026-03-10T12:00:00";

type SuppressionResult = {
  shouldShow: boolean;
  downgradeToCard: boolean;
  showCount: number;
};

function getRule(promptType: PromptType) {
  return suppressionRules.find((r) => r.promptType === promptType);
}

function getRecords(promptId: string, history: SuppressionRecord[]) {
  return history.filter((r) => r.promptId === promptId);
}

function checkSuppression(
  promptId: string,
  promptType: PromptType,
  history: SuppressionRecord[],
  sessionSeen: Set<string>
): SuppressionResult {
  const rule = getRule(promptType);
  if (!rule) return { shouldShow: true, downgradeToCard: false, showCount: 0 };

  const records = getRecords(promptId, history);

  // Permanently hidden
  if (records.some((r) => r.action === "permanently-hidden")) {
    return { shouldShow: false, downgradeToCard: false, showCount: records.length };
  }

  // Completed — don't show again
  if (records.some((r) => r.action === "completed")) {
    return { shouldShow: false, downgradeToCard: false, showCount: records.length };
  }

  // Session dedup — don't show same prompt twice in one session
  if (sessionSeen.has(promptId)) {
    return { shouldShow: false, downgradeToCard: rule.downgradeToCard, showCount: records.length };
  }

  // Snoozed — check until date
  const snoozed = records.find(
    (r) => r.action === "snoozed" && r.snoozedUntil && r.snoozedUntil > NOW.slice(0, 10)
  );
  if (snoozed) {
    return { shouldShow: false, downgradeToCard: rule.downgradeToCard, showCount: records.length };
  }

  // Max show count exceeded
  const dismissCount = records.filter((r) => r.action === "dismissed").length;
  if (dismissCount >= rule.maxShowCount) {
    return { shouldShow: false, downgradeToCard: false, showCount: dismissCount };
  }

  // Dismiss cooldown
  const lastDismiss = records
    .filter((r) => r.action === "dismissed")
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];

  if (lastDismiss && rule.dismissCooldownHours > 0) {
    const dismissTime = new Date(lastDismiss.timestamp).getTime();
    const nowTime = new Date(NOW).getTime();
    const hoursSinceDismiss = (nowTime - dismissTime) / (1000 * 60 * 60);

    if (hoursSinceDismiss < rule.dismissCooldownHours) {
      return {
        shouldShow: false,
        downgradeToCard: rule.downgradeToCard,
        showCount: dismissCount,
      };
    }
  }

  // Previously dismissed but cooldown passed — downgrade to card
  if (dismissCount > 0 && rule.downgradeToCard) {
    return { shouldShow: true, downgradeToCard: true, showCount: dismissCount };
  }

  return { shouldShow: true, downgradeToCard: false, showCount: dismissCount };
}

export function useSuppressionMemory() {
  const [history, setHistory] = useState<SuppressionRecord[]>([
    ...suppressionHistory,
  ]);
  const [sessionSeen, setSessionSeen] = useState<Set<string>>(new Set());

  const check = useCallback(
    (promptId: string, promptType: PromptType): SuppressionResult => {
      return checkSuppression(promptId, promptType, history, sessionSeen);
    },
    [history, sessionSeen]
  );

  const record = useCallback(
    (
      promptId: string,
      promptType: PromptType,
      action: SuppressionAction,
      snoozedUntil?: string
    ) => {
      const newRecord: SuppressionRecord = {
        id: `sup-${Date.now()}`,
        promptId,
        promptType,
        action,
        timestamp: NOW,
        snoozedUntil,
      };
      setHistory((prev) => [...prev, newRecord]);
      setSessionSeen((prev) => new Set(prev).add(promptId));
    },
    []
  );

  const markSeen = useCallback((promptId: string) => {
    setSessionSeen((prev) => new Set(prev).add(promptId));
  }, []);

  return { check, record, markSeen };
}
