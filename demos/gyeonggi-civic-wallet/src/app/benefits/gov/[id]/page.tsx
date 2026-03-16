"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import TopNav from "@/components/TopNav";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { governmentBenefits } from "@/data/mock";
import BenefitIcon from "@/components/BenefitIcon";

const govDetails: Record<string, {
  description: string;
  who: string;
  how: string;
  period: string;
  contact: string;
}> = {
  "gov-basic-pension": {
    description: "만 65세 이상 소득 하위 70% 어르신에게 매월 지급되는 기초연금입니다.",
    who: "만 65세 이상, 소득인정액 기준 하위 70%",
    how: "주민센터 방문 또는 복지로 온라인 신청",
    period: "매월 25일 지급",
    contact: "국민연금공단 1355",
  },
  "gov-child-allowance": {
    description: "만 8세 미만 아동에게 매월 10만원을 지급하는 보편적 수당입니다.",
    who: "만 8세 미만 아동 (대한민국 국적, 주민등록)",
    how: "주민센터 방문 또는 복지로·정부24 온라인 신청",
    period: "매월 25일 지급",
    contact: "보건복지상담센터 129",
  },
  "gov-youth-job": {
    description: "미취업 청년의 구직활동을 지원하기 위해 월 50만원을 6개월간 지급합니다.",
    who: "만 18~34세, 졸업·중퇴 후 2년 이내, 기준 중위소득 120% 이하",
    how: "워크넷 온라인 신청 후 취업지원 프로그램 참여",
    period: "6개월간 매월 지급",
    contact: "고용노동부 1350",
  },
  "gov-disability": {
    description: "장애인의 자립생활과 사회참여를 지원하는 활동보조 서비스입니다.",
    who: "만 6세 이상 ~ 65세 미만 등록 장애인",
    how: "주민센터 방문 신청 → 국민연금공단 방문조사",
    period: "매월 활동지원 급여 제공",
    contact: "국민연금공단 1355",
  },
  "gov-energy-voucher": {
    description: "에너지 취약계층의 난방비·전기요금을 지원하는 바우처입니다.",
    who: "기초생활수급자, 차상위계층 중 노인·장애인·영유아·임산부 가구",
    how: "주민센터 방문 신청",
    period: "하절기·동절기 연 2회 지급",
    contact: "에너지바우처 콜센터 1600-3190",
  },
  "gov-national-scholarship": {
    description: "소득 구간에 따라 대학 등록금을 지원하는 국가장학금입니다.",
    who: "대한민국 국적 대학생, 소득 8구간 이하",
    how: "한국장학재단 홈페이지 온라인 신청",
    period: "매 학기 신청 (1학기: 12~2월, 2학기: 6~8월)",
    contact: "한국장학재단 1599-2000",
  },
  "gov-housing-voucher": {
    description: "저소득층의 임차료 부담을 줄여주는 주거급여입니다.",
    who: "기준 중위소득 47% 이하 가구",
    how: "주민센터 방문 또는 복지로 온라인 신청",
    period: "매월 지급",
    contact: "주거급여 콜센터 1600-0777",
  },
  "gov-medical-aid": {
    description: "위기 상황에서 의료비를 긴급 지원하는 제도입니다.",
    who: "중위소득 75% 이하, 갑작스런 위기 사유 발생 가구",
    how: "주민센터 또는 129 전화 신청",
    period: "위기 발생 시 1회 지원 (연장 가능)",
    contact: "보건복지상담센터 129",
  },
  "gov-multicultural": {
    description: "다문화가족의 안정적 정착과 생활을 지원하는 종합 서비스입니다.",
    who: "결혼이민자, 귀화자 및 그 가족",
    how: "다문화가족지원센터 방문 또는 다누리 1577-1366",
    period: "상시 이용 가능",
    contact: "다누리콜센터 1577-1366",
  },
  "gov-single-parent": {
    description: "한부모가족의 아동 양육비를 지원합니다.",
    who: "만 18세 미만 아동을 양육하는 한부모가족, 기준 중위소득 63% 이하",
    how: "주민센터 방문 또는 복지로 온라인 신청",
    period: "매월 지급",
    contact: "여성가족부 1644-6621",
  },
  "gov-veteran": {
    description: "국가유공자와 유족에게 보상금, 의료지원 등을 제공합니다.",
    who: "국가유공자, 보훈보상대상자 및 유족",
    how: "보훈(지)청 방문 신청",
    period: "매월 보상금 지급, 의료지원 상시",
    contact: "보훈상담센터 1577-0606",
  },
  "gov-farm-subsidy": {
    description: "농업인에게 소득 안정을 위해 지급하는 직불금입니다.",
    who: "농업경영체 등록 농업인, 일정 면적 이상 경작",
    how: "농업경영체 등록 후 국립농산물품질관리원 신청",
    period: "연 1회 (하반기 지급)",
    contact: "농림축산식품부 1644-8778",
  },
};

