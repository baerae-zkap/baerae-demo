'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const EXCHANGE_META = {
  binance: { name: 'Binance', logo: '/zkap-app/binance.svg' },
  okx: { name: 'OKX', logo: '/zkap-app/okx.png' },
  bybit: { name: 'Bybit', logo: '/zkap-app/bybit.png' },
  coinbase: { name: 'Coinbase', logo: '/zkap-app/coinbase.svg' },
  gateio: { name: 'Gate.io', logo: '/zkap-app/gateio.jpg' },
  bitget: { name: 'Bitget', logo: '/zkap-app/bitget.png' },
};

const EXCHANGE_ORDER = ['binance', 'okx', 'bybit', 'coinbase', 'gateio', 'bitget'];

export default function StakingConfirmScreen({ onBack, onConfirm, purchaseData, stakeAmount }) {
  const pct = purchaseData?.splitPct || { binance: 35, okx: 25, bybit: 18, coinbase: 12, gateio: 6, bitget: 4 };
  const totalEth = purchaseData?.zkapEth || 32.3218;
  const amount = stakeAmount || 10;

  const exchanges = EXCHANGE_ORDER.map((key) => ({
    key,
    ...EXCHANGE_META[key],
    eth: parseFloat((totalEth * pct[key] / 100).toFixed(4)),
  }));

  const [selectedExchange, setSelectedExchange] = useState(exchanges.find((ex) => ex.eth >= amount) || exchanges[0]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={onBack}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="sc-center">
        <div className="stk-input-badge" style={{ justifyContent: 'center' }}>
          <Image src="/zkap-app/lido.png" alt="Lido" width={28} height={28} className="stk-input-badge-icon" />
          <span className="stk-input-badge-text">Lido Staking</span>
        </div>
        <h2 className="sc-title">
          <span className="sc-title-blue">Stake {amount} ETH</span>
          <br />with Lido?
        </h2>
      </div>

      <div className="sc-bottom">
        <div className="sc-warning">
          Staking rewards are variable and not guaranteed.<br />Please consider the risks before proceeding.
        </div>

        <div className="sc-details">
          <div className="sc-detail-row">
            <span className="sc-detail-label">From</span>
            <button className="sc-exchange-btn" onClick={() => setSheetOpen(true)}>
              <span>{selectedExchange.name} ({selectedExchange.eth} ETH)</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round">
                <path d="M7 10l5-5 5 5M7 14l5 5 5-5" />
              </svg>
            </button>
          </div>
          <div className="sc-detail-row">
            <span className="sc-detail-label">Est. Annual Yield</span>
            <span className="sc-detail-value">~3% (variable)</span>
          </div>
          <div className="sc-detail-row">
            <span className="sc-detail-label">Total Fee</span>
            <span className="sc-detail-value">~0.002 ETH</span>
          </div>
        </div>

        <button className="sc-agree" onClick={() => setAgreed(!agreed)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke={agreed ? '#2962ff' : 'none'} strokeWidth="1.5" fill={agreed ? '#2962ff' : '#f2f3f5'} />
            <path d="M7 12l3.5 3.5L17 9" stroke={agreed ? '#fff' : '#c0c2c5'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sc-agree-text"><strong>Required</strong>&nbsp; Agree to terms & fees</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 6 15 12 9 18"/>
          </svg>
        </button>

        <div className="sc-buttons">
          <button className="sc-btn-cancel" onClick={onBack}>Cancel</button>
          <button className={`sc-btn-stake${!agreed ? ' sc-btn-disabled' : ''}`} onClick={agreed ? () => onConfirm(selectedExchange) : undefined} disabled={!agreed}>Stake</button>
        </div>
      </div>

      {/* Exchange Selection Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              className="sheet-overlay-react"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="sc-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="sheet-handle" />
              <h3 className="sc-sheet-title">Select Withdrawal Exchange</h3>
              <div className="sc-sheet-list">
                {exchanges.map((ex) => {
                  const disabled = ex.eth < amount;
                  return (
                    <button
                      key={ex.key}
                      className={`sc-sheet-item ${disabled ? 'sc-sheet-item-disabled' : ''}`}
                      onClick={disabled ? undefined : () => { setSelectedExchange(ex); setSheetOpen(false); }}
                      disabled={disabled}
                    >
                      <div className="sc-sheet-item-left">
                        <Image src={ex.logo} alt={ex.name} width={36} height={36} className="sc-sheet-logo" />
                        <span className="sc-sheet-name">{ex.name}</span>
                      </div>
                      <span className="sc-sheet-eth">{ex.eth} ETH</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
