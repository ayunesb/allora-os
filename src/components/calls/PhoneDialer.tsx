
import React, { useState } from "react";
import { PhoneCall, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { makeCall } from "@/utils/callHelpers";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";

interface PhoneDialerProps {
  phoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

export default function PhoneDialer({ 
  phoneNumber, 
  onPhoneNumberChange 
}: PhoneDialerProps) {
  const [isCallingLoading, setIsCallingLoading] = useState(false);
  const { user } = useAuthState();
  const { trackAction } = useSelfLearning();

  const handleCall = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setIsCallingLoading(true);
    try {
      if (user?.id) {
        trackAction(
          'initiate_call',
          'call_initiate',
          phoneNumber,
          'phone_call',
          { phoneNumber }
        );
      }
      
      await makeCall(phoneNumber, user?.id);
      toast.success("Call initiated successfully");
    } catch (error) {
      console.error("Call error:", error);
      toast.error("Failed to initiate call");
    } finally {
      setIsCallingLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Call</CardTitle>
        <CardDescription>Call potential customers or leads</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="call-phone">Phone Number</Label>
          <div className="flex space-x-2">
            <Input 
              id="call-phone" 
              placeholder="+1 (555) 123-4567" 
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
            />
            <Button onClick={handleCall} disabled={isCallingLoading}>
              {isCallingLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calling...
                </>
              ) : (
                <>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Call
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Calls are made using your connected Twilio account.</p>
          <p>Standard rates apply based on your Twilio plan.</p>
        </div>
      </CardContent>
    </Card>
  );
}
