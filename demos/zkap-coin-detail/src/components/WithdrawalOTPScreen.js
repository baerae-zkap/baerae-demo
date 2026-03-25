'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OTP_CODE = '384729';

const NUM_KEYS = [
  { num: '1', sub: '' },
  { num: '2', sub: 'ABC' },
  { num: '3', sub: 'DEF' },
  { num: '4', sub: 'GHI' },
  { num: '5', sub: 'JKL' },
  { num: '6', sub: 'MNO' },
  { num: '7', sub: 'PQRS' },
  { num: '8', sub: 'TUV' },
  { num: '9', sub: 'WXYZ' },
  { num: 'sym', sub: '' },
  { num: '0', sub: '' },
  { num: 'del', sub: '' },
];

export default function WithdrawalOTPScreen({ onBack, onComplete, exchangeName }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [suggestionVisible, setSuggestionVisible] = useState(false);
  const [filling, setFilling] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const t = setTimeout(() => setSuggestionVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleAutofill = useCallback(() => {
    if (filling) return;
    setFilling(true);
    setSuggestionVisible(false);

    OTP_CODE.split('').forEach((d, i) => {
      setTimeout(() => {
        setDigits((prev) => {
          const next = [...prev];
          next[i] = d;
          return next;
        });
      }, i * 50);
    });

    setTimeout(() => {
      if (onComplete) onComplete();
    }, OTP_CODE.length * 50 + 600);
  }, [filling, onComplete]);

  const handleKey = useCallback((val) => {
    if (filling) return;
    setDigits((prev) => {
      const next = [...prev];
      if (val === 'del') {
        const lastIdx = next.findLastIndex((d) => d !== '');
        if (lastIdx >= 0) next[lastIdx] = '';
      } else {
        const firstEmpty = next.findIndex((d) => d === '');
        if (firstEmpty >= 0) next[firstEmpty] = val;
        if (next.every((d) => d !== '')) {
          setTimeout(() => { if (onComplete) onComplete(); }, 600);
        }
      }
      return next;
    });
  }, [filling, onComplete]);

  return (
    <div className="otp-root">
      {/* Top content */}
      <div className="otp-top">
        <div className="nav-bar">
          <button className="back-btn" onClick={onBack}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M17 7L10 14L17 21" stroke="#1a1e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="text-container">
          <div className="title">Withdrawal Verification</div>
          <div className="subtitle">
            Enter the code sent to your {exchangeName}<br />
            registered email z***@baerae.com
          </div>
        </div>

        <div className="otp-boxes">
          {digits.map((d, i) => (
            <motion.div
              key={i}
              className={`otp-box${d ? ' otp-box-filled' : ''}`}
              animate={d ? { scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.15 }}
            >
              {d}
            </motion.div>
          ))}
        </div>

        <div className="otp-resend">
          <span className="otp-resend-text">Didn&apos;t receive a code?</span>
          {countdown > 0 ? (
            <span className="otp-resend-timer">Resend in {countdown}s</span>
          ) : (
            <button className="otp-resend-btn" onClick={() => setCountdown(60)}>Resend</button>
          )}
        </div>
      </div>

      {/* iOS Number Pad - always at bottom */}
      <div className="ios-kb">
        {/* Toolbar / suggestion area */}
        <div className="ios-kb-toolbar">
          <AnimatePresence>
            {suggestionVisible && (
              <motion.button
                className="ios-kb-otp-suggest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleAutofill}
              >
                <span className="ios-kb-otp-from">From Mail</span>
                <span className="ios-kb-otp-code">{OTP_CODE}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Number grid */}
        <div className="ios-numpad">
          {NUM_KEYS.map(({ num, sub }, i) => {
            if (num === 'sym') {
              return (
                <div key="sym" className="ios-numpad-sym">
                  <span>+</span><span>✱</span><span>#</span>
                </div>
              );
            }
            if (num === 'del') {
              return (
                <button key="del" className="ios-numpad-del" onClick={() => handleKey('del')}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1e2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/>
                    <line x1="18" y1="9" x2="12" y2="15"/>
                    <line x1="12" y1="9" x2="18" y2="15"/>
                  </svg>
                </button>
              );
            }
            return (
              <button key={num} className="ios-numpad-key" onClick={() => handleKey(num)}>
                <span className="ios-numpad-num">{num}</span>
                {sub && <span className="ios-numpad-sub">{sub}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
