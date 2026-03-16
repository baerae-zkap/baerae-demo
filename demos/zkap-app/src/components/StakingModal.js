'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

function formatNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export default function StakingModal({ onClose, onStake, purchaseData }) {
  const totalEth = purchaseData?.zkapEth || 32.3218;
  const monthlyUsd = formatNum(Math.round(totalEth * 1550 * 0.036 / 12));

  return (
    <>
      <motion.div
        className="stk-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="stk-modal"
        initial={{ y: '30%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '30%', opacity: 0 }}
        transition={{ type: 'tween', duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="stk-illustration">
          <Image src="/zkap-app/pig.png" alt="piggy bank" width={200} height={200} className="stk-pig-img" />
        </div>

        <h2 className="stk-title">
          Stake Ethereum and earn<br />about ${monthlyUsd} every month!
        </h2>
        <p className="stk-subtitle">Watch your earnings grow every single day!</p>

        <div className="stk-cards">
          <div className="stk-card">
            <div className="stk-card-left">
              <div className="stk-card-icon">
                <Image src="/zkap-app/eth.png" alt="ETH" width={40} height={40} className="stk-card-icon-img" />
              </div>
              <div className="stk-card-info">
                <span className="stk-card-label">Challenge for high returns</span>
                <span className="stk-card-yield">Annual yield 8.20%</span>
              </div>
            </div>
            <button className="stk-apply">Apply</button>
          </div>

          <div className="stk-card">
            <div className="stk-card-left">
              <div className="stk-card-icon">
                <Image src="/zkap-app/lido.png" alt="Lido" width={40} height={40} className="stk-card-icon-img" />
              </div>
              <div className="stk-card-info">
                <span className="stk-card-label">Adventurer</span>
                <span className="stk-card-yield">Annual yield 18.40%</span>
              </div>
            </div>
            <button className="stk-apply">Apply</button>
          </div>
        </div>

        <button className="stk-cta" onClick={onStake}>Stake & Start Earning</button>

        <button className="stk-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span>Close</span>
        </button>
      </motion.div>
    </>
  );
}
