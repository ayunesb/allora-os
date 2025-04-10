import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Video, 
  Upload, 
  Play, 
  ChevronRight, 
  FileType, 
  BookOpen, 
  Loader2,
  FileText
} from "lucide-react";
import { useLeads } from "@/hooks/admin/useLeads";
import { toast } from "sonner";
import { useCommunications } from "@/hooks/useCommunications";
import { supabase } from "@/integrations/supabase/client";

export default function AiZoomAssistant() {
  const [activeTab, setActiveTab] = useState<"assistant" | "upload" | "scripts">("assistant");
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingAgenda, setMeetingAgenda] = useState<string>("");
  const [meetingPoints, setMeetingPoints] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  
  const { leads, isLoading: leadsLoading } = useLeads();
  const { pastCommunications, generateAISummary } = useCommunications();
  
  const pastZoomMeetings = pastCommunications.filter(
    comm => comm.type === "zoom" && comm.status === "completed"
  );
  
  const handleGenerateAgenda = async () => {
    if (!meetingTitle) {
      toast.error("Please enter a meeting title");
      return;
    }
    
    setIsGenerating(true);
    try {
      const selectedLead = leads?.find(lead => lead.id === selectedLeadId);
      const prompt = `Generate a professional meeting agenda for a Zoom call titled "${meetingTitle}" 
                      ${selectedLead ? `with ${selectedLead.name} from ${selectedLead.company || 'their company'}` : ''}. 
                      The agenda should include an introduction, main discussion points, and action items/next steps.`;
      
      const { data, error } = await supabase.functions.invoke('openai', {
        body: {
          prompt,
          botName: "Zoom Meeting Assistant",
          botRole: "Professional Sales Meeting Facilitator"
        }
      });
      
      if (error) throw error;
      
      setMeetingAgenda(data.content);
      toast.success("Meeting agenda generated successfully");
      
    } catch (error) {
      console.error("Error generating agenda:", error);
      toast.error("Failed to generate meeting agenda");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleGenerateSummary = async (communicationId: string, transcript: string) => {
    setIsGenerating(true);
    try {
      const result = await generateAISummary(communicationId, transcript);
      if (result) {
        setGeneratedSummary(result.summary);
        toast.success("Meeting summary generated successfully");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate meeting summary");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCreateMeeting = async () => {
    if (!selectedLeadId) {
      toast.error("Please select a lead");
      return;
    }
    
    if (!meetingTitle) {
      toast.error("Please enter a meeting title");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      toast.success("Meeting with AI assistant created successfully");
      
      setMeetingTitle("");
      setMeetingAgenda("");
      setMeetingPoints("");
      
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Failed to create meeting");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Zoom Meeting Assistant</CardTitle>
        <CardDescription>
          Create, manage, and analyze your Zoom meetings with AI assistance
        </CardDescription>
        <Tabs defaultValue="assistant" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assistant" className="text-xs md:text-sm">
              Meeting Assistant
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-xs md:text-sm">
              Upload Transcripts
            </TabsTrigger>
            <TabsTrigger value="scripts" className="text-xs md:text-sm">
              Meeting Scripts
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <TabsContent value="assistant" className="space-y-4 mt-0">
          <div className="space-y-2">
            <Label htmlFor="lead-select">Select Lead</Label>
            <Select
              value={selectedLeadId}
              onValueChange={setSelectedLeadId}
              disabled={leadsLoading}
            >
              <SelectTrigger id="lead-select">
                <SelectValue placeholder="Select a lead" />
              </SelectTrigger>
              <SelectContent>
                {leads?.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meeting-title">Meeting Title</Label>
            <Input
              id="meeting-title"
              placeholder="Enter meeting title"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="meeting-agenda">Meeting Agenda</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleGenerateAgenda}
                disabled={isGenerating || !meetingTitle}
              >
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Play className="h-3 w-3 mr-1" />
                )}
                Generate
              </Button>
            </div>
            <Textarea
              id="meeting-agenda"
              placeholder="Enter or generate a meeting agenda..."
              value={meetingAgenda}
              onChange={(e) => setMeetingAgenda(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ai-talking-points">Key Points for AI to Address</Label>
            <Textarea
              id="ai-talking-points"
              placeholder="Enter key points you want the AI assistant to address during the meeting..."
              value={meetingPoints}
              onChange={(e) => setMeetingPoints(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleCreateMeeting} 
            disabled={isSubmitting || !selectedLeadId || !meetingTitle}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Video className="mr-2 h-4 w-4" />
                Create AI-Assisted Meeting
              </>
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4 mt-0">
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Upload Meeting Transcript</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a transcript file (.txt, .docx) to generate an AI summary
            </p>
            <div className="flex items-center gap-2">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
              <span className="text-xs text-muted-foreground">or drag and drop</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transcript-text">Or Paste Transcript Text</Label>
            <Textarea
              id="transcript-text"
              placeholder="Paste your meeting transcript here..."
              rows={6}
            />
          </div>
          
          <Button disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Meeting Summary
              </>
            )}
          </Button>
        </TabsContent>
        
        <TabsContent value="scripts" className="space-y-4 mt-0">
          <div className="space-y-2">
            <Label>Past Zoom Meetings</Label>
            {pastZoomMeetings.length > 0 ? (
              <div className="space-y-2">
                {pastZoomMeetings.map((meeting) => (
                  <Card key={meeting.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{meeting.leads?.name || "Unknown Lead"}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(meeting.ended_at || meeting.created_at).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const transcript = prompt("Please paste the meeting transcript to generate a summary:", "");
                          if (transcript) {
                            handleGenerateSummary(meeting.id, transcript);
                          }
                        }}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Summarize
                      </Button>
                    </div>
                    {meeting.ai_summary && (
                      <div className="mt-2 p-2 bg-primary-foreground/50 rounded-md border border-primary/10 text-xs">
                        {meeting.ai_summary}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">
                No past Zoom meetings found
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Meeting Templates</Label>
            <div className="grid gap-2">
              <Button variant="outline" className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Product Demo Template</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Discovery Call Template</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Follow-up Meeting Template</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </CardContent>
      
      <CardFooter className="flex-col items-start space-y-2 pt-0">
        <div className="text-xs text-muted-foreground">
          <p>The AI assistant can introduce your company, ask questions, provide information, and help guide the meeting.</p>
          <p>After the meeting, you can generate an AI summary and action items.</p>
        </div>
      </CardFooter>
    </Card>
  );
}
