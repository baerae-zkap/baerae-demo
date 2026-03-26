'use client';

import { useState, useEffect } from 'react';

const TABS = ['차트', '정보', '내 보유'];

const TIME_RANGES = ['1시간', '1일', '1주', '1달', '3달', '1년'];

const APY = 0.052;

const CALC_AMOUNTS = [
  { label: '10만원', value: 100000 },
  { label: '100만원', value: 1000000 },
  { label: '500만원', value: 5000000 },
  { label: '1,000만원', value: 10000000 },
];

const EXCHANGES_COMPARE = [
  { name: '코인원', abbr: 'C1', price: 5180000, diff: 0, cheapest: true },
  { name: '빗썸', abbr: '빗', price: 5210000, diff: 30000, cheapest: false },
  { name: '업비트', abbr: 'UP', price: 5230000, diff: 50000, cheapest: false },
];

const QNA_DATA = [
  {
    label: '한줄 요약',
    a: <>비트코인이 <strong>디지털 금</strong>이라면, 이더리움은 <strong>디지털 세계의 컴퓨터</strong>예요. 전 세계 개발자들이 이더리움 위에서 다양한 앱을 만들고 있어요.</>,
  },
  {
    label: '왜 중요해?',
    a: <>디파이, NFT, 스테이블코인 등 <strong>블록체인 혁신의 대부분이 이더리움에서 시작</strong>됐어요. 비트코인 다음으로 큰 코인이에요.</>,
  },
  {
    label: '비슷한 코인은?',
    a: <>솔라나, 아발란체 등이 비슷한 역할을 하지만, 이더리움이 <strong>원조이자 가장 큰 생태계</strong>를 갖고 있어요.</>,
  },
];

const RANKING_DATA = [
  { rank: 1, age: '30대', months: 14, pct: '+892%', profitAmt: '+12,980,000원', amount: '14,571,271원', emoji: '\u{1F947}' },
  { rank: 2, age: '50대', months: 11, pct: '+541%', profitAmt: '+7,560,000원', amount: '8,960,318원', emoji: '\u{1F948}' },
  { rank: 3, age: '40대', months: 8, pct: '+423%', profitAmt: '+5,520,000원', amount: '6,823,400원', emoji: '\u{1F949}' },
  { rank: 4, age: '30대', months: 6, pct: '+287%', profitAmt: '+3,210,000원', amount: '4,320,000원', emoji: '\u{1F60E}' },
  { rank: 5, age: '20대', months: 5, pct: '+198%', profitAmt: '+1,430,000원', amount: '2,150,800원', emoji: '\u{1F604}' },
];

const CO_HELD = [
  { icon: '\u{20BF}', name: '비트코인', pct: '82%가 같이 보유' },
  { icon: '\u{25CE}', name: '솔라나', pct: '45%가 같이 보유' },
  { icon: '\u{20AE}', name: '테더', pct: '38%가 같이 보유' },
  { icon: '\u{25C6}', name: '폴리곤', pct: '21%가 같이 보유' },
];

const AGE_DATA = [
  { label: '20대', pct: 41 },
  { label: '30대', pct: 32 },
  { label: '40대', pct: 18 },
  { label: '50대+', pct: 9 },
];

const HOLDINGS_EXCHANGES = [
  { name: '업비트', abbr: 'UP', eth: '0.71691 ETH', krw: '2,500,000원', pnl: '+416,667원', pnlPct: '20%', positive: true },
  { name: '코인원', abbr: 'C1', eth: '0.43014 ETH', krw: '1,500,000원', pnl: '-78,947원', pnlPct: '5%', positive: false },
  { name: '빗썸', abbr: '빗', eth: '0.28676 ETH', krw: '1,000,000원', pnl: '+111,111원', pnlPct: '12.5%', positive: true },
];

