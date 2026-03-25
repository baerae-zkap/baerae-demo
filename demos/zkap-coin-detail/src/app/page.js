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
            <CoinDetailScreen onBack={goToCoinDetail} onBuy={goToPurchaseFromCoinDetail} activeTab={coinDetailTab} setActiveTab={setCoinDetailTab} scrollToId={scrollToId} selectedExchange={selectedExchange} setSelectedExchange={setSelectedExchange} />
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
          <div className="anno-subtitle">ZKAP UX 개선 · 2026.03.25</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('차트', 'sec-hero')}>
          <div className="anno-label">코인 정체성</div>
          <div className="anno-text">코인 아이콘, 이름, 쉬운 태그(온체인 용어 배제), 현재가, 24시간 변동률, 보유자 수. 처음 보는 사람도 이게 뭔지 한눈에 파악할 수 있도록.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('차트', 'sec-tabs')}>
          <div className="anno-label">탭 구조</div>
          <div className="anno-text">가격 영역 바로 아래에 탭 배치. 차트 | 정보 | 내 보유 3탭. 보유자는 '내 보유'가 먼저 보이고, 미보유자는 '차트'가 먼저 보임.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('차트', 'sec-chart')}>
          <div className="anno-label">차트 탭 — 시세 + 거래소 비교</div>
          <div className="anno-text">가격 차트 + 기간 선택. 아래에 거래소별 가격 비교(ZKAP 핵심 가치)와 ZKAP 이용 시 장점 비교. "어디서 사는 게 제일 싼지"를 바로 알 수 있도록.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('정보', 'sec-market')}>
          <div className="anno-label">오늘의 코인</div>
          <div className="anno-text">매일 바뀌는 일일 변동 정보. "어제보다 얼마 올랐는지", "오늘 몇 명이 샀는지", "거래량이 평소보다 많은지". 재방문 이유가 되는 콘텐츠.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('정보', 'sec-52week')}>
          <div className="anno-label">가격 맥락 — 비싼 거야, 싼 거야?</div>
          <div className="anno-text">52주 최고/최저 대비 현재 위치를 한눈에. "이때 샀으면 지금은..." 카드로 과거 매수 시 수익률 시뮬레이션. 숫자에 맥락을 줘서 판단을 도움.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('정보', 'sec-calc')}>
          <div className="anno-label">이자 계산기</div>
          <div className="anno-text">금액 선택하면 월 이자 계산. "스테이킹" 대신 "맡기면 이자" 프레이밍. 은행 예금 대비 비교로 친숙하게.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('정보', 'sec-qna')}>
          <div className="anno-label">이 코인이 뭐야?</div>
          <div className="anno-text">초보가 가장 궁금한 3가지 — 한줄 요약, 왜 중요한지, 비슷한 건 뭔지. 어려운 말 없이 쉬운 한글로.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('정보', 'sec-people')}>
          <div className="anno-label">사람들 — 신뢰 + 재방문</div>
          <div className="anno-text">보유 비율, 연령대별 분포, 수익 랭킹(매일 바뀜), 같이 보유한 코인. "다른 사람들은 어떻게 하고 있는지" 알 수 있어서 안심. 했제와 그랬제 — 유명 분석가 예측 적중률 공개.</div>
        </div>

        <div className="anno-section anno-clickable" onClick={() => annoClick('내 보유', 'sec-holdings')}>
          <div className="anno-label">내 보유 — 개인화</div>
          <div className="anno-text">거래소별 보유량 + 수익률. 거래소 탭하면 구매/판매/이자받기 액션시트. 보유 중이면 이자 받기 자연스럽게 유도.</div>
        </div>

        <div className="anno-section" style={{ borderBottom: 'none' }}>
          <div className="anno-label">핵심 원칙 (3/24 미팅 합의)</div>
          <div className="anno-text">① 유도가 아니라 정보 — 사자/팔자 유도 X ② 매일 바뀌어야 한다 — 같은 화면이면 재방문 안 함 ③ 온체인 용어 절대 노출 안 함 ④ 코인은 상품, 상세는 상품 페이지 ⑤ 쉬운 게 기본값</div>
        </div>
      </div>
    )}
    </div>
  );
}
