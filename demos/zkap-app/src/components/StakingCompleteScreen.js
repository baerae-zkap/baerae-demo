'use client';

import { motion } from 'framer-motion';

function CheckCircle() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <svg width="76" height="76" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="46" fill="#2962ff" />
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

  return (
    <div className="sl-root">
      <div className="sl-center" style={{ paddingBottom: '80px' }}>
        <CheckCircle />
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
          {amount} ETH has been staked with Lido.<br />
          Withdrawal may take a few minutes to process.
        </motion.p>
      </div>

      <motion.div
        className="sl-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button className="cta-btn" onClick={onDone}>Got it</button>
      </motion.div>
    </div>
  );
}
