
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Communication } from "@/hooks/communications";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  FileText,
  XCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CommunicationNotes from "./CommunicationNotes";

interface PastCommunicationsProps {
  communications: Communication[];
  isLoading: boolean;
}

export default function PastCommunications({
  communications,
  isLoading
}: PastCommunicationsProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewingNotes, setViewingNotes] = useState<string | null>(null);
  
  const filteredCommunications = communications.filter(
    comm => 
      comm.leads?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comm.notes && comm.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "missed":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />;
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Communication History</CardTitle>
            <CardDescription>Past calls, meetings and chats with leads</CardDescription>
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
        ) : filteredCommunications.length === 0 ? (
          <div className="text-center py-8 border rounded-md border-dashed">
            <p className="text-muted-foreground">No past communications found</p>
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
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommunications.map((comm) => (
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
                    <TableCell>
                      {formatDateTime(comm.ended_at || comm.scheduled_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(comm.status)}
                        <span className="capitalize">
                          {comm.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {comm.outcome ? (
                        <Badge
                          variant="outline"
                          className={`
                            ${comm.outcome === 'follow_up' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                            ${comm.outcome === 'opportunity' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                            ${comm.outcome === 'closed_won' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${comm.outcome === 'closed_lost' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                          `}
                        >
                          {comm.outcome === 'follow_up' ? 'Follow-up' : ''}
                          {comm.outcome === 'opportunity' ? 'Opportunity' : ''}
                          {comm.outcome === 'closed_won' ? 'Closed (Won)' : ''}
                          {comm.outcome === 'closed_lost' ? 'Closed (Lost)' : ''}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!comm.notes && !comm.ai_summary}
                        onClick={() => setViewingNotes(comm.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {viewingNotes && (
          <CommunicationNotes
            communicationId={viewingNotes}
            communications={communications}
            isLoading={isLoading}
            onClose={() => setViewingNotes(null)}
          />
        )}
      </CardContent>
    </Card>
  );
}
