'use client';

import { useState, useRef } from 'react';
import StatusBar from '@/components/StatusBar';

/* ── News Cards Data ── */
const newsCards = [
  {
    bg: '#EFF6FF',
    chipBg: '#DBEAFE',
    chipColor: '#2563EB',
    chip: '💸 여기서 사면 아껴요',
    title: '이더리움, 코인원이 2만 3천원 더 싸요',
    sub: '업비트 대비 기준',
    cta: '확인하기 →',
    ctaColor: '#2563EB',
  },
  {
    bg: '#F0FDF4',
    chipBg: '#DCFCE7',
    chipColor: '#16A34A',
    chip: '📈 지금 수익 중이에요',
    title: '비트코인 +12% 수익 중, 이번 달 최고예요',
    sub: '2월 24일 매수 기준',
    cta: '자세히 보기 →',
    ctaColor: '#16A34A',
  },
  {
    bg: '#FAF5FF',
    chipBg: '#F3E8FF',
    chipColor: '#7C3AED',
    chip: '🌙 자는 동안 무슨 일이?',
    title: '밤사이 솔라나 +4.1% 올랐어요',
    sub: '자정~오전 9시 기준',
    cta: null,
    ctaColor: null,
  },
  {
    bg: '#FEFCE8',
    chipBg: '#FEF9C3',
    chipColor: '#B45309',
    chip: '💡 30초 코인 상식',
    title: '리플이 뭔지 아세요?',
    sub: '탭하면 알 수 있어요',
    cta: null,
    ctaColor: null,
  },
];

/* ── My Coins ── */
const myCoins = [
  { symbol: 'BTC', icon: '₿', name: '비트코인', value: '1,340,000원', change: '+12%', up: true },
  { symbol: 'ETH', icon: 'Ξ', name: '이더리움', value: '2,500,000원', change: '+4.2%', up: true },
  { symbol: 'SOL', icon: '◎', name: '솔라나', value: '115,000원', change: '-1.1%', up: false },
];

/* ── Theme Chips ── */
const themeChips = [
  '🇺🇸 미국이 밀어주는',
  '🤖 AI 코인',
  '💳 결제의 미래',
  '🪙 디지털 금',
  '📈 꾸준히 오르는',
];

/* ── Category Cards ── */
const categoryCards = [
  {
    accent: '#3B82F6',
    chip: '💸 여기서 사면 N만원 아껴요',
    chipBg: '#DBEAFE',
    chipColor: '#2563EB',
    badge: '조건 충족',
    title: '이더리움, 코인원이 가장 싸요',
    sub: '업비트보다 23,000원 더 저렴해요',
  },
  {
    accent: '#F97316',
    chip: '🔥 지금 난리난 코인',
    chipBg: '#FFEDD5',
    chipColor: '#C2410C',
    badge: null,
    title: '도지코인, 거래량 평소보다 340% 폭발',
    sub: '어제보다 거래량이 크게 늘었어요',
  },
  {
    accent: '#10B981',
    chip: '📈 이번 주 계속 오르는 중',
    chipBg: '#D1FAE5',
    chipColor: '#047857',
    badge: null,
    title: '비트코인, 7일 연속 상승 중이에요',
    sub: '1주일 내내 올랐어요',
  },
  {
    accent: '#64748B',
    chip: '🛡 크게 안 흔들렸어요',
    chipBg: '#E2E8F0',
    chipColor: '#475569',
    badge: null,
    title: '테더, 이번 주 변동폭이 비교적 작았어요',
    sub: '가격이 비교적 안정적인 코인이에요',
  },
  {
    accent: '#8B5CF6',
    chip: '🎯 10만원으로 시작하기',
    chipBg: '#EDE9FE',
    chipColor: '#6D28D9',
    badge: null,
    title: '소액으로 살 수 있는 검증된 코인',
    sub: '단가 10만원 이하, 시총 상위 코인들',
  },
];

/* ── Theme Cards ── */
const themeCards = [
  { emoji: '🪙', title: '디지털 금', desc: '금처럼 가치를 저장', coins: ['BTC'] },
  { emoji: '🤖', title: 'AI 시대', desc: 'AI를 움직이는 코인들', coins: ['FET', 'RNDR'] },
  { emoji: '💳', title: '결제의 미래', desc: '해외 송금, 결제에 쓰이는', coins: ['XRP', 'XLM'] },
  { emoji: '🇺🇸', title: '미국이 밀어주는', desc: '미국 ETF에 포함된 코인', coins: ['BTC', 'ETH', 'SOL'] },
];

