import * as React from "react";
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}
export declare function ThemeProvider({
  children,
  defaultTheme,
  storageKey,
}: ThemeProviderProps): React.JSX.Element;
export {};
