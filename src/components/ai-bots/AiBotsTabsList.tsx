
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
    <div className="w-full max-w-full overflow-hidden">
      <TabsList className={`w-full mb-6 overflow-x-auto scrollbar-thin py-1 ${
        isMobileView ? 'tabs-scrollable flex-nowrap' : 
        isTabletView ? 'flex flex-wrap gap-1' : 'flex gap-2'
      }`}>
        <TabsTrigger 
          value="boardroom" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <Brain className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Boardroom" : "Executive Boardroom"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="debate" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Debate" : "Start Debate"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="bots" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <Bot className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Advisors" : "Executive Advisors"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="insights" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <Lightbulb className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Insights" : "AI Insights"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="chat" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Chat" : "AI Chat"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="roster" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <Brain className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "Roster" : "Full Roster"}
          </span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="history" 
          className={`flex items-center ${
            isMobileView ? 'text-xs px-2 py-1 min-w-max tab-compact' : 
            isTabletView ? 'text-sm px-2.5 py-1 min-w-max' : 
            'gap-2 min-w-max'
          }`}
        >
          <History className="h-4 w-4" />
          <span className={isMobileView ? "ml-1" : "ml-2"}>
            {isMobileView ? "History" : "Consultation History"}
          </span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
