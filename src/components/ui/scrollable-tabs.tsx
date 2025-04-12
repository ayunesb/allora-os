
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
}

interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "outline" | "underline";
  iconPosition?: "left" | "top";
  iconSize?: number;
  fullWidth?: boolean;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
  iconPosition = "left",
  iconSize = 4,
  fullWidth = false,
}) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'sm', 'mobile'].includes(breakpoint);
  const isTabletView = ['md'].includes(breakpoint);

  // Handle tab click if onTabChange is provided
  const handleTabClick = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  const getTabsListClassName = () => {
    let baseClass = "overflow-x-auto scrollbar-thin safari-fix w-full";
    
    if (fullWidth) {
      baseClass += " grid";
      baseClass += isMobileView 
        ? " grid-cols-4 gap-1" 
        : isTabletView 
          ? " grid-cols-6 gap-1" 
          : " grid-cols-8";
    } else {
      baseClass += " flex tabs-scrollable";
    }
    
    if (variant === "outline") {
      baseClass += " border border-gray-200 dark:border-gray-800 rounded-md";
    } else if (variant === "underline") {
      baseClass += " border-b border-gray-200 dark:border-gray-800 rounded-none";
    }
    
    return cn(baseClass, className);
  };

  return (
    <TabsList className={getTabsListClassName()}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "min-w-max",
              isMobileView 
                ? "text-xs px-2 py-1 tab-compact" 
                : isTabletView 
                  ? "text-sm px-2.5 py-1.5" 
                  : "gap-2 px-3 py-2",
              iconPosition === "top" && "flex-col"
            )}
          >
            {Icon && (
              <Icon className={cn(
                `h-${iconSize} w-${iconSize}`,
                iconPosition === "left" && (isMobileView ? "mr-1" : "mr-2")
              )} />
            )}
            <span className={cn(
              isMobileView && (!tab.shortLabel || tab.shortLabel === tab.label) ? "sr-only" : "",
              isMobileView && tab.shortLabel && tab.shortLabel !== tab.label ? "" : ""
            )}>
              {isMobileView && tab.shortLabel ? tab.shortLabel : tab.label}
            </span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default ScrollableTabs;
