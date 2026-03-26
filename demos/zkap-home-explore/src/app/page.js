'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';

/* ══════════════════════════════════════════════════════════════ */
/* Data                                                          */
/* ══════════════════════════════════════════════════════════════ */

const onboardingCards = [
  { icon: '🤖', iconBg: '#1E2A3A', title: 'ZKAP에 대해\n자세히 알려드릴게요.', arrow: false },
  { icon: '🔍', iconBg: '#E8EFF8', title: '코인 가격을\n비교해 보세요.', arrow: false },
  { icon: '💳', iconBg: '#E8F8F7', title: '거래소만 연결하면\n투자 준비 끝이에요.', arrow: true },
  { icon: '📊', iconBg: '#F0E8FF', title: '꾸준히 이자받는\n방법을 추천드려요.', arrow: false },
];

const tickerCoins = [
  { name: 'BTC', desc: '비트코인', change: '+2.31%', up: true },
  { name: 'ETH', desc: '이더리움', change: '+1.85%', up: true },
  { name: 'SOL', desc: '솔라나', change: '+4.12%', up: true },
  { name: 'XRP', desc: '리플', change: '-0.42%', up: false },
  { name: 'DOGE', desc: '도지코인', change: '+1.05%', up: true },
];

const stakingTopCoins = [
  { icon: 'Ξ', iconBg: '#FFE8E8', rank: 1, name: 'ETH 스테이킹', period: '최근 6개월 수익률', ret: '8.24%', date: '2026.03.26 기준', label: '연 이자율' },
  { icon: '◎', iconBg: '#E8EFF8', rank: 2, name: 'SOL 스테이킹', period: '최근 6개월 수익률', ret: '7.15%', date: '2026.03.26 기준', label: '연 이자율' },
  { icon: '₿', iconBg: '#FFE8E8', rank: 3, name: 'BTC 래핑 이자', period: '최근 6개월 수익률', ret: '5.82%', date: '2026.03.26 기준', label: '연 이자율' },
];

const similarInvestors = [
  { icon: '🪙', label1: '20대 또래', label2: '평균 투자', value: '516만원', color: 'cyan' },
  { icon: '☂️', label1: '20대 또래', label2: '평균 연금투자', value: '852만원', color: 'cyan' },
  { icon: '📈', label1: '20대 또래', label2: '이번달 수익', value: '+82,000원', color: 'red' },
];

