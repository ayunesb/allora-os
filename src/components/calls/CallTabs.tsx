
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useBreakpoint } from "@/hooks/use-mobile";

interface CallTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function CallTabs({ activeTab, onTabChange }: CallTabsProps) {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <TabsList className={`grid w-full ${isMobileView ? 'grid-cols-4 gap-1' : 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8'}`}>
      <TabsTrigger 
        value="timeline" 
        onClick={() => onTabChange("timeline")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <Clock className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Timeline</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="upcoming" 
        onClick={() => onTabChange("upcoming")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <Calendar className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Upcoming</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="history" 
        onClick={() => onTabChange("history")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <History className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>History</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="scripts" 
        onClick={() => onTabChange("scripts")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <Phone className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Call Scripts</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="messages" 
        onClick={() => onTabChange("messages")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <MessageSquare className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Message Templates</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="zoom" 
        onClick={() => onTabChange("zoom")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <VideoIcon className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Zoom Tools</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="ai-assistant" 
        onClick={() => onTabChange("ai-assistant")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <Sparkles className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>AI Assistant</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="analytics" 
        onClick={() => onTabChange("analytics")}
        className={`flex items-center ${isMobileView ? 'px-1 py-1 text-xs' : 'space-x-2'}`}
      >
        <BarChart className="h-4 w-4" />
        <span className={isMobileView ? 'sr-only' : 'hidden md:inline'}>Analytics</span>
      </TabsTrigger>
    </TabsList>
  );
}