/* ══════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChip, setActiveChip] = useState(0);
  const newsScrollRef = useRef(null);
  const coinScrollRef = useRef(null);

  return (
    <div className="demo-layout">
      {/* ── Device Frame ── */}
      <div className="device">
        <div className="device-status-bar">
          <StatusBar />
        </div>

        <div className="screen">
          {activeTab === 'home' ? <HomeTab /> : <ExploreTab activeChip={activeChip} setActiveChip={setActiveChip} />}
        </div>

        {/* ── Bottom Tab Bar ── */}
        <div className="tab-bar">
          <button className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <span className="tab-icon">{activeTab === 'home' ? '🏠' : '🏠'}</span>
            <span className="tab-label">홈</span>
          </button>
          <button className={`tab-item ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => setActiveTab('explore')}>
            <span className="tab-icon">🔍</span>
            <span className="tab-label">탐색</span>
          </button>
          <button className="tab-item disabled">
            <span className="tab-icon">💰</span>
            <span className="tab-label">거래</span>
          </button>
          <button className="tab-item disabled">
            <span className="tab-icon">☰</span>
            <span className="tab-label">더보기</span>
          </button>
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
          <div className="anno-label">오늘의 소식 카드</div>
          <div className="anno-text">매일 바뀌는 Tier 1/2/3 카드 시스템. 내 자산과 연결된 정보가 최우선.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">조건형 카테고리</div>
          <div className="anno-text">조건 충족 시에만 노출되는 피드. 매일 다른 카드가 뜨는 구조.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">가격차 원화 표현</div>
          <div className="anno-text">% 대신 원화 금액. "2만 3천원 아껴요"가 직관적.</div>
        </div>
        <div className="anno-section">
          <div className="anno-label">하단 탭 구조</div>
          <div className="anno-text">거래 탭 완전 분리. 홈이 정보 중심, 거래는 명시적 의도가 있을 때만.</div>
        </div>
        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">테마 묶음</div>
          <div className="anno-text">온체인 용어 없이 일상 키워드로 코인 그룹화.</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* 홈 Tab                                                        */
/* ══════════════════════════════════════════════════════════════ */

function HomeTab() {
  return (
    <div className="tab-content">
      {/* Header */}
      <div className="home-header">
        <div className="home-greeting">안녕하세요 👋</div>
        <div className="home-balance">내 자산 3,240,500원</div>
        <div className="home-change positive">+116,500원 (3.7%)</div>
        <div className="home-timestamp">3월 25일 오전 9:12 기준</div>
      </div>

      {/* 오늘의 소식 */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">오늘의 소식</span>
          <span className="date-badge">3월 25일</span>
        </div>
        <div className="news-scroll">
          {newsCards.map((card, i) => (
            <div key={i} className="news-card" style={{ background: card.bg }}>
              <div className="news-chip" style={{ background: card.chipBg, color: card.chipColor }}>
                {card.chip}
              </div>
              <div className="news-title">{card.title}</div>
              <div className="news-sub">{card.sub}</div>
              {card.cta && (
                <div className="news-cta" style={{ color: card.ctaColor }}>{card.cta}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 내 코인 */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">내 코인</span>
        </div>
        <div className="coin-scroll">
          {myCoins.map((coin, i) => (
            <div key={i} className="coin-card">
              <div className="coin-icon-wrapper">
                <span className="coin-icon-text">{coin.icon}</span>
              </div>
              <div className="coin-symbol">{coin.symbol}</div>
              <div className="coin-value">{coin.value}</div>
              <div className={`coin-change ${coin.up ? 'up' : 'down'}`}>{coin.change}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 40 }} />
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
          <span className="search-placeholder">코인 이름이나 키워드로 검색</span>
        </div>
      </div>

      {/* Theme chips */}
      <div className="theme-chips-scroll">
        {themeChips.map((chip, i) => (
          <button
            key={i}
            className={`theme-chip ${i === activeChip ? 'active' : ''}`}
            onClick={() => setActiveChip(i)}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* 오늘의 카테고리 */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">오늘의 카테고리</span>
          <span className="date-badge">3월 25일</span>
        </div>

        <div className="category-feed">
          {categoryCards.map((card, i) => (
            <div key={i} className="category-card" style={{ borderLeft: `3px solid ${card.accent}` }}>
              <div className="category-top-row">
                <div className="category-chip" style={{ background: card.chipBg, color: card.chipColor }}>
                  {card.chip}
                </div>
                {card.badge && (
                  <div className="category-badge">
                    <span className="badge-dot" />
                    {card.badge}
                  </div>
                )}
              </div>
              <div className="category-title">{card.title}</div>
              <div className="category-sub">{card.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 테마로 보기 */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">테마로 보기</span>
        </div>
        <div className="theme-grid">
          {themeCards.map((t, i) => (
            <div key={i} className="theme-card">
              <div className="theme-card-emoji">{t.emoji}</div>
              <div className="theme-card-title">{t.title}</div>
              <div className="theme-card-desc">{t.desc}</div>
              <div className="theme-card-coins">
                {t.coins.map((c, j) => (
                  <span key={j} className="theme-coin-tag">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 40 }} />
    </div>
  );
}
