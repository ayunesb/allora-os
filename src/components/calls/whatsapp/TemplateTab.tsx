import { useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CommunicationData } from "@/hooks/communications";
import { sendWhatsAppTemplate } from "@/utils/twilioHelpers";

interface TemplateTabProps {
  phoneNumber: string;
  selectedLeadId: string;
  templates: any[];
  isLoadingTemplates: boolean;
  onMessageSent: (communicationData: CommunicationData) => Promise<any>;
  isLoadingMutation: boolean;
}

export default function TemplateTab({
  phoneNumber,
  selectedLeadId,
  templates,
  isLoadingTemplates,
  onMessageSent,
  isLoadingMutation
}: TemplateTabProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendTemplate = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }
    
    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
    setIsSending(true);
    
    try {
      const sentViaApi = await sendWhatsAppTemplate(
        formattedNumber, 
        selectedTemplate, 
        templateVariables, 
        selectedLeadId
      );
      
      if (sentViaApi) {
        const communicationData: CommunicationData = {
          type: "whatsapp",
          status: "completed",
          notes: `WhatsApp template: ${selectedTemplate} sent`,
          metadata: { template_name: selectedTemplate, variables: templateVariables }
        };
        
        await onMessageSent(communicationData);
      }
      
      setSelectedTemplate("");
      setTemplateVariables({});
      toast.success("WhatsApp template sent successfully");
      
    } catch (error) {
      console.error("Error sending WhatsApp template:", error);
      toast.error("Failed to send WhatsApp template");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="whatsapp-template">Select Template</Label>
        <Select
          value={selectedTemplate}
          onValueChange={setSelectedTemplate}
          disabled={isLoadingTemplates}
        >
          <SelectTrigger id="whatsapp-template">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.sid} value={template.name}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedTemplate && (
        <div className="space-y-2 border p-3 rounded-md bg-muted/20">
          <h4 className="font-medium">Template Variables</h4>
          
          <div className="space-y-2">
            <Label htmlFor="variable-1">Name</Label>
            <Input
              id="variable-1"
              placeholder="Enter customer name"
              value={templateVariables.name || ""}
              onChange={(e) => setTemplateVariables({
                ...templateVariables,
                name: e.target.value
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variable-2">Company</Label>
            <Input
              id="variable-2"
              placeholder="Enter company name"
              value={templateVariables.company || ""}
              onChange={(e) => setTemplateVariables({
                ...templateVariables,
                company: e.target.value
              })}
            />
          </div>
        </div>
      )}
      
      <Button
        onClick={handleSendTemplate}
        disabled={isSending || isLoadingMutation || !phoneNumber || !selectedTemplate}
        className="w-full"
      >
        {isSending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Send Template
          </>
        )}
      </Button>
    </div>
  );
}
