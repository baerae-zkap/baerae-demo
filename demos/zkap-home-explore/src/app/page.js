'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';

/* ── Data ── */

const myCoins = [
  { icon: '₿', iconBg: '#F7931A', name: '비트코인', value: '1,340,000원', badge: '수익률 TOP', badgeBg: '#EFF6FF', badgeColor: '#2563EB' },
  { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', value: '2,500,000원', badge: '연속 상승', badgeBg: '#D1FAE5', badgeColor: '#047857' },
  { icon: '◎', iconBg: '#9945FF', name: '솔라나', value: '115,500원', badge: '거래량 급증', badgeBg: '#FFEDD5', badgeColor: '#C2410C' },
];

const themes = [
  { emoji: '🤖', title: 'AI 시대의 코인', sub: '이달 +28.4%', badge: '수익률 TOP', badgeBg: '#EFF6FF', badgeColor: '#2563EB' },
  { emoji: '💳', title: '결제의 미래', sub: '이달 +15.1%', badge: '검색 TOP', badgeBg: '#FEF9C3', badgeColor: '#B45309' },
  { emoji: '🪙', title: '디지털 금', sub: '이달 +9.2%', badge: '꾸준한 성장', badgeBg: '#F3F4F6', badgeColor: '#6B7280' },
  { emoji: '🇺🇸', title: '미국이 밀어주는', sub: '이달 +6.8%', badge: '거래량 TOP', badgeBg: '#CCFBF1', badgeColor: '#0D9488' },
];

const exploreCategories = [
  { emoji: '💸', iconBg: '#06B6D4', name: '여기서 사면 아껴요', sub: '이더리움, 코인원이 23,000원 더 저렴해요', badge: '가격 차이', badgeBg: '#CCFBF1', badgeColor: '#0D9488' },
  { emoji: '🔥', iconBg: '#F97316', name: '지금 난리난 코인', sub: '거래량이 평소보다 3배 이상 늘었어요', badge: '거래량 폭발', badgeBg: '#FFEDD5', badgeColor: '#C2410C' },
  { emoji: '📈', iconBg: '#10B981', name: '이번 주 계속 오르는 중', sub: '7일 연속 오름세가 이어지고 있어요', badge: '연속 상승', badgeBg: '#D1FAE5', badgeColor: '#047857' },
  { emoji: '🛡', iconBg: '#64748B', name: '크게 안 흔들렸어요', sub: '이번 주 변동폭이 비교적 작았어요', badge: '안정적', badgeBg: '#F3F4F6', badgeColor: '#6B7280' },
  { emoji: '🎯', iconBg: '#8B5CF6', name: '10만원으로 시작하기', sub: '소액으로 살 수 있는 검증된 코인', badge: '소액 추천', badgeBg: '#F3E8FF', badgeColor: '#7C3AED' },
];

const exploreChips = [
  { label: '전체' },
  { label: '💸 가격 차이' },
  { label: '🔥 화제' },
  { label: '📈 오르는 중' },
  { label: '🛡 안정' },
  { label: '🎯 소액' },
];

const themeGrid = [
  { emoji: '🤖', title: 'AI 시대', sub: 'AI 관련 코인 묶음', change: '+28.4%' },
  { emoji: '💳', title: '결제의 미래', sub: '해외 송금/결제', change: '+15.1%' },
  { emoji: '🪙', title: '디지털 금', sub: 'BTC 중심 가치 저장', change: '+9.2%' },
  { emoji: '🇺🇸', title: '미국 ETF 포함', sub: '기관이 담는 코인들', change: '+6.8%' },
];

const tradeCoins = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE'];

const exchangePrices = {
  BTC: [
    { name: '코인원', price: '137,217,000원', diff: null, cheapest: true, logo: '🔵', logoBg: '#3B82F6' },
    { name: '업비트', price: '137,240,000원', diff: '+23,000원', cheapest: false, logo: '🟠', logoBg: '#F97316' },
    { name: '빗썸', price: '137,235,000원', diff: '+18,000원', cheapest: false, logo: '🟡', logoBg: '#EAB308' },
    { name: '고팍스', price: '137,252,000원', diff: '+35,000원', cheapest: false, logo: '🟢', logoBg: '#22C55E' },
  ],
  ETH: [
    { name: '코인원', price: '3,821,000원', diff: null, cheapest: true, logo: '🔵', logoBg: '#3B82F6' },
    { name: '업비트', price: '3,844,000원', diff: '+23,000원', cheapest: false, logo: '🟠', logoBg: '#F97316' },
    { name: '빗썸', price: '3,838,000원', diff: '+17,000원', cheapest: false, logo: '🟡', logoBg: '#EAB308' },
    { name: '고팍스', price: '3,849,000원', diff: '+28,000원', cheapest: false, logo: '🟢', logoBg: '#22C55E' },
  ],
  SOL: [
    { name: '업비트', price: '241,300원', diff: null, cheapest: true, logo: '🟠', logoBg: '#F97316' },
    { name: '코인원', price: '241,500원', diff: '+200원', cheapest: false, logo: '🔵', logoBg: '#3B82F6' },
    { name: '빗썸', price: '241,800원', diff: '+500원', cheapest: false, logo: '🟡', logoBg: '#EAB308' },
    { name: '고팍스', price: '242,100원', diff: '+800원', cheapest: false, logo: '🟢', logoBg: '#22C55E' },
  ],
  XRP: [
    { name: '빗썸', price: '3,268원', diff: null, cheapest: true, logo: '🟡', logoBg: '#EAB308' },
    { name: '업비트', price: '3,280원', diff: '+12원', cheapest: false, logo: '🟠', logoBg: '#F97316' },
    { name: '코인원', price: '3,275원', diff: '+7원', cheapest: false, logo: '🔵', logoBg: '#3B82F6' },
    { name: '고팍스', price: '3,290원', diff: '+22원', cheapest: false, logo: '🟢', logoBg: '#22C55E' },
  ],
  DOGE: [
    { name: '코인원', price: '298원', diff: null, cheapest: true, logo: '🔵', logoBg: '#3B82F6' },
    { name: '업비트', price: '300원', diff: '+2원', cheapest: false, logo: '🟠', logoBg: '#F97316' },
    { name: '빗썸', price: '299원', diff: '+1원', cheapest: false, logo: '🟡', logoBg: '#EAB308' },
    { name: '고팍스', price: '301원', diff: '+3원', cheapest: false, logo: '🟢', logoBg: '#22C55E' },
  ],
};

const cheapestExchange = { BTC: '코인원', ETH: '코인원', SOL: '업비트', XRP: '빗썸', DOGE: '코인원' };
const savingsAmount = { BTC: '23,000원', ETH: '23,000원', SOL: '200원', XRP: '12원', DOGE: '2원' };

const settingsItems = [
  { label: '연결된 거래소', value: '2개' },
  { label: '알림 설정' },
  { label: '보안 설정' },
  { label: '고객센터' },
  { label: '이용약관' },
  { label: '앱 버전', value: '1.0.0' },
];

/* ══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChip, setActiveChip] = useState(0);
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [tradeCoin, setTradeCoin] = useState('BTC');

  const tabs = [
    { key: 'home', icon: <TabIconHome />, label: '홈' },
    { key: 'explore', icon: <TabIconExplore />, label: '탐색' },
    { key: 'trade', icon: <TabIconTrade />, label: '거래' },
    { key: 'more', icon: <TabIconMore />, label: '더보기' },
  ];

  return (
    <div className="demo-layout">
      {/* ── Device Frame ── */}
      <div className="device">
        <div className="device-status-bar">
          <StatusBar />
        </div>

        {/* Fixed Header */}
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

        <div className="screen">
          {activeTab === 'home' && (
            <HomeTab activeNewsTab={activeNewsTab} setActiveNewsTab={setActiveNewsTab} />
          )}
          {activeTab === 'explore' && (
            <ExploreTab activeChip={activeChip} setActiveChip={setActiveChip} />
          )}
          {activeTab === 'trade' && (
            <TradeTab tradeCoin={tradeCoin} setTradeCoin={setTradeCoin} />
          )}
          {activeTab === 'more' && (
            <MoreTab />
          )}
        </div>

        {/* ── Bottom Tab Bar ── */}
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

        {/* Home indicator */}
        <div className="device-home-indicator">
          <div className="home-indicator-bar" />
        </div>
      </div>

      {/* ── Annotation Panel ── */}
      <div className="anno-panel">
        <div className="anno-header">
          <div className="anno-title">ZKAP 홈+탐색+거래+더보기</div>
          <div className="anno-subtitle">핀트 1:1 클론 · 2026.03.26</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">핀트 스타일 헤더</div>
          <div className="anno-text">날짜 소식 pill + 알림 뱃지 + 혜택 CTA 버튼. 매일 새 소식이 있다는 신호.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">홈 탭</div>
          <div className="anno-text">내 자산 + 오늘의 소식(세그먼트 탭) + 내 코인 + 비슷한 투자자 + 지금 뜨는 테마. 핀트 홈 구조 1:1.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">탐색 탭</div>
          <div className="anno-text">검색바 + 필터 칩 + 오늘의 카테고리(조건형 태그) + 인기 코인 랭킹 + 테마 그리드.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">거래 탭</div>
          <div className="anno-text">거래소별 가격 비교. 가장 저렴한 거래소 하이라이트 + 절약 금액 표시. ZKAP 핵심 가치.</div>
        </div>
        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">더보기 탭</div>
          <div className="anno-text">프로필 + 투자 통계 3열 + 설정 리스트. 핀트 '전체' 탭 구조.</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* Tab Icons (SVG line icons)                                     */
