'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleSignInSheet from './AppleSignInSheet';

const INITIAL_ACCOUNTS = [
  { id: 1, type: 'google', name: 'Google', email: 'zkap@baerae.com', mine: true },
];

let nextId = 3;

function GoogleIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09A6.97 6.97 0 015.46 12c0-.72.13-1.43.36-2.09V7.07H2.18A11.96 11.96 0 001 12c0 1.94.46 3.77 1.18 5.07l3.66-2.98z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon({ size = 20, color = '#000' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 170 170" fill={color}>
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.52 3.24-12.68 3.35-4.93.21-9.84-1.96-14.75-6.52-3.13-2.73-7.04-7.41-11.76-14.04-5.05-7.08-9.2-15.29-12.46-24.65C18.79 110.64 17 100.83 17 91.3c0-10.91 2.36-20.31 7.07-28.18A41.49 41.49 0 0138.85 48.6a39.75 39.75 0 0120.07-5.69c3.92 0 9.06 1.21 15.43 3.59 6.36 2.39 10.44 3.6 12.24 3.6 1.35 0 5.92-1.42 13.67-4.24 7.32-2.62 13.51-3.71 18.58-3.27 13.73 1.11 24.05 6.52 30.88 16.27-12.28 7.44-18.36 17.86-18.25 31.22.11 10.41 3.89 19.08 11.33 25.97 3.37 3.2 7.13 5.67 11.29 7.42-.91 2.63-1.86 5.15-2.87 7.57zM119.11 7.24c0 8.17-2.98 15.79-8.93 22.83-7.18 8.4-15.86 13.25-25.27 12.49a25.4 25.4 0 01-.19-3.09c0-7.83 3.41-16.21 9.47-23.07 3.03-3.47 6.88-6.35 11.57-8.65 4.68-2.26 9.1-3.51 13.27-3.75.12 1.1.18 2.19.18 3.24z"/>
    </svg>
  );
}

export default function WalletRecoveryScreen({ onBack, onComplete }) {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [appleSignIn, setAppleSignIn] = useState(false);

  const removeAccount = (id) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSocialLogin = useCallback((type) => {
    setSheetOpen(false);
    if (type === 'apple') {
      setTimeout(() => setAppleSignIn(true), 400);
      return;
    }
    // Google: simulate login delay then add account
    setTimeout(() => {
      setAccounts((prev) => [...prev, {
        id: nextId++,
        type: 'google',
        name: 'Google',
        email: 'backup@gmail.com',
        mine: false,
      }]);
    }, 800);
  }, []);

  const handleAppleComplete = useCallback(() => {
    setAppleSignIn(false);
    setAccounts((prev) => [...prev, {
      id: nextId++,
      type: 'apple',
      name: 'Apple',
      email: 'zkap@icloud.com',
      mine: false,
    }]);
  }, []);

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
        <div className="title">Protect Your Wallet</div>
        <div className="subtitle">
          Add multiple recovery methods so you can regain<br />
          access even if one account has an issue.
        </div>
      </div>

      <div className="wr-accounts">
        {accounts.map((acc) => (
          <div key={acc.id} className="wr-card">
            <div className="wr-card-left">
              <div className="wr-card-icon">
                {acc.type === 'google' ? <GoogleIcon /> : <AppleIcon />}
              </div>
              <div className="wr-card-info">
                <span className="wr-card-name">{acc.name}</span>
                <span className="wr-card-email">{acc.email}</span>
              </div>
            </div>
            {acc.mine ? (
              <span className="wr-card-badge">My Account</span>
            ) : (
              <button className="wr-card-remove" onClick={() => removeAccount(acc.id)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8e9b" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div className="wr-bottom">
        <button className="wr-add-btn" onClick={() => setSheetOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#8a8e9b"/>
            <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Add Recovery Account</span>
        </button>
        <button className="cta-btn" onClick={onComplete}>Create Wallet</button>
      </div>

      {/* Apple Sign In Sheet */}
      <AnimatePresence>
        {appleSignIn && (
          <AppleSignInSheet onClose={() => setAppleSignIn(false)} onComplete={handleAppleComplete} />
        )}
      </AnimatePresence>

      {/* Social Login Bottom Sheet */}
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
              className="wr-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="sheet-handle" />
              <h3 className="wr-sheet-title">Choose Recovery Method</h3>
              <p className="wr-sheet-desc">
                The selected account will be used to recover<br />
                your wallet if you lose access.
              </p>

              <div className="wr-sheet-buttons">
                <button className="wr-social-btn wr-social-google" onClick={() => handleSocialLogin('google')}>
                  <GoogleIcon size={22} />
                  <span>Connect with Google</span>
                </button>
                <button className="wr-social-btn wr-social-apple" onClick={() => handleSocialLogin('apple')}>
                  <AppleIcon size={18} color="#fff" />
                  <span>Connect with Apple</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
