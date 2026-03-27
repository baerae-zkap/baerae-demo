'use client';

import { useState, useEffect } from 'react';

const TABS = ['차트', '소개', '현황', '내 보유'];

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
    label: '쉽게 말하면?',
    a: <>비트코인이 <strong>디지털 금</strong>이라면, 이더리움은 <strong>디지털 컴퓨터</strong>. 개발자들이 여기서 앱을 만들어요.</>,
  },
  {
    label: '왜 사람들이 관심 가질까?',
    a: <>은행 없이 돈 빌리기, 디지털 거래 등 <strong>새 서비스의 시작점</strong>이에요. 비트코인 다음 2위.</>,
  },
  {
    label: '비슷한 역할의 코인은?',
    a: <>솔라나, 아발란체가 비슷하지만, 이더리움이 <strong>원조이자 가장 큰 생태계</strong>.</>,
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
    title: '대규모 업그레이드 완료 (Dencun)',
    desc: '수수료가 크게 줄어 사용이 저렴해졌어요',
    why: '수수료↓ → 사용자↑ → 생태계 성장',
  },
  {
    date: '3월 20일',
    icon: '\u{1F3E6}',
    title: '큰 기관들이 계속 사들이는 중',
    desc: '미국 ETF 통해 기관 자금 3주째 유입 중',
    why: '기관 매수 → 시장 안정에 도움',
  },
  {
    date: '3월 18일',
    icon: '\u{1F4C8}',
    title: '맡겨진 자금이 늘고 있어요',
    desc: '금융 서비스 맡긴 돈 한 달간 15%↑',
    why: '자금↑ → 생태계 활성 신호',
  },
];

const MILESTONES = [
  { year: '2015', event: '세상에 처음 등장', detail: '누구나 쓸 수 있는 컴퓨터라는 꿈으로 시작' },
  { year: '2017', event: '폭발적 성장', detail: '새 코인 만들기 도구로 인기 폭발' },
  { year: '2020', event: '금융 서비스 붐', detail: '은행 없는 금융 서비스가 현실이 됨' },
  { year: '2022', event: '운영 방식 전환', detail: '전기 99% 절감, 이자 받기 가능해짐' },
  { year: '2024', event: 'ETF 승인', detail: '전통 금융이 이더리움을 공식 인정' },
];

const INTENT_VS_REALITY = [
  {
    intent: '"누구나 쓸 수 있는 컴퓨터"',
    reality: '금융 중심, 게임·소셜은 아직 초기',
    verdict: '방향은 맞지만, 아직 금융 위주',
  },
  {
    intent: '"빠르고 저렴한 거래"',
    reality: '아직 비싸지만, 보조 기술로 빠르게 보완 중',
    verdict: '문제를 알고 적극 해결 중',
  },
  {
    intent: '"공공 네트워크"',
    reality: '약 90만 명 참여, 다른 코인보다 훨씬 많음',
    verdict: '잘 지키고 있는 편',
  },
];

const WHO_USES = [
  { icon: '\u{1F468}\u200D\u{1F4BB}', label: '앱을 만드는 개발자', desc: '금융·게임·소셜 앱을 만들어요' },
  { icon: '\u{1F4B8}', label: '금융 서비스 이용자', desc: '은행 없이 돈 빌리기·이자 받기' },
  { icon: '\u{1F3E2}', label: '기관 투자자', desc: 'ETF 등으로 큰 금액 운용' },
];

const WHY_TOKEN = [
  { icon: '\u{26FD}', title: '수수료 지불', desc: '뭘 하든 ETH로 수수료를 내요. 자동차의 기름 같은 거예요.' },
  { icon: '\u{1F4B0}', title: '맡기고 이자 받기', desc: 'ETH를 맡기면 운영 참여 + 이자까지 받아요.' },
  { icon: '\u{1F3D7}', title: '앱의 기반', desc: '이더리움 위 앱들이 돌아가려면 ETH가 꼭 필요해요.' },
];

const BEHAVIOR_SIGNALS = [
  { icon: '\u{1F6D2}', label: '사는 사람 vs 파는 사람', value: '사는 쪽 62% : 파는 쪽 38%', sub: '사는 사람이 더 많아요' },
  { icon: '\u{1F464}', label: '이번 주 새로 산 사람', value: '+127명', sub: '지난주(+89명)보다 늘었어요' },
  { icon: '\u{23F3}', label: '평균 보유 기간', value: '4.2개월', sub: '오래 갖고 있는 경향' },
];