/* ══════════════════════════════════════════════════════════════ */

function TabIconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function TabIconExplore() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TabIconTrade() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

function TabIconMore() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* 홈 Tab                                                        */
/* ══════════════════════════════════════════════════════════════ */

function HomeTab({ activeNewsTab, setActiveNewsTab }) {
  return (
    <div className="tab-content">
      {/* Greeting + Asset */}
      <div className="home-greeting-section">
        <div className="greeting-text">종인님, 안녕하세요 👋</div>
        <div className="asset-label">내 자산</div>
        <div className="asset-amount">3,955,500원</div>
        <div className="asset-change">+116,500원 (3.0%) 오늘</div>
      </div>

      {/* 오늘의 소식 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">오늘의 소식</span>
            <span className="date-badge-teal">3월 26일</span>
          </div>
          <div className="news-tab-row">
            <div className="news-segmented">
              <button className={`news-seg-btn ${activeNewsTab === 0 ? 'active' : ''}`} onClick={() => setActiveNewsTab(0)}>이더리움</button>
              <button className={`news-seg-btn ${activeNewsTab === 1 ? 'active' : ''}`} onClick={() => setActiveNewsTab(1)}>비트코인</button>
            </div>
          </div>
          {activeNewsTab === 0 ? (
            <div className="news-content">
              <div className="news-sub-label">오늘의 가격 기회</div>
              <div className="news-big-title">{'코인원에서 사면\n2만 3천원 저렴해요'}</div>
              <div className="exchange-compare">
                <div className="exchange-bar">
                  <div className="exchange-label">코인원</div>
                  <div className="exchange-fill" style={{ width: '60%', background: '#06B6D4' }} />
                  <div className="exchange-val">3,821,000원</div>
                </div>
                <div className="exchange-bar">
                  <div className="exchange-label">업비트</div>
                  <div className="exchange-fill" style={{ width: '65%', background: '#E5E7EB' }} />
                  <div className="exchange-val">3,844,000원</div>
                </div>
                <div className="exchange-bar">
                  <div className="exchange-label">빗썸</div>
                  <div className="exchange-fill" style={{ width: '63%', background: '#E5E7EB' }} />
                  <div className="exchange-val">3,838,000원</div>
                </div>
              </div>
              <button className="cta-btn">코인원에서 구매하기</button>
            </div>
          ) : (
            <div className="news-content">
              <div className="news-sub-label">이번 달 수익 현황</div>
              <div className="news-big-title">{'비트코인 +12%\n이번 달 최고 수익이에요'}</div>
              <button className="cta-btn">자세히 보기</button>
            </div>
          )}
        </div>
      </div>

      <div className="section-gap" />

      {/* 내 코인 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">내 코인</div>
          <div className="list-items">
            {myCoins.map((coin, i) => (
              <div key={i} className={`list-item ${i < myCoins.length - 1 ? 'with-divider' : ''}`}>
                <div className="list-icon" style={{ background: coin.iconBg }}>
                  <span>{coin.icon}</span>
                </div>
                <div className="list-text">
                  <div className="list-name">{coin.name}</div>
                  <div className="list-sub">{coin.value}</div>
                </div>
                <div className="list-right">
                  <span className="badge-pill" style={{ background: coin.badgeBg, color: coin.badgeColor }}>{coin.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-gap" />

      {/* 비슷한 투자자 Card — 2-col stat grid */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">종인님과 비슷한 투자자들은?</div>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">{'20대 또래\n평균 투자'}</div>
              <div className="stat-value cyan">516만원</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">{'20대 또래\n이번달 수익'}</div>
              <div className="stat-value red">+82,000원</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">{'20대 또래\n평균 보유 코인'}</div>
              <div className="stat-value purple">4.2종</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">{'20대 또래\n스테이킹 비율'}</div>
              <div className="stat-value cyan">32%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-gap" />

      {/* 지금 뜨는 테마 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">지금 뜨는 테마</div>
          <div className="list-items">
            {themes.map((t, i) => (
              <div key={i} className={`list-item ${i < themes.length - 1 ? 'with-divider' : ''}`}>
                <div className="list-icon emoji-icon">
                  <span>{t.emoji}</span>
                </div>
                <div className="list-text">
                  <div className="list-name">{t.title}</div>
                  <div className="list-sub">{t.sub}</div>
                </div>
                <div className="list-right">
                  <span className="badge-pill" style={{ background: t.badgeBg, color: t.badgeColor }}>{t.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* 탐색 Tab                                                      */
/* ══════════════════════════════════════════════════════════════ */

function ExploreTab({ activeChip, setActiveChip }) {
  return (
    <div className="tab-content">
      {/* Search bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="search-placeholder">코인 이름이나 키워드 검색</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="explore-chips-scroll">
        {exploreChips.map((chip, i) => (
          <button
            key={i}
            className={`explore-chip ${i === activeChip ? 'active' : ''}`}
            onClick={() => setActiveChip(i)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 오늘의 카테고리 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">오늘의 카테고리</span>
            <span className="date-badge-teal">3월 26일</span>
          </div>
          <div className="list-items">
            {exploreCategories.map((cat, i) => (
              <div key={i} className={`list-item ${i < exploreCategories.length - 1 ? 'with-divider' : ''}`}>
                <div className="list-icon" style={{ background: cat.iconBg }}>
                  <span>{cat.emoji}</span>
                </div>
                <div className="list-text">
                  <div className="list-name">{cat.name}</div>
                  <div className="list-sub">{cat.sub}</div>
                </div>
                <div className="list-right">
                  <span className="badge-pill" style={{ background: cat.badgeBg, color: cat.badgeColor }}>{cat.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-gap" />

      {/* 지금 많이 찾는 코인 */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">지금 많이 찾는 코인</span>
            <span style={{ fontSize: 12, color: '#9CA3AF', paddingTop: 8 }}>ZKAP 사용자 기준</span>
          </div>
          <div style={{ padding: '0 20px 12px' }}>
            {[
              { icon: '₿', iconBg: '#F7931A', name: '비트코인', sub: '시가총액 1위', change: '+4.2%', color: '#EF4444', rankColor: '#F59E0B' },
              { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', sub: '스마트 컨트랙트 대장', change: '+1.8%', color: '#EF4444', rankColor: '#94A3B8' },
              { icon: '◎', iconBg: '#9945FF', name: '솔라나', sub: '빠르고 저렴한 네트워크', change: '+3.1%', color: '#EF4444', rankColor: '#CD7F32' },
              { icon: '◈', iconBg: '#0080FF', name: '리플', sub: '글로벌 송금 코인', change: '+0.9%', color: '#EF4444', rankColor: '#9CA3AF' },
            ].map((coin, i) => (
              <div key={i} className="rank-item">
                <div className="rank-num" style={{ color: coin.rankColor }}>{i + 1}</div>
                <div className="list-icon" style={{ background: coin.iconBg, width: 40, height: 40, fontSize: 17 }}>
                  <span>{coin.icon}</span>
                </div>
                <div className="list-text">
                  <div className="list-name">{coin.name}</div>
                  <div className="list-sub">{coin.sub}</div>
                </div>
                <div className="rank-change" style={{ color: coin.color }}>{coin.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-gap" />

      {/* 지금 잘나가는 테마 2x2 grid */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">지금 잘나가는 테마</div>
          <div className="theme-grid">
            {themeGrid.map((t, i) => (
              <div key={i} className="theme-grid-card">
                <div className="theme-grid-emoji">{t.emoji}</div>
                <div className="theme-grid-title">{t.title}</div>
                <div className="theme-grid-sub">{t.sub}</div>
                <div className="theme-grid-change">{t.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* 거래 Tab                                                      */
/* ══════════════════════════════════════════════════════════════ */

function TradeTab({ tradeCoin, setTradeCoin }) {
  const exchanges = exchangePrices[tradeCoin] || exchangePrices.BTC;
  const cheapest = cheapestExchange[tradeCoin];
  const savings = savingsAmount[tradeCoin];

  return (
    <div className="tab-content">
      <div style={{ padding: '8px 20px 4px' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>
          거래소 가격 비교
        </div>
        <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>실시간 거래소별 가격을 비교해요</div>
      </div>

      {/* Coin filter chips */}
      <div className="trade-filter-chips">
        {tradeCoins.map((coin) => (
          <button
            key={coin}
            className={`trade-chip ${tradeCoin === coin ? 'active' : ''}`}
            onClick={() => setTradeCoin(coin)}
          >
            {coin}
          </button>
        ))}
      </div>

      {/* Exchange list */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">{tradeCoin} 거래소별 가격</span>
            <span className="date-badge-teal">실시간</span>
          </div>
          {exchanges.map((ex, i) => (
            <div key={i} className={`exchange-row ${ex.cheapest ? 'cheapest' : ''}`}>
              <div className="exchange-logo" style={{ background: ex.logoBg }}>{ex.logo}</div>
              <div className="exchange-info">
                <div className="exchange-name">{ex.name}</div>
                <div className="exchange-price">{ex.price}</div>
              </div>
              {ex.cheapest ? (
                <span className="exchange-diff cheapest-badge">최저가</span>
              ) : (
                <span className="exchange-diff more-expensive">{ex.diff}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Savings highlight */}
      <div className="fint-card">
        <div className="card-inner" style={{ padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>{cheapest}에서 구매하면</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0D9488', letterSpacing: '-0.3px' }}>{savings} 더 저렴</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>다른 거래소 대비 가장 낮은 가격이에요</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px' }}>
        <button className="cta-btn">{cheapest}에서 바로 구매하기</button>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* 더보기 Tab                                                    */
/* ══════════════════════════════════════════════════════════════ */

function MoreTab() {
  return (
    <div className="tab-content">
      {/* Profile */}
      <div className="profile-card">
        <div className="profile-avatar">종</div>
        <div className="profile-info">
          <div className="profile-name">종인님</div>
          <div className="profile-tier">일반 투자자</div>
        </div>
      </div>

      {/* 3-col stats */}
      <div className="profile-stats">
        <div className="profile-stat-item">
          <div className="profile-stat-label">총 투자</div>
          <div className="profile-stat-value">3,955,500원</div>
        </div>
        <div className="profile-stat-item">
          <div className="profile-stat-label">누적 이자</div>
          <div className="profile-stat-value green">+116,500원</div>
        </div>
        <div className="profile-stat-item">
          <div className="profile-stat-label">보유 코인</div>
          <div className="profile-stat-value">3종</div>
        </div>
      </div>

      <div className="section-gap" />

      {/* Settings list */}
      <div className="settings-list">
        {settingsItems.map((item, i) => (
          <div key={i} className="settings-item">
            <span className="settings-item-label">{item.label}</span>
            <div className="settings-item-right">
              {item.value && <span className="settings-item-value">{item.value}</span>}
              <span className="settings-chevron">›</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