const myCoins = [
  { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', sub: '+2,500,000원 (+8.24%)', change: '#FF4444' },
  { icon: '₿', iconBg: '#F7931A', name: '비트코인', sub: '+1,340,000원 (+5.82%)', change: '#FF4444' },
  { icon: '◎', iconBg: '#9945FF', name: '솔라나', sub: '+115,500원 (+7.15%)', change: '#FF4444' },
];

const trendingThemes = [
  { emoji: '🤖', name: 'AI 시대의 코인', perf: '1개월 전보다 +28.4%', badge: '수익률 TOP5' },
  { emoji: '💳', name: '결제의 미래', perf: '1개월 전보다 +15.1%', badge: '검색 TOP5' },
  { emoji: '🇺🇸', name: '미국이 밀어주는', perf: '1개월 전보다 +6.8%', badge: '거래량 TOP5' },
];

const notableCoins = [
  { icon: '₿', iconBg: '#F7931A', name: '비트코인', price: '137,217,000원 +2.31%', badge: 'ZKAP AI 점수 TOP5', badgeType: 'cyan' },
  { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', price: '3,821,000원 +1.85%', badge: 'ZKAP 내 인기', badgeType: 'cyan' },
  { icon: '◎', iconBg: '#9945FF', name: '솔라나', price: '241,300원 +4.12%', badge: '높은 이자율', badgeType: 'cyan' },
];

const stakingStrategies = [
  { icon: 'Ξ', iconBg: '#FFE8E8', name: 'ETH 스테이킹', desc: '이더리움 예치로 연 8.24% 이자 수익' },
  { icon: '₿', iconBg: '#FFE8E8', name: 'BTC 래핑 이자', desc: 'AI가 운용하는 비트코인 이자 전략' },
  { icon: '◎', iconBg: '#E8EFF8', name: 'SOL 스테이킹', desc: '솔라나 네트워크 검증으로 이자 수익' },
  { icon: '$', iconBg: '#E8EFF8', name: 'USDC 예치', desc: '달러 안정 코인으로 안정적 이자' },
  { icon: '◈', iconBg: '#FFE8E8', name: 'XRP 스테이킹', desc: '리플 예치로 꾸준한 이자 받기' },
];

const exploreRecentCoins = [
  { icon: '₿', iconBg: '#F7931A', name: '비트코인', sub: '시가총액 1위', change: '+2.31%' },
  { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', sub: '스마트 컨트랙트 대장', change: '+1.85%' },
];

const themeBanners = [
  { bg: '#1E2A3A', title: "'디지털 금' BTC\n지금이 기회?", sub: '비트코인 중심 가치 저장' },
  { bg: '#2E1A3A', title: "AI 시대의 코인들\n주목할 때!", sub: 'FET, RNDR, NEAR' },
  { bg: '#1A2A1E', title: "결제 혁명 코인\n미래를 선점하다", sub: 'XRP, XLM, ADA' },
];

const popularThemes = [
  { label: '매매가 활발해요.', name: 'AI 코인' },
  { label: '이번 주 급상승', name: '결제 코인' },
  { label: '기관이 담고 있어요.', name: '미국 ETF 포함' },
  { label: '꾸준한 상승세', name: '디지털 금' },
];

/* ── Explore v2 data ── */
const exploreTrendingKeywords = ['솔라나', '비트코인', 'TRUMP', '이더리움', '수이', '도지코인'];

// hook: 조건 충족 시에만 보여줄 서브워딩. 1위만 노출. 없으면 null.
const exploreSections = [
  {
    emoji: '🔥',
    title: '이번 주 거래량 폭발',
    sub: '24시간 거래량이 평소보다 3배 이상 늘었어요',
    coins: [
      { icon: '◎', iconBg: '#9945FF', name: '솔라나', hook: '오늘 거래량 평소의 4배예요', price: '182,400원', change: '+9.2%', up: true },
      { icon: 'D', iconBg: '#C2A633', name: '도지코인', hook: null, price: '242원', change: '+7.8%', up: true },
      { icon: 'X', iconBg: '#00AAE4', name: '리플', hook: null, price: '3,120원', change: '+4.1%', up: true },
    ],
  },
  {
    emoji: '💰',
    title: '다른 데보다 더 싸게 살 수 있어요',
    sub: '지금 거래소마다 가격이 달라요 — ZKAP이 찾아드렸어요',
    coins: [
      { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', hook: '코인원이 업비트보다 38,200원 싸요', price: '4,820,000원', change: '+1.3%', up: true },
      { icon: '₿', iconBg: '#F7931A', name: '비트코인', hook: null, price: '128,400,000원', change: '+0.8%', up: true },
      { icon: '◎', iconBg: '#9945FF', name: '솔라나', hook: null, price: '182,400원', change: '+9.2%', up: true },
    ],
  },
  {
    emoji: '📈',
    title: '이번 주 계속 오르는 중',
    sub: '7일 연속 양봉이에요 — 쭉 올랐다는 뜻',
    coins: [
      { icon: 'N', iconBg: '#00C08B', name: '니어프로토콜', hook: '7일 연속 올랐어요', price: '6,840원', change: '+12.4%', up: true },
      { icon: '₿', iconBg: '#F7931A', name: '비트코인', hook: null, price: '128,400,000원', change: '+0.8%', up: true },
      { icon: 'A', iconBg: '#E84142', name: '아발란체', hook: null, price: '42,300원', change: '+5.7%', up: true },
    ],
  },
  {
    emoji: '🇺🇸',
    title: '트럼프가 좋아하는 코인',
    sub: '미국 정책이 코인 가격에 영향을 주고 있어요',
    coins: [
      { icon: 'T', iconBg: '#C0392B', name: 'TRUMP', hook: '출시 이후 최고가 경신 중', price: '18,700원', change: '+21.3%', up: true },
      { icon: '₿', iconBg: '#F7931A', name: '비트코인', hook: null, price: '128,400,000원', change: '+0.8%', up: true },
      { icon: 'X', iconBg: '#00AAE4', name: '리플', hook: null, price: '3,120원', change: '+4.1%', up: true },
    ],
  },
  {
    emoji: '🏆',
    title: 'ZKAP에서 제일 많이 가진 코인',
    sub: '지금 ZKAP 사용자들이 가장 많이 보유하고 있어요',
    coins: [
      { icon: '₿', iconBg: '#F7931A', name: '비트코인', hook: '사용자 2,341명이 갖고 있어요', price: '128,400,000원', change: '+0.8%', up: true },
      { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', hook: null, price: '4,820,000원', change: '+1.3%', up: true },
      { icon: '◎', iconBg: '#9945FF', name: '솔라나', hook: null, price: '182,400원', change: '+9.2%', up: true },
    ],
  },
  {
    emoji: '📉',
    title: '너무 많이 빠졌는데 한번 볼 만해요',
    sub: '1년 최저가 근처예요 — 투자 판단은 본인이 하세요',
    coins: [
      { icon: 'P', iconBg: '#E6007A', name: '폴카닷', hook: '1년 최저가에서 4% 위예요', price: '9,240원', change: '-3.4%', up: false },
      { icon: 'A', iconBg: '#0033AD', name: '카르다노', hook: null, price: '728원', change: '-2.1%', up: false },
      { icon: 'L', iconBg: '#2A5ADA', name: '체인링크', hook: null, price: '19,800원', change: '-1.2%', up: false },
    ],
  },
];

const marketPills = [
  { name: 'BTC', change: '+2.31%', up: true },
  { name: 'ETH', change: '+1.85%', up: true },
  { name: 'SOL', change: '+4.12%', up: true },
  { name: '코스피', change: '+0.48%', up: true },
  { name: '나스닥', change: '-0.18%', up: false },
];

const newsItems = [
  { title: '비트코인, 사상 최고가 경신 앞두고 조정... 전문가 "단기 조정 후 재상승"', meta: '6시간 전 · 코인데스크', emoji: '📊' },
  { title: '이더리움 2.0 스테이킹 참여자 1,200만 명 돌파', meta: '8시간 전 · 한국경제', emoji: '📈' },
  { title: '솔라나 네트워크 업그레이드... TPS 50% 향상 기대', meta: '12시간 전 · 블록미디어', emoji: '⚡' },
  { title: 'SEC, 리플 소송 최종 합의... XRP 투자자 환호', meta: '1일 전 · 조선비즈', emoji: '⚖️' },
];

const promoItems = [
  { title: '혜택 보기', hot: true, sub: '미션, 이벤트 참여하고 리워드 받기' },
  { title: 'ETH 스테이킹 특별 이벤트', hot: true, sub: '지금 시작하면 연 이자율 +1% 추가' },
  { title: 'USDC 예치 프로모션', hot: true, sub: '안정적인 달러 코인으로 이자 받기' },
];

/* ══════════════════════════════════════════════════════════════ */
/* Main Component                                                */
/* ══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { key: 'home', icon: <TabIconHome />, label: '홈' },
    { key: 'staking', icon: <TabIconStaking />, label: '이자받기' },
    { key: 'explore', icon: <TabIconExplore />, label: '탐색' },
    { key: 'news', icon: <TabIconNews />, label: '소식' },
    { key: 'more', icon: <TabIconMore />, label: '더보기' },
  ];

  const showHomeHeader = activeTab === 'home';

  return (
    <div className="demo-layout">
      <div className="device">
        <div className="device-status-bar">
          <StatusBar />
        </div>

        {/* Header — home uses date pill, others use centered title */}
        {showHomeHeader ? (
          <div className="fixed-header">
            <div className="header-left">
              <div className="news-pill">
                3월 26일 소식
                <span className="notif-badge">9</span>
              </div>
            </div>
            <div className="header-right">
              <button className="benefit-btn">혜택 구경하기 ✕</button>
              <span className="header-icon">🎁</span>
              <span className="header-icon">🔔</span>
            </div>
          </div>
        ) : (
          <div className="sub-header">
            <span className="sub-header-title">
              {activeTab === 'staking' && '이자받기'}
              {activeTab === 'explore' && '탐색'}
              {activeTab === 'news' && '소식'}
              {activeTab === 'more' && '더보기'}
            </span>
            <div className="sub-header-right">
              {(activeTab === 'explore' || activeTab === 'news') && <span className="sub-header-icon">🔍</span>}
              {activeTab !== 'more' && <span className="sub-header-icon">🔔</span>}
              {activeTab === 'more' && <span className="sub-header-icon">⚙️</span>}
            </div>
          </div>
        )}

        <div className="screen">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'staking' && <StakingTab />}
          {activeTab === 'explore' && <ExploreTab />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'more' && <MoreTab />}
        </div>

        {/* Bottom Tab Bar */}
        <div className="tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon-svg">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="device-home-indicator">
          <div className="home-indicator-bar" />
        </div>
      </div>

      {/* Annotation Panel */}
      <div className="anno-panel">
        <div className="anno-header">
          <div className="anno-title">ZKAP 5탭 핀트 클론</div>
          <div className="anno-subtitle">핀트 1:1 UI 스펙 기반 · 2026.03.26</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">홈 탭</div>
          <div className="anno-text">날짜 소식 pill + 온보딩 카드 + 마켓 티커 + 이자받기/탐색 세그먼트 + 이자율 TOP 카드 + AI 한줄요약 + 비슷한 투자자 + 내 코인 + 테마 + 주목할 코인.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">이자받기 탭</div>
          <div className="anno-text">핀트 AI투자 1:1. 일반/장기 세그먼트 + 히어로 텍스트 + 전략별 코인 리스트 (ETH/BTC/SOL/USDC/XRP).</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">탐색 탭 v2</div>
          <div className="anno-text">홈/인기테마/신규코인 서브탭 구조. 홈: 계정 요약 + 가이드 카드 + 최근 관심 코인 + 테마 배너/그리드. 인기테마(v2): 검색창 + 트렌딩 chips + 워딩 타이틀 섹션 피드 — (1) 섹션 타이틀로 클릭 유발 ("이번 주 거래량 폭발") (2) 항목 서브워딩으로 맥락 제공 ("밈인데 거래량은 진지함"). 신규코인: 최근 30일 상장 리스트.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">소식 탭</div>
          <div className="anno-text">핀트 인사이트 1:1. 마켓 티커 pill + 이자받기/탐색 CTA + 뉴스 리스트 + AI 시황 분석.</div>
        </div>
        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">더보기 탭</div>
          <div className="anno-text">핀트 전체 1:1. 프로필 26px Bold + 일반 투자자 뱃지 + ZKAP 머니 카드 + 3열 바로가기 + 프로모 리스트 HOT 뱃지.</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab Icons                                                      */
/* ══════════════════════════════════════════════════════════════ */

function TabIconHome() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TabIconStaking() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <path d="M2 9h20" />
      <path d="M9 15h6" />
    </svg>
  );
}

function TabIconExplore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </svg>
  );
}

