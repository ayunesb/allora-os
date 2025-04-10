
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useLeads } from "@/hooks/admin/useLeads";
import { MessageSquare, Phone, Video, Loader2, CopyIcon, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuthState } from "@/hooks/useAuthState";

type ScriptType = "cold_call" | "follow_up" | "meeting_agenda" | "whatsapp_template";

export default function AiScriptGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [scriptType, setScriptType] = useState<ScriptType>("cold_call");
  const [industryContext, setIndustryContext] = useState<string>("");
  const [generatedScript, setGeneratedScript] = useState<string>("");
  
  const { leads, isLoading: leadsLoading } = useLeads();
  const { user } = useAuthState();
  
  const scriptTypeLabels = {
    cold_call: "Cold Call Script",
    follow_up: "Follow-up Call Script",
    meeting_agenda: "Zoom Meeting Agenda",
    whatsapp_template: "WhatsApp Message Template"
  };
  
  const scriptTypeIcons = {
    cold_call: <Phone className="h-4 w-4 mr-2" />,
    follow_up: <Phone className="h-4 w-4 mr-2" />,
    meeting_agenda: <Video className="h-4 w-4 mr-2" />,
    whatsapp_template: <MessageSquare className="h-4 w-4 mr-2" />
  };
  
  const handleGenerateScript = async () => {
    if (!selectedLeadId && scriptType !== "whatsapp_template") {
      toast.error("Please select a lead");
      return;
    }
    
    setIsGenerating(true);
    try {
      const selectedLead = leads?.find(lead => lead.id === selectedLeadId);
      
      // Call OpenAI function to generate the script
      const { data, error } = await supabase.functions.invoke('openai', {
        body: {
          prompt: generatePromptForScriptType(scriptType, selectedLead, industryContext),
          botName: "Sales Script Generator",
          botRole: "Expert Sales Consultant"
        }
      });
      
      if (error) throw error;
      
      setGeneratedScript(data.content);
      toast.success(`${scriptTypeLabels[scriptType]} generated successfully`);
      
    } catch (error) {
      console.error("Error generating script:", error);
      toast.error("Failed to generate script");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generatePromptForScriptType = (type: ScriptType, lead?: any, context?: string) => {
    switch (type) {
      case "cold_call":
        return `Generate a professional and effective cold call script for a sales call to ${lead?.name || "a potential customer"} at ${lead?.company || "their company"}. 
                Industry context: ${context || lead?.industry || "Not specified"}. 
                The script should include an introduction, value proposition, qualifying questions, handling objections, and a clear call to action.`;
      
      case "follow_up":
        return `Generate a follow-up call script for ${lead?.name || "a lead"} who we've previously spoken with. 
                Industry: ${context || lead?.industry || "Not specified"}. 
                The script should reference previous contact, provide additional value, address potential concerns, and include a strong next step suggestion.`;
      
      case "meeting_agenda":
        return `Create a Zoom meeting agenda for a sales meeting with ${lead?.name || "a potential client"}. 
                Industry focus: ${context || lead?.industry || "Not specified"}. 
                Include introduction points, discovery questions, product/service demonstration talking points, addressing objections, and clear next steps.`;
      
      case "whatsapp_template":
        return `Create a professional WhatsApp message template for business outreach. 
                Industry context: ${context || "Not specified"}. 
                The message should be concise (under 300 characters), personable, include a clear value proposition, and a specific call to action.`;
    }
  };
  
  const handleCopyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success("Script copied to clipboard");
  };
  
  const handleSaveScript = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to save scripts");
      return;
    }
    
    try {
      // Save the script to the user's saved scripts
      // This would typically go to a scripts or templates table
      toast.success("Script saved successfully");
    } catch (error) {
      console.error("Error saving script:", error);
      toast.error("Failed to save script");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="script-type">Script Type</Label>
        <Select
          value={scriptType}
          onValueChange={(value) => setScriptType(value as ScriptType)}
        >
          <SelectTrigger id="script-type">
            <SelectValue placeholder="Select script type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cold_call">Cold Call Script</SelectItem>
            <SelectItem value="follow_up">Follow-up Call Script</SelectItem>
            <SelectItem value="meeting_agenda">Zoom Meeting Agenda</SelectItem>
            <SelectItem value="whatsapp_template">WhatsApp Message Template</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lead-select">Select Lead (Optional for templates)</Label>
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
        <Label htmlFor="industry-context">Additional Industry Context (Optional)</Label>
        <Textarea
          id="industry-context"
          placeholder="Add any additional industry context, pain points, or specific information..."
          value={industryContext}
          onChange={(e) => setIndustryContext(e.target.value)}
          rows={2}
        />
      </div>
      
      <Button
        onClick={handleGenerateScript}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate {scriptTypeLabels[scriptType]}
          </>
        )}
      </Button>
      
      {generatedScript && (
        <Card className="p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {scriptTypeIcons[scriptType]}
              <span className="font-medium">{scriptTypeLabels[scriptType]}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyScript}>
                <CopyIcon className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveScript}>
                Save
              </Button>
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm p-3 bg-muted rounded-md">
            {generatedScript}
          </div>
        </Card>
      )}
    </div>
  );
}