const NETWORK_HEALTH = [
  { label: '하루 거래 건수', value: '약 120만 건', status: '평소 수준', statusType: 'normal' },
  { label: '이용 수수료', value: '0.5~2달러', status: '낮은 편', statusType: 'good', helper: '보내거나 쓸 때 비용' },
  { label: '코인 맡긴 비율', value: '전체의 28%', status: '꾸준히 증가 중', statusType: 'good' },
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
      {/* Nav bar — outside scroll area so it stays fixed */}
      <div className="cd-nav">
        <button className="cd-nav-back" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#131416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="cd-nav-title">이더리움</span>
        <div style={{ width: 24 }} />
      </div>

      {/* Dedicated scroll container — sticky tab bar works reliably here */}
      <div className="cd-scroll-area">

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
        <div className="cd-hero-social-proof"><span style={{ fontSize: 15 }}>{'\u{1F465}'}</span> ZKAP에서 1,247명이 갖고 있어요</div>
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
        {'\u203B'} 여기 나오는 정보는 참고용이에요. 어떤 결정이든 직접 판단해 주세요.
      </div>

      </div>{/* end cd-scroll-area */}
    </div>
  );
}

/* ============ Intro Tab — "이 코인이 어떤 애인지" ============ */
function IntroTab() {
  return (
    <div className="cd-section" id="sec-intro">
      {/* Purpose statement — what this coin is trying to do */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-purpose">이 코인이 하려는 일</h3>
        <div className="cd-purpose-card">
          <div className="cd-purpose-main">
            이더리움은 <strong>은행이나 회사 없이도 앱이 돌아갈 수 있는 세상</strong>을 만들려고 해요.
          </div>
          <div className="cd-purpose-sub">
            돈 빌리기, 디지털 거래, 새 서비스까지 — 모두 이더리움 위에서 가능해요.
          </div>
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
      {/* Who uses & where — 누가, 어디서 쓰나? */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-who-uses">누가, 어디서 쓰고 있을까?</h3>
        <div className="cd-who-uses-list">
          {WHO_USES.map((item, i) => (
            <div key={i} className="cd-who-uses-card">
              <div className="cd-who-uses-icon">{item.icon}</div>
              <div className="cd-who-uses-body">
                <div className="cd-who-uses-label">{item.label}</div>
                <div className="cd-who-uses-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Why does the token (ETH) exist? */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-why-token">이더리움(ETH)은 왜 필요할까?</h3>
        <div className="cd-section-helper">이 네트워크가 돌아가려면 ETH가 꼭 필요해요</div>
        <div className="cd-why-token-list">
          {WHY_TOKEN.map((item, i) => (
            <div key={i} className="cd-why-token-card">
              <div className="cd-why-token-icon">{item.icon}</div>
              <div className="cd-why-token-body">
                <div className="cd-why-token-title">{item.title}</div>
                <div className="cd-why-token-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Intent vs Reality — 약속한 것 vs 실제 결과 */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-ivr">약속한 것 vs 실제로 된 것</h3>
        <div className="cd-ivr-subtitle">처음 약속과 실제 진행을 비교했어요</div>
        <div className="cd-ivr-list">
          {INTENT_VS_REALITY.map((item, i) => (
            <div key={i} className="cd-ivr-card">
              <div className="cd-ivr-row">
                <div className="cd-ivr-col">
                  <div className="cd-ivr-badge cd-ivr-badge-intent">약속</div>
                  <div className="cd-ivr-text">{item.intent}</div>
                </div>
                <div className="cd-ivr-arrow">{'\u2192'}</div>
                <div className="cd-ivr-col">
                  <div className="cd-ivr-badge cd-ivr-badge-reality">현재</div>
                  <div className="cd-ivr-text">{item.reality}</div>
                </div>
              </div>
              <div className="cd-ivr-verdict">{item.verdict}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Value source — where does the value come from */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-value">이 코인의 가치는 어디서 올까?</h3>
        <div className="cd-section-helper">숫자가 클수록 많은 사람이 쓰고 있다는 뜻</div>
        <div className="cd-value-cards">
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F468}\u200D\u{1F4BB}'}</div>
            <div className="cd-value-right">
              <div className="cd-value-title">만드는 사람들</div>
              <div className="cd-value-stat">7,000명</div>
              <div className="cd-value-desc">매달 활동하는 개발자 수. 블록체인 중 1위</div>
            </div>
          </div>
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F3E6}'}</div>
            <div className="cd-value-right">
              <div className="cd-value-title">은행 없는 금융</div>
              <div className="cd-value-stat">80조원</div>
              <div className="cd-value-desc">금융 서비스에 맡긴 돈. 전체의 60% 이상</div>
            </div>
          </div>
          <div className="cd-value-card">
            <div className="cd-value-icon">{'\u{1F525}'}</div>
            <div className="cd-value-right">
              <div className="cd-value-title">쓰면 줄어드는 구조</div>
              <div className="cd-value-stat">130만 ETH</div>
              <div className="cd-value-desc">1년간 사라진 양. 쓸수록 줄어드는 구조</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Timeline — 10-year history */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-timeline">10년간 어떻게 여기까지 왔을까?</h3>
        <div className="cd-timeline">
          {MILESTONES.map((m, i) => (
            <div key={i} className="cd-timeline-item">
              <div className="cd-timeline-left">
                <div className="cd-timeline-year">{m.year}</div>
                <div className="cd-timeline-line" />
              </div>
              <div className="cd-timeline-content">
                <div className="cd-timeline-event">{m.event}</div>
                <div className="cd-timeline-detail">{m.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Product info */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-product">기본 정보</h3>
        <div className="cd-product-info">
          <div className="cd-product-row">
            <span className="cd-product-label">처음 만들어진 날</span>
            <span className="cd-product-value">2015년 7월 30일</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">전체 코인 중 크기</span>
            <span className="cd-product-value">2위</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">지금 나와 있는 양</span>
            <span className="cd-product-value">1억 2,040만 개</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">앞으로 더 만들 수 있나?</span>
            <span className="cd-product-value">제한 없음 (단, 사용 시 소각됨)</span>
          </div>
          <div className="cd-product-row">
            <span className="cd-product-label">운영 방식</span>
            <span className="cd-product-value">코인을 맡긴 사람들이 검증</span>
          </div>
          <div className="cd-product-row cd-product-row-alt">
            <span className="cd-product-label">살 수 있는 곳</span>
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
        <h3 className="cd-section-title" id="sec-people">ZKAP에서는 얼마나 인기 있을까?</h3>
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
        <h3 className="cd-section-subtitle">어떤 연령대가 많이 갖고 있을까?</h3>
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
            <strong>20~30대</strong>가 가장 많이 갖고 있는 코인이에요
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Co-held coins */}
      <div className="cd-info-block">
        <h3 className="cd-section-title">이 코인 가진 사람들이 같이 가진 코인</h3>
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
      {/* Empty/limited info pattern — for coins with less information */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-limited-info">정보가 부족한 코인은 이렇게 보여요</h3>
        <div className="cd-empty-pattern-card">
          <div className="cd-empty-pattern-icon">{'\u{1F50D}'}</div>
          <div className="cd-empty-pattern-body">
            <div className="cd-empty-pattern-title">아직 이 코인의 정보를 모으고 있어요</div>
            <div className="cd-empty-pattern-list">
              <div className="cd-empty-pattern-item">
                <span className="cd-empty-dot cd-empty-dot-yellow" />
                <span>기본 소개만 있는 코인</span>
              </div>
              <div className="cd-empty-pattern-item">
                <span className="cd-empty-dot cd-empty-dot-gray" />
                <span>사용자 데이터가 부족한 코인</span>
              </div>
              <div className="cd-empty-pattern-item">
                <span className="cd-empty-dot cd-empty-dot-gray" />
                <span>뉴스나 동향이 아직 없는 코인</span>
              </div>
            </div>
            <div className="cd-empty-pattern-note">정보가 모이면 자동으로 채워져요</div>
          </div>
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
              <span className="cd-today-text">오늘 <strong>47명</strong>이 새로 샀어요</span>
            </div>
            <div className="cd-today-item">
              <span className="cd-today-icon">{'\u{1F525}'}</span>
              <span className="cd-today-text">거래량 평소보다 <strong>23%</strong> 많아요</span>
            </div>
          </div>
        </div>
        <div className="cd-key-metrics" style={{ marginTop: 12 }}>
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">전체 가치</div>
            <div className="cd-key-metric-value">630조원</div>
          </div>
          <div className="cd-key-metric-divider" />
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">하루 거래량</div>
            <div className="cd-key-metric-value">12.4조원</div>
          </div>
          <div className="cd-key-metric-divider" />
          <div className="cd-key-metric">
            <div className="cd-key-metric-label">한 달 변화</div>
            <div className="cd-key-metric-value cd-text-red">+18.3%</div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* 52 week range */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-52week">지금 비싼 거야, 싼 거야?</h3>
        <div className="cd-section-helper">1년간 최저~최고 가격 범위에서 비교</div>
        <div className="cd-52week-card">
          <div className="cd-52week-labels">
            <div className="cd-52week-end">
              <div className="cd-52week-end-label">1년 중 최저</div>
              <div className="cd-52week-end-value">3,100,000원</div>
            </div>
            <div className="cd-52week-end" style={{ textAlign: 'right' }}>
              <div className="cd-52week-end-label">1년 중 최고</div>
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
            1년 중 가장 비쌌을 때의 <strong>75%</strong> 수준이에요
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Recent news */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-news">최근에 무슨 일이 있었을까?</h3>
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
                <div className="cd-news-why">{'\u{1F4A1}'} {news.why}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Past performance */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-timing">그때 샀으면 지금 얼마가 됐을까?</h3>
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
            과거 기록이에요. 앞으로를 보장하지 않아요.
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Behavioral signals — what are people doing */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-behavior">지금 사람들은 어떻게 하고 있을까?</h3>
        <div className="cd-behavior-cards">
          {BEHAVIOR_SIGNALS.map((s, i) => (
            <div key={i} className="cd-behavior-card">
              <div className="cd-behavior-icon">{s.icon}</div>
              <div className="cd-behavior-body">
                <div className="cd-behavior-label">{s.label}</div>
                <div className="cd-behavior-value">{s.value}</div>
                <div className="cd-behavior-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cd-insight-card" style={{ marginTop: 12 }}>
          <div className="cd-insight-icon">{'\u{1F4A1}'}</div>
          <div className="cd-insight-text">
            ZKAP 사용자 기준. 전체 시장과 다를 수 있어요.
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Network health */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-health">이 네트워크는 잘 돌아가고 있을까?</h3>
        <div className="cd-health-list">
          {NETWORK_HEALTH.map((h, i) => (
            <div key={i} className="cd-health-row">
              <div className="cd-health-left-col">
                <div className="cd-health-label">{h.label}</div>
                {h.helper && <div className="cd-health-helper">{h.helper}</div>}
              </div>
              <div className="cd-health-right">
                <div className="cd-health-value">{h.value}</div>
                <div className={`cd-health-status cd-health-${h.statusType}`}>{h.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
      {/* Institutional context */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-context">큰손들은 어떻게 움직이고 있을까?</h3>
        <div className="cd-context-cards">
          <div className="cd-context-card">
            <div className="cd-context-badge">기관 자금</div>
            <div className="cd-context-stat">2.1조원</div>
            <div className="cd-context-text">이번 달 기관이 넣은 돈</div>
            <div className="cd-context-why">기관 유입 → 시장 안정에 도움</div>
          </div>
          <div className="cd-context-card">
            <div className="cd-context-badge">실제 사용량</div>
            <div className="cd-context-stat">50만 개 (+19%)</div>
            <div className="cd-context-text">매일 사용하는 지갑 수</div>
            <div className="cd-context-why">작년(42만 개)보다 늘어남</div>
          </div>
          <div className="cd-context-card">
            <div className="cd-context-badge">코인 양 변화</div>
            <div className="cd-context-stat">3.2만 ETH 줄어듦</div>
            <div className="cd-context-text">30일간 사라진 양</div>
            <div className="cd-context-why">사용↑ → 전체 양↓ 추세</div>
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
        <div className="cd-return-sim-sub">과거 기록이에요. 앞으로를 보장하지 않아요.</div>
      </div>

      {/* Exchange comparison */}
      <div className="cd-compare-section">
        <h3 className="cd-section-title">어디서 사는 게 제일 쌀까?</h3>
        <div className="cd-section-helper">거래소마다 가격이 조금씩 달라요</div>

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
            <div className="cd-zkap-compare-card-title">사고팔 때 수수료</div>
            <div className="cd-zkap-compare-card-helper">낮을수록 좋아요</div>
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
            <div className="cd-zkap-compare-card-title">1년 보유 시 수익 차이</div>
            <div className="cd-zkap-compare-card-helper">같은 금액 1년 보유 시 차이</div>
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
            <div className="cd-zkap-compare-card-title">가격 흔들림 폭</div>
            <div className="cd-zkap-compare-card-helper">작을수록 안정적</div>
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
            <div className="cd-zkap-bar-sub">나눠 사서 흔들림을 줄인 효과</div>
          </div>
        </div>
      </div>

      <div className="section-divider" />
      {/* Interest calculator */}
      <div className="cd-info-block">
        <h3 className="cd-section-title" id="sec-calc">이더리움 맡기고 이자 받기</h3>
        <div className="cd-section-helper">이더리움을 맡기면 매달 이자를 받아요</div>
        <div className="cd-calc-wrap">
          <div className="cd-calc-label">얼마치를 맡겨볼까요?</div>
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
              {(selectedCalcAmount / 10000).toLocaleString()}만원어치를 맡기면 매달
            </div>
            <div className="cd-calc-output-value">
              약 {monthlyInterest.toLocaleString()}원
            </div>
            <div className="cd-calc-output-sub">연 5.2% 기준</div>
            <div className="cd-calc-output-compare">
              은행 예금(3.5%)보다 높아요
            </div>
          </div>
          <div className="cd-calc-note">* 이율은 네트워크 상황에 따라 변동</div>
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
          <div className="cd-staking-nudge-sub">연 5.2% · 갖고 있으면 이자가 쌓여요</div>
        </div>
        <button className="cd-staking-nudge-btn">이자 받기</button>
      </div>
    </div>
  );
}
