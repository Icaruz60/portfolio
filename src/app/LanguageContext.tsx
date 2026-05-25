"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { T, type Lang, type Translations } from "./translations";

const STORAGE_KEY = "portfolio-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  hasChosen: boolean;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  hasChosen: false,
  t: T.en,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [hasChosen, setHasChosen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "de") {
      setLangState(saved);
      setHasChosen(true);
    }
    setMounted(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    setHasChosen(true);
    localStorage.setItem(STORAGE_KEY, l);
  };

  // Avoid hydration mismatch — render nothing until localStorage is read
  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, hasChosen, t: T[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
