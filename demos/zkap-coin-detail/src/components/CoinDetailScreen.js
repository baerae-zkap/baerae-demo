'use client';

import { useState, useEffect } from 'react';

const TABS = ['소개', '현황', '차트', '내 보유'];

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

const RECENT_NEWS = [
  {
    date: '3월 24일',
    icon: '\u{1F680}',
    title: 'Dencun 업그레이드 완료',
    desc: '이더리움 네트워크 수수료가 크게 낮아졌어요. 레이어2 거래가 더 빨라지고 저렴해졌습니다.',
  },
  {
    date: '3월 20일',
    icon: '\u{1F3E6}',
    title: '미국 ETH 현물 ETF 순유입 지속',
    desc: '기관 투자자들의 자금이 3주 연속 유입되고 있어요.',
  },
  {
    date: '3월 18일',
    icon: '\u{1F4C8}',
    title: '디파이 예치금(TVL) 증가세',
    desc: '이더리움 기반 디파이 프로토콜에 묶인 자금이 최근 한 달간 15% 늘었어요.',
  },
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
        {activeTab === '소개' && (
          <IntroTab />
        )}
        {activeTab === '현황' && (
          <StatusTab />
        )}
        {activeTab === '차트' && (
          <ChartTab
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
            selectedCalcAmount={selectedCalcAmount}
            setSelectedCalcAmount={setSelectedCalcAmount}
            monthlyInterest={monthlyInterest}
          />
        )}
        {activeTab === '내 보유' && <HoldingsTab selectedExchange={selectedExchange} setSelectedExchange={setSelectedExchange} />}
      </div>

      {/* Disclaimer */}
      <div className="cd-disclaimer">
        {'\u203B'} 모든 정보는 참고용이며, 투자 판단은 본인의 책임입니다.
      </div>
    </div>
  );
}

/* ============ Intro Tab — "이 코인이 어떤 애인지" ============ */
function IntroTab() {
  return (
    <div className="cd-section" id="sec-intro">
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
      {/* Value source — where does the value come from */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-value">가치는 어디서 올까?</h3>
        <div className="cd-value-cards">
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F3D7}'}</div>
            <div className="cd-value-title">개발자 생태계</div>
            <div className="cd-value-desc">전 세계에서 가장 많은 개발자가 이더리움 위에서 앱을 만들고 있어요</div>
          </div>
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F4B0}'}</div>
            <div className="cd-value-title">디파이(금융 서비스)</div>
            <div className="cd-value-desc">은행 없이 빌려주고, 빌리고, 이자를 받는 서비스가 이더리움 위에서 돌아가요</div>
          </div>
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F525}'}</div>
            <div className="cd-value-title">수수료 소각</div>
            <div className="cd-value-desc">이더리움을 쓸 때마다 일부가 사라져요. 사용이 늘면 총량이 줄어드는 구조예요</div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Product info */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-product">기본 정보</h3>
        <div className="cd-product-info">
          <div className="cd-product-row">
            <span className="cd-product-label">발행일</span>
            <span className="cd-product-value">2015년 7월 30일</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">시가총액 순위</span>
            <span className="cd-product-value">2위</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">현재 유통량</span>
            <span className="cd-product-value">1억 2,040만 개</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">최대 발행량</span>
            <span className="cd-product-value">제한 없음</span>
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

      <div className="section-divider" />
      {/* People section */}
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
      {/* Co-held coins */}
      <div className="cd-info-block">
        <h3 className="cd-section-title">같이 보유한 코인</h3>
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
    </div>
  );
}

/* ============ Status Tab — "지금 어떤 상태인지" ============ */
function StatusTab() {
  return (
    <div className="cd-section" id="sec-status">
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
            <div className="cd-key-metric-label">30일 변동</div>
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
      {/* Recent news — replacing 했제와 그랬제 */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-news">최근 주요 소식</h3>
        <div className="cd-news-list">
          {RECENT_NEWS.map((news, i) => (
            <div key={i} className="cd-news-card">
              <div className="cd-news-icon">{news.icon}</div>
              <div className="cd-news-body">
                <div className="cd-news-header">
                  <span className="cd-news-title">{news.title}</span>
                  <span className="cd-news-date">{news.date}</span>
                </div>
                <div className="cd-news-desc">{news.desc}</div>
              </div>
            </div>
          ))}
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
            과거 데이터 기준이며, 미래 수익을 보장하지 않아요
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Institutional context */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-context">기관·생태계 동향</h3>
        <div className="cd-context-cards">
          <div className="cd-context-card">
            <div className="cd-context-badge">기관</div>
            <div className="cd-context-text">미국 ETH 현물 ETF 출시 이후 기관 자금 유입 중</div>
          </div>
          <div className="cd-context-card">
            <div className="cd-context-badge">네트워크</div>
            <div className="cd-context-text">일 평균 활성 주소 약 50만 개, 꾸준한 사용량 유지</div>
          </div>
          <div className="cd-context-card">
            <div className="cd-context-badge">공급</div>
            <div className="cd-context-text">PoS 전환 후 순발행량 감소 추세 (수수료 소각 효과)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Chart Tab — decision aid ============ */
function ChartTab({ selectedTimeRange, setSelectedTimeRange, selectedCalcAmount, setSelectedCalcAmount, monthlyInterest }) {
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

      <div className="section-divider" />
      {/* Interest calculator */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-calc">이더리움으로 이자 받기</h3>
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
