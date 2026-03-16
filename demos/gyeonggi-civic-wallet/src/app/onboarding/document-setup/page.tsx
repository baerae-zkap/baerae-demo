"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Download, FileText } from "lucide-react";
import { personalDocuments } from "@/data/mock";

export default function DocumentSetupPage() {
  const readyDocs = personalDocuments.filter((d) => d.category === "준비 완료");
  const fetchableDocs = personalDocuments.filter(
    (d) => d.category === "불러오기 가능"
  );
  const laterDocs = personalDocuments.filter(
    (d) => d.category === "추가 필요" || d.category === "검토 중"
  );

  const totalCount = personalDocuments.length;
  const readyCount = readyDocs.length;
  const readyRatio = totalCount > 0 ? (readyCount / totalCount) * 100 : 0;

  return (
    <div
      className="min-h-[100dvh] flex flex-col px-6 py-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/onboarding/family-sync" className="flex items-center justify-center">
          <ArrowLeft size={22} style={{ color: "var(--color-primary)" }} />
        </Link>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          5/6
        </span>
      </div>

      {/* Heading */}
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--color-primary)" }}
      >
        서류 자동 준비
      </h1>
      <p
        className="text-base mb-8"
        style={{ color: "var(--color-text-secondary)" }}
      >
        서류를 미리 준비하면 혜택 신청이 빨라져요
      </p>

      {/* Section 1: Ready Documents */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={18} style={{ color: "var(--color-success)" }} />
          <span
            className="text-[15px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            이미 준비된 서류
          </span>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {readyDocs.map((doc, index) => (
            <div key={doc.id}>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span
                  className="text-[15px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {doc.title}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--color-success)",
                    backgroundColor: "var(--color-success-bg)",
                  }}
                >
                  준비 완료
                </span>
              </div>
              {index < readyDocs.length - 1 && (
                <div
                  className="mx-4 h-px"
                  style={{ backgroundColor: "var(--color-divider)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Fetchable Documents */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Download size={18} style={{ color: "var(--color-cta)" }} />
          <span
            className="text-[15px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            자동으로 불러올 수 있는 서류
          </span>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {fetchableDocs.map((doc, index) => (
            <div key={doc.id}>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span
                  className="text-[15px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {doc.title}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--color-cta)",
                    backgroundColor: "var(--color-badge-recommend-bg)",
                  }}
                >
                  자동 불러오기
                </span>
              </div>
              {index < fetchableDocs.length - 1 && (
                <div
                  className="mx-4 h-px"
                  style={{ backgroundColor: "var(--color-divider)" }}
                />
              )}
            </div>
          ))}
          <div
            className="mx-4 h-px"
            style={{ backgroundColor: "var(--color-divider)" }}
          />
          <p
            className="text-xs px-4 py-3"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            동의 후 정부24에서 자동으로 가져와요
          </p>
        </div>
      </div>

      {/* Section 3: Later Documents */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={18} style={{ color: "var(--color-warning)" }} />
          <span
            className="text-[15px] font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            나중에 첨부할 수 있는 서류
          </span>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-card)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {laterDocs.map((doc, index) => (
            <div key={doc.id}>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span
                  className="text-[15px]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {doc.title}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: "var(--color-warning)",
                    backgroundColor: "var(--color-warning-bg)",
                  }}
                >
                  나중에 첨부
                </span>
              </div>
              {index < laterDocs.length - 1 && (
                <div
                  className="mx-4 h-px"
                  style={{ backgroundColor: "var(--color-divider)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Strip */}
      <div
        className="rounded-2xl px-5 py-4 mb-6"
        style={{
          backgroundColor: "var(--color-bg-card)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <p
          className="text-[15px] font-semibold mb-3"
          style={{ color: "var(--color-primary)" }}
        >
          총 {totalCount}건 중 {readyCount}건이 이미 준비되어 있어요
        </p>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--color-divider)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${readyRatio}%`,
              backgroundColor: "var(--color-success)",
            }}
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-6">
        <Link
          href="/onboarding/complete"
          className="w-full h-14 flex items-center justify-center rounded-2xl text-base font-semibold text-white"
          style={{ backgroundColor: "var(--color-cta)" }}
        >
          서류 확인 완료
        </Link>
      </div>
    </div>
  );
}
