'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import StakingModal from './StakingModal';

const EXCHANGE_META = {
  binance: { name: 'Binance', logo: '/zkap-app/binance.svg' },
  okx: { name: 'OKX', logo: '/zkap-app/okx.png' },
  bybit: { name: 'Bybit', logo: '/zkap-app/bybit.png' },
  coinbase: { name: 'Coinbase', logo: '/zkap-app/coinbase.svg' },
  gateio: { name: 'Gate.io', logo: '/zkap-app/gateio.jpg' },
  bitget: { name: 'Bitget', logo: '/zkap-app/bitget.png' },
};

const EXCHANGE_ORDER = ['binance', 'okx', 'bybit', 'coinbase', 'gateio', 'bitget'];

function formatNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function ResultScreen({ onClose, onStaking, purchaseData, onShowIndicator }) {
  const pct = purchaseData?.splitPct || { binance: 35, okx: 25, bybit: 18, coinbase: 12, gateio: 6, bitget: 4 };
  const totalEth = purchaseData?.zkapEth || 32.3218;

  const exchanges = EXCHANGE_ORDER.map((key) => ({
    ...EXCHANGE_META[key],
    pct: pct[key],
    eth: (totalEth * pct[key] / 100).toFixed(4),
  }));

  const [stakingOpen, setStakingOpen] = useState(false);

  const savingsUsd = formatNum(Math.round(totalEth * 0.003 * 1550));
  const savingsEth = (totalEth * 0.003).toFixed(4);

  return (
    <div className="rs-root">
      <div className="rs-header">
        <button className="rs-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="rs-content" onScroll={onShowIndicator}>
        <div className="rs-hero">
          <Image src="/zkap-app/receipt.png" alt="receipt" width={120} height={120} className="rs-hero-img" />
        </div>

        <div className="rs-title-area">
          <h2 className="rs-title">You saved ${savingsUsd}</h2>
          <p className="rs-subtitle">You received {savingsEth} ETH more with optimal routing</p>
        </div>

        <div className="rs-details">
          <div className="rs-detail-row">
            <span className="rs-detail-label">Order Date</span>
            <span className="rs-detail-value">Mar 13, 2025 6:04 PM</span>
          </div>
          <div className="rs-detail-row">
            <span className="rs-detail-label">Order Amount</span>
            <span className="rs-detail-value">$50,000</span>
          </div>
          <div className="rs-detail-row">
            <span className="rs-detail-label">Fee</span>
            <span className="rs-detail-value">$54</span>
          </div>
          <div className="rs-detail-row">
            <span className="rs-detail-label">Highest Exchange Rate</span>
            <span className="rs-detail-value">$1,550.00</span>
          </div>
          <div className="rs-detail-row">
            <span className="rs-detail-label">Avg. Purchase Price</span>
            <span className="rs-detail-value rs-detail-highlight">$1,543.20</span>
          </div>
        </div>

        <div className="rs-exchange-compact">
          <span className="rs-compact-title">Exchange Breakdown</span>
          <div className="rs-compact-list">
            {exchanges.map((ex) => (
              <div key={ex.name} className="rs-compact-row">
                <div className="rs-compact-left">
                  <Image src={ex.logo} alt={ex.name} width={24} height={24} className="rs-compact-logo" />
                  <span className="rs-compact-name">{ex.name}</span>
                  <span className="rs-compact-pct">{ex.pct}%</span>
                </div>
                <span className="rs-compact-eth">{ex.eth} ETH</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rs-cta-wrap">
        <div className="rs-cta-gradient" />
        <div className="rs-cta-area">
          <button className="rs-cta" onClick={() => setStakingOpen(true)}>Done</button>
        </div>
      </div>

      <AnimatePresence>
        {stakingOpen && (
          <StakingModal
            onClose={() => { setStakingOpen(false); onClose(); }}
            onStake={() => { setStakingOpen(false); if (onStaking) onStaking(); }}
            purchaseData={purchaseData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