export default function GovBenefitDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const gb = governmentBenefits.find((g) => g.id === id);
  const detail = govDetails[id];

  if (!gb || !detail) {
    return (
      <>
        <TopNav showBack />
        <div className="flex flex-col items-center px-6 pt-20">
          <p className="text-[16px]" style={{ color: "var(--color-text-tertiary)" }}>
            혜택 정보를 찾을 수 없어요
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav showBack />

      <div className="px-5 pt-2 pb-44">
        {/* Hero */}
        <div className="flex items-center gap-4 mb-6">
          <BenefitIcon id={gb.id} type={gb.type} size={56} />
          <div>
            <p
              className="text-[22px] font-bold leading-snug"
              style={{ color: "var(--color-primary)" }}
            >
              {gb.title}
            </p>
            <p
              className="mt-1 text-[20px] font-bold"
              style={{ color: "var(--color-cta)" }}
            >
              {gb.amount}
            </p>
          </div>
        </div>

        {/* Eligibility badge */}
        <div
          className="mb-6 flex items-center gap-3 rounded-[14px] px-4 py-3.5"
          style={{ background: gb.eligible ? "var(--color-badge-recommend-bg)" : "var(--color-divider)" }}
        >
          {gb.eligible ? (
            <CheckCircle size={20} style={{ color: "var(--color-cta)" }} />
          ) : (
            <XCircle size={20} style={{ color: "var(--color-text-tertiary)" }} />
          )}
          <p
            className="text-[14px] font-semibold"
            style={{ color: gb.eligible ? "var(--color-cta)" : "var(--color-text-secondary)" }}
          >
            {gb.eligible ? "현재 조건에 해당돼요" : "현재 조건에 해당하지 않아요"}
          </p>
        </div>

        {/* Description */}
        <p
          className="mb-6 text-[15px] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {detail.description}
        </p>

        {/* Info cards */}
        <div
          className="rounded-[18px]"
          style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-divider)" }}
        >
          {[
            { label: "지원 대상", value: detail.who },
            { label: "신청 방법", value: detail.how },
            { label: "지급 시기", value: detail.period },
            { label: "문의처", value: detail.contact },
          ].map((item, i) => (
            <div
              key={item.label}
              className="px-5 py-4"
              style={{ borderBottom: i < 3 ? "1px solid var(--color-divider)" : "none" }}
            >
              <p
                className="text-[12px] font-semibold mb-1"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {item.label}
              </p>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "var(--color-primary)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div
          className="mt-5 flex items-start gap-2 rounded-[14px] px-4 py-3"
          style={{ background: "var(--color-divider)" }}
        >
          <Info size={14} className="mt-0.5 shrink-0" style={{ color: "var(--color-text-tertiary)" }} />
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-tertiary)" }}>
            자세한 자격 요건과 신청 절차는 해당 기관에 문의해 주세요. 경기 시민지갑에서 추후 간편 신청을 지원할 예정이에요.
          </p>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8 pt-16"
        style={{ background: "linear-gradient(to top, var(--color-bg) 65%, transparent)" }}
      >
        <Link
          href="/benefits"
          className="flex h-[54px] items-center justify-center rounded-[16px] text-[16px] font-bold transition-opacity duration-200 active:opacity-90"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-primary)",
          }}
        >
          혜택 목록으로 돌아가기
        </Link>
      </div>
    </>
  );
}
