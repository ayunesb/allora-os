
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
}

interface ScrollableTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "outline";
  fullWidth?: boolean;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  variant = "default",
  fullWidth = false,
}) => {
  const handleChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className={cn("relative", fullWidth && "w-full", className)}>
      <div className="overflow-x-auto pb-1 hide-scrollbar">
        <TabsList className={cn(
          "w-max min-w-full flex flex-wrap", // Added flex-wrap to allow multiple rows
          "min-h-[60px]", // Increased minimum height
          "py-2", // Added vertical padding
          variant === "outline" && "bg-transparent p-0 border-b border-border"
        )}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => handleChange(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center", // Ensured vertical alignment
                "px-4 py-2 m-1", // Added margin for better spacing
                "min-h-[40px]", // Minimum height for each tab
                variant === "outline" && "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent",
                activeTab === tab.id ? "data-[state=active]:bg-primary/10" : ""
              )}
            >
              {React.createElement(tab.icon, { className: "h-4 w-4 mr-2" })}
              <span className="whitespace-nowrap">
                {window.innerWidth < 640 && tab.shortLabel ? tab.shortLabel : tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </div>
  );
};

export default ScrollableTabs;
