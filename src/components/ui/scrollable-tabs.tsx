
import React, { useState, useRef, useEffect } from 'react';
import { TabsList, TabsTrigger } from "./tabs";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
}

export interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange?: (value: string) => void;
  variant?: 'default' | 'outline' | 'futuristic';
  className?: string;
  fullWidth?: boolean;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  variant = 'default',
  className,
  fullWidth = false,
}) => {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [useShortLabels, setUseShortLabels] = useState(false);
  
  // Check if scrolling is needed
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Check viewport width to determine if short labels should be used
  useEffect(() => {
    const checkViewportWidth = () => {
      setUseShortLabels(window.innerWidth < 640);
    };

    checkViewportWidth();
    window.addEventListener('resize', checkViewportWidth);
    return () => window.removeEventListener('resize', checkViewportWidth);
  }, []);
  
  // Initialize scroll check
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [tabs, useShortLabels]);
  
  // Handle scrolling
  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Check buttons after scrolling
      setTimeout(checkScrollButtons, 300);
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      {showLeftScroll && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background shadow-md"
          onClick={() => scrollTabs('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div
        className="overflow-x-auto scrollbar-hide"
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
      >
        <TabsList 
          className={cn(
            "w-max min-w-full", 
            variant === 'outline' && "bg-transparent border-b rounded-none p-0",
            variant === 'futuristic' && "bg-transparent border border-primary/20 rounded-lg p-1",
            fullWidth && "w-full"
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                variant === 'outline' && "border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent rounded-none px-4 pb-3",
                variant === 'futuristic' && "data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md",
                "min-w-[100px]"
              )}
            >
              <div className="flex items-center">
                {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
                <span>{useShortLabels && tab.shortLabel ? tab.shortLabel : tab.label}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {showRightScroll && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-background shadow-md"
          onClick={() => scrollTabs('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ScrollableTabs;
