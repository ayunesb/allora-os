import React, { createContext, useContext, useState, useEffect } from "react";
import { detectUserLanguage } from "@/utils/languageDetector";
const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
});
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    // Try to detect user's language from browser
    const browserLanguage = detectUserLanguage(
      navigator.languages
        ? navigator.languages.join(",")
        : navigator.language || navigator.userLanguage || "",
    );
    // Only set language if it's one we support
    if (["en", "es", "fr"].includes(browserLanguage)) {
      setLanguage(browserLanguage);
    }
    // Store the language preference
    localStorage.setItem("preferredLanguage", browserLanguage);
  }, []);
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}
