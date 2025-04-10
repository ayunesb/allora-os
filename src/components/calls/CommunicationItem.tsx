import { useState } from "react";
import { format } from "date-fns";
import { Communication } from "@/hooks/communications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Phone, 
  Video, 
  MessageSquare,
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  ExternalLink
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/communications";
import AddCommunicationNotes from "./AddCommunicationNotes";
import CommunicationStatusSelector from "./CommunicationStatusSelector";

interface CommunicationItemProps {
  communication: Communication;
  isUpcoming: boolean;
}

export default function CommunicationItem({ communication, isUpcoming }: CommunicationItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(communication.notes || "");
  
  const { updateCommunicationStatus } = useCommunications();

  const getTypeIcon = () => {
    switch (communication.type) {
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "zoom":
        return <Video className="h-4 w-4" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusBadge = () => {
    switch (communication.status) {
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "missed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
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

  const getLeadName = () => {
    return communication.leads?.name || "Unknown Lead";
  };

  const handleSaveNotes = async () => {
    try {
      await updateCommunicationStatus(communication.id, communication.status, notes);
      setIsEditingNotes(false);
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await updateCommunicationStatus(communication.id, "completed");
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  const handleMarkMissed = async () => {
    try {
      await updateCommunicationStatus(communication.id, "missed");
    } catch (error) {
      console.error("Error marking as missed:", error);
    }
  };

  return (
    <div className={`border rounded-lg p-3 ${
      communication.status === "scheduled" ? "border-blue-200 bg-blue-50/30" :
      communication.status === "completed" ? "border-green-200 bg-green-50/30" :
      communication.status === "missed" ? "border-red-200 bg-red-50/30" :
      "border-gray-200 bg-gray-50/30"
    }`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${
              communication.type === "phone" ? "bg-blue-100 text-blue-700" :
              communication.type === "zoom" ? "bg-purple-100 text-purple-700" :
              "bg-green-100 text-green-700"
            }`}>
              {getTypeIcon()}
            </div>
            
            <div>
              <h4 className="font-medium text-sm">{getLeadName()}</h4>
              <p className="text-xs text-muted-foreground">
                {communication.type.charAt(0).toUpperCase() + communication.type.slice(1)} {communication.type === "zoom" ? "Meeting" : communication.type === "whatsapp" ? "Chat" : "Call"}
              </p>
              <div className="flex items-center mt-1 space-x-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDateTime(communication.scheduled_at)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        
        <CollapsibleContent className="pt-3 mt-3 border-t">
          {isUpcoming && communication.status === "scheduled" && (
            <div className="flex items-center justify-between mb-4">
              <div className="space-x-2">
                {communication.meeting_link && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={communication.meeting_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Join Meeting
                    </a>
                  </Button>
                )}
                
                {communication.type === "whatsapp" && communication.leads?.phone && (
                  <Button size="sm" variant="outline" asChild>
                    <a 
                      href={`https://wa.me/${communication.leads.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Open WhatsApp
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="space-x-2">
                <Button size="sm" variant="default" onClick={handleMarkCompleted}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mark Completed
                </Button>
                <Button size="sm" variant="outline" onClick={handleMarkMissed}>
                  <XCircle className="h-3 w-3 mr-1" />
                  Mark Missed
                </Button>
              </div>
            </div>
          )}
          
          {!isUpcoming && (
            <CommunicationStatusSelector 
              communicationId={communication.id}
              currentStatus={communication.status}
              currentOutcome={communication.outcome}
            />
          )}
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-sm font-medium">Notes</h5>
              {!isEditingNotes ? (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(true)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" onClick={handleSaveNotes}>
                    Save
                  </Button>
                </div>
              )}
            </div>
            
            {!isEditingNotes ? (
              <p className="text-sm text-muted-foreground">
                {communication.notes || "No notes available"}
              </p>
            ) : (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes about this communication..."
                className="w-full"
                rows={3}
              />
            )}
          </div>
          
          {communication.ai_summary && (
            <div className="mt-4 p-3 bg-primary-foreground/50 rounded-md border border-primary/10">
              <h5 className="text-sm font-medium mb-2">AI Summary</h5>
              <p className="text-sm text-muted-foreground">{communication.ai_summary}</p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
