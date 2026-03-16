'use client';

import { useEffect } from 'react';

export default function StakingLoadingScreen({ onComplete }) {
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

      <div className="os-center">
        <div className="os-dots">
          <div className="os-dot os-dot-1" />
          <div className="os-dot os-dot-2" />
          <div className="os-dot os-dot-3" />
          <div className="os-dot os-dot-4" />
        </div>
        <p className="os-message">Staking your ETH...</p>
      </div>
    </>
  );
}
