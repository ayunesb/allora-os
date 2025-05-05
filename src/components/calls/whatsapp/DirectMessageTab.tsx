import { useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { sendWhatsApp } from "@/utils/twilioHelpers";
export default function DirectMessageTab({ phoneNumber, selectedLeadId, onMessageSent, isLoadingMutation }) {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const handleSendMessage = async () => {
        if (!phoneNumber.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        if (!message.trim()) {
            toast.error("Please enter a message");
            return;
        }
        const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
        setIsSending(true);
        try {
            const sentViaApi = await sendWhatsApp(formattedNumber, message, selectedLeadId);
            if (!sentViaApi) {
                window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, "_blank");
                if (selectedLeadId) {
                    const communicationData = {
                        type: "whatsapp",
                        status: "completed",
                        notes: message,
                        metadata: { initial_message: message, sent_via: "web_link" }
                    };
                    await onMessageSent(communicationData);
                }
            }
            setMessage("");
            toast.success("WhatsApp message processed");
        }
        catch (error) {
            console.error("Error with WhatsApp message:", error);
            toast.error("Failed to send WhatsApp message");
        }
        finally {
            setIsSending(false);
        }
    };
    const handleOpenWhatsAppWeb = () => {
        const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
        window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };
    return (<div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="whatsapp-message">Message</Label>
        <Textarea id="whatsapp-message" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4}/>
      </div>
      
      <div className="flex space-x-2">
        <Button onClick={handleSendMessage} disabled={isSending || isLoadingMutation || !phoneNumber || !message} className="flex-1">
          {isSending ? (<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Sending...
            </>) : (<>
              <Send className="mr-2 h-4 w-4"/>
              Send via Twilio
            </>)}
        </Button>
        
        <Button variant="outline" onClick={handleOpenWhatsAppWeb} disabled={!phoneNumber || !message}>
          <MessageSquare className="mr-2 h-4 w-4"/>
          Open WhatsApp
        </Button>
      </div>
    </div>);
}
