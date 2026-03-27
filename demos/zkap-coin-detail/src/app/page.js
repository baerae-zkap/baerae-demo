'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StatusBar from '@/components/StatusBar';
import PurchaseScreen from '@/components/PurchaseScreen';
import CompareScreen from '@/components/CompareScreen';
import OrderStatusScreen from '@/components/OrderStatusScreen';
import ResultScreen from '@/components/ResultScreen';
import StakingInputScreen from '@/components/StakingInputScreen';
import StakingConfirmScreen from '@/components/StakingConfirmScreen';
import StakingLoadingScreen from '@/components/StakingLoadingScreen';
import StakingCompleteScreen from '@/components/StakingCompleteScreen';
import PasskeyModal from '@/components/PasskeyModal';
import EtherBoxScreen from '@/components/EtherBoxScreen';
import WithdrawalOTPScreen from '@/components/WithdrawalOTPScreen';
import CoinDetailScreen, { HOLDINGS_EXCHANGES } from '@/components/CoinDetailScreen';


const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
  }),
};

export default function Home() {
  const [screen, setScreen] = useState('coinDetail');
  const [direction, setDirection] = useState(1);
  const [purchaseData, setPurchaseData] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const [stakingPasskey, setStakingPasskey] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [coinDetailTab, setCoinDetailTab] = useState('차트');
  const [scrollToId, setScrollToId] = useState(null);

  const annoClick = useCallback((tab, sectionId) => {
    setCoinDetailTab(tab);
    setScrollToId(null);
    setTimeout(() => setScrollToId(sectionId), 50);
  }, []);
  const hideTimer = useRef(null);

  const showIndicator = useCallback(() => {
    setIndicatorVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setIndicatorVisible(false), 3000);
  }, []);

  useEffect(() => {
    hideTimer.current = setTimeout(() => setIndicatorVisible(false), 3000);
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  const goToCoinDetail = useCallback(() => {
    setDirection(-1);
    setScreen('coinDetail');
    showIndicator();
  }, [showIndicator]);

  const goBackToHome = useCallback(() => {
    // Try to go back, or navigate to home-explore
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/baerae-demo/zkap-home-explore';
    }
  }, []);

  const goToCompare = useCallback(() => {
    setDirection(1);
    setScreen('compare');
    showIndicator();
  }, [showIndicator]);

  const goToPurchaseFromCoinDetail = useCallback(() => {
    setDirection(1);
    setScreen('purchase');
    showIndicator();
  }, [showIndicator]);

  const goToPurchase = useCallback(() => {
    setDirection(-1);
    setScreen('purchase');
    showIndicator();
  }, [showIndicator]);

  const goToOrderStatus = useCallback((data) => {
    if (data) setPurchaseData(data);
    setDirection(1);
    setScreen('orderStatus');
    showIndicator();
  }, [showIndicator]);

  const goToResult = useCallback(() => {
    setDirection(1);
    setScreen('result');
    showIndicator();
  }, [showIndicator]);

  const goToStaking = useCallback(() => {
    setDirection(1);
    setScreen('staking');
    showIndicator();
  }, [showIndicator]);

  const goToStakingConfirm = useCallback((amount) => {
    setStakeAmount(amount);
    setDirection(1);
    setScreen('stakingConfirm');
    showIndicator();
  }, [showIndicator]);

  const goBackToStaking = useCallback(() => {
    setDirection(-1);
    setScreen('staking');
    showIndicator();
  }, [showIndicator]);

  const handleStakingConfirm = useCallback((exchange) => {
    if (exchange) setSelectedExchange(exchange);
    setStakingPasskey(true);
    showIndicator();
  }, [showIndicator]);

  const handleStakingPasskeyDone = useCallback(() => {
    setStakingPasskey(false);
    setDirection(1);
    setScreen('withdrawalOTP');
    showIndicator();
  }, [showIndicator]);

  const handleOTPComplete = useCallback(() => {
    setDirection(1);
    setScreen('stakingLoading');
    showIndicator();
  }, [showIndicator]);

  const goToStakingComplete = useCallback(() => {
    setDirection(1);
    setScreen('stakingComplete');
    showIndicator();
  }, [showIndicator]);

  const handleStakingDone = useCallback(() => {
    setDirection(1);
    setScreen('etherBox');
    showIndicator();
  }, [showIndicator]);

  const handleEtherBoxClose = useCallback(() => {
    setDirection(-1);
    setScreen('purchase');
    showIndicator();
  }, [showIndicator]);

  return (
    <div className="demo-layout">
    <div className={`device ${screen === 'coinDetail' ? 'device-dark' : ''}`} onClick={showIndicator}>
      <div className="device-status-bar">
        <StatusBar />
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={screen}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className={`screen ${screen === 'coinDetail' ? 'screen-dark' : ''}`}
        >
          {screen === 'coinDetail' && (
            <CoinDetailScreen onBack={goBackToHome} onBuy={goToPurchaseFromCoinDetail} activeTab={coinDetailTab} setActiveTab={setCoinDetailTab} scrollToId={scrollToId} selectedExchange={selectedExchange} setSelectedExchange={setSelectedExchange} />
          )}
          {screen === 'purchase' && (
            <PurchaseScreen onNext={goToCompare} />
          )}
          {screen === 'compare' && (
            <CompareScreen onBack={goToPurchase} onOrderStatus={goToOrderStatus} onShowIndicator={showIndicator} />
          )}
          {screen === 'orderStatus' && (
            <OrderStatusScreen onClose={goToPurchase} onResult={goToResult} purchaseData={purchaseData} />
          )}
          {screen === 'result' && (
            <ResultScreen onClose={goToPurchase} onStaking={goToStaking} purchaseData={purchaseData} onShowIndicator={showIndicator} />
          )}
          {screen === 'staking' && (
            <StakingInputScreen onBack={goToResult} onNext={goToStakingConfirm} purchaseData={purchaseData} />
          )}
          {screen === 'stakingConfirm' && (
            <StakingConfirmScreen onBack={goBackToStaking} onConfirm={handleStakingConfirm} purchaseData={purchaseData} stakeAmount={stakeAmount} />
          )}
          {screen === 'withdrawalOTP' && (
            <WithdrawalOTPScreen onBack={goBackToStaking} onComplete={handleOTPComplete} exchangeName={selectedExchange?.name || 'Binance'} />
          )}
{screen === 'stakingLoading' && (
            <StakingLoadingScreen onComplete={goToStakingComplete} />
          )}
          {screen === 'stakingComplete' && (
            <StakingCompleteScreen onDone={handleStakingDone} stakeAmount={stakeAmount} />
          )}
          {screen === 'etherBox' && (
            <EtherBoxScreen onClose={handleEtherBoxClose} stakeAmount={stakeAmount} purchaseData={purchaseData} />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {stakingPasskey && (
          <PasskeyModal onClose={handleStakingPasskeyDone} />
        )}
      </AnimatePresence>

      {screen === 'coinDetail' && !selectedExchange && (
        <div className="coin-detail-cta">
          <button className="cta-sell">팔기</button>
          <button className="cta-buy" onClick={goToPurchaseFromCoinDetail}>구매하기</button>
        </div>
      )}

      {screen === 'coinDetail' && selectedExchange && (
        <>
          <div className="cd-sheet-dim" onClick={() => setSelectedExchange(null)} />
          <div className="cd-sheet">
            <div className="cd-sheet-handle" />
            <div className="cd-sheet-header">
              <div className={`cd-bal-logo cd-bal-logo-sm ${(() => { const ex = HOLDINGS_EXCHANGES.find(e => e.name === selectedExchange); return ex?.abbr === 'UP' ? 'cd-bal-upbit' : ex?.abbr === 'C1' ? 'cd-bal-coinone' : 'cd-bal-bithumb'; })()}`}>
                {HOLDINGS_EXCHANGES.find(e => e.name === selectedExchange)?.abbr}
              </div>
              <div>
                <div className="cd-sheet-exchange">{selectedExchange}</div>
                <div className="cd-sheet-amount">{HOLDINGS_EXCHANGES.find(e => e.name === selectedExchange)?.eth}</div>
              </div>
            </div>
            <div className="cd-sheet-actions">
              <button className="cd-sheet-action" onClick={() => setSelectedExchange(null)}>
                <div className="cd-sheet-action-icon cd-sheet-action-buy">📥</div>
                <span>구매하기</span>
              </button>
              <button className="cd-sheet-action" onClick={() => setSelectedExchange(null)}>
                <div className="cd-sheet-action-icon cd-sheet-action-sell">📤</div>
                <span>판매하기</span>
              </button>
              <button className="cd-sheet-action" onClick={() => setSelectedExchange(null)}>
                <div className="cd-sheet-action-icon cd-sheet-action-stake">💰</div>
                <span>이자 받기</span>
              </button>
              <button className="cd-sheet-action" onClick={() => setSelectedExchange(null)}>
                <div className="cd-sheet-action-icon cd-sheet-action-history">📊</div>
                <span>거래 내역</span>
              </button>
            </div>
          </div>
        </>
      )}

      <div className={`device-home-indicator ${indicatorVisible ? '' : 'indicator-hidden'}`}>
        <div className="home-indicator-bar" />
      </div>
    </div>

    {/* Annotation panel */}
    {screen === 'coinDetail' && (
      <div className="anno-panel">
        <div className="anno-header">
          <div className="anno-title">코인 상세 페이지 기획안</div>
          <div className="anno-subtitle">ZKAP UX 개선 · 4차 (2026.03.27)</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('소개', 'sec-hero')}>
          <div className="anno-label">코인 정체성 (Hero)</div>
          <div className="anno-text">아이콘, 이름, 쉬운 태그, 현재가, 변동률, 보유자 수. 처음 보는 사람도 이게 뭔지 한눈에 파악.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('차트', 'sec-tabs')}>
          <div className="anno-label">탭 구조 (2차 개선)</div>
          <div className="anno-text">차트 | 소개 | 현황 | 내 보유 — 차트가 첫 탭(사용자 기대에 부합). 단, 소개·현황 탭의 정보 밀도를 대폭 강화해 "무엇을/언제" 판단을 뒷받침.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('소개', 'sec-purpose')}>
          <div className="anno-label">소개 탭 — 이 코인이 어떤 애인지</div>
          <div className="anno-text"><strong>목적 선언</strong> + Q&A + <strong>누가/어디서 쓰나</strong> + <strong>왜 토큰이 필요한지</strong> + 약속 vs 현실 + 가치 원천 + 타임라인 + 기본 정보 + 보유자 분포 + 정보 부족 코인 패턴. 초보자도 "이게 뭐하는 코인인지" 바로 이해.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('현황', 'sec-market')}>
          <div className="anno-label">현황 탭 — 지금 어떤 상태인지</div>
          <div className="anno-text">오늘의 변동 · 1년 위치 · <strong>뉴스(왜 중요한지 설명 추가)</strong> · 과거 수익 시뮬 + 사용자 행동 + 네트워크 건강 + <strong>큰손 동향(초보 설명 강화)</strong>. 모든 지표에 헬퍼 텍스트.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('차트', 'sec-chart')}>
          <div className="anno-label">차트 탭 — 실행 지원</div>
          <div className="anno-text">가격 차트 + 거래소 비교 + ZKAP 장점 비교 + 이자 계산기. "어디서 사는 게 싼지"를 알고 행동으로 이어지는 도구.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('내 보유', 'sec-holdings')}>
          <div className="anno-label">내 보유 — 개인화</div>
          <div className="anno-text">거래소별 보유량 + 수익률. 거래소 탭하면 구매/판매/이자받기 액션시트.</div>
        </div>

        <div className="anno-section">
          <div className="anno-label">4차 개선 — 초보 친화 + 미팅 갭 채움 (3/27)</div>
          <div className="anno-text">
            {'\u2022'} 전문 용어 → 쉬운 말 전면 교체 (시가총액→전체 가치, 스테이킹→코인 맡기기 등)<br/>
            {'\u2022'} 모든 숫자/지표에 "이게 뭘 뜻하는지" 헬퍼 텍스트 추가<br/>
            {'\u2022'} <strong>"이 코인이 하려는 일"</strong> 목적 선언 섹션 신설<br/>
            {'\u2022'} <strong>"누가, 어디서 쓰나?"</strong> 사용처·사용자 섹션 신설<br/>
            {'\u2022'} <strong>"ETH는 왜 필요한가?"</strong> 토큰 존재 이유 섹션 신설<br/>
            {'\u2022'} 뉴스에 "왜 중요한지" 한줄 해설 추가<br/>
            {'\u2022'} 기관 동향 → "큰손들은 어떻게 움직이고 있을까?"로 재구성<br/>
            {'\u2022'} 정보 부족 코인 대응 패턴 카드 추가<br/>
            {'\u2022'} 의도→약속, 현실→현재로 배지 라벨 변경
          </div>
        </div>

        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">핵심 원칙</div>
          <div className="anno-text">{'\u2460'} 유도가 아니라 정보 — 사자/팔자 권유 X {'\u2461'} 매일 바뀌어야 한다 {'\u2462'} 전문 용어 노출 안 함 {'\u2463'} 코인은 상품, 상세는 상품 페이지 {'\u2464'} 쉬운 게 기본값 {'\u2465'} 왜 봐야 하는지 항상 설명</div>
        </div>
      </div>
    )}
    </div>
  );
}