// SVG chart path data for a realistic looking price chart
const CHART_LINE = 'M0,160 C20,155 40,140 60,130 C80,120 100,90 130,85 C160,80 180,95 200,75 C220,55 235,40 255,45 C275,50 290,65 310,55 C325,48 340,50 345,52';
const CHART_AREA = CHART_LINE + ' L345,200 L0,200 Z';

export default function CoinDetailScreen({ onBack, onBuy, activeTab, setActiveTab, scrollToId, selectedExchange, setSelectedExchange }) {
  useEffect(() => {
    if (!scrollToId) return;
    setTimeout(() => {
      const el = document.getElementById(scrollToId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }, [scrollToId]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1달');
  const [selectedCalcAmount, setSelectedCalcAmount] = useState(1000000);

  const monthlyInterest = Math.round(selectedCalcAmount * APY / 12);

  return (
    <div className="cd-wrapper">
      {/* Nav bar */}
      <div className="cd-nav">
        <button className="cd-nav-back" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#131416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="cd-nav-title">이더리움</span>
        <div style={{ width: 24 }} />
      </div>

      {/* Hero */}
      <div className="cd-hero" id="sec-hero">
        <div className="cd-hero-top">
          <div className="cd-eth-icon">
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{'\u039E'}</span>
          </div>
          <div>
            <div className="cd-hero-name-row">
              <span className="cd-hero-name">이더리움</span>
              <span className="cd-hero-symbol">ETH</span>
            </div>
            <div className="cd-hero-tags">
              <span className="cd-tag cd-tag-blue">대형 코인</span>
              <span className="cd-tag cd-tag-dark">활용처가 많은</span>
            </div>
          </div>
        </div>
        <div className="cd-hero-price">5,230,000원</div>
        <div className="cd-hero-change">
          <span className="cd-hero-change-pct">+4.2%</span>
          <span className="cd-hero-change-amt">+210,500원</span>
        </div>
        <div className="cd-hero-timestamp">3월 25일 00:12 기준</div>
        <div className="cd-hero-social-proof">1,247명이 보유 중</div>
      </div>

      {/* Tab bar */}
      <div className="cd-tab-bar" id="sec-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`cd-tab ${activeTab === tab ? 'cd-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="cd-tab-content">
        {activeTab === '차트' && (
          <ChartTab
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
          />
        )}
        {activeTab === '정보' && (
          <InfoTab
            selectedCalcAmount={selectedCalcAmount}
            setSelectedCalcAmount={setSelectedCalcAmount}
            monthlyInterest={monthlyInterest}
          />
        )}
        {activeTab === '내 보유' && <HoldingsTab selectedExchange={selectedExchange} setSelectedExchange={setSelectedExchange} />}
      </div>

      {/* Disclaimer */}
      <div className="cd-disclaimer">
        ※ 모든 투자 정보는 참고용이며, 투자 권유가 아닙니다. 과거 수익률이 미래 수익을 보장하지 않습니다.
      </div>
    </div>
  );
}

/* ============ Chart Tab ============ */
function ChartTab({ selectedTimeRange, setSelectedTimeRange }) {
  return (
    <div className="cd-section" id="sec-chart">
      {/* Chart */}
      <div className="cd-chart-container">
        <svg viewBox="0 0 345 200" preserveAspectRatio="none" className="cd-chart-svg">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C8BE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00C8BE" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <line x1="0" y1="50" x2="345" y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="100" x2="345" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" strokeDasharray="4" />
          <line x1="0" y1="150" x2="345" y2="150" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" strokeDasharray="4" />
          {/* Area fill */}
          <path d={CHART_AREA} fill="url(#chartGrad)" />
          {/* Line */}
          <path d={CHART_LINE} fill="none" stroke="#00C8BE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Current dot */}
          <circle cx="345" cy="52" r="5" fill="#00C8BE" stroke="#ffffff" strokeWidth="2.5" />
          {/* Price labels */}
          <text x="4" y="46" fontSize="10" fill="#a9acb5" fontFamily="inherit">최고 6,800,000</text>
          <text x="4" y="196" fontSize="10" fill="#a9acb5" fontFamily="inherit">최저 3,100,000</text>
        </svg>
      </div>

      {/* Time range toggles */}
      <div className="cd-time-toggles">
        {TIME_RANGES.map((r) => (
          <button
            key={r}
            className={`cd-time-btn ${selectedTimeRange === r ? 'cd-time-btn-active' : ''}`}
            onClick={() => setSelectedTimeRange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Return simulation banner */}
      <div className="cd-return-sim">
        <div className="cd-return-sim-label">참고: 1개월 전 대비</div>
        <div className="cd-return-sim-value"><strong>+18.3%</strong> 변동</div>
        <div className="cd-return-sim-sub">과거 수익률이 미래 수익을 보장하지 않습니다</div>
      </div>

      {/* Exchange comparison */}
      <div className="cd-compare-section">
        <h3 className="cd-section-title">어디서 사는 게 제일 쌀까?</h3>

        {/* Hero card */}
        <div className="cd-compare-hero-card">
          <div className="cd-compare-hero-label">지금 가장 저렴한 곳</div>
          <div className="cd-compare-hero-exchange">코인원</div>
          <div className="cd-compare-hero-price">5,180,000원</div>
          <div className="cd-compare-hero-pill">업비트보다 50,000원 저렴</div>
        </div>

        {/* Exchange list */}
        <div className="cd-exchange-list">
          {EXCHANGES_COMPARE.map((ex) => (
            <div key={ex.name} className={`cd-exchange-item ${ex.cheapest ? 'cd-exchange-cheapest' : ''}`}>
              <div className="cd-exchange-left">
                <div className={`cd-exchange-icon ${ex.cheapest ? 'cd-exicon-green' : 'cd-exicon-gray'}`}>
                  {ex.abbr}
                </div>
                <div className="cd-exchange-info">
                  <span className="cd-exchange-name">{ex.name}</span>
                  {ex.cheapest && <span className="cd-cheapest-badge">최저가</span>}
                </div>
              </div>
              <div className="cd-exchange-right">
                <div className="cd-exchange-price-main">{ex.price.toLocaleString()}원</div>
                <div className={`cd-exchange-diff ${ex.cheapest ? 'cd-diff-green' : ''}`}>
                  {ex.cheapest ? '가장 저렴해요' : `+${ex.diff.toLocaleString()}원`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZKAP vs 일반 거래 comparison */}
      <div className="cd-zkap-compare">
        <h3 className="cd-section-title">ZKAP으로 사면 뭐가 다를까?</h3>

        <div className="cd-zkap-compare-grid">
          {/* Trading cost comparison */}
          <div className="cd-zkap-compare-card">
            <div className="cd-zkap-compare-card-title">거래 비용</div>
            <div className="cd-zkap-bar-group">
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label">일반</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-normal" style={{ width: '100%' }} />
                </div>
                <span className="cd-zkap-bar-value">2.3%</span>
              </div>
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label cd-zkap-bar-label-accent">ZKAP</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-accent" style={{ width: '35%' }} />
                </div>
                <span className="cd-zkap-bar-value cd-zkap-bar-value-accent">0.8%</span>
              </div>
            </div>
            <div className="cd-zkap-bar-result">ZKAP이 <strong>1.5%</strong> 저렴</div>
          </div>

          {/* 1-year return comparison */}
          <div className="cd-zkap-compare-card">
            <div className="cd-zkap-compare-card-title">1년 수익 비교</div>
            <div className="cd-zkap-bar-group">
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label">일반</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-normal" style={{ width: '82%' }} />
                </div>
                <span className="cd-zkap-bar-value">+15.2%</span>
              </div>
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label cd-zkap-bar-label-accent">ZKAP</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-accent" style={{ width: '100%' }} />
                </div>
                <span className="cd-zkap-bar-value cd-zkap-bar-value-accent">+18.3%</span>
              </div>
            </div>
            <div className="cd-zkap-bar-result">ZKAP이 <strong>3.1%</strong> 더 높아요</div>
          </div>

          {/* Price stability comparison */}
          <div className="cd-zkap-compare-card">
            <div className="cd-zkap-compare-card-title">가격 안정성</div>
            <div className="cd-zkap-bar-group">
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label">일반</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-normal" style={{ width: '100%' }} />
                </div>
                <span className="cd-zkap-bar-value">{'\u00B1'}8.2%</span>
              </div>
              <div className="cd-zkap-bar-row">
                <span className="cd-zkap-bar-label cd-zkap-bar-label-accent">ZKAP</span>
                <div className="cd-zkap-bar-track">
                  <div className="cd-zkap-bar-fill cd-zkap-bar-accent" style={{ width: '62%' }} />
                </div>
                <span className="cd-zkap-bar-value cd-zkap-bar-value-accent">{'\u00B1'}5.1%</span>
              </div>
            </div>
            <div className="cd-zkap-bar-result">ZKAP이 <strong>3.1%</strong> 더 안정적</div>
            <div className="cd-zkap-bar-sub">분산 매수 효과</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Info Tab ============ */
function InfoTab({ selectedCalcAmount, setSelectedCalcAmount, monthlyInterest }) {
  return (
    <div className="cd-section" id="sec-info">
      <div className="section-divider" />
      {/* Market overview — daily freshness */}
      <div className="cd-info-block" id="sec-market">
        <h3 className="cd-section-title">3월 25일 오늘의 이더리움</h3>
        <div className="cd-today-card">
          <div className="cd-today-subtitle">오늘 달라진 점</div>
          <div className="cd-today-items">
            <div className="cd-today-item">
              <span className="cd-today-icon">{'\u{1F4C8}'}</span>
              <span className="cd-today-text">어제보다 <strong>4.2%</strong> 올랐어요</span>
            </div>
            <div className="cd-today-item">
              <span className="cd-today-icon">{'\u{1F465}'}</span>
              <span className="cd-today-text">오늘 새로 <strong>47명</strong>이 매수했어요</span>
            </div>
            <div className="cd-today-item">
              <span className="cd-today-icon">{'\u{1F525}'}</span>
              <span className="cd-today-text">거래량이 평소보다 <strong>23%</strong> 많아요</span>
            </div>
          </div>
        </div>
        <div className="cd-key-metrics" style={{ marginTop: 12 }}>
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">시가총액</div>
            <div className="cd-key-metric-value">630조원</div>
          </div>
          <div className="cd-key-metric-divider" />
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">24시간 거래량</div>
            <div className="cd-key-metric-value">12.4조원</div>
          </div>
          <div className="cd-key-metric-divider" />
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">30일 수익률</div>
            <div className="cd-key-metric-value cd-text-red">+18.3%</div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* 52 week range */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-52week">지금 비싼 거야, 싼 거야?</h3>
        <div className="cd-52week-card">
          <div className="cd-52week-labels">
            <div className="cd-52week-end">
              <div className="cd-52week-end-label">52주 최저</div>
              <div className="cd-52week-end-value">3,100,000원</div>
            </div>
            <div className="cd-52week-end" style={{ textAlign: 'right' }}>
              <div className="cd-52week-end-label">52주 최고</div>
              <div className="cd-52week-end-value">6,800,000원</div>
            </div>
          </div>
          <div className="cd-52week-bar">
            <div className="cd-52week-fill" style={{ width: '75%' }} />
            <div className="cd-52week-marker" style={{ left: '75%' }}>
              <div className="cd-52week-marker-dot" />
            </div>
          </div>
          <div className="cd-52week-result">
            최고가 대비 <strong>75%</strong> 수준이에요
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Visual insight card */}
      <div className="cd-info-block">
        <div className="cd-visual-insight">
          <div className="cd-visual-insight-title">시세 데이터로 본 이더리움</div>
          <div className="cd-visual-insight-body">
            대형 투자사들의 자금이 꾸준히 유입되고 있어요.
            지난 1년간 변동성이 줄어들면서 안정적인 성장세를 보이고 있습니다.
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Past performance */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-timing">이때 샀으면 지금은...</h3>
        <div className="cd-perf-cards">
          <div className="cd-perf-card cd-perf-positive">
            <div className="cd-perf-period">1개월 전</div>
            <div className="cd-perf-value cd-text-red">+18.3%</div>
            <div className="cd-perf-emoji">{'\u{1F60A}'}</div>
          </div>
          <div className="cd-perf-card cd-perf-negative">
            <div className="cd-perf-period">3개월 전</div>
            <div className="cd-perf-value cd-text-blue">-5.2%</div>
            <div className="cd-perf-emoji">{'\u{1F622}'}</div>
          </div>
          <div className="cd-perf-card cd-perf-best">
            <div className="cd-perf-period">1년 전</div>
            <div className="cd-perf-value cd-text-red">+142%</div>
            <div className="cd-perf-emoji">{'\u{1F389}'}</div>
          </div>
        </div>
        <div className="cd-insight-card" style={{ marginTop: 16 }}>
          <div className="cd-insight-icon">{'\u{1F4A1}'}</div>
          <div className="cd-insight-text">
            1년 이상 보유자의 평균 수익률은 <strong>+142%</strong>예요 (과거 데이터 기준)
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Interest calculator */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-calc">이더리움(으)로 이자 받기</h3>
        <div className="cd-calc-wrap">
          <div className="cd-calc-label">얼마나 넣어볼까요?</div>
          <div className="cd-calc-chips">
            {CALC_AMOUNTS.map((a) => (
              <button
                key={a.value}
                className={`cd-calc-chip ${selectedCalcAmount === a.value ? 'cd-calc-chip-active' : ''}`}
                onClick={() => setSelectedCalcAmount(a.value)}
              >
                {a.label}
              </button>
            ))}
          </div>
          <div className="cd-calc-output">
            <div className="cd-calc-output-label">
              {(selectedCalcAmount / 10000).toLocaleString()}만원을 맡기면 매달
            </div>
            <div className="cd-calc-output-value">
              약 {monthlyInterest.toLocaleString()}원
            </div>
            <div className="cd-calc-output-sub">연 5.2% 이율 기준</div>
            <div className="cd-calc-output-compare">
              은행 예금 3.5%보다 높아요
            </div>
          </div>
          <div className="cd-calc-note">* 이율은 네트워크 상황에 따라 변동될 수 있어요</div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Q&A */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-qna">이더리움이 뭐야?</h3>
        <div className="cd-qna-list">
          {QNA_DATA.map((item, i) => (
            <div key={i} className="cd-qna-card">
              <div className="cd-qna-label">{item.label}</div>
              <div className="cd-qna-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* People section: stats */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-people">어떤 사람들이 갖고 있을까?</h3>
        <div className="cd-people-stats">
          <div className="cd-people-stat-card">
            <div className="cd-people-stat-value">34%</div>
            <div className="cd-people-stat-label">ZKAP 사용자 중 보유</div>
          </div>
          <div className="cd-people-stat-card">
            <div className="cd-people-stat-value">3위</div>
            <div className="cd-people-stat-label">인기 코인 순위</div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Age distribution */}
      <div className="cd-info-block">
        <h3 className="cd-section-subtitle">연령대별 보유 비율</h3>
        <div className="cd-age-bars">
          {AGE_DATA.map((age) => (
            <div key={age.label} className="cd-age-row">
              <span className="cd-age-label">{age.label}</span>
              <div className="cd-age-bar-track">
                <div className="cd-age-bar-fill" style={{ width: `${age.pct}%` }}>
                  {age.pct >= 25 && <span className="cd-age-fill-text">{age.pct}%</span>}
                </div>
              </div>
              <span className="cd-age-pct">{age.pct}%</span>
            </div>
          ))}
        </div>
        <div className="cd-insight-card" style={{ marginTop: 16 }}>
          <div className="cd-insight-icon">{'\u{1F4A1}'}</div>
          <div className="cd-insight-text">
            <strong>20~30대</strong>가 가장 많이 보유한 코인이에요
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Ranking */}
      <div className="cd-info-block">
        <div className="cd-section-header-row">
          <h3 className="cd-section-title" style={{ marginBottom: 0 }}>이더리움 수익 랭킹</h3>
          <span className="cd-section-subtitle-right">ZKAP 사용자 기준</span>
        </div>
        <div className="cd-ranking-list">
          {RANKING_DATA.map((item) => (
            <div key={item.rank} className={`cd-ranking-item ${item.rank === 1 ? 'cd-ranking-gold' : ''}`}>
              <div className="cd-ranking-num">{item.rank}</div>
              <div className="cd-ranking-avatar">{item.emoji}</div>
              <div className="cd-ranking-info">
                <div className="cd-ranking-name">익명 ({item.age})</div>
                <div className="cd-ranking-sub">보유 {item.months}개월</div>
              </div>
              <div className="cd-ranking-right">
                <div className="cd-ranking-profit">{item.profitAmt}</div>
                <div className="cd-ranking-pct-sub">{item.pct}</div>
                <div className="cd-ranking-amount">{item.amount}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cd-ranking-more">
          전체 랭킹 보기 {'\u{2192}'}
        </div>
      </div>

      <div className="section-divider" />
      {/* 했제와 그랬제 */}
      <div className="cd-info-block">
        <h3 className="cd-section-title">했제와 그랬제</h3>
        <div className="cd-pred-scroll">
          <div className="cd-pred-card cd-pred-hit">
            <div className="cd-pred-profile">
              <img className="cd-pred-photo" src="https://i.pravatar.cc/80?img=11" alt="" />
              <div className="cd-pred-badge-wrap cd-pred-badge-hit">적중</div>
            </div>
            <div className="cd-pred-name">크립토 김대리</div>
            <div className="cd-pred-quote">"500만원 돌파한다"</div>
            <div className="cd-pred-meta">
              <span className="cd-pred-rate-label">적중률</span>
              <span className="cd-pred-rate-value">78%</span>
            </div>
            <div className="cd-pred-bar-track"><div className="cd-pred-bar-fill cd-pred-bar-hit" style={{ width: '78%' }} /></div>
          </div>
          <div className="cd-pred-card cd-pred-miss">
            <div className="cd-pred-profile">
              <img className="cd-pred-photo" src="https://i.pravatar.cc/80?img=33" alt="" />
              <div className="cd-pred-badge-wrap cd-pred-badge-miss">빗나감</div>
            </div>
            <div className="cd-pred-name">머니토크 박실장</div>
            <div className="cd-pred-quote">"700만원 간다"</div>
            <div className="cd-pred-meta">
              <span className="cd-pred-rate-label">적중률</span>
              <span className="cd-pred-rate-value">45%</span>
            </div>
            <div className="cd-pred-bar-track"><div className="cd-pred-bar-fill cd-pred-bar-miss" style={{ width: '45%' }} /></div>
          </div>
          <div className="cd-pred-card cd-pred-hit">
            <div className="cd-pred-profile">
              <img className="cd-pred-photo" src="https://i.pravatar.cc/80?img=52" alt="" />
              <div className="cd-pred-badge-wrap cd-pred-badge-hit">적중</div>
            </div>
            <div className="cd-pred-name">코인 정프로</div>
            <div className="cd-pred-quote">"500만원대 안착"</div>
            <div className="cd-pred-meta">
              <span className="cd-pred-rate-label">적중률</span>
              <span className="cd-pred-rate-value">82%</span>
            </div>
            <div className="cd-pred-bar-track"><div className="cd-pred-bar-fill cd-pred-bar-hit" style={{ width: '82%' }} /></div>
          </div>
          <div className="cd-pred-card cd-pred-hit">
            <div className="cd-pred-profile">
              <img className="cd-pred-photo" src="https://i.pravatar.cc/80?img=15" alt="" />
              <div className="cd-pred-badge-wrap cd-pred-badge-hit">적중</div>
            </div>
            <div className="cd-pred-name">온체인 이박사</div>
            <div className="cd-pred-quote">"연말 600만원"</div>
            <div className="cd-pred-meta">
              <span className="cd-pred-rate-label">적중률</span>
              <span className="cd-pred-rate-value">71%</span>
            </div>
            <div className="cd-pred-bar-track"><div className="cd-pred-bar-fill cd-pred-bar-hit" style={{ width: '71%' }} /></div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Co-held coins */}
      <div className="cd-info-block">
        <h3 className="cd-section-title">이 코인 보유자가 같이 산 코인</h3>
        <div className="cd-coheld-scroll">
          {CO_HELD.map((coin) => (
            <div key={coin.name} className="cd-coheld-card">
              <div className="cd-coheld-icon">{coin.icon}</div>
              <div className="cd-coheld-name">{coin.name}</div>
              <div className="cd-coheld-pct">{coin.pct}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* 상품 정보 */}
      <div className="cd-info-block">
        <h3 className="cd-section-title">상품 정보</h3>
        <div className="cd-product-info">
          <div className="cd-product-row">
            <span className="cd-product-label">발행일</span>
            <span className="cd-product-value">2015년 7월 30일</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">현재 유통량</span>
            <span className="cd-product-value">1억 2,040만 개</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">최대 발행량</span>
            <span className="cd-product-value">제한 없음</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">시가총액 순위</span>
            <span className="cd-product-value">2위</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">합의 방식</span>
            <span className="cd-product-value">지분 증명 (PoS)</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">거래 가능 거래소</span>
            <span className="cd-product-value">업비트, 빗썸, 코인원</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">공식 사이트</span>
            <span className="cd-product-value">ethereum.org</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Holdings Tab ============ */
export { HOLDINGS_EXCHANGES };

function HoldingsTab({ selectedExchange, setSelectedExchange }) {

  return (
    <div className="cd-section" id="sec-holdings">
      <div className="cd-bal-list">
        {HOLDINGS_EXCHANGES.map((ex) => (
          <div
            key={ex.name}
            className={`cd-bal-row cd-bal-tappable ${selectedExchange === ex.name ? 'cd-bal-selected' : ''}`}
            onClick={() => setSelectedExchange(selectedExchange === ex.name ? null : ex.name)}
          >
            <div className="cd-bal-left">
              <div className={`cd-bal-logo ${ex.abbr === 'UP' ? 'cd-bal-upbit' : ex.abbr === 'C1' ? 'cd-bal-coinone' : 'cd-bal-bithumb'}`}>
                {ex.abbr}
              </div>
              <div className="cd-bal-info">
                <div className="cd-bal-exchange">{ex.name}</div>
                <div className="cd-bal-krw">{ex.krw}</div>
                <div className={`cd-bal-pnl ${ex.positive ? 'cd-text-red' : 'cd-text-blue'}`}>
                  {ex.pnl} ({ex.pnlPct})
                </div>
              </div>
            </div>
            <div className="cd-bal-qty">{ex.eth}</div>
          </div>
        ))}
      </div>

      {/* Bottom sheet rendered via onSheet callback */}

      {/* Staking nudge */}
      <div className="cd-staking-nudge">
        <div className="cd-staking-nudge-left">
          <div className="cd-staking-nudge-text">
            맡겨두면 매달 <strong className="cd-text-green">약 21,667원</strong> 이자
          </div>
          <div className="cd-staking-nudge-sub">연 5.2% · 보유만 해도 이자가 쌓여요</div>
        </div>
        <button className="cd-staking-nudge-btn">이자 받기</button>
      </div>
    </div>
  );
}
