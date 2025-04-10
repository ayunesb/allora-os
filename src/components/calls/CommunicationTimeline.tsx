
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Phone, MessageSquare, VideoIcon } from "lucide-react";
import { Communication } from "@/hooks/useCommunications";
import CommunicationItem from "./CommunicationItem";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunicationTimelineProps {
  upcomingCommunications: Communication[];
  pastCommunications: Communication[];
  isLoading: boolean;
}

export default function CommunicationTimeline({
  upcomingCommunications,
  pastCommunications,
  isLoading
}: CommunicationTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "phone" | "zoom" | "whatsapp">("all");
  
  const filterCommunications = (communications: Communication[], filter: "all" | "phone" | "zoom" | "whatsapp") => {
    if (filter === "all") return communications;
    return communications.filter(comm => comm.type === filter);
  };
  
  const filteredUpcoming = filterCommunications(upcomingCommunications, activeFilter);
  const filteredPast = filterCommunications(pastCommunications, activeFilter);
  
  // Show only the 5 most recent past communications in the timeline
  const recentPastCommunications = filteredPast.slice(0, 5);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Communication Timeline</CardTitle>
            <CardDescription>Upcoming and recent communications</CardDescription>
          </div>
          <Tabs defaultValue="all" value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="phone" className="text-xs">
                <Phone className="h-3 w-3 mr-1" />
                Phone
              </TabsTrigger>
              <TabsTrigger value="zoom" className="text-xs">
                <VideoIcon className="h-3 w-3 mr-1" />
                Zoom
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                WhatsApp
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TimelineLoading />
        ) : (
          <>
            {/* Upcoming Communications */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4">
                <CalendarDays className="h-4 w-4 mr-2" />
                Upcoming
              </h3>
              
              {filteredUpcoming.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
                  No upcoming communications
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredUpcoming.map((communication) => (
                    <CommunicationItem
                      key={communication.id}
                      communication={communication}
                      isUpcoming={true}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Recent Past Communications */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4">
                Recent Activity
              </h3>
              
              {recentPastCommunications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
                  No recent communications
                </p>
              ) : (
                <div className="space-y-4">
                  {recentPastCommunications.map((communication) => (
                    <CommunicationItem
                      key={communication.id}
                      communication={communication}
                      isUpcoming={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function TimelineLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      
      <div>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
