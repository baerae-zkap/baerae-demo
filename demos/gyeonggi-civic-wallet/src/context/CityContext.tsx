"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { user } from "@/data/mock";

interface CityContextValue {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const CityContext = createContext<CityContextValue>({
  selectedCity: user.residence,
  setSelectedCity: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState(user.residence);
  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
