import React from 'react';
type Theme = 'dark' | 'light' | 'system';
type ThemeProviderProps = {
    children: React.ReactNode;
};
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};
export declare const ThemeContext: import("react").Context<ThemeProviderState>;
export declare function ThemeProvider({ children }: ThemeProviderProps): JSX.Element;
export declare const useTheme: () => ThemeProviderState;
export {};
