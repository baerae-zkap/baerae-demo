"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import {
  CheckCircle,
  Upload,
  AlertCircle,
  Loader2,
  Camera,
} from "lucide-react";
import { benefitDetails } from "@/data/mock";
import ConsentBottomSheet, { type ConsentSheetConfig } from "@/components/ConsentBottomSheet";

type FetchPhase = "idle" | "fetching" | "done";

export default function DocumentsPage() {
  const { id } = useParams<{ id: string }>();
  const detail = benefitDetails[id as keyof typeof benefitDetails];

  const [docStatuses, setDocStatuses] = useState<Record<string, string>>(() => {
    if (!detail) return {};
    const initial: Record<string, string> = {};
    for (const doc of detail.documents) {
      initial[doc.id] = doc.status;
    }
    return initial;
  });

  const [consentSheetOpen, setConsentSheetOpen] = useState(false);
  const [govDataConsented, setGovDataConsented] = useState(false);
  const [batchPhase, setBatchPhase] = useState<FetchPhase>("idle");
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchTarget, setBatchTarget] = useState(0);
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
    };
  }, []);

  if (!detail) {
    return (
      <>
        <TopNav title="서류 준비" showBack />
        <div className="flex flex-col items-center justify-center px-5 pt-24">
          <div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--color-error-bg)" }}
          >
            <AlertCircle size={28} style={{ color: "var(--color-error)" }} />
          </div>
          <p className="text-base font-semibold" style={{ color: "var(--color-primary)" }}>
            혜택 정보를 찾을 수 없어요
          </p>
          <Link
            href="/benefits"
            className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--color-cta)" }}
          >
            혜택 목록으로
          </Link>
        </div>
      </>
    );
  }

  const govDataConsentConfig: ConsentSheetConfig = {
    title: "동의 한 번으로 서류를 자동으로 준비할 수 있어요",
    benefits: [
      "정부24에서 서류를 자동으로 발급받아요",
      "직접 방문하거나 출력할 필요가 없어요",
      "동의 내역은 내지갑에서 언제든 관리할 수 있어요",
    ],
    dataUsage: "행정정보 공동이용 동의를 통해 정부24에서 필요한 서류를 자동 조회해요. 해당 혜택 신청 외 다른 용도로 사용하지 않아요.",
    consentLabel: "행정정보 공동이용 동의",
  };

  const isDocReady = (docId: string) => {
    const s = docStatuses[docId];
    return s === "ready" || s === "uploaded";
  };

  // Merge "prepared" into "auto" for display — both are automatic
  const autoDocs = detail.documents.filter((d) => d.category === "auto" || d.category === "prepared");
  const manualDocs = detail.documents.filter((d) => d.category === "manual");

  const autoReadyCount = autoDocs.filter((d) => isDocReady(d.id)).length;
  const autoAllReady = autoReadyCount === autoDocs.length;
  const manualReadyCount = manualDocs.filter((d) => isDocReady(d.id)).length;
  const manualAllReady = manualReadyCount === manualDocs.length;
  const allReady = autoAllReady && manualAllReady;

  const pendingAutoDocs = autoDocs.filter((d) => !isDocReady(d.id) && d.category === "auto");

  // Batch fetch
  const startBatchFetch = (docIds: string[]) => {
    if (docIds.length === 0) {
      setBatchPhase("done");
      return;
    }
    setBatchPhase("fetching");
    setBatchTarget(docIds.length);
    setBatchProgress(0);

    let fetched = 0;
    const fetchNext = () => {
      if (fetched < docIds.length) {
        fetchTimerRef.current = setTimeout(() => {
          const docId = docIds[fetched];
          fetched++;
          setDocStatuses((prev) => ({ ...prev, [docId]: "ready" }));
          setBatchProgress(fetched);
          fetchNext();
        }, 600);
      } else {
        fetchTimerRef.current = setTimeout(() => {
          setBatchPhase("done");
        }, 400);
      }
    };
    fetchNext();
  };

  const handleAutoFetch = () => {
    const pending = pendingAutoDocs.map((d) => d.id);
    if (!govDataConsented) {
      setConsentSheetOpen(true);
    } else {
      startBatchFetch(pending);
    }
  };

  const handleConsentAndFetch = () => {
    setGovDataConsented(true);
    setConsentSheetOpen(false);
    const pending = pendingAutoDocs.map((d) => d.id);
    startBatchFetch(pending);
  };

  const handleUpload = (docId: string) => {
    setDocStatuses((prev) => ({ ...prev, [docId]: "uploaded" }));
    const newStatuses = { ...docStatuses, [docId]: "uploaded" };
    const nowAllReady = detail.documents.every((d) => {
      const s = newStatuses[d.id];
      return s === "ready" || s === "uploaded";
    });
  };

  return (
    <>
      <TopNav showBack />

      <div className="pb-36">
        {/* ─── Hero: Title ─── */}
        <div className="px-6 pt-6 text-center">
          <h1
            className="text-[24px] font-bold leading-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {detail.title}
          </h1>
          <p
            className="mt-3 text-[15px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {manualDocs.length > 0 && autoDocs.length > 0
              ? `${manualDocs.length}개만 첨부하면 나머지는 자동이에요`
              : manualDocs.length > 0
                ? `서류 ${manualDocs.length}개를 첨부해주세요`
                : "서류가 자동으로 준비돼요"}
          </p>
        </div>

        {/* ─── Big Emoji ─── */}
        <div className="flex justify-center py-10">
          <div
            className="flex h-32 w-32 items-center justify-center rounded-[36px]"
            style={{
              background: "var(--color-divider)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.05)",
            }}
          >
            <span className="text-[64px] leading-none">📋</span>
          </div>
        </div>

        {/* ─── Section 1: 직접 첨부하는 서류 ─── */}
        {manualDocs.length > 0 && (
          <div className="px-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "var(--color-badge-recommend-bg)" }}
              >
                <span className="text-[13px] font-bold" style={{ color: "var(--color-cta)" }}>1</span>
              </div>
              <p
                className="text-[16px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                직접 첨부하는 서류
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {manualDocs.map((doc, i) => {
                const done = isDocReady(doc.id);
                return (
                  <div
                    key={doc.id}
                    className="py-3.5"
                    style={{
                      borderBottom: i < manualDocs.length - 1 ? "1px solid var(--color-divider)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {done ? (
                        <CheckCircle size={18} style={{ color: "var(--color-cta)" }} />
                      ) : (
                        <div
                          className="h-[18px] w-[18px] rounded-full"
                          style={{ border: "2px solid var(--color-border)" }}
                        />
                      )}
                      <p
                        className="min-w-0 flex-1 text-[15px]"
                        style={{ color: done ? "var(--color-primary)" : "var(--color-text-secondary)" }}
                      >
                        {doc.name}
                      </p>
                      {done ? (
                        <span
                          className="text-[13px]"
                          style={{ color: "var(--color-text-tertiary)" }}
                        >
                          완료
                        </span>
                      ) : (
                        <button
                          onClick={() => handleUpload(doc.id)}
                          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[13px] font-semibold transition-opacity duration-200 active:opacity-90"
                          style={{
                            background: "var(--color-cta)",
                            color: "#fff",
                          }}
                        >
                          <Camera size={14} />
                          첨부하기
                        </button>
                      )}
                    </div>
                    {!done && (
                      <p
                        className="mt-1 pl-[30px] text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        {doc.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Divider ─── */}
        {manualDocs.length > 0 && autoDocs.length > 0 && (
          <div className="my-8 mx-6 h-px" style={{ background: "var(--color-divider)" }} />
        )}

        {/* ─── Section 2: 자동으로 준비되는 서류 ─── */}
        {autoDocs.length > 0 && (
          <div className="px-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "var(--color-divider)" }}
              >
                <span
                  className="text-[13px] font-bold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {manualDocs.length > 0 ? "2" : "1"}
                </span>
              </div>
              <p
                className="text-[16px] font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                자동으로 준비되는 서류
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {autoDocs.map((doc, i) => {
                const done = isDocReady(doc.id);
                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 py-3.5"
                    style={{
                      borderBottom: i < autoDocs.length - 1 ? "1px solid var(--color-divider)" : "none",
                    }}
                  >
                    {done ? (
                      <CheckCircle size={18} style={{ color: "var(--color-cta)" }} />
                    ) : batchPhase === "fetching" ? (
                      <Loader2 size={18} className="animate-spin" style={{ color: "var(--color-cta)" }} />
                    ) : (
                      <div
                        className="h-[18px] w-[18px] rounded-full"
                        style={{ border: "2px solid var(--color-border)" }}
                      />
                    )}
                    <p
                      className="text-[15px]"
                      style={{ color: done ? "var(--color-primary)" : "var(--color-text-secondary)" }}
                    >
                      {doc.name}
                    </p>
                    {done && (
                      <span
                        className="ml-auto text-[13px]"
                        style={{ color: "var(--color-text-tertiary)" }}
                      >
                        완료
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Fetching state */}
            {batchPhase === "fetching" && (
              <p
                className="mt-3 text-center text-[13px]"
                style={{ color: "var(--color-cta)" }}
              >
                서류를 불러오고 있어요 ({batchProgress}/{batchTarget})
              </p>
            )}
          </div>
        )}

        {/* ─── Notice ─── */}
        <div className="mt-8 px-6">
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            자동 불러오기를 원하지 않으면, 정부24에서 직접 발급 후 첨부할 수도 있어요.
          </p>
        </div>
      </div>

      {/* ─── Fixed Bottom CTA ─── */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-8"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 50%, transparent)",
        }}
      >
        {allReady ? (
          <Link
            href={`/benefits/${id}/review`}
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            다음
          </Link>
        ) : batchPhase === "fetching" ? (
          <div
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold"
            style={{
              background: "var(--color-badge-recommend-bg)",
              color: "var(--color-cta)",
            }}
          >
            <Loader2 size={18} className="mr-2 animate-spin" />
            준비하는 중...
          </div>
        ) : !manualAllReady && manualDocs.length > 0 ? (
          <div
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-text-tertiary)",
            }}
          >
            서류 {manualDocs.length - manualReadyCount}개를 첨부해주세요
          </div>
        ) : !autoAllReady && batchPhase === "idle" ? (
          <button
            onClick={handleAutoFetch}
            className="flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[16px] text-[16px] font-bold text-white transition-opacity duration-200 active:opacity-90"
            style={{ background: "var(--color-cta)" }}
          >
            {govDataConsented
              ? "서류 자동으로 준비하기"
              : "동의하고 서류 준비하기"}
          </button>
        ) : (
          <div
            className="flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-bold"
            style={{
              background: "var(--color-divider)",
              color: "var(--color-text-tertiary)",
            }}
          >
            서류를 준비해주세요
          </div>
        )}
      </div>

      <ConsentBottomSheet
        open={consentSheetOpen}
        onClose={() => setConsentSheetOpen(false)}
        onConsent={handleConsentAndFetch}
        config={govDataConsentConfig}
      />
    </>
  );
}