function TabIconNews() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="13" y2="14" />
    </svg>
  );
}

function TabIconMore() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab 1: 홈                                                      */
/* ══════════════════════════════════════════════════════════════ */

function HomeTab() {
  const [homeSeg, setHomeSeg] = useState(0); // 0=이자받기, 1=탐색

  return (
    <div className="tab-content">
      {/* Onboarding welcome */}
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', lineHeight: '32px', letterSpacing: '-0.3px' }}>
          {'종인님, ZKAP이 처음이신가요?\n아래 내용을 차근차근 살펴보세요.'}
        </div>
      </div>

      {/* Onboarding cards horizontal scroll */}
      <div className="onboarding-scroll">
        {onboardingCards.map((c, i) => (
          <div key={i} className="onboarding-card">
            <div className="onboarding-card-icon" style={{ background: c.iconBg }}>
              {c.icon}
            </div>
            <div className="onboarding-card-title" style={{ whiteSpace: 'pre-line' }}>{c.title}</div>
            {c.arrow && <div className="onboarding-card-arrow">→</div>}
          </div>
        ))}
      </div>

      {/* Market ticker strip */}
      <div className="ticker-strip">
        <div className="ticker-track">
          {[...tickerCoins, ...tickerCoins].map((t, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-name">{t.name} ({t.desc})</span>
              <span className={`ticker-change ${t.up ? 'up' : 'down'}`}>{t.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Segmented control: 이자받기 / 탐색 */}
      <div className="segmented-control">
        <button className={`seg-btn ${homeSeg === 0 ? 'active' : ''}`} onClick={() => setHomeSeg(0)}>이자받기</button>
        <button className={`seg-btn ${homeSeg === 1 ? 'active' : ''}`} onClick={() => setHomeSeg(1)}>탐색</button>
      </div>

      {homeSeg === 0 ? (
        <>
          {/* AI Performance Rankings — 이자율 TOP 코인 */}
          <div style={{ padding: '24px 20px 12px' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px' }}>
              지금 잘나가는 이자 코인, 한 눈에 보기
            </div>
          </div>

          {/* Filter chips */}
          <div className="filter-chips-scroll">
            <button className="filter-chip active">🏆 이자율 TOP3</button>
            <button className="filter-chip">스테이킹 TOP3</button>
            <button className="filter-chip">안정성 TOP3</button>
          </div>

          {/* Performance cards (horizontal scroll) */}
          <div className="perf-cards-scroll">
            {stakingTopCoins.map((c, i) => (
              <div key={i} className="perf-card" style={{ cursor: 'pointer' }} onClick={() => window.open('/baerae-demo/zkap-coin-detail', '_blank')}>
                <div className="perf-card-top">
                  <div className="perf-card-icon" style={{ background: c.iconBg }}>{c.icon}</div>
                  <div className="perf-card-rank">{c.rank}</div>
                </div>
                <div className="perf-card-name">{c.name} &gt;</div>
                <div className="perf-card-period">{c.period}</div>
                <div className="perf-card-return">{c.ret}</div>
                <div className="perf-card-date">{c.date}</div>
                <span className="perf-card-label">{c.label}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* 탐색 segment — 지금 뜨는 테마 preview */}
          <div style={{ padding: '24px 20px 12px' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px' }}>
              지금 뜨는 테마
            </div>
          </div>
          <div className="theme-banner-scroll">
            {themeBanners.map((b, i) => (
              <div key={i} className="theme-banner-card" style={{ background: b.bg }}>
                <div className="theme-banner-bg" />
                <div className="theme-banner-text">
                  <div className="theme-banner-title" style={{ whiteSpace: 'pre-line' }}>{b.title}</div>
                  <div className="theme-banner-sub">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* AI One-line Summary Banner */}
      <div className="ai-summary-banner">
        <span className="ai-summary-label">ZKAP AI 한줄요약</span>
        <span className="ai-summary-text">
          <b>이더리움</b> 스테이킹 참여자 급증, <b>연 이자율 8%대</b> 유지 중
        </span>
      </div>

      {/* Solution return CTA */}
      <div style={{ padding: '0 20px 16px' }}>
        <button className="cta-btn-outline">전체 이자율 보기</button>
      </div>

      <div className="section-gap" />

      {/* Similar Investors */}
      <div style={{ background: '#F5F6F8', padding: '24px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px', padding: '0 20px 12px' }}>
          종인님과 비슷한 투자자들은?
        </div>
        <div className="stat-cards-scroll">
          {similarInvestors.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-icon">{s.icon}</div>
              <div className="stat-card-label1">{s.label1}</div>
              <div className="stat-card-label2">{s.label2}</div>
              <div className={`stat-card-value ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-gap" />

      {/* 계좌별 투자 → 내 코인 */}
      <div style={{ padding: '24px 20px 12px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px' }}>
          내 코인
        </div>
      </div>

      {/* Sub-section: 이자받기 */}
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#666666' }}>이자받기</div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {myCoins.map((c, i) => (
          <div key={i} className={`list-item ${i < myCoins.length - 1 ? 'with-divider' : ''}`} style={{ padding: '12px 0', cursor: 'pointer' }} onClick={() => window.open('/baerae-demo/zkap-coin-detail', '_blank')}>
            <div className="list-icon" style={{ background: c.iconBg }}>{c.icon}</div>
            <div className="list-text">
              <div style={{ fontSize: 14, color: '#888888' }}>ZKAP이 운용 중인 {c.name}</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: c.change, letterSpacing: '-0.2px' }}>{c.sub}</div>
            </div>
            <span className="list-chevron">&gt;</span>
          </div>
        ))}
      </div>

      <div className="section-gap" />

      {/* 지금 뜨는 테마 */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px', marginBottom: 12 }}>
          지금 뜨는 테마
        </div>
      </div>

      {trendingThemes.map((t, i) => (
        <div key={i} className={`theme-list-item ${i < trendingThemes.length - 1 ? 'with-divider' : ''}`}>
          <div className="theme-list-left">
            <div className="theme-list-name">{t.emoji} {t.name}</div>
            <div className="theme-list-perf up">{t.perf}</div>
          </div>
          <span className="badge-outline red">{t.badge}</span>
        </div>
      ))}

      <div className="section-gap" />

      {/* 주목할 코인 */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px', marginBottom: 12 }}>
          주목할 코인
        </div>
      </div>

      {notableCoins.map((c, i) => (
        <div key={i} className={`notable-item ${i < notableCoins.length - 1 ? 'with-divider' : ''}`} style={{ cursor: 'pointer' }} onClick={() => window.open('/baerae-demo/zkap-coin-detail', '_blank')}>
          <div className="notable-icon" style={{ background: c.iconBg }}>{c.icon}</div>
          <div className="notable-text">
            <div className="notable-name">{c.name}</div>
            <div className="notable-price">{c.price}</div>
          </div>
          <span className="badge-outline cyan">{c.badge}</span>
        </div>
      ))}

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab 2: 이자받기 (AI투자 clone)                                  */
/* ══════════════════════════════════════════════════════════════ */

function StakingTab() {
  const [stakingSeg, setStakingSeg] = useState(0);

  return (
    <div className="tab-content">
      {/* Segmented: 일반 / 장기 */}
      <div className="segmented-control">
        <button className={`seg-btn ${stakingSeg === 0 ? 'active' : ''}`} onClick={() => setStakingSeg(0)}>📊 일반</button>
        <button className={`seg-btn ${stakingSeg === 1 ? 'active' : ''}`} onClick={() => setStakingSeg(1)}>🛡 장기</button>
      </div>

      {/* Hero text */}
      <div className="staking-hero">
        <div className="staking-hero-text">
          {'맡기고 자동으로\n이자받는 투자'}
        </div>
      </div>

      {/* Strategy cards */}
      <div className="strategy-card">
        <div className="strategy-card-title">시장을 이기는 고수익 이자</div>
        {stakingStrategies.map((s, i) => (
          <div key={i} className="strategy-item">
            <div className="strategy-icon" style={{ background: s.iconBg }}>{s.icon}</div>
            <div className="strategy-text">
              <div className="strategy-name">{s.name}</div>
              <div className="strategy-desc">{s.desc}</div>
            </div>
            <span className="strategy-chevron">&gt;</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 20px 20px' }}>
        <button className="cta-btn">전략 비교하기</button>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab 3: 탐색 — 서브탭 구조 복원 + 인기테마를 v2 피드로           */
/* ══════════════════════════════════════════════════════════════ */

function ExploreTab() {
  const [exploreSub, setExploreSub] = useState(0);

  return (
    <div className="tab-content">
      {/* Sub-tabs: 홈 / 인기테마 / 신규코인 */}
      <div className="explore-sub-tabs">
        {['홈', '인기테마', '신규코인'].map((label, i) => (
          <button
            key={i}
            className={`explore-sub-tab ${exploreSub === i ? 'active' : ''}`}
            onClick={() => setExploreSub(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {exploreSub === 0 && <ExploreHome />}
      {exploreSub === 1 && <ExplorePopular />}
      {exploreSub === 2 && <ExploreNew />}
    </div>
  );
}

function ExploreHome() {
  return (
    <>
      {/* Account summary */}
      <div className="explore-account-summary">
        <div className="explore-account-label">보유 자산</div>
        <div className="explore-account-amount">3,955,500원</div>
      </div>

      {/* Guide cards 2-column */}
      <div className="guide-cards-row">
        <div className="guide-card">
          <div className="guide-card-icon">📊</div>
          <span className="guide-card-chevron">&gt;</span>
          <div className="guide-card-title">{'탐색에 대해\n알려드려요'}</div>
          <div className="guide-card-sub">탐색 가이드</div>
        </div>
        <div className="guide-card">
          <div className="guide-card-icon">🔗</div>
          <span className="guide-card-chevron">&gt;</span>
          <div className="guide-card-title">{'거래소를 미리\n연결해요'}</div>
          <div className="guide-card-sub">거래소 연결</div>
        </div>
      </div>

      {/* 최근 관심 코인 */}
      <div className="recent-section-title">최근 관심 코인</div>
      <div style={{ padding: '0 20px 20px' }}>
        {exploreRecentCoins.map((c, i) => (
          <div key={i} className={`list-item ${i < exploreRecentCoins.length - 1 ? 'with-divider' : ''}`} style={{ padding: '12px 0', cursor: 'pointer' }} onClick={() => window.open('/baerae-demo/zkap-coin-detail', '_blank')}>
            <div className="list-icon" style={{ background: c.iconBg }}>{c.icon}</div>
            <div className="list-text">
              <div className="list-name">{c.name}</div>
              <div className="list-sub">{c.sub}</div>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#FF4444' }}>{c.change}</span>
          </div>
        ))}
      </div>

      <div className="section-gap" />

      {/* 인기 테마 banners */}
      <div className="recent-section-title">인기 테마</div>
      <div className="theme-banner-scroll">
        {themeBanners.map((b, i) => (
          <div key={i} className="theme-banner-card" style={{ background: b.bg }}>
            <div className="theme-banner-bg" />
            <div className="theme-banner-text">
              <div className="theme-banner-title" style={{ whiteSpace: 'pre-line' }}>{b.title}</div>
              <div className="theme-banner-sub">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 인기 테마 2-column grid */}
      <div className="recent-section-title">인기 테마</div>
      <div className="theme-grid">
        {popularThemes.map((t, i) => (
          <div key={i} className="theme-grid-card">
            <div className="theme-grid-label">{t.label}</div>
            <div className="theme-grid-name">{t.name}</div>
          </div>
        ))}
      </div>

      {/* Bottom guide banner */}
      <div style={{ padding: '8px 20px 20px' }}>
        <div style={{
          background: '#00C8BE',
          borderRadius: 24,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>📊</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', letterSpacing: '-0.2px' }}>탐색 이용 가이드 보기</span>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </>
  );
}

function ExplorePopular() {
  return (
    <>
      {/* Search bar */}
      <div className="explore-search-wrap">
        <div className="explore-search-box">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#A9ACB5" strokeWidth="2" strokeLinecap="round">
            <circle cx="8" cy="8" r="5.5" />
            <path d="M12.5 12.5L16 16" />
          </svg>
          <span className="explore-search-placeholder">
            <strong>어떤 코인이든</strong> 찾아드릴게요
          </span>
        </div>
      </div>

      {/* Trending chips */}
      <div className="explore-trending-wrap">
        <span className="explore-trending-label">지금 많이 찾아요</span>
        <div className="explore-trending-chips">
          {exploreTrendingKeywords.map((kw, i) => (
            <div key={i} className={`explore-trend-chip ${i < 2 ? 'hot' : ''}`}>
              <span className={`explore-trend-rank ${i < 2 ? 'hot' : ''}`}>{i + 1}</span>
              {kw}
            </div>
          ))}
        </div>
      </div>

      {/* Worded sections feed */}
      {exploreSections.map((sec, si) => (
        <div key={si} className="explore-section">
          <div className="explore-section-header">
            <div className="explore-section-title-wrap">
              <span className="explore-section-emoji">{sec.emoji}</span>
              <span className="explore-section-title">{sec.title}</span>
            </div>
            <span className="explore-section-more">
              더보기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#A9ACB5" strokeWidth="2" strokeLinecap="round">
                <path d="M5 3l4 4-4 4" />
              </svg>
            </span>
          </div>
          <div className="explore-section-sub">{sec.sub}</div>
          <div className="explore-coin-list">
            {sec.coins.map((c, ci) => {
              const isTop = ci === 0 && c.hook;
              return (
                <div
                  key={ci}
                  className={`explore-coin-row ${ci < sec.coins.length - 1 ? 'with-divider' : ''} ${isTop ? 'top-highlight' : ''}`}
                  onClick={() => window.open('/baerae-demo/zkap-coin-detail', '_blank')}
                >
                  <span className={`explore-rank-num ${ci === 0 ? 'top' : ''}`}>{ci + 1}</span>
                  <div className="explore-coin-icon" style={{ background: c.iconBg }}>
                    <span className="explore-coin-icon-text">{c.icon}</span>
                  </div>
                  <div className="explore-coin-info">
                    <div className="explore-coin-name-row">
                      <span className="explore-coin-name">{c.name}</span>
                    </div>
                    {isTop && (
                      <span className="explore-coin-hook">{c.hook}</span>
                    )}
                  </div>
                  <div className="explore-coin-price-wrap">
                    <div className="explore-coin-price">{c.price}</div>
                    <div className={`explore-coin-change ${c.up ? 'up' : 'down'}`}>{c.change}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />
    </>
  );
}

function ExploreNew() {
  const newCoins = [
    { icon: '🌟', iconBg: '#8B5CF6', name: '새로운 코인 A', sub: '3일 전 상장', change: '+12.5%' },
    { icon: '✨', iconBg: '#06B6D4', name: '새로운 코인 B', sub: '7일 전 상장', change: '+8.3%' },
    { icon: '💎', iconBg: '#EC4899', name: '새로운 코인 C', sub: '14일 전 상장', change: '+3.1%' },
  ];

  return (
    <>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px', marginBottom: 4 }}>
          최근 상장된 코인
        </div>
        <div style={{ fontSize: 14, color: '#888888', marginBottom: 16 }}>최근 30일 이내 상장된 코인들이에요</div>
      </div>

      {newCoins.map((c, i) => (
        <div key={i} className={`list-item ${i < newCoins.length - 1 ? 'with-divider' : ''}`}>
          <div className="list-icon" style={{ background: c.iconBg }}>{c.icon}</div>
          <div className="list-text">
            <div className="list-name">{c.name}</div>
            <div className="list-sub">{c.sub}</div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#FF4444' }}>{c.change}</span>
        </div>
      ))}

      <div style={{ height: 20 }} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab 4: 소식 (인사이트 clone)                                    */
/* ══════════════════════════════════════════════════════════════ */

function NewsTab() {
  return (
    <div className="tab-content">
      {/* Market ticker pills */}
      <div className="market-pills-scroll">
        {marketPills.map((p, i) => (
          <div key={i} className="market-pill">
            <span className="market-pill-name">{p.name}</span>
            <span className={`market-pill-change ${p.up ? 'up' : 'down'}`}>{p.change}</span>
          </div>
        ))}
      </div>

      {/* Investment prompt card */}
      <div className="invest-prompt-card">
        <div className="invest-prompt-sub">ZKAP 투자는 아직이시네요!</div>
        <div className="invest-prompt-title">원하는 투자는?</div>
        <div className="invest-cta-row">
          <div className="invest-cta-card">
            <div className="invest-cta-sub">{'모든 걸 맡기고\n자동 이자'}</div>
            <div className="invest-cta-title">이자받기</div>
          </div>
          <div className="invest-cta-card">
            <div className="invest-cta-sub">{'트렌디한 코인\n직접 투자'}</div>
            <div className="invest-cta-title">탐색하기</div>
          </div>
        </div>
      </div>

      {/* News section */}
      <div style={{ padding: '24px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.3px' }}>새로운 소식</span>
        <span style={{ fontSize: 14, fontWeight: 400, color: '#00C8BE', cursor: 'pointer' }}>전체보기</span>
      </div>

      <div className="news-list">
        {newsItems.map((n, i) => (
          <div key={i} className="news-item">
            <div className="news-item-text">
              <div className="news-item-title">{n.title}</div>
              <div className="news-item-meta">{n.meta}</div>
            </div>
            <div className="news-item-thumb">{n.emoji}</div>
          </div>
        ))}
      </div>

      {/* More link */}
      <div style={{ textAlign: 'center', padding: '12px 20px 20px' }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#888888', cursor: 'pointer' }}>더보기 &gt;</span>
      </div>

      <div className="section-gap" />

      {/* AI 시황 분석 */}
      <div className="ai-analysis-card">
        <div className="ai-analysis-header">
          <span className="ai-analysis-title">ZKAP AI가 알려주는 요즘 투자</span>
          <span className="badge-ai">AI요약</span>
        </div>
        <div className="ai-analysis-text">
          · <b>비트코인</b>이 사상 최고가를 앞두고 있으며, 기관 매수세가 이어지고 있습니다.<br />
          · <b>이더리움</b> 스테이킹 참여자가 1,200만 명을 돌파했습니다.<br />
          · <b>솔라나</b> 네트워크 업그레이드로 TPS 50% 향상이 기대됩니다.
        </div>
        <div className="ai-analysis-date">2026년 3월 26일</div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab 5: 더보기 (전체 clone)                                      */
/* ══════════════════════════════════════════════════════════════ */

function MoreTab() {
  return (
    <div className="tab-content">
      {/* Profile */}
      <div className="profile-section">
        <div className="profile-name-area">
          <div className="profile-name">종인님</div>
          <span className="profile-badge">일반 투자자</span>
        </div>
        <span className="profile-chevron">&gt;</span>
      </div>

      {/* ZKAP Money card */}
      <div className="money-card">
        <div className="money-card-top">
          <div className="money-card-icon">ZK</div>
          <div className="money-card-info">
            <div className="money-card-label">ZKAP 머니</div>
            <div className="money-card-amount">0원</div>
          </div>
          <span style={{ fontSize: 16, color: '#CCCCCC' }}>&gt;</span>
        </div>
        <div className="money-card-divider" />
        <div className="money-card-bottom">
          <div className="money-card-actions">
            <span>송금</span> | <span>충전</span>
          </div>
          <div className="money-card-card-link">🪙 ZKAP 카드</div>
        </div>
      </div>

      {/* 3-col shortcuts */}
      <div className="shortcuts-card">
        <div className="shortcut-item">
          <span className="shortcut-icon">🎫</span>
          <span className="shortcut-label">쿠폰</span>
        </div>
        <div className="shortcut-item">
          <span className="shortcut-icon">🎁</span>
          <span className="shortcut-label">혜택</span>
        </div>
        <div className="shortcut-item">
          <span className="shortcut-icon">🎧</span>
          <span className="shortcut-label">고객센터</span>
        </div>
      </div>

      {/* Promo list */}
      <div className="promo-list">
        {promoItems.map((p, i) => (
          <div key={i} className="promo-item">
            <div className="promo-text">
              <div className="promo-title-row">
                <span className="promo-title">{p.title}</span>
                {p.hot && <span className="badge-hot">HOT</span>}
              </div>
              <div className="promo-sub">{p.sub}</div>
            </div>
            <span className="promo-chevron">&gt;</span>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
