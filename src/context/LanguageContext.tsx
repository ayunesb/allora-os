
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { detectUserLanguage } from "@/utils/languageDetector";

type SupportedLanguage = "en" | "es" | "fr";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  useEffect(() => {
    // Try to detect user's language from browser
    const browserLanguage = detectUserLanguage(navigator.languages ? 
      navigator.languages.join(',') : 
      (navigator.language || (navigator as any).userLanguage || ""));
    
    // Only set language if it's one we support
    if (["en", "es", "fr"].includes(browserLanguage)) {
      setLanguage(browserLanguage as SupportedLanguage);
    }
    
    // Store the language preference
    localStorage.setItem("preferredLanguage", browserLanguage);
  }, []);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
