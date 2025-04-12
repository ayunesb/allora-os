
import React from "react";
import { Brain, MessageSquare, Bot, Lightbulb, History } from "lucide-react";
import ScrollableTabs, { TabItem } from "@/components/ui/scrollable-tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AiBotsTabsListProps {
  isMobileView?: boolean;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const AiBotsTabsList: React.FC<AiBotsTabsListProps> = ({ 
  isMobileView: propsMobileView,
  activeTab,
  onTabChange 
}) => {
  const tabs: TabItem[] = [
    {
      id: "boardroom",
      label: "Executive Boardroom",
      shortLabel: "Boardroom",
      icon: Brain
    },
    {
      id: "debate",
      label: "Start Debate",
      shortLabel: "Debate",
      icon: MessageSquare
    },
    {
      id: "bots",
      label: "Executive Advisors",
      shortLabel: "Advisors",
      icon: Bot
    },
    {
      id: "insights",
      label: "AI Insights",
      shortLabel: "Insights",
      icon: Lightbulb
    },
    {
      id: "chat",
      label: "AI Chat",
      shortLabel: "Chat",
      icon: MessageSquare
    },
    {
      id: "roster",
      label: "Full Roster",
      shortLabel: "Roster",
      icon: Brain
    },
    {
      id: "history",
      label: "Consultation History",
      shortLabel: "History",
      icon: History
    }
  ];

  // Use TabsList directly if ScrollableTabs component has issues
  if (!ScrollableTabs) {
    return (
      <TabsList className="w-full mb-6 py-1 overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={activeTab === tab.id ? "data-[state=active]:bg-primary/10" : ""}
          >
            {React.createElement(tab.icon, { className: "h-4 w-4 mr-2" })}
            <span>{propsMobileView ? tab.shortLabel || tab.label : tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <ScrollableTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="mb-6 py-1"
        variant="default"
      />
    </div>
  );
};
