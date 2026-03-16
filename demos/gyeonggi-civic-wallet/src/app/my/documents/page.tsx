"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import {
  CheckCircle,
  Download,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Upload,
  FolderOpen,
  FileCheck,
  Info,
  Loader2,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { personalDocuments, type PersonalDocument } from "@/data/mock";
import DocumentReadyInterstitial from "@/components/DocumentReadyInterstitial";

const TODAY = "2026-03-09";

function isExpiringWithin3Months(expiryDate: string): boolean {
  const expiry = new Date(expiryDate);
  const today = new Date(TODAY);
  const threeMonthsLater = new Date(today);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  return expiry <= threeMonthsLater && expiry > today;
}

function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) <= new Date(TODAY);
}

type CategoryConfig = {
  sectionTitle: string;
  filter: PersonalDocument["category"];
  badgeLabel: string;
  badgeColor: string;
  badgeBg: string;
  actionLabel: string;
  ActionIcon: typeof RefreshCw;
};

const categoryConfigs: CategoryConfig[] = [
  {
    sectionTitle: "준비된 서류",
    filter: "준비 완료",
    badgeLabel: "준비 완료",
    badgeColor: "var(--color-success)",
    badgeBg: "var(--color-success-bg)",
    actionLabel: "갱신하기",
    ActionIcon: RefreshCw,
  },
  {
    sectionTitle: "자동으로 불러올 수 있는 서류",
    filter: "불러오기 가능",
    badgeLabel: "불러오기 가능",
    badgeColor: "var(--color-cta)",
    badgeBg: "var(--color-badge-recommend-bg)",
    actionLabel: "불러오기",
    ActionIcon: Download,
  },
  {
    sectionTitle: "직접 첨부 필요",
    filter: "추가 필요",
    badgeLabel: "직접 첨부",
    badgeColor: "var(--color-warning)",
    badgeBg: "var(--color-warning-bg)",
    actionLabel: "첨부하기",
    ActionIcon: Upload,
  },
  {
    sectionTitle: "추가 확인 필요",
    filter: "검토 중",
    badgeLabel: "확인 필요",
    badgeColor: "var(--color-cta)",
    badgeBg: "var(--color-badge-recommend-bg)",
    actionLabel: "갱신하기",
    ActionIcon: Clock,
  },
];

function getSourceLabel(source: PersonalDocument["source"]) {
  switch (source) {
    case "정부24":
      return { icon: Download, label: "정부24" };
    case "자동":
      return { icon: RefreshCw, label: "자동" };
    case "직접 첨부":
      return { icon: Upload, label: "직접 첨부" };
  }
}

