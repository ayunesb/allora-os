
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCommunications } from "@/hooks/communications";
import { useLeads } from "@/hooks/admin/useLeads";
import { getWhatsAppTemplates } from "@/utils/twilioHelpers";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import component parts
import LeadSelector from "./whatsapp/LeadSelector";
import DirectMessageTab from "./whatsapp/DirectMessageTab";
import TemplateTab from "./whatsapp/TemplateTab";
import WhatsAppFooter from "./whatsapp/WhatsAppFooter";

interface WhatsAppSenderProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

export default function WhatsAppSender({ 
  phoneNumber, 
  onPhoneNumberChange 
}: WhatsAppSenderProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("direct");
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(false);
  const [templateError, setTemplateError] = useState<string | null>(null);
  
  const { leads, isLoading: leadsLoading } = useLeads();
  const { logCommunication, isLoadingMutation } = useCommunications();
  
  useEffect(() => {
    async function fetchTemplates() {
      setIsLoadingTemplates(true);
      setTemplateError(null);
      try {
        const templatesList = await getWhatsAppTemplates();
        setTemplates(templatesList);
        
        if (templatesList.length === 0) {
          setTemplateError("No WhatsApp templates found. Templates may not be configured properly.");
        }
      } catch (error: any) {
        console.error("Error fetching WhatsApp templates:", error);
        setTemplateError(`Error fetching WhatsApp templates: ${error.message || "Unknown error"}`);
        toast.error("Failed to load WhatsApp templates");
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
  
  // Create a wrapper function to ensure correct parameter passing
  const handleMessageSent = async (communicationData: any) => {
    if (selectedLeadId) {
      await logCommunication(selectedLeadId, communicationData);
    }
  };
  
  return (
    <div className="space-y-4">
      <LeadSelector 
        selectedLeadId={selectedLeadId}
        onSelectLead={handleSelectLead}
        leads={leads}
        isLoading={leadsLoading}
      />
      
      <div className="space-y-2">
        <Label htmlFor="whatsapp-phone">Phone Number</Label>
        <Input
          id="whatsapp-phone"
          placeholder="+1 (555) 123-4567"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
        />
      </div>
      
      {templateError && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{templateError}</AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="direct">Direct Message</TabsTrigger>
          <TabsTrigger value="template">Template</TabsTrigger>
        </TabsList>
        
        <TabsContent value="direct" className="space-y-4">
          <DirectMessageTab 
            phoneNumber={phoneNumber}
            selectedLeadId={selectedLeadId}
            onMessageSent={handleMessageSent}
            isLoadingMutation={isLoadingMutation}
          />
        </TabsContent>
        
        <TabsContent value="template" className="space-y-4">
          <TemplateTab 
            phoneNumber={phoneNumber}
            selectedLeadId={selectedLeadId}
            templates={templates}
            isLoadingTemplates={isLoadingTemplates}
            onMessageSent={handleMessageSent}
            isLoadingMutation={isLoadingMutation}
          />
        </TabsContent>
      </Tabs>
      
      <WhatsAppFooter />
    </div>
  );
}
