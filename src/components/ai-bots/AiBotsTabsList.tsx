
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Bot, Lightbulb, History } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";

interface AiBotsTabsListProps {
  isMobileView?: boolean;
}

export const AiBotsTabsList: React.FC<AiBotsTabsListProps> = ({ isMobileView: propsMobileView }) => {
  const breakpoint = useBreakpoint();
  const isMobileView = propsMobileView ?? ['xs', 'mobile'].includes(breakpoint);
  const isTabletView = breakpoint === 'tablet';

  return (
    <TabsList className={`w-full mb-6 overflow-x-auto flex justify-start ${
      isMobileView ? 'flex-wrap gap-1' : 
      isTabletView ? 'tabs-flex-wrap gap-1.5' : 'gap-2'
    }`}>
      <TabsTrigger 
        value="boardroom" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <Brain className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>Executive Boardroom</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="debate" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>Start Debate</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="bots" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <Bot className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>Executive Advisors</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="insights" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <Lightbulb className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>AI Insights</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="chat" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>AI Chat</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="roster" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <Brain className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>Full Roster</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="history" 
        className={`flex items-center ${
          isMobileView ? 'text-xs px-2 py-1 tab-compact' : 
          isTabletView ? 'text-sm px-2.5 py-1 tab-text-sm' : 
          'gap-2'
        }`}
      >
        <History className="h-4 w-4" />
        <span className={isMobileView ? "sr-only md:not-sr-only" : ""}>Consultation History</span>
      </TabsTrigger>
    </TabsList>
  );
};
