'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PasskeyModal from './PasskeyModal';

const ETH_RATE = 1550;

const INITIAL_EXCHANGES = [
  { id: 'zkap', eth: 32.3218, diff: 0, isBest: true },
  { id: 'binance', eth: 32.2540, diff: -105, isBest: false },
  { id: 'okx', eth: 32.2890, diff: -51, isBest: false },
  { id: 'bybit', eth: 32.2130, diff: -169, isBest: false },
  { id: 'coinbase', eth: 32.2050, diff: -181, isBest: false },
  { id: 'gateio', eth: 32.2380, diff: -130, isBest: false },
  { id: 'bitget', eth: 32.2210, diff: -156, isBest: false },
];

function formatDiff(n) {
  if (n === 0) return '';
  const abs = Math.abs(n);
  return '- $' + abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatNum(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function EthValue({ value, className, style, keyProp }) {
  const str = value.toFixed(4);
  return (
    <div key={keyProp} className={className} style={style}>
      {str} ETH
    </div>
  );
}

const CARDS = [
  { idx: 1, name: 'Binance', logo: '/zkap-app/binance.svg' },
  { idx: 2, name: 'OKX', logo: '/zkap-app/okx.png' },
  { idx: 3, name: 'Bybit', logo: '/zkap-app/bybit.png' },
  { idx: 4, name: 'Coinbase', logo: '/zkap-app/coinbase.svg' },
  { idx: 5, name: 'Gate.io', logo: '/zkap-app/gateio.jpg' },
  { idx: 6, name: 'Bitget', logo: '/zkap-app/bitget.png' },
];

export default function CompareScreen({ onBack, onOrderStatus, onShowIndicator }) {
  const [exchanges, setExchanges] = useState(INITIAL_EXCHANGES);
  const [countdown, setCountdown] = useState(10);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [splitPct, setSplitPct] = useState({ binance: 35, okx: 25, bybit: 18, coinbase: 12, gateio: 6, bitget: 4 });
  const [fading, setFading] = useState(false);
  const [passkeyOpen, setPasskeyOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePasskeyClose = useCallback(() => {
    setPasskeyOpen(false);
    if (onOrderStatus) onOrderStatus({ splitPct, zkapEth: exchanges[0].eth });
  }, [onOrderStatus, splitPct, exchanges]);

  const refreshPrices = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setExchanges((prev) => {
        // Pick 6 unique 'n' digits for non-ZKAP exchanges
        const digits = [0,1,2,3,4,5,6,7,8,9];
        const picked = [];
        while (picked.length < 6) {
          const i = Math.floor(Math.random() * digits.length);
          picked.push(digits.splice(i, 1)[0]);
        }

        let otherIdx = 0;
        const updated = prev.map((ex) => {
          if (ex.isBest) {
            const delta = (Math.random() - 0.5) * 0.06;
            let eth = Math.round((ex.eth + delta) * 10000) / 10000;
            if (eth < 32.3000) eth = 32.3000 + Math.random() * 0.04;
            if (eth > 32.3900) eth = 32.3900 - Math.random() * 0.02;
            return { ...ex, eth };
          } else {
            // 32.2nxx where n is unique per exchange
            const n = picked[otherIdx++];
            const xy = Math.floor(Math.random() * 100);
            const eth = Math.round((32.2 + n * 0.01 + xy * 0.0001) * 10000) / 10000;
            return { ...ex, eth };
          }
        });
        const others = updated.slice(1);
        const maxOther = Math.max(...others.map((e) => e.eth));
        if (updated[0].eth <= maxOther) {
          updated[0].eth = Math.round((maxOther + 0.01 + Math.random() * 0.03) * 10000) / 10000;
        }
        const zkapEth = updated[0].eth;
        for (let i = 1; i < updated.length; i++) {
          updated[i].diff = Math.round((updated[i].eth - zkapEth) * ETH_RATE);
        }
        return updated;
      });

      setSplitPct(() => {
        // Generate 6 random values that sum to 100
        const raw = [
          20 + Math.random() * 30, // binance 20-50
          15 + Math.random() * 20, // okx 15-35
          10 + Math.random() * 20, // bybit 10-30
          5 + Math.random() * 15,  // coinbase 5-20
          3 + Math.random() * 10,  // gateio 3-13
          2 + Math.random() * 8,   // bitget 2-10
        ];
        const total = raw.reduce((a, b) => a + b, 0);
        const pcts = raw.map((v) => Math.round((v / total) * 100));
        // Fix rounding to exactly 100
        const diff = 100 - pcts.reduce((a, b) => a + b, 0);
        pcts[0] += diff;
        return { binance: pcts[0], okx: pcts[1], bybit: pcts[2], coinbase: pcts[3], gateio: pcts[4], bitget: pcts[5] };
      });

      setRefreshKey((k) => k + 1);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (passkeyOpen) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refreshPrices();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshPrices, passkeyOpen]);

  const zkapEth = exchanges[0].eth;
  // Find the worst exchange for comparison
  const worstIdx = exchanges.slice(1).reduce((min, ex, i) => ex.eth < exchanges[min + 1].eth ? i : min, 0);
  const worstEth = exchanges[worstIdx + 1].eth;
  const diffEth = zkapEth - worstEth;
  const diffUsd = Math.abs(Math.round(diffEth * ETH_RATE));

  // Sort cards by ETH descending
  const sortedCards = [...CARDS].sort((a, b) => exchanges[b.idx].eth - exchanges[a.idx].eth);

  // Sorted chart data by split percentage (for bar segments + legend sync)
  const EXCHANGE_KEYS = [
    { key: 'binance', name: 'Binance' },
    { key: 'okx', name: 'OKX' },
    { key: 'bybit', name: 'Bybit' },
    { key: 'coinbase', name: 'Coinbase' },
    { key: 'gateio', name: 'Gate.io' },
    { key: 'bitget', name: 'Bitget' },
  ];
  const SEG_COLORS = ['#173fab', '#2960d8', '#3479e9', '#5a9af5', '#91c3fd', '#c0dcff'];
  const DOT_COLORS = ['ldot-1', 'ldot-2', 'ldot-3', 'ldot-4', 'ldot-5', 'ldot-6'];
  const sortedChartData = [...EXCHANGE_KEYS]
    .map((ex) => ({ ...ex, pct: splitPct[ex.key] }))
    .sort((a, b) => b.pct - a.pct);

  return (
    <>
      <div className="nav-bar">
        <button className="back-btn" onClick={onBack}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="text-container">
        <div className="title">Comparing rates<br/>for your $50,000 order</div>
        <div className="subtitle">Refreshing prices in {countdown}s</div>
      </div>

      <div className="cards-container">
        {/* ZKAP Best */}
        <div className="card best" onClick={() => setPasskeyOpen(true)} style={{ cursor: 'pointer' }}>
          <div className="card-header">
            <div className="card-header-left">
              <Image src="/zkap-app/zkap-icon.png" alt="ZKAP" width={24} height={24} className="exchange-logo-img" />
              <div className="zkap-name-wrap">
                <span className="exchange-name">ZKAP Best Rate</span>
                <div className="zkap-exchanges-row">
                  {CARDS.map(({ name, logo }) => (
                    <Image key={name} src={logo} alt={name} width={16} height={16} className="zkap-mini-logo" />
                  ))}
                  <span className="zkap-exchanges-label">{CARDS.length} exchanges</span>
                </div>
              </div>
            </div>
            <span className="badge-best">👍 Best</span>
          </div>
          <EthValue value={zkapEth} className="eth-value best-eth flash-update" style={{ opacity: fading ? 0 : 1 }} keyProp={`zkap-${refreshKey}`} isBest />
          <div className="inner-cta" onClick={(e) => { e.stopPropagation(); setSheetOpen(true); if (onShowIndicator) onShowIndicator(); }}>
            <span className="inner-cta-text">Split buying gets you up to 0.08 ETH more</span>
            <span className="inner-cta-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C8BE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18"/>
              </svg>
            </span>
          </div>
        </div>

        {sortedCards.map(({ idx, name, logo }) => (
          <div className="card" key={idx}>
            <div className="card-header">
              <div className="card-header-left">
                <Image src={logo} alt={name} width={24} height={24} className="exchange-logo-img" />
                <span className="exchange-name">{name}</span>
              </div>
              <span className="badge-diff">{formatDiff(exchanges[idx].diff)}</span>
            </div>
            <EthValue value={exchanges[idx].eth} className="eth-value flash-update" style={{ opacity: fading ? 0 : 1 }} keyProp={`ex-${idx}-${refreshKey}`} />
          </div>
        ))}
      </div>

      <div className="bottom-spacer" />

      {/* Passkey Modal */}
      <AnimatePresence>
        {passkeyOpen && (
          <PasskeyModal onClose={handlePasskeyClose} />
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
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
              className="bottom-sheet-react"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sheet-handle" />

              <div className="sheet-info-wrap">
                <div className="sheet-info">
                  <Image src="/zkap-app/coin.png" alt="coin" width={40} height={40} className="sheet-info-icon-img" />
                  <div className="sheet-info-text">
                    <span className="sheet-info-line">Buy $50,000 of ETH with ZKAP and</span>
                    <span className="sheet-info-highlight">
                      get up to ${formatNum(diffUsd)} more ({Math.abs(diffEth).toFixed(4)} ETH)
                    </span>
                  </div>
                </div>
                <svg className="sheet-info-tail" viewBox="0 0 17 13" fill="none">
                  <path d="M8.5 13L0 0H17L8.5 13Z" fill="#f8fafc"/>
                </svg>
              </div>

              <div className="sheet-chart">
                <div className="chart-header">
                  <span className="chart-title">ETH Comparison</span>
                  <span className="chart-countdown">Refreshing in {countdown}s</span>
                </div>
                <div className="chart-bars">
                  <div className="bar-col">
                    <div className="bar-label-wrap">
                      <div key={`worst-bar-${refreshKey}`} className="bar-val-box upbit-val flash-update">{worstEth.toFixed(4)}</div>
                      <div className="bar-val-arrow upbit-arrow" />
                    </div>
                    <div className="bar-single" />
                    <div className="bar-name">{exchanges[worstIdx + 1].id === 'binance' ? 'Binance' : exchanges[worstIdx + 1].id === 'okx' ? 'OKX' : exchanges[worstIdx + 1].id === 'bybit' ? 'Bybit' : exchanges[worstIdx + 1].id === 'coinbase' ? 'Coinbase' : exchanges[worstIdx + 1].id === 'gateio' ? 'Gate.io' : 'Bitget'}</div>
                  </div>
                  <div className="bar-col">
                    <div className="bar-label-wrap">
                      <div key={`zkap-bar-${refreshKey}`} className="bar-val-box zkap-val flash-update">{zkapEth.toFixed(4)}</div>
                      <div className="bar-val-arrow zkap-arrow" />
                    </div>
                    <div className="bar-multi">
                      {sortedChartData.map((ex, i) => (
                        <div key={ex.key} style={{ flex: ex.pct, background: SEG_COLORS[i], borderRadius: i === 0 ? '12px 12px 0 0' : i === 5 ? '0 0 12px 12px' : '0', transition: 'flex 0.6s cubic-bezier(0.32, 0.72, 0, 1)' }} />
                      ))}
                    </div>
                    <div className="bar-name bold">Best Rate</div>
                  </div>
                </div>
                <div className="chart-legend">
                  {sortedChartData.map((ex, i) => (
                    <div key={ex.key} className="legend-item">
                      <div className="legend-dot" style={{ background: SEG_COLORS[i] }} />
                      {ex.name} {ex.pct}%
                    </div>
                  ))}
                </div>
              </div>

              <div className="sheet-fee">Est. exchange fee ~$54</div>

              <div className="sheet-cta-area">
                <button className="sheet-cta" onClick={() => { setSheetOpen(false); setPasskeyOpen(true); }}>Buy Now</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
