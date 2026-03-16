'use client';

import { useState, useCallback } from 'react';

const MAX_AVAILABLE = 66000;
const ETH_RATE = 1550;

function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function PurchaseScreen({ onNext }) {
  const [rawValue, setRawValue] = useState('');

  const num = parseInt(rawValue || '0', 10);
  const displayAmount = num === 0 ? '0' : formatNumber(num);
  const ethAmount = (num / ETH_RATE).toFixed(4);

  const handleKey = useCallback((val) => {
    if (val === 'del') {
      setRawValue((prev) => prev.slice(0, -1));
    } else {
      setRawValue((prev) => {
        const next = prev + val;
        return parseInt(next, 10) <= MAX_AVAILABLE ? next : prev;
      });
    }
  }, []);

  const handlePercent = useCallback((pct) => {
    const amount = Math.floor(MAX_AVAILABLE * pct / 100);
    setRawValue(amount.toString());
  }, []);

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="text-container">
        <div className="title">How much ETH<br/>would you like to buy?</div>
      </div>

      <div className="price-section">
        <div className="price-main">
          <span className="price-currency">$</span>
          <span className="price-amount">{displayAmount}</span>
        </div>
        <div className="price-eth">{'\u2248'} {ethAmount} ETH</div>
      </div>

      <div className="available-card">
        <span className="available-label">Available balance</span>
        <span className="available-value">$66,000</span>
      </div>

      <div className="percent-row">
        {[
          { label: '10%', pct: 10 },
          { label: '25%', pct: 25 },
          { label: '50%', pct: 50 },
          { label: 'Max', pct: 100 },
        ].map(({ label, pct }) => (
          <button key={pct} className="percent-btn" onClick={() => handlePercent(pct)}>
            {label}
          </button>
        ))}
      </div>

      <div className="numpad">
        {['1','2','3','4','5','6','7','8','9','00','0','del'].map((val) => (
          <button key={val} className="numpad-key" onClick={() => handleKey(val)}>
            {val === 'del' ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/>
                <line x1="18" y1="9" x2="12" y2="15"/>
                <line x1="12" y1="9" x2="18" y2="15"/>
              </svg>
            ) : val}
          </button>
        ))}
      </div>

      <div className="bottom-area">
        <button className={`cta-btn${num === 0 ? ' cta-disabled' : ''}`} onClick={num > 0 ? onNext : undefined} disabled={num === 0}>Next</button>
      </div>

    </>
  );
}
