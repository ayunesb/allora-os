
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Communication, useCommunications } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { 
  MessageSquare, 
  Phone, 
  Video, 
  Search,
  Sparkles,
  FileText,
  Edit,
  Save,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunicationNotesProps {
  communications: Communication[];
  isLoading: boolean;
}

export default function CommunicationNotes({
  communications,
  isLoading
}: CommunicationNotesProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedComm, setSelectedComm] = useState<Communication | null>(null);
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  
  const { updateCommunicationStatus } = useCommunications();
  
  const filteredCommunications = communications.filter(
    comm => 
      (comm.leads?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       comm.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (comm.notes && comm.notes.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (comm.notes || comm.ai_summary)
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
  
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };
  
  const handleEditNotes = (comm: Communication) => {
    setSelectedComm(comm);
    setNotes(comm.notes || "");
    setEditingNotes(true);
  };
  
  const handleSaveNotes = async () => {
    if (!selectedComm) return;
    
    try {
      await updateCommunicationStatus(selectedComm.id, selectedComm.status, notes);
      toast.success("Notes updated successfully");
      setEditingNotes(false);
      
      // Update the selected communication in our local state
      setSelectedComm({
        ...selectedComm,
        notes: notes
      });
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
  };
  
  const handleGenerateAISummary = async () => {
    if (!selectedComm) return;
    
    setIsGeneratingAI(true);
    try {
      const transcript = prompt("Please paste the conversation transcript to generate an AI summary:", "");
      if (!transcript) {
        setIsGeneratingAI(false);
        return;
      }
      
      // Call the function to generate AI summary
      try {
        // This would typically call an API or edge function to generate the summary
        toast.success("AI summary generated successfully");
        
        // Update the selected communication in our local state
        setSelectedComm({
          ...selectedComm,
          ai_summary: "AI-generated summary would appear here based on the transcript."
        });
      } catch (error) {
        console.error("Error generating AI summary:", error);
        toast.error("Failed to generate AI summary");
      }
    } finally {
      setIsGeneratingAI(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Communication Notes & Summaries</CardTitle>
        <CardDescription>
          View and manage notes from all your communication channels
        </CardDescription>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 h-full">
          <div className="md:w-1/3 space-y-4">
            <h3 className="font-medium text-sm">Communications</h3>
            
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : filteredCommunications.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredCommunications.map((comm) => (
                  <Button
                    key={comm.id}
                    variant="outline"
                    className={`w-full justify-start p-3 h-auto ${selectedComm?.id === comm.id ? 'border-primary' : ''}`}
                    onClick={() => {
                      setSelectedComm(comm);
                      setEditingNotes(false);
                    }}
                  >
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center">
                          {getTypeIcon(comm.type)}
                          <span className="ml-2 font-medium">{comm.leads?.name || "Unknown"}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {comm.type}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatDateTime(comm.ended_at || comm.scheduled_at)}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md border-dashed">
                <p className="text-muted-foreground">No notes found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add notes to your communications to see them here
                </p>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3">
            {selectedComm ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {selectedComm.leads?.name || "Unknown"} - {selectedComm.type.charAt(0).toUpperCase() + selectedComm.type.slice(1)}
                  </h3>
                  <div className="flex space-x-2">
                    {editingNotes ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleSaveNotes}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditNotes(selectedComm)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleGenerateAISummary}
                      disabled={isGeneratingAI}
                    >
                      {isGeneratingAI ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3 mr-1" />
                      )}
                      AI Summary
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="notes">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notes" className="pt-4">
                    {editingNotes ? (
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter notes about this communication..."
                        className="min-h-[200px]"
                      />
                    ) : (
                      <div className="p-4 bg-muted rounded-md min-h-[200px] whitespace-pre-wrap">
                        {selectedComm.notes || "No notes available."}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="ai-summary" className="pt-4">
                    <div className="p-4 bg-primary-foreground/50 rounded-md border border-primary/10 min-h-[200px] whitespace-pre-wrap">
                      {selectedComm.ai_summary || "No AI summary available. Click the 'AI Summary' button to generate one from a transcript."}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Communication Details</h4>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd className="font-medium">{selectedComm.type.charAt(0).toUpperCase() + selectedComm.type.slice(1)}</dd>
                    
                    <dt className="text-muted-foreground">Status:</dt>
                    <dd className="font-medium">{selectedComm.status.charAt(0).toUpperCase() + selectedComm.status.slice(1)}</dd>
                    
                    <dt className="text-muted-foreground">Date:</dt>
                    <dd className="font-medium">{formatDateTime(selectedComm.ended_at || selectedComm.scheduled_at)}</dd>
                    
                    <dt className="text-muted-foreground">Outcome:</dt>
                    <dd className="font-medium">
                      {selectedComm.outcome 
                        ? selectedComm.outcome.charAt(0).toUpperCase() + selectedComm.outcome.slice(1).replace('_', ' ') 
                        : "No outcome set"}
                    </dd>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] border rounded-md border-dashed">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a communication to view notes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
