
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'mobile' | 'tablet' | 'laptop' | 'desktop';

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setBreakpoint('xs');
      } else if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else if (width < 1280) {
        setBreakpoint('laptop');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Initial check
    handleResize();

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}
