
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, Bot, Search, Lightbulb, History } from "lucide-react";

interface AiBotsTabsListProps {
  isMobileView: boolean;
}

export const AiBotsTabsList: React.FC<AiBotsTabsListProps> = ({ isMobileView }) => {
  return (
    <TabsList className={`mb-6 ${isMobileView ? 'flex-wrap gap-1' : ''}`}>
      <TabsTrigger value="boardroom" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <Brain className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>Executive Boardroom</span>
      </TabsTrigger>
      <TabsTrigger value="debate" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <MessageSquare className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>Start Debate</span>
      </TabsTrigger>
      <TabsTrigger value="bots" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <Bot className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>Executive Advisors</span>
      </TabsTrigger>
      <TabsTrigger value="insights" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <Lightbulb className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>AI Insights</span>
      </TabsTrigger>
      <TabsTrigger value="chat" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <MessageSquare className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>AI Chat</span>
      </TabsTrigger>
      <TabsTrigger value="roster" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <Brain className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>Full Roster</span>
      </TabsTrigger>
      <TabsTrigger value="history" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
        <History className="h-4 w-4" />
        <span className={isMobileView ? "sr-only" : ""}>Consultation History</span>
      </TabsTrigger>
    </TabsList>
  );
};
