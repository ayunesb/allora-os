
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Phone, MessageSquare, Video } from "lucide-react";
import { useCommunications } from "@/hooks/useCommunications";

export default function CallsHeader() {
  const { upcomingCommunications, pastCommunications } = useCommunications();
  
  const stats = useMemo(() => {
    const totalCommunications = upcomingCommunications.length + pastCommunications.length;
    const completedCommunications = pastCommunications.filter(c => c.status === "completed").length;
    const scheduledCommunications = upcomingCommunications.length;
    
    const phoneCalls = [...upcomingCommunications, ...pastCommunications].filter(c => c.type === "phone").length;
    const zoomMeetings = [...upcomingCommunications, ...pastCommunications].filter(c => c.type === "zoom").length;
    const whatsappChats = [...upcomingCommunications, ...pastCommunications].filter(c => c.type === "whatsapp").length;
    
    return {
      totalCommunications,
      completedCommunications,
      scheduledCommunications,
      phoneCalls,
      zoomMeetings,
      whatsappChats
    };
  }, [upcomingCommunications, pastCommunications]);
  
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Client Communications</h1>
        <p className="text-muted-foreground">
          Manage all your communications with leads and clients in one place
        </p>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-1 text-primary">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">{stats.phoneCalls}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 hidden sm:block">Phone Calls</span>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-1 text-primary">
            <Video className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">{stats.zoomMeetings}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 hidden sm:block">Zoom Meetings</span>
        </div>
        
        <div className="bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-1 text-primary">
            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">{stats.whatsappChats}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 hidden sm:block">WhatsApp Chats</span>
        </div>
      </div>
    </div>
  );
}
