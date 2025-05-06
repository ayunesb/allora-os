type Breakpoint = "xs" | "mobile" | "tablet" | "laptop" | "desktop";
export declare const BREAKPOINTS: {
  xs: number;
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
};
export declare function useIsMobile(): boolean;
export declare function useBreakpoint(): Breakpoint;
export declare function getResponsiveGridCols(
  breakpoint: string,
):
  | "grid-cols-1"
  | "grid-cols-2"
  | "grid-cols-3"
  | "grid-cols-4"
  | "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
export {};
