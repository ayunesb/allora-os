
import * as React from "react"

// Define breakpoints for better responsive design
export const BREAKPOINTS = {
  mobile: 640,  // Small mobile devices
  tablet: 768,  // Tablets and large mobile devices
  laptop: 1024, // Small laptops and large tablets
  desktop: 1280 // Desktop and large laptops
}

// Hook to check if viewport is mobile-sized
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.tablet)
    }
    
    mql.addEventListener("change", onChange)
    // Set initial value
    setIsMobile(window.innerWidth < BREAKPOINTS.tablet)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Hook to detect viewport size more precisely
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile'|'tablet'|'laptop'|'desktop'>('desktop')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
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
