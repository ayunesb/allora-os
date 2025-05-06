import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
export function WhatsAppOptIn({ onOptInChange, initialValue = false }) {
  const [optedIn, setOptedIn] = useState(initialValue);
  const handleChange = (checked) => {
    setOptedIn(checked);
    onOptInChange(checked);
  };
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">WhatsApp Communication</CardTitle>
        <CardDescription>
          Receive AI-powered guidance and updates directly via WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 rounded-full p-2 mt-1">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            <p className="text-sm">
              Our AI executive team can send personalized business
              recommendations, marketing campaigns, and strategic advice
              directly to your WhatsApp. All messages are human-like and
              tailored to your business needs.
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="whatsapp-opt-in"
                checked={optedIn}
                onCheckedChange={handleChange}
              />
              <Label htmlFor="whatsapp-opt-in" className="text-sm font-medium">
                Yes, I want to receive AI business guidance via WhatsApp
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              You can opt-out anytime by replying STOP to any message. We
              respect your privacy and comply with all WhatsApp Business
              messaging policies. See our{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              for details.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
        Only pre-approved message templates will be used outside the 24-hour
        conversation window.
      </CardFooter>
    </Card>
  );
}
