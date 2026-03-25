'use client';

import { useState, useEffect } from 'react';
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

export default function OrderStatusScreen({ onClose, onResult, purchaseData }) {
  const pct = purchaseData?.splitPct || { binance: 35, okx: 25, bybit: 18, coinbase: 12, gateio: 6, bitget: 4 };

  const exchanges = EXCHANGE_ORDER.map((key) => ({
    ...EXCHANGE_META[key],
    pct: pct[key],
  }));

  const [statuses, setStatuses] = useState(exchanges.map(() => 'In Progress'));
  const completedCount = statuses.filter((s) => s === 'Completed').length;
  const progressPct = Math.round((completedCount / exchanges.length) * 100);

  useEffect(() => {
    const indices = exchanges.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const timers = indices.map((idx, order) =>
      setTimeout(() => setStatuses((prev) => {
        const next = [...prev];
        next[idx] = 'Completed';
        return next;
      }), 400 + order * 300)
    );
    const tNav = setTimeout(() => { if (onResult) onResult(); }, 400 + exchanges.length * 300 + 600);
    return () => { timers.forEach(clearTimeout); clearTimeout(tNav); };
  }, [onResult]);

  function statusClass(s) {
    if (s === 'Completed') return 'os-status-done';
    if (s === 'Failed') return 'os-status-fail';
    return 'os-status-progress';
  }

  return (
    <>
      <div className="os-header">
        <span className="os-header-title">Order Status</span>
        <button className="os-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="os-progress-section">
        <div className="os-progress-bar-track">
          <div className="os-progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="os-progress-label">{completedCount} of {exchanges.length} exchanges completed</div>
      </div>

      <div className="os-center">
        <div className="os-dots">
          <div className="os-dot os-dot-1" />
          <div className="os-dot os-dot-2" />
          <div className="os-dot os-dot-3" />
          <div className="os-dot os-dot-4" />
        </div>
        <p className="os-message">Purchasing ETH...</p>
      </div>

      <div className="os-exchanges">
        {exchanges.map((ex, i) => (
          <div key={ex.name} className="os-exchange-row">
            <div className="os-exchange-left">
              <Image src={ex.logo} alt={ex.name} width={40} height={40} className="os-exchange-logo-img" />
              <div className="os-exchange-info">
                <span className="os-exchange-name">{ex.name}</span>
                <span className="os-exchange-pct">{ex.pct}%</span>
              </div>
            </div>
            <span className={`os-exchange-status ${statusClass(statuses[i])}`}>
              {statuses[i] === 'Completed' && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 4, verticalAlign: 'middle' }}>
                  <circle cx="7" cy="7" r="7" fill="#1559ea"/>
                  <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {statuses[i]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
