
import { useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications, CommunicationData } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { useLeads } from "@/hooks/admin/useLeads";
import { sendWhatsApp } from "@/utils/twilioHelpers";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
  
  const { leads, isLoading: leadsLoading } = useLeads();
  const { logCommunication, isLoadingMutation } = useCommunications();
  
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
      // Option 1: Send via Twilio API (backend)
      const sentViaApi = await sendWhatsApp(formattedNumber, message, selectedLeadId);
      
      if (!sentViaApi) {
        // Option 2: Fallback to opening WhatsApp Web if the API call fails
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
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>You can send WhatsApp messages directly through our Twilio integration or open WhatsApp Web.</p>
        <p>Status callbacks will be logged to track message delivery status.</p>
      </div>
    </div>
  );
}
