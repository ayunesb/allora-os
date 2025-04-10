
import { useState, useEffect } from "react";
import { MessageSquare, Send, Loader2, Template } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications, CommunicationData } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { useLeads } from "@/hooks/admin/useLeads";
import { 
  sendWhatsApp, 
  sendWhatsAppTemplate, 
  getWhatsAppTemplates 
} from "@/utils/twilioHelpers";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WhatsAppSenderProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

export default function WhatsAppSender({ 
  phoneNumber, 
  onPhoneNumberChange 
}: WhatsAppSenderProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("direct");
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(false);
  
  const { leads, isLoading: leadsLoading } = useLeads();
  const { logCommunication, isLoadingMutation } = useCommunications();
  
  // Fetch WhatsApp templates on component mount
  useEffect(() => {
    async function fetchTemplates() {
      setIsLoadingTemplates(true);
      try {
        const templatesList = await getWhatsAppTemplates();
        setTemplates(templatesList);
      } catch (error) {
        console.error("Error fetching WhatsApp templates:", error);
      } finally {
        setIsLoadingTemplates(false);
      }
    }
    
    fetchTemplates();
  }, []);
  
  const handleSelectLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    const selectedLead = leads?.find(lead => lead.id === leadId);
    if (selectedLead?.phone) {
      onPhoneNumberChange(selectedLead.phone);
    } else {
      onPhoneNumberChange("");
    }
  };
  
  const handleSendMessage = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    // Format the phone number by removing any non-digit characters
    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
    setIsSending(true);
    
    try {
      // Send via Twilio API (backend)
      const sentViaApi = await sendWhatsApp(formattedNumber, message, selectedLeadId);
      
      if (!sentViaApi) {
        // Fallback to opening WhatsApp Web if the API call fails
        window.open(
          `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        
        // Still log the communication even if using the fallback method
        if (selectedLeadId) {
          const communicationData: CommunicationData = {
            type: "whatsapp",
            status: "completed",
            notes: message,
            metadata: { initial_message: message, sent_via: "web_link" }
          };
          
          await logCommunication(selectedLeadId, communicationData);
        }
      }
      
      // Reset the message field on success
      setMessage("");
      toast.success("WhatsApp message processed");
      
    } catch (error) {
      console.error("Error with WhatsApp message:", error);
      toast.error("Failed to send WhatsApp message");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendTemplate = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }
    
    // Format the phone number by removing any non-digit characters
    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
    setIsSending(true);
    
    try {
      // Send template via Twilio API
      const sentViaApi = await sendWhatsAppTemplate(
        formattedNumber, 
        selectedTemplate, 
        templateVariables, 
        selectedLeadId
      );
      
      if (sentViaApi && selectedLeadId) {
        const communicationData: CommunicationData = {
          type: "whatsapp",
          status: "completed",
          notes: `WhatsApp template: ${selectedTemplate} sent`,
          metadata: { template_name: selectedTemplate, variables: templateVariables }
        };
        
        await logCommunication(selectedLeadId, communicationData);
      }
      
      // Reset the template selection on success
      setSelectedTemplate("");
      setTemplateVariables({});
      
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
        <Label htmlFor="lead-select">Select Lead (Optional)</Label>
        <Select
          value={selectedLeadId}
          onValueChange={handleSelectLead}
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
        <Label htmlFor="whatsapp-phone">Phone Number</Label>
        <Input
          id="whatsapp-phone"
          placeholder="+1 (555) 123-4567"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="direct">Direct Message</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="direct" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-message">Message</Label>
            <Textarea
              id="whatsapp-message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleSendMessage}
              disabled={isSending || isLoadingMutation || !phoneNumber || !message}
              className="flex-1"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send via Twilio
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
                window.open(
                  `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
              disabled={!phoneNumber || !message}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Open WhatsApp
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="template" className="space-y-4">
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
              
              {/* This is a simplified version - in a real app, you'd need to 
                  dynamically render inputs based on the selected template's variables */}
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
                <Template className="mr-2 h-4 w-4" />
                Send Template
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>You can send WhatsApp messages directly through our Twilio integration or open WhatsApp Web.</p>
        <p>Status callbacks will be logged to track message delivery status.</p>
        <p className="mt-1 font-medium">Template messaging requires WhatsApp Business approval.</p>
      </div>
    </div>
  );
}
