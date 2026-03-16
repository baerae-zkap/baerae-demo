// Mock data for Gyeonggi Civic Wallet prototype

export const user = {
  name: "김민지",
  age: 35,
  residence: "수원시",
  household: { spouse: true, children: 1 },
  localBalance: 186500,
  linkedServices: [
    { id: "naver-pay", name: "네이버페이", icon: "N", color: "#03C75A", logo: "/gyeonggi-civic-wallet-demo/logos/naver-pay.svg" },
    { id: "kakao-pay", name: "카카오페이", icon: "K", color: "#FEE500", logo: "/gyeonggi-civic-wallet-demo/logos/kakao-pay.svg" },
  ],
  eligibleBenefitsCount: 4,
  notificationsCount: 4,
};

// City-specific wallet balances
export const cityBalances: Record<string, number> = {
  "수원시": 186500,
  "용인시": 42000,
  "가평군": 8000,
  "양평군": 0,
  "파주시": 0,
};

// --- Merchant benefit (generic, not amount-specific) ---
export type MerchantBenefit = {
  methodId: string;
  methodName: string;
  type: "local" | "linked";
  benefitRate: string;
  benefitDescription: string;
  recommended: boolean;
};

export const merchants = [
  {
    id: "suwon-green-market",
    name: "수원그린마켓",
    category: "마트",
    location: "수원시 영통구",
    distance: "350m",
    eligible: true,
    savingsHint: "최대 10% 할인",
    supportsOnlineOrder: false,
    benefits: [
      { methodId: "local", methodName: "경기 지역화폐", type: "local" as const, benefitRate: "10%", benefitDescription: "최대 10% 즉시 할인", recommended: true },
      { methodId: "naver-pay", methodName: "네이버페이", type: "linked" as const, benefitRate: "3%", benefitDescription: "포인트 3% 적립", recommended: false },
      { methodId: "kakao-pay", methodName: "카카오페이", type: "linked" as const, benefitRate: "2%", benefitDescription: "2% 캐시백", recommended: false },
    ],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
  },
  {
    id: "gwanggyo-pharmacy",
    name: "광교가족약국",
    category: "약국",
    location: "수원시 영통구",
    distance: "500m",
    eligible: true,
    savingsHint: "최대 10% 할인",
    supportsOnlineOrder: false,
    benefits: [
      { methodId: "local", methodName: "경기 지역화폐", type: "local" as const, benefitRate: "10%", benefitDescription: "최대 10% 즉시 할인", recommended: true },
      { methodId: "naver-pay", methodName: "네이버페이", type: "linked" as const, benefitRate: "3%", benefitDescription: "포인트 3% 적립", recommended: false },
      { methodId: "kakao-pay", methodName: "카카오페이", type: "linked" as const, benefitRate: "2%", benefitDescription: "2% 캐시백", recommended: false },
    ],
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
  },
  {
    id: "yongin-bukgarden",
    name: "용인북가든",
    category: "음식점",
    location: "용인시 수지구",
    distance: "2.1km",
    eligible: true,
    savingsHint: "최대 5% 할인",
    supportsOnlineOrder: true,
    benefits: [
      { methodId: "local", methodName: "경기 지역화폐", type: "local" as const, benefitRate: "5%", benefitDescription: "지역화폐 5% 할인", recommended: true },
      { methodId: "naver-pay", methodName: "네이버페이", type: "linked" as const, benefitRate: "3%", benefitDescription: "포인트 3% 적립", recommended: false },
      { methodId: "kakao-pay", methodName: "카카오페이", type: "linked" as const, benefitRate: "2%", benefitDescription: "2% 캐시백", recommended: false },
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  },
  {
    id: "gapyeong-forest-cafe",
    name: "가평숲마을카페",
    category: "카페",
    location: "가평군 가평읍",
    distance: "38km",
    eligible: false,
    savingsHint: null,
    supportsOnlineOrder: false,
    benefits: [],
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
  },
];

// --- Payment requests (amount becomes known here) ---
export type PaymentRequest = {
  id: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  timestamp: string;
  status: "pending" | "completed";
};

export const paymentRequests: Record<string, PaymentRequest> = {
  "req-001": {
    id: "req-001",
    merchantId: "suwon-green-market",
    merchantName: "수원그린마켓",
    amount: 32000,
    timestamp: "2026-03-09 14:32",
    status: "pending",
  },
  "req-002": {
    id: "req-002",
    merchantId: "gwanggyo-pharmacy",
    merchantName: "광교가족약국",
    amount: 15000,
    timestamp: "2026-03-09 15:10",
    status: "pending",
  },
  "req-003": {
    id: "req-003",
    merchantId: "yongin-bukgarden",
    merchantName: "용인북가든",
    amount: 45000,
    timestamp: "2026-03-09 13:00",
    status: "pending",
  },
};

// --- Compute payment options from merchant benefits + amount ---
export type PaymentOption = {
  id: string;
  name: string;
  type: "local" | "linked";
  finalAmount: number;
  savings: number;
  discountRate: string;
  expectedBenefit: number;
  benefitLabel: string;
  badge: string;
  helperText: string;
  recommended: boolean;
};

export type MerchantPayment = {
  merchantId: string;
  merchantName: string;
  purchaseAmount: number;
  options: PaymentOption[];
};

export function computePaymentOptions(
  merchantId: string,
  amount: number
): MerchantPayment | null {
  const merchant = merchants.find((m) => m.id === merchantId);
  if (!merchant || !merchant.eligible || merchant.benefits.length === 0)
    return null;

  return {
    merchantId,
    merchantName: merchant.name,
    purchaseAmount: amount,
    options: merchant.benefits.map((b) => {
      const rate = parseFloat(b.benefitRate) / 100;
      const isDiscount = b.type === "local";
      const savings = isDiscount ? Math.round(amount * rate) : 0;
      const benefit = !isDiscount ? Math.round(amount * rate) : 0;

      return {
        id: b.methodId,
        name: b.methodName,
        type: b.type,
        finalAmount: amount - savings,
        savings,
        discountRate: isDiscount ? b.benefitRate : "",
        expectedBenefit: benefit,
        benefitLabel: b.methodId === "naver-pay" ? "적립" : b.methodId === "kakao-pay" ? "캐시백" : "",
        badge: b.recommended ? "추천" : "",
        helperText: b.benefitDescription,
        recommended: b.recommended,
      };
    }),
  };
}

// Legacy lookup (kept for backward compatibility)
export const paymentOptions: Record<string, MerchantPayment> = {
  "suwon-green-market": computePaymentOptions("suwon-green-market", 32000)!,
  "gwanggyo-pharmacy": computePaymentOptions("gwanggyo-pharmacy", 15000)!,
  "yongin-bukgarden": computePaymentOptions("yongin-bukgarden", 45000)!,
};

export const benefits = [
  {
    id: "elementary-prep",
    title: "초등학교 입학 준비 지원금",
    amount: "300,000원",
    type: "현금 지원",
    status: "eligible" as const,
    deadline: "2026-03-31",
    summary: "초등학교 입학 자녀가 있는 가정에 입학 준비 비용을 지원합니다.",
  },
  {
    id: "after-school-care",
    title: "초등 돌봄교실 지원금",
    amount: "200,000원",
    type: "교육 지원",
    status: "eligible" as const,
    deadline: "2026-04-15",
    summary: "초등학교 입학 자녀의 방과후 돌봄교실 이용 비용을 지원합니다.",
  },
  {
    id: "child-vaccine",
    title: "아동 예방접종 안내 및 지원",
    amount: "무료 접종",
    type: "의료 지원",
    status: "likely" as const,
    deadline: "2026-06-30",
    summary: "만 12세 이하 아동의 필수 예방접종을 무료로 지원합니다.",
  },
  {
    id: "youth-culture",
    title: "청년 문화패스",
    amount: "100,000원",
    type: "문화 바우처",
    status: "more-info" as const,
    deadline: "2026-05-15",
    summary: "만 19~34세 청년에게 문화생활 바우처를 제공합니다.",
  },
  {
    id: "postpartum-care",
    title: "산후 회복 지원 프로그램",
    amount: "500,000원",
    type: "의료 바우처",
    status: "likely" as const,
    deadline: "2026-12-31",
    summary: "출산 후 산모의 건강 회복을 위한 의료 및 돌봄 서비스를 지원합니다.",
  },
];

// --- Government benefits (comprehensive list, including non-eligible) ---
export const governmentBenefits = [
  { id: "gov-basic-pension", title: "기초연금", amount: "월 최대 334,810원", type: "연금", eligible: false },
  { id: "gov-child-allowance", title: "아동수당", amount: "월 100,000원", type: "수당", eligible: true },
  { id: "gov-youth-job", title: "청년 구직활동지원금", amount: "월 500,000원", type: "구직", eligible: false },
  { id: "gov-disability", title: "장애인 활동지원", amount: "월 최대 1,944,600원", type: "복지", eligible: false },
  { id: "gov-energy-voucher", title: "에너지 바우처", amount: "연 최대 211,600원", type: "에너지", eligible: false },
  { id: "gov-national-scholarship", title: "국가장학금", amount: "연 최대 5,200,000원", type: "교육", eligible: false },
  { id: "gov-housing-voucher", title: "주거급여", amount: "월 최대 527,000원", type: "주거", eligible: false },
  { id: "gov-medical-aid", title: "긴급복지 의료지원", amount: "최대 3,000,000원", type: "의료", eligible: false },
  { id: "gov-multicultural", title: "다문화가족 지원", amount: "다양", type: "복지", eligible: false },
  { id: "gov-single-parent", title: "한부모가족 양육비", amount: "월 200,000원", type: "양육", eligible: false },
  { id: "gov-veteran", title: "국가유공자 지원", amount: "다양", type: "보훈", eligible: false },
  { id: "gov-farm-subsidy", title: "농업직불금", amount: "연 최대 2,000,000원", type: "농업", eligible: false },
];

// --- Benefit detail data ---
export type EligibilityCriterion = {
  label: string;
  value: string;
  met: boolean;
};

export type BenefitDocument = {
  id: string;
  name: string;
  category: "prepared" | "auto" | "manual";
  status: "ready" | "fetchable" | "missing" | "uploaded";
  description: string;
};

export type StatusTimelineEntry = {
  step: string;
  date: string | null;
  status: "done" | "current" | "upcoming";
  description?: string;
};

export type BenefitDetail = {
  id: string;
  title: string;
  amount: string;
  type: string;
  status: "eligible" | "likely" | "more-info";
  deadline: string;
  summary: string;
  description: string;
  reason: string;
  urgencyLabel: string;
  eligibility: EligibilityCriterion[];
  confidenceLabel: string;
  documents: BenefitDocument[];
  timeline: StatusTimelineEntry[];
  applicationDate: string | null;
  plainExplanation: string;
  preparedByApp: string[];
  userTodo: string[];
};

export const benefitDetails: Record<string, BenefitDetail> = {
  "elementary-prep": {
    id: "elementary-prep",
    title: "초등학교 입학 준비 지원금",
    amount: "300,000원",
    type: "현금 지원",
    status: "eligible",
    deadline: "2026-03-31",
    summary: "초등학교 입학 자녀가 있는 가정에 입학 준비 비용을 지원합니다.",
    description: "2026년 초등학교에 입학하는 자녀가 있는 경기도 거주 가정에 입학 준비 비용으로 30만원을 지역화폐로 지급합니다. 교복, 학용품, 가방 등 입학 준비에 자유롭게 사용할 수 있습니다.",
    reason: "자녀가 2026년 초등학교 입학 예정이에요",
    urgencyLabel: "마감 22일 남음",
    eligibility: [
      { label: "거주지", value: "경기도 수원시 (충족)", met: true },
      { label: "자녀 연령", value: "만 6세 자녀 있음 (충족)", met: true },
      { label: "입학 예정", value: "2026년 3월 입학 (충족)", met: true },
      { label: "소득 기준", value: "제한 없음", met: true },
    ],
    confidenceLabel: "대상 가능",
    documents: [
      { id: "doc-1", name: "주민등록등본", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-2", name: "가족관계증명서", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-3", name: "입학통지서", category: "manual", status: "missing", description: "학교에서 받은 입학통지서를 촬영해 올려주세요" },
    ],
    timeline: [
      { step: "신청 완료", date: null, status: "upcoming" },
      { step: "검토 중", date: null, status: "upcoming", description: "3~5 영업일 소요" },
      { step: "승인 완료", date: null, status: "upcoming" },
      { step: "지급 완료", date: null, status: "upcoming", description: "지역화폐로 지급" },
    ],
    applicationDate: null,
    plainExplanation: "올해 초등학교에 들어가는 자녀가 있으면 입학 준비 비용으로 30만원을 받을 수 있어요. 교복, 학용품, 가방 등에 자유롭게 쓸 수 있어요.",
    preparedByApp: ["거주지 확인 완료 (수원시)", "자녀 연령 확인 완료 (만 6세)", "주민등록등본 자동 발급 가능", "가족관계증명서 자동 발급 가능"],
    userTodo: ["입학통지서 사진 찍어서 올리기"],
  },
  "after-school-care": {
    id: "after-school-care",
    title: "초등 돌봄교실 지원금",
    amount: "200,000원",
    type: "교육 지원",
    status: "eligible",
    deadline: "2026-04-15",
    summary: "초등학교 입학 자녀의 방과후 돌봄교실 이용 비용을 지원합니다.",
    description: "2026년 초등학교에 입학하는 자녀가 있는 맞벌이 또는 돌봄이 필요한 가정에 방과후 돌봄교실 이용 비용으로 20만원을 지역화폐로 지급합니다. 학교 내 돌봄교실, 지역아동센터 등에서 사용할 수 있습니다.",
    reason: "입학 예정 자녀가 있는 가정이에요",
    urgencyLabel: "마감 35일 남음",
    eligibility: [
      { label: "거주지", value: "경기도 수원시 (충족)", met: true },
      { label: "자녀 연령", value: "만 6세 자녀 있음 (충족)", met: true },
      { label: "입학 예정", value: "2026년 3월 입학 (충족)", met: true },
      { label: "돌봄 필요", value: "맞벌이 또는 돌봄 필요 가정", met: true },
    ],
    confidenceLabel: "대상 가능",
    documents: [
      { id: "doc-asc-1", name: "주민등록등본", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-asc-2", name: "맞벌이 증빙서류", category: "auto", status: "fetchable", description: "국세청에서 자동 조회 가능" },
      { id: "doc-asc-3", name: "돌봄교실 신청서", category: "manual", status: "missing", description: "학교에서 받은 돌봄교실 신청서를 촬영해 올려주세요" },
    ],
    timeline: [
      { step: "신청 완료", date: null, status: "upcoming" },
      { step: "검토 중", date: null, status: "upcoming", description: "3~5 영업일 소요" },
      { step: "승인 완료", date: null, status: "upcoming" },
      { step: "지급 완료", date: null, status: "upcoming", description: "지역화폐로 지급" },
    ],
    applicationDate: null,
    plainExplanation: "초등학교에 입학하는 자녀가 있고 돌봄이 필요한 가정이면 방과후 돌봄교실 비용으로 20만원을 받을 수 있어요.",
    preparedByApp: ["거주지 확인 완료 (수원시)", "자녀 연령 확인 완료 (만 6세)", "주민등록등본 자동 발급 가능", "맞벌이 증빙 자동 조회 가능"],
    userTodo: ["돌봄교실 신청서 사진 찍어서 올리기"],
  },
  "child-vaccine": {
    id: "child-vaccine",
    title: "아동 예방접종 안내 및 지원",
    amount: "무료 접종",
    type: "의료 지원",
    status: "likely",
    deadline: "2026-06-30",
    summary: "만 12세 이하 아동의 필수 예방접종을 무료로 지원합니다.",
    description: "국가필수예방접종 대상 아동에게 무료 접종 서비스를 제공합니다. 지정 의료기관에서 별도 비용 없이 접종받을 수 있으며, 접종 일정 알림도 함께 제공됩니다.",
    reason: "만 12세 이하 자녀가 있을 수 있어요",
    urgencyLabel: "여유 있음",
    eligibility: [
      { label: "거주지", value: "경기도 수원시 (충족)", met: true },
      { label: "자녀 연령", value: "만 12세 이하 확인 필요", met: true },
      { label: "접종 이력", value: "접종 기록 확인 필요", met: false },
    ],
    confidenceLabel: "추가 정보 필요",
    documents: [
      { id: "doc-4", name: "주민등록등본", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-5", name: "예방접종 증명서", category: "auto", status: "fetchable", description: "질병관리청에서 자동 조회 가능" },
      { id: "doc-6", name: "건강보험증 사본", category: "prepared", status: "ready", description: "이미 등록된 정보로 확인됨" },
    ],
    timeline: [
      { step: "신청 완료", date: null, status: "upcoming" },
      { step: "검토 중", date: null, status: "upcoming", description: "1~2 영업일 소요" },
      { step: "승인 완료", date: null, status: "upcoming" },
    ],
    applicationDate: null,
    plainExplanation: "만 12세 이하 자녀의 예방접종을 무료로 받을 수 있어요. 가까운 지정 병원에서 비용 없이 바로 접종할 수 있어요.",
    preparedByApp: ["거주지 확인 완료 (수원시)", "건강보험 가입 확인됨", "예방접종 증명서 자동 조회 가능"],
    userTodo: ["자녀 접종 기록 확인하기"],
  },
  "youth-culture": {
    id: "youth-culture",
    title: "청년 문화패스",
    amount: "100,000원",
    type: "문화 바우처",
    status: "more-info",
    deadline: "2026-05-15",
    summary: "만 19~34세 청년에게 문화생활 바우처를 제공합니다.",
    description: "경기도 거주 만 19~34세 청년에게 공연, 영화, 전시, 도서 등에 사용할 수 있는 문화 바우처 10만원을 제공합니다. 경기도 내 문화시설 및 온라인 서점에서 사용 가능합니다.",
    reason: "연령 기준 확인이 필요해요",
    urgencyLabel: "마감 67일 남음",
    eligibility: [
      { label: "거주지", value: "경기도 수원시 (충족)", met: true },
      { label: "연령", value: "만 35세 (기준: 19~34세)", met: false },
      { label: "소득 기준", value: "중위소득 150% 이하", met: false },
    ],
    confidenceLabel: "서류 확인 필요",
    documents: [
      { id: "doc-7", name: "주민등록등본", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-8", name: "소득확인증명서", category: "manual", status: "missing", description: "국세청 홈택스에서 발급 후 업로드해주세요" },
      { id: "doc-9", name: "재학/재직 증명서", category: "manual", status: "missing", description: "해당하는 경우에만 첨부" },
    ],
    timeline: [
      { step: "신청 완료", date: null, status: "upcoming" },
      { step: "검토 중", date: null, status: "upcoming", description: "5~7 영업일 소요" },
      { step: "추가 서류 요청", date: null, status: "upcoming" },
      { step: "승인 완료", date: null, status: "upcoming" },
    ],
    applicationDate: null,
    plainExplanation: "19~34세 청년이라면 공연, 영화, 전시, 도서 등에 쓸 수 있는 10만원 문화 바우처를 받을 수 있어요.",
    preparedByApp: ["거주지 확인 완료 (수원시)"],
    userTodo: ["소득확인증명서 홈택스에서 발급 후 올리기", "재학 또는 재직 증명서 준비하기"],
  },
  "postpartum-care": {
    id: "postpartum-care",
    title: "산후 회복 지원 프로그램",
    amount: "500,000원",
    type: "의료 바우처",
    status: "likely",
    deadline: "2026-12-31",
    summary: "출산 후 산모의 건강 회복을 위한 의료 및 돌봄 서비스를 지원합니다.",
    description: "출산 후 6개월 이내 산모에게 산후조리, 건강검진, 심리상담 등에 사용할 수 있는 의료 바우처 50만원을 지급합니다. 경기도 내 지정 의료기관 및 산후조리원에서 사용 가능합니다.",
    reason: "가구에 영유아 자녀가 있을 수 있어요",
    urgencyLabel: "여유 있음",
    eligibility: [
      { label: "거주지", value: "경기도 수원시 (충족)", met: true },
      { label: "출산 여부", value: "최근 출산 확인 필요", met: false },
      { label: "산모 건강보험", value: "건강보험 가입 확인 필요", met: false },
    ],
    confidenceLabel: "추가 정보 필요",
    documents: [
      { id: "doc-10", name: "주민등록등본", category: "auto", status: "fetchable", description: "정부24에서 자동으로 불러올 수 있어요" },
      { id: "doc-11", name: "출생증명서", category: "manual", status: "missing", description: "병원에서 발급받은 출생증명서를 업로드해주세요" },
      { id: "doc-12", name: "건강보험 자격확인서", category: "auto", status: "fetchable", description: "건강보험공단에서 자동 조회 가능" },
    ],
    timeline: [
      { step: "신청 완료", date: null, status: "upcoming" },
      { step: "검토 중", date: null, status: "upcoming", description: "3~5 영업일 소요" },
      { step: "승인 완료", date: null, status: "upcoming" },
    ],
    applicationDate: null,
    plainExplanation: "출산 후 6개월 이내라면 산후조리, 건강검진, 심리상담에 쓸 수 있는 50만원 바우처를 받을 수 있어요.",
    preparedByApp: ["거주지 확인 완료 (수원시)", "건강보험 자격확인서 자동 조회 가능"],
    userTodo: ["출생증명서 병원에서 받아 올리기"],
  },
};

// --- Benefit application history ---
export type BenefitApplication = {
  id: string;
  benefitId: string;
  benefitTitle: string;
  amount: string;
  submittedDate: string;
  status: "submitted" | "reviewing" | "additional-docs" | "approved" | "rejected";
};

export const benefitApplications: BenefitApplication[] = [
  {
    id: "app-001",
    benefitId: "elementary-prep",
    benefitTitle: "초등학교 입학 준비 지원금",
    amount: "300,000원",
    submittedDate: "2026-03-09",
    status: "reviewing",
  },
  {
    id: "app-002",
    benefitId: "child-vaccine",
    benefitTitle: "아동 예방접종 안내 및 지원",
    amount: "무료 접종",
    submittedDate: "2026-02-15",
    status: "approved",
  },
  {
    id: "app-003",
    benefitId: "youth-culture",
    benefitTitle: "청년 문화패스",
    amount: "100,000원",
    submittedDate: "2026-02-28",
    status: "additional-docs",
  },
];

// --- Per-application status timelines ---
export const applicationTimelines: Record<string, StatusTimelineEntry[]> = {
  "app-001": [
    { step: "신청 완료", date: "2026-03-09", status: "done" },
    { step: "검토 중", date: null, status: "current", description: "3~5 영업일 소요" },
    { step: "승인 완료", date: null, status: "upcoming" },
    { step: "지급 완료", date: null, status: "upcoming", description: "지역화폐로 지급" },
  ],
  "app-002": [
    { step: "신청 완료", date: "2026-02-15", status: "done" },
    { step: "검토 중", date: "2026-02-17", status: "done", description: "완료" },
    { step: "승인 완료", date: "2026-02-20", status: "done" },
  ],
  "app-003": [
    { step: "신청 완료", date: "2026-02-28", status: "done" },
    { step: "검토 중", date: "2026-03-03", status: "done" },
    { step: "추가 서류 요청", date: "2026-03-07", status: "current", description: "소득확인증명서를 다시 제출해주세요" },
    { step: "승인 완료", date: null, status: "upcoming" },
  ],
};

// --- Consent management ---
export type Consent = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  enabled: boolean;
  impact: string;
  category: string;
};

export const consents: Consent[] = [
  { id: "personal-info", title: "개인정보 수집 및 이용", description: "서비스 제공을 위한 기본 개인정보 수집", required: true, enabled: true, impact: "필수 동의 항목으로 서비스 이용에 반드시 필요합니다.", category: "기본" },
  { id: "financial-info", title: "금융정보 조회", description: "결제 수단 비교 및 최적 결제를 위한 정보", required: true, enabled: true, impact: "결제 수단 비교 및 할인 혜택 안내에 사용됩니다.", category: "기본" },
  { id: "family-info", title: "가족관계 정보", description: "가족관계증명서 기반 세대 구성 확인", required: false, enabled: true, impact: "혜택 자격 판단에 가족 구성이 반영돼요.", category: "가구" },
  { id: "household-info", title: "세대/가구 정보", description: "세대주 여부, 가구원 수 등 세대 정보", required: false, enabled: true, impact: "가구 규모에 따른 맞춤 혜택을 추천받을 수 있어요.", category: "가구" },
  { id: "residence-info", title: "거주지 정보", description: "주민등록 주소지 기반 지역 확인", required: false, enabled: true, impact: "거주 지역에 맞는 서비스를 안내받을 수 있어요.", category: "가구" },
  { id: "age-info", title: "연령 정보", description: "나이 기반 혜택 자격 확인", required: false, enabled: true, impact: "연령 조건이 있는 혜택을 자동으로 찾아드려요.", category: "개인" },
  { id: "benefit-match", title: "공공지원 추천", description: "가구 정보 기반 맞춤 혜택 추천", required: false, enabled: true, impact: "끄면 맞춤 혜택 추천을 받을 수 없어요.", category: "서비스" },
  { id: "bank-asset", title: "은행/금융 자산 정보", description: "오픈뱅킹 연동을 통한 자산 확인", required: false, enabled: false, impact: "자산 기준이 필요한 혜택 자격을 자동으로 확인할 수 있어요.", category: "자산" },
  { id: "property-asset", title: "부동산 자산 정보", description: "부동산 보유 현황 확인", required: false, enabled: false, impact: "주택 보유 여부에 따른 혜택 자격을 확인할 수 있어요.", category: "자산" },
  { id: "payment-link", title: "결제 서비스 연동", description: "외부 결제 서비스 데이터 연동", required: false, enabled: true, impact: "연결된 결제 서비스에서 최적 결제를 비교해드려요.", category: "서비스" },
  { id: "location", title: "위치 정보 활용", description: "주변 가맹점 및 지역 서비스 안내", required: false, enabled: true, impact: "끄면 주변 가맹점 추천이 제한돼요.", category: "서비스" },
  { id: "marketing", title: "마케팅 정보 수신", description: "이벤트, 혜택 알림 등 마케팅 정보 수신", required: false, enabled: false, impact: "끄면 이벤트 및 프로모션 알림을 받지 않아요.", category: "서비스" },
  { id: "gov-data", title: "행정정보 공동이용", description: "정부24 서류 자동 조회를 위한 동의", required: false, enabled: true, impact: "끄면 서류를 직접 첨부해야 해요.", category: "서비스" },
];

// --- Extended linked services ---
export type LinkedService = {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  description: string;
  logo?: string;
};

export const allLinkedServices: LinkedService[] = [
  { id: "naver-pay", name: "네이버페이", icon: "N", color: "#03C75A", connected: true, description: "포인트 적립 및 결제", logo: "/gyeonggi-civic-wallet-demo/logos/naver-pay.svg" },
  { id: "kakao-pay", name: "카카오페이", icon: "K", color: "#FEE500", connected: true, description: "캐시백 및 결제", logo: "/gyeonggi-civic-wallet-demo/logos/kakao-pay.svg" },
  { id: "samsung-pay", name: "삼성페이", icon: "S", color: "#1428A0", connected: false, description: "삼성 기기에서 간편 결제", logo: "/gyeonggi-civic-wallet-demo/logos/samsung-pay.svg" },
  { id: "local-bank", name: "수원 시민은행", icon: "B", color: "#6B7280", connected: false, description: "지역 은행 연동 (준비중)" },
];

export type PartnerCity = {
  id: string;
  name: string;
  suffix: "시" | "군";
  status: "active" | "coming";
  merchantCount: number;
  description: string;
  categories: string[];
  featured: boolean;
  featuredMerchants: { name: string; category: string }[];
};

export const partnerCities: PartnerCity[] = [
  {
    id: "suwon", name: "수원", suffix: "시", status: "active", merchantCount: 2340,
    description: "경기도 도청 소재지로, 다양한 전통시장과 상점에서 지역화폐를 사용할 수 있어요.",
    categories: ["마트", "음식점", "약국", "카페", "전통시장"],
    featured: true,
    featuredMerchants: [
      { name: "수원그린마켓", category: "마트" },
      { name: "영통전통시장", category: "전통시장" },
      { name: "광교카페거리", category: "카페" },
    ],
  },
  {
    id: "yongin", name: "용인", suffix: "시", status: "active", merchantCount: 1820,
    description: "에버랜드와 한국민속촌 인근 상권에서도 사용할 수 있어요.",
    categories: ["음식점", "관광", "마트", "카페"],
    featured: true,
    featuredMerchants: [
      { name: "용인북가든", category: "음식점" },
      { name: "처인전통시장", category: "전통시장" },
      { name: "기흥호수공원 매점", category: "카페" },
    ],
  },
  {
    id: "gapyeong", name: "가평", suffix: "군", status: "active", merchantCount: 450,
    description: "남이섬, 자라섬 등 관광지와 주변 상점에서 사용할 수 있어요.",
    categories: ["관광", "음식점", "숙박", "카페"],
    featured: false,
    featuredMerchants: [
      { name: "가평잣막걸리", category: "음식점" },
      { name: "자라섬카페", category: "카페" },
    ],
  },
  {
    id: "yangpyeong", name: "양평", suffix: "군", status: "active", merchantCount: 380,
    description: "두물머리와 양평 5일장 등 자연 관광지 주변에서 사용할 수 있어요.",
    categories: ["관광", "음식점", "전통시장"],
    featured: false,
    featuredMerchants: [
      { name: "양평5일장", category: "전통시장" },
      { name: "두물머리식당", category: "음식점" },
    ],
  },
  {
    id: "paju", name: "파주", suffix: "시", status: "coming", merchantCount: 0,
    description: "파주 프리미엄 아울렛과 헤이리 예술마을 인근 상권이 준비 중이에요.",
    categories: [],
    featured: false,
    featuredMerchants: [],
  },
];

export type RegionOffer = {
  id: string;
  cityId: string;
  title: string;
  description: string;
  discount: string;
  eligibleMethods: string[];
  expiryDate: string;
  category: string;
  usageLocations: string;
};

export const regionOffers: RegionOffer[] = [
  {
    id: "offer-001", cityId: "yongin", title: "용인 전통시장 주말 특별 할인",
    description: "용인 처인전통시장에서 지역화폐 결제 시 추가 5% 할인을 받을 수 있어요.",
    discount: "추가 5% 할인", eligibleMethods: ["경기 지역화폐"],
    expiryDate: "2026-04-30", category: "전통시장",
    usageLocations: "용인시 처인전통시장 내 모든 가맹점",
  },
  {
    id: "offer-002", cityId: "gapyeong", title: "가평 봄 관광 캐시백",
    description: "가평 관광지 인근 음식점과 카페에서 결제하면 10% 캐시백을 드려요.",
    discount: "10% 캐시백", eligibleMethods: ["경기 지역화폐", "네이버페이"],
    expiryDate: "2026-05-31", category: "관광",
    usageLocations: "가평군 내 관광 지정 가맹점",
  },
  {
    id: "offer-003", cityId: "suwon", title: "수원 영통 카페거리 적립 이벤트",
    description: "영통 카페거리에서 지역화폐로 결제하면 포인트 2배 적립!",
    discount: "포인트 2배 적립", eligibleMethods: ["경기 지역화폐"],
    expiryDate: "2026-03-31", category: "카페",
    usageLocations: "수원시 영통구 카페거리 참여 매장",
  },
  {
    id: "offer-004", cityId: "yangpyeong", title: "양평 5일장 지역화폐 보너스",
    description: "양평 5일장에서 5만원 이상 결제 시 5,000원 보너스 충전!",
    discount: "5,000원 보너스", eligibleMethods: ["경기 지역화폐"],
    expiryDate: "2026-06-30", category: "전통시장",
    usageLocations: "양평군 양평5일장",
  },
  {
    id: "offer-005", cityId: "yongin", title: "용인 카페 봄맞이 혜택",
    description: "용인시 내 카페에서 지역화폐 결제 시 아메리카노 1잔 무료 쿠폰 증정.",
    discount: "아메리카노 1잔 무료", eligibleMethods: ["경기 지역화폐", "카카오페이"],
    expiryDate: "2026-04-15", category: "카페",
    usageLocations: "용인시 내 참여 카페 42곳",
  },
];

export type InvestProject = {
  id: string;
  title: string;
  category: "에너지" | "주거" | "공공시설";
  region: string;
  summary: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  minInvestment: number;
  projectedReturn: string;
  maturityPeriod: string;
  maturityDate: string;
  status: "open" | "nearly-funded" | "closed" | "waitlist";
  socialImpact: string;
  whyThisProject: string;
  howItWorks: string[];
  risks: { title: string; description: string }[];
  taxBenefit: string;
  participantCount: number;
};

export const investProjects: InvestProject[] = [
  {
    id: "suwon-solar",
    title: "수원 솔라 루프 1차 사업",
    category: "에너지",
    region: "수원시",
    summary: "수원시 공공건물 옥상에 태양광 패널을 설치하는 시민 참여형 에너지 프로젝트",
    description: "수원시 관내 공공건물 12곳의 옥상에 태양광 발전설비를 설치하여 연간 약 1,200MWh의 친환경 전력을 생산합니다. 생산된 전력은 한국전력에 판매되며, 판매 수익이 참여자에게 배분됩니다.",
    targetAmount: 500000000,
    currentAmount: 385000000,
    minInvestment: 100000,
    projectedReturn: "연 4.2%",
    maturityPeriod: "24개월",
    maturityDate: "2028-03-01",
    status: "nearly-funded",
    socialImpact: "탄소 배출 연 480톤 절감",
    whyThisProject: "수원시가 직접 운영하는 공공건물에 설치되어 안정적인 수익 구조를 갖추고 있으며, 한국전력과의 전력판매 계약이 체결되어 있습니다.",
    howItWorks: [
      "시민이 프로젝트에 참여 금액을 선택합니다",
      "모집 완료 후 태양광 패널 설치가 시작됩니다",
      "설치 완료 후 전력 생산 및 판매가 이루어집니다",
      "만기 시 원금과 수익이 함께 상환됩니다",
    ],
    risks: [
      { title: "원금 보장 여부", description: "이 프로젝트는 원금을 보장하지 않습니다. 다만, 공공시설 기반이므로 안정성이 높은 편입니다." },
      { title: "수익 변동 가능성", description: "일조량 변화에 따라 실제 수익률은 예상과 달라질 수 있습니다." },
      { title: "만기 및 중도 해지", description: "만기는 24개월이며, 중도 해지 시 수익 일부가 차감될 수 있습니다." },
    ],
    taxBenefit: "지역 공공 에너지 프로젝트 참여 시, 관련 조례에 따라 지방세 세액공제 혜택이 적용될 수 있습니다. 구체적인 공제율과 조건은 참여 시점의 정책에 따라 달라질 수 있습니다.",
    participantCount: 847,
  },
  {
    id: "youth-housing",
    title: "경기 청년주택 블록 A",
    category: "주거",
    region: "경기도",
    summary: "경기도 청년을 위한 공공임대주택 건설에 시민이 함께 참여하는 프로젝트",
    description: "경기도 내 청년 주거 안정을 위한 공공임대주택 120세대를 건설합니다. 임대 수익을 기반으로 참여자에게 수익이 배분되며, 청년 주거 문제 해결에 직접 기여할 수 있습니다.",
    targetAmount: 2000000000,
    currentAmount: 1640000000,
    minInvestment: 500000,
    projectedReturn: "연 3.8%",
    maturityPeriod: "36개월",
    maturityDate: "2029-03-01",
    status: "open",
    socialImpact: "청년 120세대 주거 안정",
    whyThisProject: "경기도가 보증하는 공공임대 사업으로, 안정적인 임대 수익이 예상됩니다. 입주율 95% 이상을 목표로 설계되었습니다.",
    howItWorks: [
      "시민이 프로젝트에 참여 금액을 선택합니다",
      "모집 완료 후 주택 건설이 시작됩니다",
      "건설 완료 후 청년 입주 및 임대 운영이 시작됩니다",
      "만기 시 원금과 누적 임대수익이 상환됩니다",
    ],
    risks: [
      { title: "원금 보장 여부", description: "원금이 보장되지 않으나, 공공임대 특성상 안정적인 구조입니다." },
      { title: "건설 지연 가능성", description: "공사 일정 변동에 따라 수익 발생 시점이 늦어질 수 있습니다." },
      { title: "만기 및 중도 해지", description: "만기는 36개월이며, 중도 해지 시 일부 제약이 있을 수 있습니다." },
    ],
    taxBenefit: "공공주택 프로젝트 참여에 대한 세제 혜택이 검토 중입니다. 향후 정책 확정 시 소급 적용 가능성이 있으며, 참여 시점에 안내드리겠습니다.",
    participantCount: 1203,
  },
  {
    id: "energy-efficiency",
    title: "지역 공공시설 에너지 효율화 프로젝트",
    category: "공공시설",
    region: "경기도",
    summary: "노후 공공시설의 에너지 효율을 개선하여 운영비를 절감하는 프로젝트",
    description: "경기도 내 노후 공공시설 8곳의 단열, 조명, 냉난방 시스템을 교체하여 에너지 소비를 줄입니다. 절감된 운영비를 기반으로 참여자에게 수익이 배분됩니다.",
    targetAmount: 300000000,
    currentAmount: 300000000,
    minInvestment: 50000,
    projectedReturn: "연 3.5%",
    maturityPeriod: "18개월",
    maturityDate: "2027-09-01",
    status: "closed",
    socialImpact: "공공시설 에너지 30% 절감",
    whyThisProject: "이미 모집이 완료된 프로젝트로, 공사가 진행 중입니다. 에너지 절감 효과가 검증된 기술을 적용하고 있습니다.",
    howItWorks: [
      "시민이 프로젝트에 참여 금액을 선택합니다",
      "모집 완료 후 시설 개선 공사가 시작됩니다",
      "공사 완료 후 에너지 절감 효과가 발생합니다",
      "만기 시 원금과 절감 수익이 상환됩니다",
    ],
    risks: [
      { title: "원금 보장 여부", description: "원금이 보장되지 않으나, 공공시설 운영비 절감 기반이므로 비교적 안정적입니다." },
      { title: "절감 효과 변동", description: "계절별 에너지 사용량에 따라 실제 절감 효과가 달라질 수 있습니다." },
      { title: "만기 및 중도 해지", description: "만기는 18개월이며, 현재 중도 해지가 불가합니다." },
    ],
    taxBenefit: "공공시설 에너지 효율화 프로젝트는 녹색 금융 세제 혜택 대상으로 검토되고 있습니다. 확정 시 별도 안내됩니다.",
    participantCount: 562,
  },
];

export type InvestPortfolioItem = {
  id: string;
  projectId: string;
  projectTitle: string;
  category: "에너지" | "주거" | "공공시설";
  participationAmount: number;
  participationDate: string;
  status: "active" | "matured" | "redeemed";
  expectedReturn: string;
  maturityDate: string;
  currentValue: number;
  socialImpact: string;
  updates: { date: string; title: string; description: string }[];
};

export const investPortfolio: InvestPortfolioItem[] = [
  {
    id: "inv-001",
    projectId: "suwon-solar",
    projectTitle: "수원 솔라 루프 1차 사업",
    category: "에너지",
    participationAmount: 500000,
    participationDate: "2026-01-15",
    status: "active",
    expectedReturn: "연 4.2%",
    maturityDate: "2028-03-01",
    currentValue: 503500,
    socialImpact: "탄소 배출 연 480톤 절감",
    updates: [
      { date: "2026-03-01", title: "설치 공사 진행 중", description: "12곳 중 7곳 설치 완료. 예정대로 진행 중입니다." },
      { date: "2026-02-01", title: "자재 조달 완료", description: "태양광 패널 및 인버터 전량 입고되었습니다." },
      { date: "2026-01-20", title: "모집 마감 임박", description: "목표 금액의 77% 달성. 참여가 활발히 진행 중입니다." },
    ],
  },
  {
    id: "inv-002",
    projectId: "energy-efficiency",
    projectTitle: "지역 공공시설 에너지 효율화 프로젝트",
    category: "공공시설",
    participationAmount: 200000,
    participationDate: "2025-12-10",
    status: "active",
    expectedReturn: "연 3.5%",
    maturityDate: "2027-09-01",
    currentValue: 201750,
    socialImpact: "공공시설 에너지 30% 절감",
    updates: [
      { date: "2026-03-05", title: "3곳 공사 완료", description: "8곳 중 3곳의 시설 개선이 완료되었습니다." },
      { date: "2026-01-15", title: "공사 착공", description: "첫 번째 시설의 에너지 효율화 공사가 시작되었습니다." },
    ],
  },
];

export const investProjectDetails: Record<string, InvestProject> = Object.fromEntries(
  investProjects.map((p) => [p.id, p])
);

export const recentTransactions = [
  { id: "tx-001", merchant: "수원그린마켓", amount: -28800, originalAmount: 32000, savings: 3200, date: "2026-03-09", method: "지역화폐" },
  { id: "tx-002", merchant: "광교가족약국", amount: -15000, originalAmount: 15000, savings: 1500, date: "2026-03-08", method: "지역화폐" },
  { id: "tx-003", merchant: "충전", amount: 50000, originalAmount: 0, savings: 0, date: "2026-03-07", method: "계좌이체" },
  { id: "tx-004", merchant: "용인북가든", amount: -45000, originalAmount: 45000, savings: 0, date: "2026-03-05", method: "카카오페이" },
  { id: "tx-005", merchant: "GS25 광교점", amount: -4500, originalAmount: 5000, savings: 500, date: "2026-03-04", method: "지역화폐" },
  { id: "tx-006", merchant: "스타벅스 수원역점", amount: -6500, originalAmount: 6500, savings: 0, date: "2026-03-03", method: "네이버페이" },
  { id: "tx-007", merchant: "충전", amount: 100000, originalAmount: 0, savings: 0, date: "2026-03-01", method: "계좌이체" },
  { id: "tx-008", merchant: "이마트 수원점", amount: -67000, originalAmount: 74400, savings: 7400, date: "2026-02-28", method: "지역화폐" },
  { id: "tx-009", merchant: "올리브영 영통점", amount: -23000, originalAmount: 25500, savings: 2500, date: "2026-02-27", method: "지역화폐" },
  { id: "tx-010", merchant: "맘스터치 영통점", amount: -12500, originalAmount: 12500, savings: 0, date: "2026-02-25", method: "카카오페이" },
];

// --- Family / Household ---
export type FamilyMember = {
  id: string;
  name: string;
  relationship: string;
  age: number;
  synced: boolean;
  syncDate: string | null;
};

export const familyMembers: FamilyMember[] = [
  { id: "fm-001", name: "김민지", relationship: "본인", age: 35, synced: true, syncDate: "2026-03-01" },
  { id: "fm-002", name: "이준호", relationship: "배우자", age: 37, synced: true, syncDate: "2026-03-01" },
  { id: "fm-003", name: "이서윤", relationship: "자녀", age: 7, synced: true, syncDate: "2026-03-01" },
];

// --- Personal Documents ---
export type PersonalDocument = {
  id: string;
  title: string;
  category: "준비 완료" | "불러오기 가능" | "추가 필요" | "검토 중";
  source: "자동" | "직접 첨부" | "정부24";
  issuedDate: string | null;
  expiryDate: string | null;
  description: string;
};

export const personalDocuments: PersonalDocument[] = [
  { id: "doc-001", title: "주민등록등본", category: "준비 완료", source: "정부24", issuedDate: "2026-02-15", expiryDate: "2026-05-15", description: "세대 구성원 및 주소지 확인용" },
  { id: "doc-002", title: "가족관계증명서", category: "준비 완료", source: "정부24", issuedDate: "2026-02-15", expiryDate: "2026-05-15", description: "가족 관계 확인용" },
  { id: "doc-003", title: "건강보험자격득실확인서", category: "불러오기 가능", source: "자동", issuedDate: null, expiryDate: null, description: "건강보험 가입 상태 확인용" },
  { id: "doc-004", title: "소득금액증명원", category: "불러오기 가능", source: "정부24", issuedDate: null, expiryDate: null, description: "소득 수준 확인용" },
  { id: "doc-005", title: "예방접종증명서", category: "준비 완료", source: "직접 첨부", issuedDate: "2026-01-20", expiryDate: null, description: "아동 예방접종 완료 확인용" },
  { id: "doc-006", title: "재학증명서", category: "추가 필요", source: "직접 첨부", issuedDate: null, expiryDate: null, description: "초등학교 입학/재학 확인용" },
  { id: "doc-007", title: "통장 사본", category: "검토 중", source: "직접 첨부", issuedDate: "2026-03-05", expiryDate: null, description: "지원금 수령 계좌 확인용" },
];

// --- Notifications ---
export type AppNotification = {
  id: string;
  type: "benefit" | "document" | "payment" | "project" | "system";
  title: string;
  description: string;
  date: string;
  read: boolean;
  link: string | null;
};

export const notifications: AppNotification[] = [
  { id: "noti-001", type: "benefit", title: "새로운 혜택을 찾았어요", description: "산후 회복 지원 프로그램 대상이에요. 확인해보세요.", date: "2026-03-09", read: false, link: "/benefits/postpartum-care" },
  { id: "noti-002", type: "document", title: "서류 만료 예정", description: "주민등록등본이 2개월 내 만료됩니다. 갱신하세요.", date: "2026-03-08", read: false, link: "/my/documents" },
  { id: "noti-003", type: "payment", title: "이번 달 절약 요약", description: "3월에 지역화폐로 14,600원을 절약했어요.", date: "2026-03-07", read: true, link: "/pay/history" },
  { id: "noti-004", type: "project", title: "프로젝트 진행 현황", description: "수원 솔라 루프 1차 사업: 7곳 설치 완료", date: "2026-03-01", read: true, link: "/invest/portfolio/inv-001" },
  { id: "noti-005", type: "benefit", title: "신청 결과 안내", description: "아동 예방접종 지원 신청이 승인되었어요.", date: "2026-02-20", read: true, link: "/benefits/child-vaccine/status" },
  { id: "noti-006", type: "system", title: "앱 업데이트 안내", description: "새로운 기능이 추가되었어요. 확인해보세요.", date: "2026-02-15", read: true, link: null },
];

// --- Why-recommended explainability ---
export type WhyReason = { label: string; met: boolean };

export const whyPaymentReasons: Record<string, { title: string; reasons: WhyReason[]; footer: string }> = {
  "suwon-green-market": {
    title: "왜 이 결제수단이 유리한가요?",
    reasons: [
      { label: "이 매장에서 지역화폐 즉시 할인이 가장 커요 (10%)", met: true },
      { label: "네이버페이 적립(3%)보다 할인 폭이 커요", met: true },
      { label: "지역화폐 잔액이 충분해요 (186,500원)", met: true },
    ],
    footer: "결제수단별 혜택을 비교해서 가장 유리한 방법을 안내해드려요.",
  },
  "gwanggyo-pharmacy": {
    title: "왜 이 결제수단이 유리한가요?",
    reasons: [
      { label: "이 약국에서 지역화폐 즉시 할인이 가장 커요 (10%)", met: true },
      { label: "네이버페이 적립(3%)보다 할인 폭이 커요", met: true },
      { label: "지역화폐 잔액이 충분해요", met: true },
    ],
    footer: "결제수단별 혜택을 비교해서 가장 유리한 방법을 안내해드려요.",
  },
  "yongin-bukgarden": {
    title: "왜 이 결제수단이 유리한가요?",
    reasons: [
      { label: "이 매장에서 지역화폐 할인이 가장 커요 (5%)", met: true },
      { label: "네이버페이 적립(3%)보다 할인 폭이 커요", met: true },
      { label: "지역화폐 잔액이 충분해요", met: true },
    ],
    footer: "결제수단별 혜택을 비교해서 가장 유리한 방법을 안내해드려요.",
  },
};

export const whyBenefitReasons: Record<string, { title: string; reasons: WhyReason[]; footer: string }> = {
  "elementary-prep": {
    title: "왜 이 혜택이 보이나요?",
    reasons: [
      { label: "수원시 거주 조건을 충족해요", met: true },
      { label: "만 6세 자녀가 있어요 (이서윤)", met: true },
      { label: "2026년 초등학교 입학 예정이에요", met: true },
      { label: "소득 제한 없음 — 누구나 신청 가능", met: true },
    ],
    footer: "가구 정보와 자녀 연령을 기반으로 자동 추천됐어요.",
  },
  "after-school-care": {
    title: "왜 이 혜택이 보이나요?",
    reasons: [
      { label: "수원시 거주 조건을 충족해요", met: true },
      { label: "만 6세 자녀가 있어요 (이서윤)", met: true },
      { label: "2026년 초등학교 입학 예정이에요", met: true },
      { label: "맞벌이 또는 돌봄 필요 가정이에요", met: true },
    ],
    footer: "가구 정보와 자녀 연령을 기반으로 자동 추천됐어요.",
  },
  "child-vaccine": {
    title: "왜 이 혜택이 보이나요?",
    reasons: [
      { label: "수원시 거주 조건을 충족해요", met: true },
      { label: "만 12세 이하 자녀가 있을 수 있어요", met: true },
      { label: "접종 기록 확인이 필요해요", met: false },
    ],
    footer: "가족관계 정보를 기반으로 추천됐어요. 접종 기록을 확인하면 더 정확한 안내가 가능해요.",
  },
  "youth-culture": {
    title: "왜 이 혜택이 보이나요?",
    reasons: [
      { label: "수원시 거주 조건을 충족해요", met: true },
      { label: "연령 기준 확인 필요 (만 35세, 기준 19~34세)", met: false },
      { label: "소득 기준 확인 필요", met: false },
    ],
    footer: "거주지는 충족하지만 일부 조건을 확인해야 해요. 해당하지 않을 수도 있어요.",
  },
  "postpartum-care": {
    title: "왜 이 혜택이 보이나요?",
    reasons: [
      { label: "수원시 거주 조건을 충족해요", met: true },
      { label: "가구에 영유아 자녀가 있을 수 있어요", met: true },
      { label: "최근 출산 여부 확인 필요", met: false },
    ],
    footer: "가구 구성 정보를 기반으로 추천됐어요. 출산 정보를 확인하면 정확한 자격을 안내할 수 있어요.",
  },
};

export const whyDocumentReasons: Record<string, { title: string; reasons: WhyReason[]; footer: string }> = {
  "doc-001": {
    title: "왜 이 서류가 필요한가요?",
    reasons: [
      { label: "초등학교 입학 준비 지원금 신청에 필요해요", met: true },
      { label: "세대 구성원과 주소지를 확인하는 용도예요", met: true },
      { label: "정부24에서 자동으로 불러올 수 있어요", met: true },
    ],
    footer: "이 서류는 대부분의 공공 혜택 신청에 기본으로 필요해요.",
  },
  "doc-006": {
    title: "왜 이 서류가 필요한가요?",
    reasons: [
      { label: "초등학교 입학 준비 지원금 신청에 필요해요", met: true },
      { label: "자녀의 재학 상태를 확인하는 용도예요", met: true },
      { label: "학교에서 직접 발급받아야 해요", met: false },
    ],
    footer: "학교에서 받은 재학증명서를 사진으로 찍어 올려주세요.",
  },
};

export const whyProjectReasons: Record<string, { title: string; reasons: WhyReason[]; footer: string }> = {
  "suwon-solar": {
    title: "왜 이 프로젝트가 추천됐나요?",
    reasons: [
      { label: "수원시 거주자로, 지역 프로젝트 참여 가능", met: true },
      { label: "공공건물 기반이라 안정적인 수익 구조", met: true },
      { label: "847명이 이미 참여 중이에요", met: true },
      { label: "마감이 임박해 서둘러야 해요", met: true },
    ],
    footer: "거주 지역과 프로젝트 안정성을 기반으로 추천됐어요.",
  },
  "youth-housing": {
    title: "왜 이 프로젝트가 추천됐나요?",
    reasons: [
      { label: "경기도 거주자로 참여 가능한 프로젝트예요", met: true },
      { label: "경기도가 보증하는 공공임대 사업이에요", met: true },
      { label: "청년 120세대 주거 안정에 기여해요", met: true },
    ],
    footer: "지역 공공 프로젝트로, 소액부터 참여할 수 있어요.",
  },
};

// --- Resume / Continue Tasks (이어하기) ---
export type ResumeTaskType = "benefit" | "payment" | "document" | "invest";
export type ResumeTaskStatus = "active" | "snoozed" | "dismissed" | "completed" | "expired";

export type ResumeTask = {
  id: string;
  type: ResumeTaskType;
  title: string;
  description: string;
  href: string;
  createdAt: string;
  updatedAt: string;
  status: ResumeTaskStatus;
  snoozedUntil: string | null;
  progress: { current: number; total: number } | null;
  expiresAt: string | null;
};

export const resumeTasks: ResumeTask[] = [
  {
    id: "resume-001",
    type: "benefit",
    title: "초등학교 입학 준비 지원금",
    description: "서류 1개만 더 준비하면 신청할 수 있어요",
    href: "/benefits/elementary-prep/documents",
    createdAt: "2026-03-09T10:00:00",
    updatedAt: "2026-03-09T14:32:00",
    status: "active",
    snoozedUntil: null,
    progress: { current: 2, total: 3 },
    expiresAt: "2026-03-31",
  },
  {
    id: "resume-002",
    type: "payment",
    title: "삼성페이 연동",
    description: "결제 연동 1단계만 남았어요",
    href: "/my/linked-services",
    createdAt: "2026-03-08T09:00:00",
    updatedAt: "2026-03-08T09:15:00",
    status: "active",
    snoozedUntil: null,
    progress: { current: 2, total: 3 },
    expiresAt: null,
  },
  {
    id: "resume-003",
    type: "benefit",
    title: "청년 문화패스",
    description: "혜택 신청 검토가 남아 있어요",
    href: "/benefits/youth-culture/review",
    createdAt: "2026-03-07T11:00:00",
    updatedAt: "2026-03-07T11:30:00",
    status: "active",
    snoozedUntil: null,
    progress: null,
    expiresAt: "2026-05-15",
  },
  {
    id: "resume-004",
    type: "invest",
    title: "수원 솔라 루프 1차 사업",
    description: "프로젝트 참여 검토가 남아 있어요",
    href: "/invest/project/suwon-solar/review",
    createdAt: "2026-03-06T15:00:00",
    updatedAt: "2026-03-06T15:20:00",
    status: "active",
    snoozedUntil: null,
    progress: null,
    expiresAt: null,
  },
  {
    id: "resume-005",
    type: "document",
    title: "소득확인증명서",
    description: "홈택스에서 발급 후 업로드하면 완료돼요",
    href: "/my/documents",
    createdAt: "2026-03-05T08:00:00",
    updatedAt: "2026-03-05T08:10:00",
    status: "snoozed",
    snoozedUntil: "2026-03-11",
    progress: null,
    expiresAt: null,
  },
];

// --- Event-triggered interstitial framework ---
export type InterstitialEventType =
  | "local-topup"
  | "first-payment"
  | "family-sync"
  | "document-auto-fetch"
  | "benefit-submission"
  | "first-linked-service"
  | "first-investment";

export type InterstitialEventRecord = {
  id: string;
  eventType: InterstitialEventType;
  timestamp: string;
  shown: boolean;
  dismissed: boolean;
  snoozedUntil: string | null;
  ctaClicked: boolean;
  contextId: string | null; // e.g. benefit ID, merchant ID
};

export const interstitialEventHistory: InterstitialEventRecord[] = [
  {
    id: "evt-001",
    eventType: "local-topup",
    timestamp: "2026-03-07T12:00:00",
    shown: true,
    dismissed: true,
    snoozedUntil: null,
    ctaClicked: false,
    contextId: null,
  },
  {
    id: "evt-002",
    eventType: "first-payment",
    timestamp: "2026-03-04T15:30:00",
    shown: true,
    dismissed: false,
    snoozedUntil: null,
    ctaClicked: true,
    contextId: "tx-005",
  },
  {
    id: "evt-003",
    eventType: "family-sync",
    timestamp: "2026-03-01T10:00:00",
    shown: true,
    dismissed: false,
    snoozedUntil: null,
    ctaClicked: true,
    contextId: null,
  },
];

export type InterstitialEventConfig = {
  eventType: InterstitialEventType;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
  /** Minimum hours before showing this event type again */
  cooldownHours: number;
};

export const interstitialEventConfigs: InterstitialEventConfig[] = [
  {
    eventType: "local-topup",
    title: "충전이 완료됐어요",
    description: "지금 이 금액으로 더 아낄 수 있는 가맹점을 확인해보세요",
    ctaLabel: "주변 가맹점 보기",
    ctaHref: "/pay",
    iconName: "Wallet",
    iconBg: "var(--color-badge-recommend-bg)",
    iconColor: "var(--color-cta)",
    cooldownHours: 24,
  },
  {
    eventType: "first-payment",
    title: "첫 결제를 축하해요!",
    description: "지역화폐로 결제하면 최대 10% 할인을 받을 수 있어요. 주변 가맹점을 확인해보세요.",
    ctaLabel: "더 아낄 곳 찾기",
    ctaHref: "/pay",
    iconName: "Store",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    cooldownHours: 0, // one-time
  },
  {
    eventType: "family-sync",
    title: "가족 정보가 연결됐어요",
    description: "가구 구성에 맞는 맞춤 혜택을 찾아볼게요. 받을 수 있는 혜택이 더 있을 수 있어요.",
    ctaLabel: "맞춤 혜택 보기",
    ctaHref: "/benefits",
    iconName: "Users",
    iconBg: "var(--color-badge-recommend-bg)",
    iconColor: "var(--color-cta)",
    cooldownHours: 0,
  },
  {
    eventType: "document-auto-fetch",
    title: "서류가 자동으로 준비됐어요",
    description: "준비된 서류로 바로 신청할 수 있는 혜택이 있어요. 확인해볼까요?",
    ctaLabel: "신청 가능한 혜택 보기",
    ctaHref: "/benefits",
    iconName: "FileCheck",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    cooldownHours: 48,
  },
  {
    eventType: "benefit-submission",
    title: "신청이 접수됐어요",
    description: "받을 수 있는 다른 혜택도 확인해보세요. 놓치고 있는 혜택이 있을 수 있어요.",
    ctaLabel: "다른 혜택 보기",
    ctaHref: "/benefits",
    iconName: "Gift",
    iconBg: "var(--color-badge-recommend-bg)",
    iconColor: "var(--color-cta)",
    cooldownHours: 0,
  },
  {
    eventType: "first-linked-service",
    title: "결제 서비스가 연결됐어요",
    description: "이제 여러 결제수단을 비교해서 가장 유리한 방법으로 결제할 수 있어요.",
    ctaLabel: "결제 비교 해보기",
    ctaHref: "/pay",
    iconName: "Link",
    iconBg: "var(--color-badge-recommend-bg)",
    iconColor: "var(--color-cta)",
    cooldownHours: 0,
  },
  {
    eventType: "first-investment",
    title: "첫 시민참여에 감사해요",
    description: "내 참여가 우리 지역을 변화시켜요. 다른 프로젝트도 확인해보세요.",
    ctaLabel: "다른 프로젝트 보기",
    ctaHref: "/invest",
    iconName: "TrendingUp",
    iconBg: "var(--color-success-bg)",
    iconColor: "var(--color-success)",
    cooldownHours: 0,
  },
];

// --- Weekly digest ---
export type DigestCategory = "benefit" | "document" | "payment" | "project";

export type DigestItem = {
  id: string;
  category: DigestCategory;
  title: string;
  description: string;
  urgency: "urgent" | "normal" | "info";
  ctaLabel: string;
  ctaHref: string;
  date: string;
  read: boolean;
  snoozed: boolean;
  dismissed: boolean;
};

export type WeeklyDigest = {
  weekLabel: string;
  generatedAt: string;
  summary: {
    benefitCount: number;
    documentCount: number;
    savingsAmount: number;
    projectUpdateCount: number;
  };
  items: DigestItem[];
};

export const weeklyDigest: WeeklyDigest = {
  weekLabel: "3월 첫째 주",
  generatedAt: "2026-03-10T09:00:00",
  summary: {
    benefitCount: 2,
    documentCount: 1,
    savingsAmount: 14600,
    projectUpdateCount: 1,
  },
  items: [
    {
      id: "digest-001",
      category: "benefit",
      title: "초등학교 입학 준비 지원금 마감 임박",
      description: "신청 마감까지 22일 남았어요. 서류 1개만 더 준비하면 신청할 수 있어요.",
      urgency: "urgent",
      ctaLabel: "서류 준비하기",
      ctaHref: "/benefits/elementary-prep/documents",
      date: "2026-03-10",
      read: false,
      snoozed: false,
      dismissed: false,
    },
    {
      id: "digest-002",
      category: "benefit",
      title: "산후 회복 지원 프로그램 새로 발견",
      description: "가구 정보를 기반으로 새로운 혜택을 찾았어요. 50만원 의료 바우처를 지원해요.",
      urgency: "normal",
      ctaLabel: "자격 보기",
      ctaHref: "/benefits/postpartum-care",
      date: "2026-03-09",
      read: false,
      snoozed: false,
      dismissed: false,
    },
    {
      id: "digest-003",
      category: "document",
      title: "추가 서류 요청 — 청년 문화패스",
      description: "소득확인증명서를 다시 제출해주세요. 홈택스에서 발급 후 업로드하면 돼요.",
      urgency: "urgent",
      ctaLabel: "서류 첨부하기",
      ctaHref: "/my/documents",
      date: "2026-03-07",
      read: false,
      snoozed: false,
      dismissed: false,
    },
    {
      id: "digest-004",
      category: "payment",
      title: "이번 주 14,600원 절약",
      description: "지역화폐로 결제해서 총 14,600원을 아꼈어요. 같은 방식으로 더 아낄 수 있는 곳이 3곳 있어요.",
      urgency: "info",
      ctaLabel: "더 아낄 곳 보기",
      ctaHref: "/pay",
      date: "2026-03-10",
      read: false,
      snoozed: false,
      dismissed: false,
    },
    {
      id: "digest-005",
      category: "project",
      title: "수원 솔라 루프 1차 사업 진행 소식",
      description: "12곳 중 7곳 설치 완료. 예정대로 진행 중이에요.",
      urgency: "info",
      ctaLabel: "진행 상황 보기",
      ctaHref: "/invest/portfolio",
      date: "2026-03-01",
      read: true,
      snoozed: false,
      dismissed: false,
    },
    {
      id: "digest-006",
      category: "document",
      title: "주민등록등본 만료 임박",
      description: "2개월 내 만료 예정이에요. 미리 갱신하면 혜택 신청이 편해져요.",
      urgency: "normal",
      ctaLabel: "갱신하기",
      ctaHref: "/my/documents",
      date: "2026-03-08",
      read: true,
      snoozed: false,
      dismissed: false,
    },
  ],
};

// --- Life-event trigger system ---
export type LifeEventType =
  | "school-entry"
  | "vaccination"
  | "culture-pass"
  | "postpartum"
  | "address-change"
  | "new-program"
  | "childcare";

export type LifeEventUrgency = "urgent" | "upcoming" | "info";

export type LifeEventTrigger = {
  id: string;
  eventType: LifeEventType;
  title: string;
  reason: string;
  linkedBenefitId: string | null;
  urgency: LifeEventUrgency;
  deadline: string | null;
  ctaLabel: string;
  ctaHref: string;
  dismissable: boolean;
  iconName: string;
  /** Why this trigger appeared — shown in explainability */
  whyTriggered: string[];
};

export const lifeEventTriggers: LifeEventTrigger[] = [
  {
    id: "le-001",
    eventType: "school-entry",
    title: "초등학교 입학 준비 지원금",
    reason: "이서윤(만 7세)이 올해 초등학교에 입학해요",
    linkedBenefitId: "elementary-prep",
    urgency: "urgent",
    deadline: "2026-03-31",
    ctaLabel: "자격 보기",
    ctaHref: "/benefits/elementary-prep",
    dismissable: true,
    iconName: "GraduationCap",
    whyTriggered: [
      "자녀 이서윤(만 7세)의 입학 시기에 맞춰 안내해요",
      "수원시 거주 가정 대상이에요",
      "마감이 22일 남았어요",
    ],
  },
  {
    id: "le-004",
    eventType: "childcare",
    title: "초등 돌봄교실 지원금",
    reason: "이서윤이 입학하면 방과후 돌봄을 신청할 수 있어요",
    linkedBenefitId: "after-school-care",
    urgency: "urgent",
    deadline: "2026-04-15",
    ctaLabel: "자격 보기",
    ctaHref: "/benefits/after-school-care",
    dismissable: true,
    iconName: "BookOpen",
    whyTriggered: [
      "초등학교 입학 자녀가 있는 가정에 안내해요",
      "수원시 거주 가정 대상이에요",
      "마감이 35일 남았어요",
    ],
  },
  {
    id: "le-002",
    eventType: "vaccination",
    title: "아동 예방접종 시기 안내",
    reason: "이서윤의 예방접종 일정을 확인해보세요",
    linkedBenefitId: "child-vaccine",
    urgency: "upcoming",
    deadline: "2026-06-30",
    ctaLabel: "확인하기",
    ctaHref: "/benefits/child-vaccine",
    dismissable: true,
    iconName: "Syringe",
    whyTriggered: [
      "만 12세 이하 자녀가 있는 가정에 안내해요",
      "무료 접종 대상일 수 있어요",
      "접종 기록을 확인하면 더 정확한 안내가 가능해요",
    ],
  },
  {
    id: "le-003",
    eventType: "new-program",
    title: "수원 영통 카페거리 적립 이벤트",
    reason: "수원시 거주자 대상 새로운 지역 이벤트가 시작됐어요",
    linkedBenefitId: null,
    urgency: "info",
    deadline: "2026-03-31",
    ctaLabel: "확인하기",
    ctaHref: "/regions/suwon",
    dismissable: true,
    iconName: "Megaphone",
    whyTriggered: [
      "수원시 거주자 대상 이벤트예요",
      "영통구 카페거리에서 포인트 2배 적립",
      "지역화폐로 결제하면 추가 혜택을 받아요",
    ],
  },
  {
    id: "le-006",
    eventType: "postpartum",
    title: "산후 회복 지원 프로그램",
    reason: "가구에 영유아 자녀가 있을 수 있어요",
    linkedBenefitId: "postpartum-care",
    urgency: "info",
    deadline: "2026-12-31",
    ctaLabel: "자격 보기",
    ctaHref: "/benefits/postpartum-care",
    dismissable: true,
    iconName: "Heart",
    whyTriggered: [
      "가구 구성 정보를 기반으로 안내해요",
      "최근 출산 여부를 확인하면 정확한 자격을 안내할 수 있어요",
      "50만원 의료 바우처를 지원해요",
    ],
  },
  {
    id: "le-005",
    eventType: "culture-pass",
    title: "청년 문화패스 안내",
    reason: "연령 기준 확인이 필요해요 (만 35세, 기준 19~34세)",
    linkedBenefitId: "youth-culture",
    urgency: "info",
    deadline: "2026-05-15",
    ctaLabel: "자격 보기",
    ctaHref: "/benefits/youth-culture",
    dismissable: true,
    iconName: "Palette",
    whyTriggered: [
      "경기도 거주 청년 대상 문화 바우처예요",
      "연령 기준(19~34세)에 근접해 안내해요",
      "소득 기준 확인이 필요해요",
    ],
  },
];

// --- Proactive UX state model (Tasks 21, 24) ---

export type PromptType =
  | "interstitial"
  | "life-event"
  | "digest-item"
  | "benefit-nudge"
  | "document-nudge"
  | "payment-nudge"
  | "setup-nudge"
  | "project-nudge";

export type SuppressionAction =
  | "dismissed"
  | "snoozed"
  | "completed"
  | "permanently-hidden";

export type SuppressionRecord = {
  id: string;
  promptId: string;
  promptType: PromptType;
  action: SuppressionAction;
  timestamp: string;
  snoozedUntil?: string;
  reason?: string;
};

export type SuppressionRule = {
  promptType: PromptType;
  /** hours before re-showing after dismiss */
  dismissCooldownHours: number;
  /** max times to show before auto-hiding */
  maxShowCount: number;
  /** if true, resurface as card instead of popup after dismiss */
  downgradeToCard: boolean;
  /** if true, resurface when user state changes */
  resurfaceOnStateChange: boolean;
};

export const suppressionRules: SuppressionRule[] = [
  { promptType: "interstitial", dismissCooldownHours: 168, maxShowCount: 2, downgradeToCard: true, resurfaceOnStateChange: true },
  { promptType: "life-event", dismissCooldownHours: 72, maxShowCount: 3, downgradeToCard: true, resurfaceOnStateChange: true },
  { promptType: "digest-item", dismissCooldownHours: 0, maxShowCount: 1, downgradeToCard: false, resurfaceOnStateChange: false },
  { promptType: "benefit-nudge", dismissCooldownHours: 48, maxShowCount: 3, downgradeToCard: true, resurfaceOnStateChange: true },
  { promptType: "document-nudge", dismissCooldownHours: 24, maxShowCount: 5, downgradeToCard: true, resurfaceOnStateChange: true },
  { promptType: "payment-nudge", dismissCooldownHours: 24, maxShowCount: 3, downgradeToCard: false, resurfaceOnStateChange: false },
  { promptType: "setup-nudge", dismissCooldownHours: 168, maxShowCount: 2, downgradeToCard: true, resurfaceOnStateChange: true },
  { promptType: "project-nudge", dismissCooldownHours: 72, maxShowCount: 2, downgradeToCard: false, resurfaceOnStateChange: false },
];

export const suppressionHistory: SuppressionRecord[] = [
  { id: "sup-001", promptId: "youth-culture-nudge", promptType: "benefit-nudge", action: "dismissed", timestamp: "2026-03-08T14:00:00" },
  { id: "sup-002", promptId: "link-kakao-setup", promptType: "setup-nudge", action: "snoozed", timestamp: "2026-03-09T10:00:00", snoozedUntil: "2026-03-12" },
  { id: "sup-003", promptId: "vaccine-benefit", promptType: "benefit-nudge", action: "completed", timestamp: "2026-03-05T16:30:00" },
  { id: "sup-004", promptId: "solar-project-update", promptType: "project-nudge", action: "dismissed", timestamp: "2026-03-01T09:00:00" },
];

// --- Proactive state fields ---

export type ReadinessStatus = "ready" | "partial" | "blocked" | "not-started";

export type NextBestAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  type: "benefit" | "document" | "payment" | "setup" | "project";
  priority: "high" | "medium" | "low";
  recommendedBecause: string;
};

export const nextBestActions: NextBestAction[] = [
  {
    id: "nba-001",
    label: "서류 1개만 더 준비하기",
    description: "소득확인증명서를 추가하면 초등입학 지원금을 바로 신청할 수 있어요.",
    href: "/benefits/elementary-prep/documents",
    type: "document",
    priority: "high",
    recommendedBecause: "서류 1개만 추가하면 30만원 혜택을 받을 수 있어요",
  },
  {
    id: "nba-002",
    label: "지역화폐로 결제 전환하기",
    description: "자주 가는 수원그린마켓에서 10% 할인을 받을 수 있어요.",
    href: "/pay/merchant/suwon-green-market",
    type: "payment",
    priority: "medium",
    recommendedBecause: "지역화폐가 네이버페이보다 7%p 더 유리해요",
  },
  {
    id: "nba-003",
    label: "산후 회복 지원 자격 확인하기",
    description: "가구 정보 기반으로 새로 발견된 50만원 의료 바우처예요.",
    href: "/benefits/postpartum-care",
    type: "benefit",
    priority: "medium",
    recommendedBecause: "가구 정보와 거주지 기반으로 자동 발견됐어요",
  },
];

export type ProactiveUserState = {
  consentScopes: { id: string; label: string; granted: boolean; grantedAt?: string }[];
  readinessStatus: ReadinessStatus;
  documentsReadyCount: number;
  documentsMissingCount: number;
  autoFetchAvailable: boolean;
  manualFallbackAvailable: boolean;
  eligibilityConfidence: "high" | "medium" | "low";
  linkedServicesStatus: { total: number; connected: number; pending: number };
  lifeEventSignals: string[];
  unlockPreviewCount: number;
  resumeStep: string | null;
  interstitialsSeen: string[];
};

export const proactiveState: ProactiveUserState = {
  consentScopes: [
    { id: "income", label: "소득 정보", granted: true, grantedAt: "2026-02-15" },
    { id: "family", label: "가족관계 정보", granted: true, grantedAt: "2026-02-15" },
    { id: "residence", label: "거주지 정보", granted: true, grantedAt: "2026-02-15" },
    { id: "health", label: "건강보험 정보", granted: false },
    { id: "tax", label: "세금 정보", granted: false },
  ],
  readinessStatus: "partial",
  documentsReadyCount: 4,
  documentsMissingCount: 2,
  autoFetchAvailable: true,
  manualFallbackAvailable: true,
  eligibilityConfidence: "high",
  linkedServicesStatus: { total: 4, connected: 2, pending: 0 },
  lifeEventSignals: ["school-entry", "postpartum"],
  unlockPreviewCount: 3,
  resumeStep: "benefit-elementary-prep-documents",
  interstitialsSeen: ["first-topup", "first-payment"],
};

// --- Fallback route configs (Task 22) ---

export type FallbackOption = {
  id: string;
  label: string;
  description: string;
  href: string;
  type: "primary" | "manual" | "defer";
  tradeoff?: string;
};

export type FallbackRouteConfig = {
  context: string;
  options: FallbackOption[];
};

export const fallbackRoutes: Record<string, FallbackRouteConfig> = {
  "document-preparation": {
    context: "서류 준비",
    options: [
      { id: "auto-fetch", label: "동의하고 자동 준비하기", description: "홈택스·정부24에서 서류를 자동으로 가져와요", href: "/my/documents?action=auto-fetch", type: "primary", tradeoff: "가장 빠르고 편한 방법이에요" },
      { id: "manual-upload", label: "직접 첨부하기", description: "서류 파일을 직접 업로드해요", href: "/my/documents?action=manual", type: "manual", tradeoff: "서류를 미리 준비해야 해요" },
      { id: "later", label: "나중에", description: "나중에 알림으로 안내해드릴게요", href: "/home", type: "defer" },
    ],
  },
  "payment-optimization": {
    context: "결제 최적화 설정",
    options: [
      { id: "link-service", label: "결제 서비스 연결하기", description: "자동으로 가장 유리한 결제수단을 비교해드려요", href: "/my/linked-services", type: "primary", tradeoff: "최대 10% 할인 혜택을 받을 수 있어요" },
      { id: "manual-check", label: "수동으로 확인하기", description: "매장별 혜택을 직접 비교해요", href: "/pay", type: "manual", tradeoff: "매번 직접 비교해야 해요" },
      { id: "later", label: "나중에", description: "다음에 결제할 때 안내해드릴게요", href: "/home", type: "defer" },
    ],
  },
  "family-recommendation": {
    context: "가족 기반 추천",
    options: [
      { id: "consent-sync", label: "동의하고 가족 혜택 보기", description: "가족 정보로 추가 혜택을 자동으로 찾아드려요", href: "/onboarding/consents", type: "primary", tradeoff: "가족 기준 혜택까지 모두 확인할 수 있어요" },
      { id: "individual-only", label: "연결 없이 계속 보기", description: "개인 기준 혜택만 확인해요", href: "/benefits", type: "manual", tradeoff: "가족 기반 혜택은 확인할 수 없어요" },
      { id: "later", label: "나중에", description: "다음에 안내해드릴게요", href: "/home", type: "defer" },
    ],
  },
  "identity-verification": {
    context: "본인 확인",
    options: [
      { id: "verify-now", label: "본인 확인하기", description: "간편 인증으로 1분 안에 완료돼요", href: "/my/identity", type: "primary", tradeoff: "투자 참여와 고액 혜택 신청이 가능해져요" },
      { id: "view-only", label: "둘러보기만 하기", description: "참여는 나중에, 정보만 먼저 볼게요", href: "/invest", type: "manual", tradeoff: "투자 참여는 본인 확인 후 가능해요" },
      { id: "later", label: "나중에", description: "다음에 안내해드릴게요", href: "/home", type: "defer" },
    ],
  },
};

// Utility
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount) + "원";
}

export function formatCompactKRW(amount: number): string {
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(1).replace(/\.0$/, "") + "억원";
  }
  if (amount >= 10000) {
    return (amount / 10000).toFixed(0) + "만원";
  }
  return formatKRW(amount);
}
