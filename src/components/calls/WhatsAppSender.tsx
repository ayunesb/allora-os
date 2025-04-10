
import { useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications, CommunicationData } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { useLeads } from "@/hooks/admin/useLeads";
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
    
    // Format the phone number for WhatsApp by removing any non-digit characters
    const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
    
    try {
      if (selectedLeadId) {
        // Log the communication
        const communicationData: CommunicationData = {
          type: "whatsapp",
          status: "completed",
          notes: message,
          metadata: { initial_message: message }
        };
        
        await logCommunication(selectedLeadId, communicationData);
      }
      
      // Open WhatsApp web with the pre-filled message
      window.open(
        `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      
      // Reset the message field
      setMessage("");
    } catch (error) {
      console.error("Error with WhatsApp message:", error);
      toast.error("Failed to log WhatsApp communication");
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
      
      <Button
        onClick={handleSendMessage}
        disabled={isLoadingMutation || !phoneNumber || !message}
        className="w-full"
      >
        {isLoadingMutation ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <MessageSquare className="mr-2 h-4 w-4" />
            Open in WhatsApp
          </>
        )}
      </Button>
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>This will open WhatsApp Web or the WhatsApp App with a pre-filled message.</p>
        <p>If a lead is selected, the conversation will be logged in your communication history.</p>
      </div>
    </div>
  );
}
