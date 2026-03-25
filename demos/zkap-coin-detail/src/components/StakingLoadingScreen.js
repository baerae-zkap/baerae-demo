'use client';

import { useEffect, useState } from 'react';

function StepIndicator({ current, total = 4 }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`step-dot ${i < current ? 'step-dot-done' : ''} ${i === current ? 'step-dot-active' : ''}`} />
      ))}
    </div>
  );
}

export default function StakingLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      <div className="os-header">
        <span className="os-header-title">Staking</span>
      </div>

      <StepIndicator current={2} />

      <div className="os-center">
        <div className="stk-loading-logo">
          <div className="stk-loading-ring" />
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="stk-loading-eth">
            <path d="M20 4L8 20.5L20 27L32 20.5L20 4Z" fill="#627eea" fillOpacity="0.9" />
            <path d="M8 22.5L20 36L32 22.5L20 29L8 22.5Z" fill="#627eea" fillOpacity="0.6" />
          </svg>
        </div>
        <p className="os-message">Staking your ETH...</p>
        <p className="stk-loading-sub">This may take a moment</p>
      </div>

      <div className="stk-loading-progress-wrap">
        <div className="stk-loading-progress-track">
          <div className="stk-loading-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="stk-loading-progress-label">{Math.min(progress, 100)}%</div>
      </div>
    </>
  );
}
