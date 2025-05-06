import React, { useRef, useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpTooltip } from "@/components/help/HelpTooltip";
export default function ScrollableTabs({
  tabs,
  activeTab,
  onTabChange,
  isLoading = false,
  className,
  variant = "default",
}) {
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const scrollRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);
  // Check if we need to show scroll buttons
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };
    // Check if viewport is narrow
    const checkWidth = () => {
      setIsNarrow(window.innerWidth < 640);
    };
    checkScroll();
    checkWidth();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
    }
    window.addEventListener("resize", () => {
      checkScroll();
      checkWidth();
    });
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("resize", checkWidth);
    };
  }, [tabs]);
  // Scroll handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <div className={cn("relative", className)}>
      {showLeftScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <ScrollArea className="w-full" scrollHideDelay={100}>
        <div
          ref={scrollRef}
          className={cn(
            "flex w-full overflow-x-auto scrollbar-none space-x-1 pb-1",
            variant === "pills" && "p-1 bg-muted/50 rounded-lg",
          )}
        >
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const labelToShow =
              isNarrow && tab.shortLabel ? tab.shortLabel : tab.label;
            const tabButton = (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                disabled={tab.disabled || isLoading}
                className={cn(
                  "flex items-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all",
                  variant === "default" && [
                    "border-b-2",
                    activeTab === tab.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ],
                  variant === "outline" && [
                    "rounded-md border",
                    activeTab === tab.id
                      ? "border-primary/50 bg-primary/5 text-foreground"
                      : "border-transparent hover:border-border hover:bg-muted/50",
                  ],
                  variant === "pills" && [
                    "rounded-md",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ],
                  tab.disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                {TabIcon && <TabIcon className="mr-2 h-4 w-4" />}
                {labelToShow}
              </button>
            );
            return tab.tooltip ? (
              <HelpTooltip key={tab.id} content={tab.tooltip} icon={false}>
                {tabButton}
              </HelpTooltip>
            ) : (
              tabButton
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      {showRightScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
