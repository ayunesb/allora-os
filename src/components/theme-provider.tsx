"use client";
import * as React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "allora-theme",
}) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
      storageKey={storageKey}
    >
      {children}
    </NextThemeProvider>
  );
}
