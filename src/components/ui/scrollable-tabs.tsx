
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
  count?: number;
}

export interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  variant?: 'default' | 'outline';
  isLoading?: boolean;
  className?: string;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  isLoading = false,
  className,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if scroll arrows should be shown
  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  // Initialize on mount and when tabs change
  useEffect(() => {
    checkScrollArrows();
    // Add resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(() => {
      checkScrollArrows();
    });
    
    if (tabsContainerRef.current) {
      resizeObserver.observe(tabsContainerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [tabs]);

  // Scroll to the active tab on mount and when activeTab changes
  useEffect(() => {
    if (scrollContainerRef.current && tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-value="${activeTab}"]`) as HTMLElement;
      
      if (activeTabElement) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const activeTabRect = activeTabElement.getBoundingClientRect();
        
        const isInView = 
          activeTabRect.left >= containerRect.left &&
          activeTabRect.right <= containerRect.right;
          
        if (!isInView) {
          const scrollLeft = 
            activeTabRect.left - 
            containerRect.left + 
            scrollContainerRef.current.scrollLeft - 
            16; // Add some padding
            
          scrollContainerRef.current.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeTab]);

  // Handle scroll events
  const handleScroll = () => {
    checkScrollArrows();
  };

  // Scroll left/right functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newScrollLeft = scrollContainerRef.current.scrollLeft - 200;
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 200;
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className={cn("w-full py-4", className)}>
        <Loading center text="Loading tabs..." />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={tabsContainerRef}>
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-md"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-none"
        onScroll={handleScroll}
      >
        <div className={cn(
          "inline-flex min-w-full p-1 gap-1",
          variant === 'outline' ? "border rounded-lg" : "bg-muted rounded-lg"
        )}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md",
                  "min-w-[5rem]",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40",
                  variant === 'outline' && !isActive && "hover:bg-background"
                )}
                onClick={() => onTabChange(tab.id)}
                data-value={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-tab`}
                tabIndex={isActive ? 0 : -1}
              >
                {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.shortLabel || tab.label}</span>
                {tab.count !== undefined && (
                  <span className={cn(
                    "ml-2 rounded-full px-1.5 py-0.5 text-xs",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted-foreground/10 text-muted-foreground"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background shadow-md"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ScrollableTabs;
