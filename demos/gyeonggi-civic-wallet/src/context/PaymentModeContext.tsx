"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PaymentModeContextType {
  isPaymentMode: boolean;
  openPaymentMode: () => void;
  closePaymentMode: () => void;
}

const PaymentModeContext = createContext<PaymentModeContextType>({
  isPaymentMode: false,
  openPaymentMode: () => {},
  closePaymentMode: () => {},
});

export function PaymentModeProvider({ children }: { children: ReactNode }) {
  const [isPaymentMode, setIsPaymentMode] = useState(false);

  return (
    <PaymentModeContext.Provider
      value={{
        isPaymentMode,
        openPaymentMode: () => setIsPaymentMode(true),
        closePaymentMode: () => setIsPaymentMode(false),
      }}
    >
      {children}
    </PaymentModeContext.Provider>
  );
}

export function usePaymentMode() {
  return useContext(PaymentModeContext);
}
