import { ReactNode } from "react";
type SupportedLanguage = "en" | "es" | "fr";
interface LanguageContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
}
export declare function LanguageProvider({ children }: {
    children: ReactNode;
}): JSX.Element;
export declare function useLanguage(): LanguageContextType;
export {};
