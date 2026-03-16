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
  const [screen, setScreen] = useState('purchase');
  const [direction, setDirection] = useState(1);
  const [purchaseData, setPurchaseData] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [indicatorVisible, setIndicatorVisible] = useState(true);
  const [stakingPasskey, setStakingPasskey] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(null);
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

  const goToCompare = useCallback(() => {
    setDirection(1);
    setScreen('compare');
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
    <div className="device" onClick={showIndicator}>
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
          className="screen"
        >
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

      <div className={`device-home-indicator ${indicatorVisible ? '' : 'indicator-hidden'}`}>
        <div className="home-indicator-bar" />
      </div>
    </div>
  );
}
