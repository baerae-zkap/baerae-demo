'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function FaceIdIcon({ color = '#0088ff', size = 48 }) {
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
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#0088ff"/>
      <path d="M14 24l7 7 13-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function PasskeyModal({ onClose }) {
  const [phase, setPhase] = useState('initial');

  const handleContinue = useCallback(() => {
    setPhase('faceid');
  }, []);

  useEffect(() => {
    if (phase === 'faceid') {
      const t = setTimeout(() => setPhase('signing'), 800);
      return () => clearTimeout(t);
    }
    if (phase === 'signing') {
      const t = setTimeout(() => setPhase('done'), 600);
      return () => clearTimeout(t);
    }
    if (phase === 'done') {
      const t = setTimeout(() => onClose(), 800);
      return () => clearTimeout(t);
    }
  }, [phase, onClose]);

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="pk-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Face ID Scanner - top center of screen */}
      <AnimatePresence>
        {(phase === 'faceid' || phase === 'signing') && (
          <motion.div
            className="pk-scanner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pk-scanner-inner">
              <AnimatePresence mode="wait">
                {phase === 'faceid' && (
                  <motion.div
                    key="faceid-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FaceIdIcon color="#34C759" size={64} />
                  </motion.div>
                )}
                {phase === 'signing' && (
                  <motion.div
                    key="check-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                      <circle
                        cx="32" cy="32" r="28"
                        stroke="#34C759" strokeWidth="3.5" fill="none"
                        className="pk-check-circle"
                      />
                      <path
                        d="M20 33l9 9 15-15"
                        stroke="#34C759" strokeWidth="3.5" fill="none"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="pk-check-mark"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sheet */}
      <motion.div
        className="pk-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pk-grabber" />

        <button className="pk-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="pk-content">
          {/* Icon + Title + Description: always visible */}
          <div className="pk-faceid-icon">
            <FaceIdIcon color="#0088ff" size={48} />
          </div>
          <div className="pk-texts">
            <h2 className="pk-title">Use Face ID to sign in?</h2>
            <p className="pk-desc">
              A passkey for &quot;zkap@baerae.com&quot; will be saved in Passwords and available on all your devices.
            </p>
          </div>

          {/* Bottom action area: changes per phase */}
          <div className="pk-action-area">
            {phase === 'initial' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button className="pk-continue" onClick={handleContinue}>
                  Continue
                </button>
              </motion.div>
            )}

            {phase === 'faceid' && (
              <motion.div className="pk-action-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FaceIdIcon color="#0088ff" size={48} />
                <span className="pk-status-label">Face ID</span>
              </motion.div>
            )}

            {phase === 'signing' && (
              <motion.div className="pk-action-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="pk-spinner" />
                <span className="pk-status-label">Signing In</span>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div className="pk-action-status" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <CheckIcon />
                <span className="pk-status-label">Done</span>
              </motion.div>
            )}
          </div>
        </div>

      </motion.div>
    </>
  );
}
