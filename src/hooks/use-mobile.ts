import { useState, useEffect } from "react";

type Breakpoint = "xs" | "mobile" | "tablet" | "laptop" | "desktop";

// Define breakpoints for better responsive design
export const BREAKPOINTS = {
  xs: 480, // Extra small devices
  mobile: 640, // Small mobile devices
  tablet: 768, // Tablets and large tablets
  laptop: 1024, // Small laptops and large tablets
  desktop: 1280, // Desktop and large laptops
};

// Hook to check if viewport is mobile-sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.tablet);
    };

    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);

    // Set initial value
    checkIfMobile();

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return !!isMobile;
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.xs) {
        setBreakpoint("xs");
      } else if (width < BREAKPOINTS.mobile) {
        setBreakpoint("mobile");
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint("tablet");
      } else if (width < BREAKPOINTS.laptop) {
        setBreakpoint("laptop");
      } else {
        setBreakpoint("desktop");
      }
    };

    // Initial check
    handleResize();

    // Set up event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}

// Helper function to get appropriate column count based on breakpoint
export function getResponsiveGridCols(breakpoint: string) {
  switch (breakpoint) {
    case "xs":
      return "grid-cols-1";
    case "mobile":
      return "grid-cols-1";
    case "tablet":
      return "grid-cols-2";
    case "laptop":
      return "grid-cols-3";
    case "desktop":
      return "grid-cols-4";
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
}
