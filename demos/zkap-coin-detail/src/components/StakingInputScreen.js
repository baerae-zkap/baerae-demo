'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

function StepIndicator({ current, total = 4 }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`step-dot ${i < current ? 'step-dot-done' : ''} ${i === current ? 'step-dot-active' : ''}`} />
      ))}
    </div>
  );
}

export default function StakingInputScreen({ onBack, onNext, purchaseData }) {
  const totalEth = purchaseData?.zkapEth || 32.3218;
  const [rawValue, setRawValue] = useState('');

  const display = rawValue || '0';
  const num = parseFloat(rawValue || '0');
  const usdValue = (num * 1550).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleKey = useCallback((val) => {
    if (val === 'del') {
      setRawValue((prev) => prev.slice(0, -1));
    } else if (val === '.') {
      setRawValue((prev) => {
        if (prev.includes('.')) return prev;
        return prev === '' ? '0.' : prev + '.';
      });
    } else {
      setRawValue((prev) => {
        const next = prev + val;
        // Limit decimal places to 4
        const dotIdx = next.indexOf('.');
        if (dotIdx !== -1 && next.length - dotIdx > 5) return prev;
        if (parseFloat(next) > totalEth) return prev;
        return next;
      });
    }
  }, [totalEth]);

  const handlePercent = useCallback((pct) => {
    const amount = Math.floor(totalEth * pct) / 100;
    setRawValue(amount.toFixed(4).replace(/\.?0+$/, ''));
  }, [totalEth]);

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={onBack}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <StepIndicator current={0} />
      <div className="text-container">
        <div className="title">How much ETH<br/>would you like to stake?</div>
      </div>

      <div className="price-section">
        <div className="stk-input-badge">
          <Image src="/zkap-app/lido.png" alt="Lido" width={24} height={24} className="stk-input-badge-icon" />
          <span className="stk-input-badge-text">Lido Staking</span>
        </div>
        <div className="price-main">
          <span className="price-amount">{display}</span>
          <span className="price-currency" style={{ marginLeft: '8px' }}>ETH</span>
        </div>
        <div className="price-eth">{'\u2248'} ${usdValue}</div>
      </div>

      <div className="available-card">
        <span className="available-label">Available balance</span>
        <span className="available-value">{totalEth.toFixed(4)} ETH</span>
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
        {['1','2','3','4','5','6','7','8','9','.','0','del'].map((val) => (
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
        <button className={`cta-btn${num === 0 ? ' cta-disabled' : ''}`} disabled={num === 0} onClick={() => onNext(num)}>Stake</button>
      </div>
    </>
  );
}
