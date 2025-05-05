import React, { createContext, useContext, useEffect, useState } from 'react';
const initialState = {
    theme: 'system',
    setTheme: () => null,
};
export const ThemeContext = createContext(initialState);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check if we have a stored theme preference
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('allora-theme');
            return storedTheme || 'dark';
        }
        return 'dark';
    });
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    // Store theme preference in localStorage
    useEffect(() => {
        localStorage.setItem('allora-theme', theme);
    }, [theme]);
    const value = {
        theme,
        setTheme: (theme) => {
            setTheme(theme);
        },
    };
    return (<ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>);
}
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
