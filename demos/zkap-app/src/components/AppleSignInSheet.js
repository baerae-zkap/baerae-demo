'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FaceIdIcon({ color = '#000', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M14 2H7a5 5 0 00-5 5v7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M34 2h7a5 5 0 015 5v7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M14 46H7a5 5 0 01-5-5v-7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M34 46h7a5 5 0 005-5v-7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 15v7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 15v7" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <path d="M24 22v7h-3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 35c1.5 2.5 4.5 4 8 4s6.5-1.5 8-4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7.5l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function AppleSignInSheet({ onClose, onComplete }) {
  const [emailOption, setEmailOption] = useState('hide');
  const [phase, setPhase] = useState('form'); // form → faceid → done

  const handleContinue = useCallback(() => {
    setPhase('faceid');
  }, []);

  useEffect(() => {
    if (phase === 'faceid') {
      const t = setTimeout(() => setPhase('done'), 2000);
      return () => clearTimeout(t);
    }
    if (phase === 'done') {
      const t = setTimeout(() => onComplete(), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <>
      <motion.div
        className="sheet-overlay-react"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        className="apple-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Header */}
        <div className="apple-sheet-header">
          <div style={{ width: 30 }} />
          <h3 className="apple-sheet-title">Apple ID</h3>
          <button className="apple-sheet-close" onClick={onClose}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* App icon centered */}
        <div className="apple-sheet-app-center">
          <div className="apple-sheet-app-icon">
            <img src="/zkap-app/logo.png" alt="ZKAP" className="apple-sheet-app-img" />
          </div>
        </div>

        {/* Description centered */}
        <p className="apple-sheet-desc">
          Create an account for ZKAP using<br />
          your Apple ID &ldquo;zkap@icloud.com&rdquo;
        </p>

        {/* Name field */}
        <div className="apple-sheet-field">
          <div className="apple-sheet-field-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#8a8e9b">
              <circle cx="12" cy="8" r="4"/>
              <path d="M20 21a8 8 0 10-16 0"/>
            </svg>
          </div>
          <div className="apple-sheet-field-content">
            <span className="apple-sheet-field-label">Name</span>
            <span className="apple-sheet-field-value">ZKAP User</span>
          </div>
          <button className="apple-sheet-field-clear">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#c7c7cc"/>
              <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Email options */}
        <div className="apple-sheet-email-group">
          <button className={`apple-sheet-email-row${emailOption === 'share' ? ' apple-email-active' : ''}`} onClick={() => setEmailOption('share')}>
            <div className="apple-sheet-email-left">
              <div className="apple-sheet-email-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <path d="M2 8l10 6 10-6"/>
                </svg>
              </div>
              <div className="apple-sheet-email-text">
                <span className="apple-sheet-email-title">Share My Email</span>
                <span className="apple-sheet-email-desc">zkap@icloud.com</span>
              </div>
            </div>
            <div className={`apple-radio${emailOption === 'share' ? ' apple-radio-on' : ''}`}>
              {emailOption === 'share' && <CheckIcon />}
            </div>
          </button>

          <div className="apple-sheet-email-divider" />

          <button className={`apple-sheet-email-row${emailOption === 'hide' ? ' apple-email-active' : ''}`} onClick={() => setEmailOption('hide')}>
            <div className="apple-sheet-email-left">
              <div className="apple-sheet-email-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3"/>
                  <path d="M2 8l10 6 10-6"/>
                </svg>
              </div>
              <div className="apple-sheet-email-text">
                <span className="apple-sheet-email-title">Hide My Email</span>
                <span className="apple-sheet-email-desc">Forward to: zkap@icloud.com</span>
              </div>
            </div>
            <div className={`apple-radio${emailOption === 'hide' ? ' apple-radio-on' : ''}`}>
              {emailOption === 'hide' && <CheckIcon />}
            </div>
          </button>
        </div>

        {/* Continue / Face ID area */}
        <div className="apple-sheet-cta-area">
          <AnimatePresence mode="wait">
            {phase === 'form' && (
              <motion.button
                key="cta"
                className="apple-sheet-cta"
                onClick={handleContinue}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Continue
              </motion.button>
            )}
            {(phase === 'faceid' || phase === 'done') && (
              <motion.div
                key="faceid"
                className="apple-sheet-faceid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {phase === 'faceid' && (
                    <motion.div key="fid" className="apple-sheet-faceid-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                      <FaceIdIcon color="#007AFF" size={44} />
                      <span className="apple-sheet-faceid-label">Face ID</span>
                    </motion.div>
                  )}
                  {phase === 'done' && (
                    <motion.div key="chk" className="apple-sheet-faceid-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <circle cx="22" cy="22" r="19" stroke="#007AFF" strokeWidth="3" fill="none"/>
                        <path d="M13 23l6 6 12-12" stroke="#007AFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="apple-sheet-faceid-label" style={{ color: '#007AFF' }}>Done</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