type BatchPhase = "idle" | "fetching" | "done";

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [fetchedIds, setFetchedIds] = useState<Set<string>>(new Set());
  const [batchPhase, setBatchPhase] = useState<BatchPhase>("idle");
  const [batchProgress, setBatchProgress] = useState(0);
  const [showDocInterstitial, setShowDocInterstitial] = useState(false);

  const isDocFetched = (id: string) => fetchedIds.has(id);

  const readyCount = personalDocuments.filter(
    (d) => d.category === "준비 완료" || isDocFetched(d.id)
  ).length;
  const fetchableCount = personalDocuments.filter(
    (d) => d.category === "불러오기 가능" && !isDocFetched(d.id)
  ).length;
  const neededCount = personalDocuments.filter(
    (d) => d.category === "추가 필요"
  ).length;
  const reviewingCount = personalDocuments.filter(
    (d) => d.category === "검토 중"
  ).length;
  const totalCount = personalDocuments.length;
  const progressPercent = Math.round((readyCount / totalCount) * 100);

  if (personalDocuments.length === 0) {
    return (
      <>
        <TopNav title="내 서류" showBack />
        <div className="flex flex-col items-center justify-center px-6 pt-24 pb-8">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--color-success-bg)" }}
          >
            <FolderOpen
              size={28}
              style={{ color: "var(--color-text-tertiary)" }}
            />
          </div>
          <p
            className="mb-1 text-[16px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            등록된 서류가 없어요
          </p>
          <p
            className="mb-8 text-center text-[16px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            혜택 신청에 필요한 서류를 미리 준비해보세요
          </p>
          <Link
            href="/benefits"
            className="flex h-11 items-center justify-center rounded-[14px] px-6 text-[16px] font-semibold text-white transition-all duration-200 active:opacity-95"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 둘러보기
          </Link>
        </div>
      </>
    );
  }

  const statCards = [
    {
      label: "준비 완료",
      count: readyCount,
      color: "var(--color-success)",
      bg: "var(--color-success-bg)",
      Icon: CheckCircle,
    },
    {
      label: "불러오기 가능",
      count: fetchableCount,
      color: "var(--color-cta)",
      bg: "var(--color-badge-recommend-bg)",
      Icon: Download,
    },
    {
      label: "직접 첨부",
      count: neededCount,
      color: "var(--color-warning)",
      bg: "var(--color-warning-bg)",
      Icon: AlertTriangle,
    },
    {
      label: "확인 필요",
      count: reviewingCount,
      color: "var(--color-cta)",
      bg: "var(--color-badge-recommend-bg)",
      Icon: Clock,
    },
  ];

  return (
    <>
      <TopNav title="내 서류" showBack />

      <div className="px-6 pt-2 pb-8">
        {/* Progress hero */}
        <div
          className="mb-8 rounded-[20px] px-6 py-5"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid #F1F3F5",
          }}
        >
          <div className="mb-1 flex items-center gap-2">
            <FileCheck size={18} style={{ color: "var(--color-cta)" }} />
            <h2
              className="text-[16px] font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              서류 준비 현황
            </h2>
          </div>
          <p
            className="mb-4 text-[16px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {readyCount}건 준비 완료 / 총 {totalCount}건
          </p>

          {/* Progress bar */}
          <div
            className="h-2.5 w-full overflow-hidden rounded-full"
            style={{ background: "var(--color-divider)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: "var(--color-success)",
              }}
            />
          </div>
          <p
            className="mt-2 text-right text-[13px] font-medium"
            style={{ color: "var(--color-success)" }}
          >
            {progressPercent}%
          </p>
        </div>

        {/* Quick stats 2x2 grid */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-[20px] px-4 py-3.5"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid #F1F3F5",
              }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: stat.bg }}
              >
                <stat.Icon size={16} style={{ color: stat.color }} />
              </div>
              <div>
                <p
                  className="text-lg font-bold leading-tight"
                  style={{ color: stat.color }}
                >
                  {stat.count}
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Batch auto-fetch section */}
        {fetchableCount > 0 && batchPhase === "idle" && (
          <section className="mb-8">
            <button
              onClick={() => {
                const fetchable = personalDocuments.filter(
                  (d) => d.category === "불러오기 가능" && !isDocFetched(d.id)
                );
                if (fetchable.length === 0) return;
                setBatchPhase("fetching");
                setBatchProgress(0);
                let fetched = 0;
                const fetchNext = () => {
                  if (fetched < fetchable.length) {
                    setTimeout(() => {
                      setFetchedIds((prev) => new Set(prev).add(fetchable[fetched].id));
                      fetched++;
                      setBatchProgress(fetched);
                      fetchNext();
                    }, 600);
                  } else {
                    setTimeout(() => {
                      setBatchPhase("done");
                      setTimeout(() => setShowDocInterstitial(true), 800);
                    }, 400);
                  }
                };
                fetchNext();
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] py-3.5 text-[16px] font-semibold text-white transition-all duration-200 active:opacity-95"
              style={{ background: "var(--color-cta)" }}
            >
              <Download size={16} />
              불러올 수 있는 서류 {fetchableCount}건 한 번에 가져오기
            </button>
            <p
              className="mt-2 text-center text-[11px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              자동 불러오기가 가장 빠른 방법이에요
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById("section-추가 필요");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer text-[11px] font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                직접 첨부하기
              </button>
              <span
                className="text-[10px]"
                style={{ color: "var(--color-border)" }}
              >
                |
              </span>
              <Link
                href="/home"
                className="text-[11px] font-medium"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                나중에
              </Link>
            </div>
          </section>
        )}

        {batchPhase === "fetching" && (
          <section className="mb-8">
            <div
              className="flex flex-col items-center gap-3 rounded-[20px] px-6 py-5"
              style={{
                background: "var(--color-badge-recommend-bg)",
                border: "1.5px solid var(--color-cta)",
              }}
            >
              <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" style={{ color: "var(--color-cta)" }} />
                <span className="text-[16px] font-semibold" style={{ color: "var(--color-cta)" }}>
                  서류를 불러오고 있어요
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--color-border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${personalDocuments.filter((d) => d.category === "불러오기 가능").length > 0 ? (batchProgress / personalDocuments.filter((d) => d.category === "불러오기 가능").length) * 100 : 0}%`,
                    background: "var(--color-cta)",
                  }}
                />
              </div>
              <span className="text-[13px]" style={{ color: "var(--color-text-secondary)" }}>
                {batchProgress}/{personalDocuments.filter((d) => d.category === "불러오기 가능").length}건 완료
              </span>
            </div>
          </section>
        )}

        {batchPhase === "done" && (
          <section className="mb-8">
            <div
              className="flex items-center gap-3 rounded-[20px] px-6 py-5"
              style={{
                background: "var(--color-success-bg)",
                border: "1.5px solid var(--color-success)",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--color-bg-card)" }}
              >
                <Sparkles size={20} style={{ color: "var(--color-success)" }} />
              </div>
              <div>
                <p className="text-[16px] font-semibold" style={{ color: "var(--color-success)" }}>
                  자동 서류를 모두 불러왔어요
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
                  이제 혜택 신청이 더 빨라져요
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Document sections by category */}
        {categoryConfigs.map((config) => {
          const allDocs = personalDocuments.filter(
            (d) => d.category === config.filter
          );
          // If fetchable docs were fetched, move them to "준비 완료" visually
          const docs = config.filter === "불러오기 가능"
            ? allDocs.filter((d) => !isDocFetched(d.id))
            : config.filter === "준비 완료"
              ? [...allDocs, ...personalDocuments.filter((d) => d.category === "불러오기 가능" && isDocFetched(d.id))]
              : allDocs;
          if (docs.length === 0) return null;

          return (
            <section key={config.filter} className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <h3
                  className="text-[13px] font-medium"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  {config.sectionTitle}
                </h3>
                <span
                  className="rounded-full px-2 py-0.5 text-[13px] font-medium"
                  style={{
                    background: config.badgeBg,
                    color: config.badgeColor,
                  }}
                >
                  {docs.length}
                </span>
              </div>

              <div
                className="overflow-hidden rounded-[20px]"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid #F1F3F5",
                }}
              >
                {docs.map((doc, i) => {
                  const isSelected = selectedDoc === doc.id;
                  const sourceInfo = getSourceLabel(doc.source);
                  const SourceIcon = sourceInfo.icon;
                  const expiringWarning =
                    doc.expiryDate &&
                    !isExpired(doc.expiryDate) &&
                    isExpiringWithin3Months(doc.expiryDate);
                  const expired =
                    doc.expiryDate && isExpired(doc.expiryDate);

                  return (
                    <div
                      key={doc.id}
                      style={{
                        borderBottom:
                          i < docs.length - 1
                            ? "1px solid var(--color-divider)"
                            : "none",
                      }}
                    >
                      {/* Card Header - Tappable */}
                      <button
                        onClick={() =>
                          setSelectedDoc(isSelected ? null : doc.id)
                        }
                        className="flex w-full cursor-pointer items-start justify-between px-6 py-4 text-left transition-colors duration-200 active:opacity-95"
                      >
                        <div className="flex-1 pr-3">
                          <div className="mb-1.5 flex flex-wrap items-center gap-2">
                            <span
                              className="text-[16px] font-semibold"
                              style={{ color: "var(--color-primary)" }}
                            >
                              {doc.title}
                            </span>
                            {/* Source Badge */}
                            <span
                              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium"
                              style={{
                                background: "var(--color-divider)",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              <SourceIcon size={10} />
                              {sourceInfo.label}
                            </span>
                            {/* Status Badge */}
                            <span
                              className="inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                              style={{
                                background: config.badgeBg,
                                color: config.badgeColor,
                              }}
                            >
                              {config.badgeLabel}
                            </span>
                          </div>

                          {/* Description */}
                          <p
                            className="text-[13px] leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {doc.description}
                          </p>

                          {/* Expiry warning */}
                          {(expired || expiringWarning) && (
                            <div
                              className="mt-2 inline-flex items-center gap-1.5 rounded-[14px] px-2.5 py-1.5"
                              style={{
                                background: expired
                                  ? "var(--color-error-bg)"
                                  : "var(--color-warning-bg)",
                              }}
                            >
                              <AlertTriangle
                                size={12}
                                style={{
                                  color: expired
                                    ? "var(--color-error)"
                                    : "var(--color-warning)",
                                }}
                              />
                              <span
                                className="text-[11px] font-medium"
                                style={{
                                  color: expired
                                    ? "var(--color-error)"
                                    : "var(--color-warning)",
                                }}
                              >
                                {expired
                                  ? `만료됨 (${doc.expiryDate})`
                                  : `만료 임박 (${doc.expiryDate})`}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Expand Indicator */}
                        <div
                          className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ background: "var(--color-divider)" }}
                        >
                          {isSelected ? (
                            <ChevronUp
                              size={14}
                              style={{
                                color: "var(--color-text-secondary)",
                              }}
                            />
                          ) : (
                            <ChevronDown
                              size={14}
                              style={{
                                color: "var(--color-text-secondary)",
                              }}
                            />
                          )}
                        </div>
                      </button>

                      {/* Expanded Detail Section */}
                      {isSelected && (
                        <div
                          className="px-6 pb-4"
                          style={{
                            borderTop: "1px solid var(--color-divider)",
                          }}
                        >
                          <div className="pt-4">
                            {/* Detail Grid */}
                            <div className="mb-4 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-[13px]"
                                  style={{
                                    color: "var(--color-text-tertiary)",
                                  }}
                                >
                                  서류명
                                </span>
                                <span
                                  className="text-[13px] font-medium"
                                  style={{ color: "var(--color-primary)" }}
                                >
                                  {doc.title}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-[13px]"
                                  style={{
                                    color: "var(--color-text-tertiary)",
                                  }}
                                >
                                  출처
                                </span>
                                <span
                                  className="text-[13px] font-medium"
                                  style={{ color: "var(--color-primary)" }}
                                >
                                  {doc.source}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span
                                  className="text-[13px]"
                                  style={{
                                    color: "var(--color-text-tertiary)",
                                  }}
                                >
                                  설명
                                </span>
                                <span
                                  className="text-right text-[13px] font-medium"
                                  style={{ color: "var(--color-primary)" }}
                                >
                                  {doc.description}
                                </span>
                              </div>
                              {doc.issuedDate && (
                                <div className="flex items-center justify-between">
                                  <span
                                    className="text-[13px]"
                                    style={{
                                      color: "var(--color-text-tertiary)",
                                    }}
                                  >
                                    발급일
                                  </span>
                                  <span
                                    className="text-[13px] font-medium"
                                    style={{ color: "var(--color-primary)" }}
                                  >
                                    {doc.issuedDate}
                                  </span>
                                </div>
                              )}
                              {doc.expiryDate && (
                                <div className="flex items-center justify-between">
                                  <span
                                    className="text-[13px]"
                                    style={{
                                      color: "var(--color-text-tertiary)",
                                    }}
                                  >
                                    만료일
                                  </span>
                                  <span
                                    className="flex items-center gap-1 text-[13px] font-medium"
                                    style={{
                                      color: expired
                                        ? "var(--color-error)"
                                        : expiringWarning
                                          ? "var(--color-warning)"
                                          : "var(--color-primary)",
                                    }}
                                  >
                                    {(expired || expiringWarning) && (
                                      <AlertTriangle size={10} />
                                    )}
                                    {doc.expiryDate}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Action Button */}
                            <button
                              className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] text-[16px] font-semibold text-white transition-all duration-200 active:opacity-95"
                              style={{ background: "var(--color-cta)" }}
                            >
                              <config.ActionIcon size={14} />
                              {config.actionLabel}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Bottom note */}
        <div
          className="flex items-center gap-3 rounded-[20px] px-6 py-5"
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-divider)",
          }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-badge-recommend-bg)" }}
          >
            <Info size={14} style={{ color: "var(--color-cta)" }} />
          </div>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            서류는 혜택 신청 시 자동으로 첨부돼요
          </p>
        </div>
      </div>
      <DocumentReadyInterstitial
        open={showDocInterstitial}
        onDismiss={() => setShowDocInterstitial(false)}
        docs={{
          autoFetched: fetchedIds.size,
          alreadyReady: personalDocuments.filter((d) => d.category === "준비 완료").length,
          manualRemaining: personalDocuments.filter((d) => d.category === "추가 필요").length,
          totalDocs: personalDocuments.length,
        }}
        ctaHref="/benefits"
        ctaLabel="신청 가능한 혜택 보기"
      />
    </>
  );
}
