'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';

/* ── Data ── */

const myCoins = [
  { icon: '₿', iconBg: '#F7931A', name: '비트코인', value: '1,340,000원', badge: '수익률 TOP', badgeBg: '#EFF6FF', badgeColor: '#2563EB' },
  { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', value: '2,500,000원', changeText: '이번 달 +12%', changeColor: '#EF4444' },
  { icon: '◎', iconBg: '#9945FF', name: '솔라나', value: '115,000원', sub: '-1.1%', subColor: '#2563EB' },
];

const themes = [
  { emoji: '🤖', title: 'AI 시대의 코인', sub: '이달 +28.4%', badge: '수익률 TOP', badgeBg: '#EFF6FF', badgeColor: '#2563EB' },
  { emoji: '💳', title: '결제의 미래', sub: '이달 +15.1%', badge: '검색 TOP', badgeBg: '#FEF9C3', badgeColor: '#B45309' },
  { emoji: '🪙', title: '디지털 금', sub: '이달 +9.2%', badge: '꾸준한 성장', badgeBg: '#F3F4F6', badgeColor: '#6B7280' },
  { emoji: '🇺🇸', title: '미국이 밀어주는', sub: '이달 +6.8%', badge: '거래량 TOP', badgeBg: '#CCFBF1', badgeColor: '#0D9488' },
];

const exploreCategories = [
  { emoji: '💸', iconBg: '#06B6D4', name: '이더리움', sub: '코인원이 업비트보다 23,000원 저렴할 때', badge: '가격 차이', badgeBg: '#CCFBF1', badgeColor: '#0D9488' },
  { emoji: '🔥', iconBg: '#F97316', name: '도지코인', sub: '거래량이 평소보다 3배 이상 늘었을 때', badge: '거래량 폭발', badgeBg: '#FFEDD5', badgeColor: '#C2410C' },
  { emoji: '📈', iconBg: '#10B981', name: '비트코인', sub: '7일 연속 오름세가 이어질 때', badge: '연속 상승', badgeBg: '#D1FAE5', badgeColor: '#047857' },
  { emoji: '🛡', iconBg: '#64748B', name: '테더', sub: '변동폭이 가장 적은 코인', badge: '안정적', badgeBg: '#F3F4F6', badgeColor: '#6B7280' },
  { emoji: '🎯', iconBg: '#8B5CF6', name: '리플', sub: '10만원 이하, 시총 상위 50개 중', badge: '소액 추천', badgeBg: '#F3E8FF', badgeColor: '#7C3AED' },
];

const exploreChips = [
  { label: '전체' },
  { label: '💸 가격 차이' },
  { label: '🔥 화제' },
  { label: '📈 오르는 중' },
  { label: '🛡 안정' },
  { label: '🎯 소액' },
];

const themeFilterChips = ['수익률 TOP', '검색 TOP', '거래량 TOP'];

const themeGrid = [
  { emoji: '🤖', title: 'AI 시대', sub: 'AI 관련 코인 묶음', change: '+28.4%' },
  { emoji: '💳', title: '결제의 미래', sub: '해외 송금/결제', change: '+15.1%' },
  { emoji: '🪙', title: '디지털 금', sub: 'BTC 중심 가치 저장', change: '+9.2%' },
  { emoji: '🇺🇸', title: '미국 ETF 포함', sub: '기관이 담는 코인들', change: '+6.8%' },
];

/* ══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChip, setActiveChip] = useState(0);
  const [activeThemeFilter, setActiveThemeFilter] = useState(0);
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [simChip, setSimChip] = useState(1);

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
              3월 25일 소식
              <span className="notif-badge">9</span>
            </div>
          </div>
          <div className="header-right">
            <button className="benefit-btn">혜택 구경하기 ×</button>
            <span className="header-icon">🎁</span>
            <span className="header-icon">🔔</span>
          </div>
        </div>

        <div className="screen">
          {activeTab === 'home' ? (
            <HomeTab activeNewsTab={activeNewsTab} setActiveNewsTab={setActiveNewsTab} simChip={simChip} setSimChip={setSimChip} />
          ) : (
            <ExploreTab activeChip={activeChip} setActiveChip={setActiveChip} activeThemeFilter={activeThemeFilter} setActiveThemeFilter={setActiveThemeFilter} />
          )}
        </div>

        {/* ── Bottom Tab Bar ── */}
        <div className="tab-bar">
          {[
            { key: 'home', icon: <TabIconHome />, label: '홈' },
            { key: 'explore', icon: <TabIconExplore />, label: '탐색' },
            { key: 'trade', icon: <TabIconTrade />, label: '거래', disabled: true },
            { key: 'earn', icon: <TabIconEarn />, label: '이자받기', disabled: true },
            { key: 'more', icon: <TabIconMore />, label: '더보기', disabled: true },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
              onClick={() => !tab.disabled && setActiveTab(tab.key)}
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
          <div className="anno-title">홈 + 탐색 탭 기획안</div>
          <div className="anno-subtitle">ZKAP UX 개선 · 2026.03.25</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">핀트 스타일 헤더</div>
          <div className="anno-text">날짜 소식 pill + 알림 뱃지. 혜택 CTA 버튼으로 프로모션 진입점 제공.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">리스트 카드 UI</div>
          <div className="anno-text">원형 아이콘 + 2줄 텍스트 + 뱃지 pill. 핀트 앱의 표준 리스트 아이템 패턴.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">뱃지 시스템</div>
          <div className="anno-text">수익률 TOP, 검색 TOP, 거래량 TOP 등 상태별 컬러 코딩된 pill 뱃지.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">탐색 탭 카테고리</div>
          <div className="anno-text">조건 기반 카테고리. 가격 차이, 거래량 폭발 등 실시간 조건 충족 시 노출.</div>
        </div>
        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">테마 그리드</div>
          <div className="anno-text">2×2 카드 그리드로 테마별 수익률 한눈에 비교. 필터 칩으로 정렬 전환.</div>
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

function TabIconEarn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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

function HomeTab({ activeNewsTab, setActiveNewsTab, simChip, setSimChip }) {
  const simMap = { 0: '21,667', 1: '43,333', 2: '216,667' };
  return (
    <div className="tab-content">
      {/* Greeting + Asset */}
      <div className="home-greeting-section">
        <div className="greeting-text">종인님, 안녕하세요 👋</div>
        <div className="asset-label">내 자산</div>
        <div className="asset-amount">3,240,500원</div>
        <div className="asset-change">+116,500원 (3.7%) 오늘</div>
      </div>

      {/* 오늘의 소식 Card */}
      <div className="fint-card">
        <div className="card-inner">
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
                  <div className="list-sub">{coin.value}{coin.sub ? ` ${coin.sub}` : ''}</div>
                </div>
                <div className="list-right">
                  {coin.badge && (
                    <span className="badge-pill" style={{ background: coin.badgeBg, color: coin.badgeColor }}>{coin.badge}</span>
                  )}
                  {coin.changeText && (
                    <span className="change-text" style={{ color: coin.changeColor }}>{coin.changeText}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 비슷한 투자자 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">종인님과 비슷한 투자자들은?</div>
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-label">20대 또래{'\n'}평균 투자</div>
              <div className="stat-value cyan">516만원</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">20대 또래{'\n'}이번달 +수익</div>
              <div className="stat-value red">+82,000원</div>
            </div>
          </div>
        </div>
      </div>

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

      {/* 주목할 종목 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">ZKAP에서 요즘 주목받는 코인</span>
            <span className="date-badge-teal">3월 25일</span>
          </div>
          <div className="list-items">
            {[
              { icon: '₿', iconBg: '#F7931A', name: '비트코인', sub: '오늘 새로 1,247명이 매수했어요', badge: '오늘 인기', badgeBg: '#DBEAFE', badgeColor: '#2563EB' },
              { icon: 'Ξ', iconBg: '#627EEA', name: '이더리움', sub: '이번 주 7일 연속 상승 중', badge: '연속 상승', badgeBg: '#D1FAE5', badgeColor: '#047857' },
              { icon: '◎', iconBg: '#9945FF', name: '솔라나', sub: '거래량이 어제보다 2.3배 늘었어요', badge: '거래량 급증', badgeBg: '#FFEDD5', badgeColor: '#C2410C' },
              { icon: '◈', iconBg: '#0080FF', name: '리플', sub: '10만원으로 살 수 있는 검증된 코인', badge: '소액 추천', badgeBg: '#F3E8FF', badgeColor: '#7C3AED' },
            ].map((coin, i, arr) => (
              <div key={i} className={`list-item ${i < arr.length - 1 ? 'with-divider' : ''}`}>
                <div className="list-icon" style={{ background: coin.iconBg }}>
                  <span>{coin.icon}</span>
                </div>
                <div className="list-text">
                  <div className="list-name">{coin.name}</div>
                  <div className="list-sub">{coin.sub}</div>
                </div>
                <div className="list-right">
                  <span className="badge-pill" style={{ background: coin.badgeBg, color: coin.badgeColor }}>{coin.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이자받기 시뮬레이션 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">맡기면 이자가 쌓여요</div>
          <div style={{ padding: '0 20px 20px' }}>
            <div className="sim-label">이더리움 기준, 연 5.2% 이율</div>
            <div className="sim-chips">
              {['50만원', '100만원', '500만원'].map((label, i) => (
                <button key={i} className={`sim-chip ${simChip === i ? 'active' : ''}`} onClick={() => setSimChip(i)}>{label}</button>
              ))}
            </div>
            <div className="sim-result">
              <div className="sim-label">매달</div>
              <div className="sim-amount">{simMap[simChip]}원</div>
              <div className="sim-compare">은행 예금(3.5%)보다 높아요</div>
            </div>
            <button className="cta-btn">이자 받기 시작</button>
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

function ExploreTab({ activeChip, setActiveChip, activeThemeFilter, setActiveThemeFilter }) {
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

      {/* Segmented chips */}
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
            <span className="date-badge-teal">3월 25일</span>
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

      {/* 지금 많이 찾는 코인 */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-title-row">
            <span className="card-section-title">지금 많이 찾는 코인</span>
            <span style={{ fontSize: 12, color: '#9CA3AF', paddingTop: 8 }}>ZKAP 사용자 검색 기준</span>
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

      {/* 테마 한눈에 보기 Card */}
      <div className="fint-card">
        <div className="card-inner">
          <div className="card-section-title">지금 잘나가는 테마, 한눈에 보기</div>
          <div className="theme-filter-chips">
            {themeFilterChips.map((chip, i) => (
              <button
                key={i}
                className={`theme-filter-chip ${i === activeThemeFilter ? 'active' : ''}`}
                onClick={() => setActiveThemeFilter(i)}
              >
                {chip}
              </button>
            ))}
          </div>
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
