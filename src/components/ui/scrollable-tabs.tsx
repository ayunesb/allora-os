
import React, { useState, useRef, useEffect } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: React.ComponentType<any>;
}

interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "outline" | "futuristic";
  fullWidth?: boolean;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
  fullWidth = false
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const checkForArrows = () => {
    if (!tabsRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  useEffect(() => {
    checkForArrows();
    window.addEventListener("resize", checkForArrows);
    
    return () => {
      window.removeEventListener("resize", checkForArrows);
    };
  }, [tabs]);

  const scroll = (direction: "left" | "right") => {
    if (!tabsRef.current) return;
    
    const { clientWidth } = tabsRef.current;
    const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
    
    tabsRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    
    // Check arrows after scroll animation completes
    setTimeout(checkForArrows, 300);
  };

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "outline":
        return "border border-border rounded-lg p-1";
      case "futuristic":
        return "bg-black/30 border border-white/10 backdrop-blur-md rounded-lg p-1";
      default:
        return "bg-muted rounded-lg p-1";
    }
  };

  const getActiveItemStyles = (variant: string, isActive: boolean) => {
    if (!isActive) return "";
    
    switch (variant) {
      case "outline":
        return "bg-muted";
      case "futuristic":
        return "bg-primary/20 text-white data-[state=active]:text-white";
      default:
        return "bg-background";
    }
  };

  return (
    <div className={cn("relative w-full group", fullWidth && "max-w-full")}>
      {showLeftArrow && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm border border-border/50 opacity-80 hover:opacity-100"
          onClick={() => scroll("left")}
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <TabsList
        ref={tabsRef}
        className={cn(
          "flex overflow-x-auto scrollbar-thin w-full justify-start",
          getVariantStyles(variant),
          className
        )}
        onScroll={checkForArrows}
      >
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={cn(
              "relative flex-shrink-0 transition-all font-medium",
              getActiveItemStyles(variant, activeTab === tab.id),
              variant === "futuristic" && "py-1.5"
            )}
          >
            {variant === "futuristic" && activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-background"
                className="absolute inset-0 bg-primary/20 rounded-md -z-10"
                initial={false}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            
            {variant === "futuristic" && hoverIndex === index && activeTab !== tab.id && (
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-md -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            
            <div className="flex items-center gap-2">
              {tab.icon && React.createElement(tab.icon, { 
                className: cn(
                  "h-4 w-4", 
                  variant === "futuristic" && activeTab === tab.id 
                    ? "text-primary" 
                    : "text-muted-foreground group-hover:text-primary/80"
                )
              })}
              <span>{tab.shortLabel || tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {showRightArrow && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 bg-background/80 backdrop-blur-sm border border-border/50 opacity-80 hover:opacity-100"
          onClick={() => scroll("right")}
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ScrollableTabs;
