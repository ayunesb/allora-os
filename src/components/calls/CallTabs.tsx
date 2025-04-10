
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MessageSquare, 
  Phone, 
  Clock, 
  History,
  VideoIcon
} from "lucide-react";

interface CallTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function CallTabs({ activeTab, onTabChange }: CallTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
      <TabsTrigger 
        value="timeline" 
        onClick={() => onTabChange("timeline")}
        className="flex items-center space-x-2"
      >
        <Clock className="h-4 w-4" />
        <span className="hidden md:inline">Timeline</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="upcoming" 
        onClick={() => onTabChange("upcoming")}
        className="flex items-center space-x-2"
      >
        <Calendar className="h-4 w-4" />
        <span className="hidden md:inline">Upcoming</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="history" 
        onClick={() => onTabChange("history")}
        className="flex items-center space-x-2"
      >
        <History className="h-4 w-4" />
        <span className="hidden md:inline">History</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="scripts" 
        onClick={() => onTabChange("scripts")}
        className="flex items-center space-x-2"
      >
        <Phone className="h-4 w-4" />
        <span className="hidden md:inline">Call Scripts</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="messages" 
        onClick={() => onTabChange("messages")}
        className="flex items-center space-x-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden md:inline">Message Templates</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="zoom" 
        onClick={() => onTabChange("zoom")}
        className="hidden lg:flex items-center space-x-2"
      >
        <VideoIcon className="h-4 w-4" />
        <span className="hidden md:inline">Zoom Tools</span>
      </TabsTrigger>
    </TabsList>
  );
}
