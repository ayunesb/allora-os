
import * as React from "react"

// Define breakpoints for better responsive design
export const BREAKPOINTS = {
  xs: 480,    // Extra small devices
  mobile: 640,  // Small mobile devices
  tablet: 768,  // Tablets and large mobile devices
  laptop: 1024, // Small laptops and large tablets
  desktop: 1280 // Desktop and large laptops
}

// Hook to check if viewport is mobile-sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.tablet)
    }
    
    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile)
    
    // Set initial value
    checkIfMobile()
    
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return !!isMobile
}

// Hook to detect viewport size more precisely
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'xs'|'mobile'|'tablet'|'laptop'|'desktop'>('desktop')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.xs) {
        setBreakpoint('xs')
      } else if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('tablet')
      } else if (width < BREAKPOINTS.laptop) {
        setBreakpoint('laptop')
      } else {
        setBreakpoint('desktop')
      }
    }

    window.addEventListener('resize', updateBreakpoint)
    // Set initial value
    updateBreakpoint()
    
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Helper function to get appropriate column count based on breakpoint
export function getResponsiveGridCols(breakpoint: string) {
  switch(breakpoint) {
    case 'xs':
      return 'grid-cols-1';
    case 'mobile':
      return 'grid-cols-1';
    case 'tablet':
      return 'grid-cols-2';
    case 'laptop':
      return 'grid-cols-3';
    case 'desktop':
      return 'grid-cols-4';
    default:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }
}
