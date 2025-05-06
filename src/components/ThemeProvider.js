var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const ThemeProviderContext = createContext(undefined);
export function ThemeProvider(_a) {
    var { children, defaultTheme = "dark" } = _a, props = __rest(_a, ["children", "defaultTheme"]);
    const [theme, setTheme] = useState(defaultTheme);
    useEffect(() => {
        // Apply theme class to document element
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);
    return (_jsx(ThemeProviderContext.Provider, { value: { theme, setTheme }, children: _jsx(NextThemesProvider, Object.assign({}, props, { defaultTheme: "dark", storageKey: "allora-theme", children: children })) }));
}
export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
