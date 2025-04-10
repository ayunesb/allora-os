
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Communication } from "@/hooks/useCommunications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Phone, 
  Video, 
  MessageSquare, 
  Search,
  ExternalLink,
  CheckCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunications } from "@/hooks/useCommunications";

interface UpcomingCommunicationsProps {
  communications: Communication[];
  isLoading: boolean;
}

export default function UpcomingCommunications({
  communications,
  isLoading
}: UpcomingCommunicationsProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { updateCommunicationStatus } = useCommunications();
  
  const filteredCommunications = communications.filter(
    comm => 
      comm.leads?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedCommunications = [...filteredCommunications].sort((a, b) => {
    if (!a.scheduled_at || !b.scheduled_at) return 0;
    return new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime();
  });
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4 text-blue-600" />;
      case "zoom":
        return <Video className="h-4 w-4 text-purple-600" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };
  
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return dateString;
    }
  };
  
  const handleMarkCompleted = async (id: string) => {
    try {
      await updateCommunicationStatus(id, "completed");
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };
  
  const handleMarkMissed = async (id: string) => {
    try {
      await updateCommunicationStatus(id, "missed");
    } catch (error) {
      console.error("Error marking as missed:", error);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Upcoming Communications</CardTitle>
            <CardDescription>Your scheduled calls, meetings and chats</CardDescription>
          </div>
          
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search communications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : sortedCommunications.length === 0 ? (
          <div className="text-center py-8 border rounded-md border-dashed">
            <p className="text-muted-foreground">No upcoming communications found</p>
            {searchQuery && (
              <Button 
                variant="link" 
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCommunications.map((comm) => (
                  <TableRow key={comm.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(comm.type)}
                        <span className="capitalize">
                          {comm.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{comm.leads?.name || "Unknown"}</TableCell>
                    <TableCell>{formatDateTime(comm.scheduled_at)}</TableCell>
                    <TableCell>
                      {comm.metadata?.duration ? 
                        `${comm.metadata.duration} minutes` : 
                        "N/A"
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {comm.meeting_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a 
                              href={comm.meeting_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Join
                            </a>
                          </Button>
                        )}
                        
                        {comm.type === "whatsapp" && comm.leads?.phone && (
                          <Button size="sm" variant="outline" asChild>
                            <a 
                              href={`https://wa.me/${comm.leads.phone.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Chat
                            </a>
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleMarkCompleted(comm.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleMarkMissed(comm.id)}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Missed
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
