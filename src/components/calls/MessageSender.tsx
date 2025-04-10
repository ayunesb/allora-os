
import React, { useState } from "react";
import { Send as SendIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendSMS } from "@/utils/twilioHelpers";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";

interface MessageSenderProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

export default function MessageSender({ 
  phoneNumber, 
  onPhoneNumberChange 
}: MessageSenderProps) {
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { user } = useAuthState();
  const { trackAction } = useSelfLearning();

  const handleSendMessage = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setIsSendingMessage(true);
    try {
      if (user?.id) {
        trackAction(
          'send_sms',
          'message_send',
          phoneNumber,
          'sms_message',
          { phoneNumber, messageLength: message.length }
        );
      }
      
      const result = await sendSMS(phoneNumber, message);
      if (result) {
        toast.success("Message sent successfully");
        setMessage("");
      }
    } catch (error) {
      console.error("SMS error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send SMS</CardTitle>
        <CardDescription>Send text messages to leads</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sms-phone">Phone Number</Label>
          <Input 
            id="sms-phone" 
            placeholder="+1 (555) 123-4567" 
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sms-message">Message</Label>
          <div className="flex flex-col space-y-2">
            <textarea 
              id="sms-message" 
              rows={3} 
              className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isSendingMessage}
              className="self-end"
            >
              {isSendingMessage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
