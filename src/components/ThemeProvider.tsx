import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
const ThemeProviderContext = createContext(undefined);
export function ThemeProvider({ children, defaultTheme = "dark", ...props }) {
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    // Apply theme class to document element
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      <NextThemesProvider
        {...props}
        defaultTheme="dark"
        storageKey="allora-theme"
      >
        {children}
      </NextThemesProvider>
    </ThemeProviderContext.Provider>
  );
}
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
