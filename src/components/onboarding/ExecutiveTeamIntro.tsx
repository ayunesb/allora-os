
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { getExecutiveSuggestions } from "@/utils/ai-executives";
import { ExecutiveTeamCarousel } from "./ExecutiveTeamCarousel";
import { useState } from "react";

interface ExecutiveTeamIntroProps {
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  riskAppetite: 'low' | 'medium' | 'high';
  companyName: string;
  onComplete?: () => void;
  isLoading?: boolean;
}

export default function ExecutiveTeamIntro({
  executiveTeamEnabled,
  setExecutiveTeamEnabled,
  riskAppetite,
  companyName,
  onComplete,
  isLoading = false
}: ExecutiveTeamIntroProps) {
  const executives = getExecutiveSuggestions(riskAppetite);
  const [whatsAppOptIn, setWhatsAppOptIn] = useState(true);
  const [emailOptIn, setEmailOptIn] = useState(true);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meet Your AI Executive Team</h1>
        <p className="text-muted-foreground mt-2">
          Based on your company profile and risk appetite, we've assembled an executive team of AI advisors to help you grow.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <Label htmlFor="executive-team-toggle" className="font-medium">Enable AI Executive Team</Label>
              <p className="text-sm text-muted-foreground">
                Your personalized team of AI executives will provide insights tailored to your business.
              </p>
            </div>
            <Switch
              id="executive-team-toggle"
              checked={executiveTeamEnabled}
              onCheckedChange={setExecutiveTeamEnabled}
            />
          </div>

          {executiveTeamEnabled && (
            <div className="mt-6 mb-4">
              <p className="text-sm font-medium mb-4">Your AI Executive Team for {companyName}:</p>
              <ExecutiveTeamCarousel executives={executives} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">Communication Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="whatsapp-opt-in" 
                checked={whatsAppOptIn} 
                onCheckedChange={(checked) => setWhatsAppOptIn(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="whatsapp-opt-in"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  WhatsApp Business Messages
                </Label>
                <p className="text-xs text-muted-foreground">
                  I agree to receive business messages via WhatsApp from Allora AI. 
                  I understand I can text STOP at any time to opt out.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="email-opt-in" 
                checked={emailOptIn} 
                onCheckedChange={(checked) => setEmailOptIn(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="email-opt-in"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Communications
                </Label>
                <p className="text-xs text-muted-foreground">
                  I agree to receive email communications from Allora AI. 
                  Each email will include an unsubscribe option.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={onComplete} 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting Up Your Dashboard...
          </>
        ) : (
          "Complete Setup & Launch Dashboard"
        )}
      </Button>
    </div>
  );
}
