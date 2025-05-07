"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider as NextThemeProvider } from "next-themes";
export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "allora-theme", }) {
    return (_jsx(NextThemeProvider, { attribute: "class", defaultTheme: defaultTheme, enableSystem: false, storageKey: storageKey, children: children }));
}
