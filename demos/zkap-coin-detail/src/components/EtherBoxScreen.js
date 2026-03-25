'use client';

import { useState } from 'react';
import Image from 'next/image';

const TABS = ['All', 'Staked', 'Withdrawn'];

export default function EtherBoxScreen({ onClose, stakeAmount, purchaseData }) {
  const amount = stakeAmount || 10;
  const usdValue = (amount * 1550).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="eb-root">
      {/* Header */}
      <div className="os-header">
        <button className="os-close" style={{ left: 12, right: 'auto' }} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="os-header-title">EtherBox</span>
      </div>

      {/* Scrollable content */}
      <div className="eb-content">
        {/* Balance */}
        <div className="eb-balance">
          <h1 className="eb-balance-amount">{amount} ETH</h1>
          <p className="eb-balance-usd">${usdValue}</p>
        </div>

        {/* Gem image with blur background */}
        <div className="eb-gem-wrap">
          <Image src="/zkap-app/gem.png" alt="" width={300} height={300} className="eb-gem-blur" />
          <Image src="/zkap-app/gem.png" alt="gem" width={168} height={168} className="eb-gem-img" />
        </div>

        {/* Action buttons */}
        <div className="eb-actions">
          <button className="eb-action-btn eb-action-withdraw">Withdraw</button>
          <button className="eb-action-btn eb-action-stake">Stake</button>
        </div>

        {/* Accumulated interest card */}
        <div className="eb-interest-card">
          <span className="eb-interest-label">Interest Earned</span>
          <span className="eb-interest-value">0.0002 ETH</span>
        </div>

        {/* Divider */}
        <div className="eb-divider" />

        {/* Tabs */}
        <div className="eb-tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`eb-tab${activeTab === i ? ' eb-tab-active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Transaction row */}
        <div className="eb-tx-list">
          <div className="eb-tx-row">
            <div className="eb-tx-left">
              <span className="eb-tx-amount">{amount} ETH</span>
              <span className="eb-tx-date">2026.03.13  12:00:00</span>
            </div>
            <span className="eb-tx-status">Staked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
