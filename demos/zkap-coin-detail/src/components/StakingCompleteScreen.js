'use client';

import { motion } from 'framer-motion';

function StepIndicator({ current, total = 4 }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`step-dot ${i < current ? 'step-dot-done' : ''} ${i === current ? 'step-dot-active' : ''}`} />
      ))}
    </div>
  );
}

function GreenCheckCircle() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="46" fill="#00C8BE" />
        <motion.path
          d="M28 48l14 14 26-26"
          stroke="#fff"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  );
}

export default function StakingCompleteScreen({ onDone, stakeAmount }) {
  const amount = stakeAmount || 10;
  const usdValue = (amount * 1550).toLocaleString();

  return (
    <div className="sl-root">
      <div className="os-header">
        <span className="os-header-title">Staking</span>
      </div>

      <StepIndicator current={3} />

      <div className="sl-center" style={{ paddingBottom: '40px' }}>
        <GreenCheckCircle />
        <motion.h2
          className="sl-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Staking Complete!
        </motion.h2>
        <motion.p
          className="sl-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Your ETH is now earning rewards
        </motion.p>
      </div>

      <motion.div
        className="stk-complete-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="stk-complete-card">
          <div className="stk-complete-row">
            <span className="stk-complete-label">Staked Amount</span>
            <span className="stk-complete-value">{amount} ETH</span>
          </div>
          <div className="stk-complete-row">
            <span className="stk-complete-label">Value</span>
            <span className="stk-complete-value">${usdValue}</span>
          </div>
          <div className="stk-complete-row">
            <span className="stk-complete-label">Protocol</span>
            <span className="stk-complete-value">Lido</span>
          </div>
          <div className="stk-complete-row">
            <span className="stk-complete-label">Est. Annual Yield</span>
            <span className="stk-complete-value stk-complete-highlight">~3.0%</span>
          </div>
          <div className="stk-complete-divider" />
          <div className="stk-complete-row">
            <span className="stk-complete-label">Est. Monthly Reward</span>
            <span className="stk-complete-value stk-complete-highlight">~{(amount * 0.03 / 12).toFixed(4)} ETH</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="sl-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button className="cta-btn" onClick={onDone}>View EtherBox</button>
      </motion.div>
    </div>
  );
}
