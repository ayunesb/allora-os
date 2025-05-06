import { type ThemeProviderProps } from "next-themes/dist/types";
type ThemeProviderState = {
  theme: string;
  setTheme: (theme: string) => void;
};
export declare function ThemeProvider({
  children,
  defaultTheme,
  ...props
}: ThemeProviderProps): import("react").JSX.Element;
export declare const useTheme: () => ThemeProviderState;
export {};
