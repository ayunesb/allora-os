
import React from "react";
import { 
  Brain, 
  MessageSquare, 
  Bot, 
  Lightbulb, 
  History, 
  BrainCircuit, 
  GanttChart, 
  Users,
  LucideIcon
} from "lucide-react";
import ScrollableTabs, { TabItem } from "@/components/ui/scrollable-tabs";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface AiBotsTabsListProps {
  isMobileView?: boolean;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabIcons?: Record<string, LucideIcon>;
}

export const AiBotsTabsList: React.FC<AiBotsTabsListProps> = ({ 
  isMobileView: propsMobileView,
  activeTab,
  onTabChange,
  tabIcons = {}
}) => {
  const tabs: TabItem[] = [
    {
      id: "boardroom",
      label: "Executive Boardroom",
      shortLabel: "Boardroom",
      icon: tabIcons.boardroom || BrainCircuit
    },
    {
      id: "debate",
      label: "Start Debate",
      shortLabel: "Debate",
      icon: tabIcons.debate || MessageSquare
    },
    {
      id: "bots",
      label: "Executive Advisors",
      shortLabel: "Advisors",
      icon: tabIcons.bots || Bot
    },
    {
      id: "insights",
      label: "AI Insights",
      shortLabel: "Insights",
      icon: tabIcons.insights || Lightbulb
    },
    {
      id: "chat",
      label: "AI Chat",
      shortLabel: "Chat",
      icon: tabIcons.chat || MessageSquare
    },
    {
      id: "roster",
      label: "Full Roster",
      shortLabel: "Roster",
      icon: tabIcons.roster || Users
    },
    {
      id: "history",
      label: "Consultation History",
      shortLabel: "History",
      icon: tabIcons.history || GanttChart
    }
  ];

  // Use TabsList directly if ScrollableTabs component has issues
  if (!ScrollableTabs) {
    return (
      <TabsList className="w-full mb-6 py-2 overflow-x-auto bg-black/30 border border-white/10 backdrop-blur-md rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={`
              relative overflow-hidden flex items-center group
              ${activeTab === tab.id ? "data-[state=active]:bg-primary/30 data-[state=active]:text-white" : "hover:bg-primary/10"}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab-background"
                className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                initial={false}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <div className="flex items-center gap-2">
              {React.createElement(tab.icon, { 
                className: `h-4 w-4 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 group-hover:text-primary/80'} transition-colors`
              })}
              <span>{propsMobileView ? tab.shortLabel || tab.label : tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    );
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <ScrollableTabs 
        tabs={tabs} 
        activeTab={activeTab || tabs[0].id}
        onTabChange={onTabChange}
        className="mb-6 py-2 bg-black/30 border border-white/10 backdrop-blur-md rounded-lg"
        variant="default"
      />
    </div>
  );
};
