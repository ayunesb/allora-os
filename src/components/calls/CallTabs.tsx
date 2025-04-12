
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  Clock, 
  History,
  VideoIcon,
  Sparkles,
  BarChart
} from "lucide-react";
import ScrollableTabs, { TabItem } from "@/components/ui/scrollable-tabs";

interface CallTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function CallTabs({ activeTab, onTabChange }: CallTabsProps) {
  const tabs: TabItem[] = [
    {
      id: "timeline",
      label: "Timeline",
      icon: Clock
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: Calendar
    },
    {
      id: "history",
      label: "History",
      icon: History
    },
    {
      id: "scripts",
      label: "Call Scripts",
      shortLabel: "Scripts",
      icon: Phone
    },
    {
      id: "messages",
      label: "Message Templates",
      shortLabel: "Messages",
      icon: MessageSquare
    },
    {
      id: "zoom",
      label: "Zoom Tools",
      shortLabel: "Zoom",
      icon: VideoIcon
    },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      shortLabel: "Assistant",
      icon: Sparkles
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart
    },
  ];
  
  return (
    <ScrollableTabs 
      tabs={tabs} 
      activeTab={activeTab}
      onTabChange={onTabChange}
      fullWidth={true}
    />
  );
}
