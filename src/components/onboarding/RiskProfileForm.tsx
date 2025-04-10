
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type RiskProfileFormProps = {
  riskAppetite: 'low' | 'medium' | 'high';
  setRiskAppetite: (risk: 'low' | 'medium' | 'high') => void;
  executiveTeamEnabled?: boolean;
  setExecutiveTeamEnabled?: (enabled: boolean) => void;
  companyName?: string;
  error?: string;
}

export default function RiskProfileForm({ 
  riskAppetite, 
  setRiskAppetite,
  executiveTeamEnabled,
  setExecutiveTeamEnabled,
  companyName,
  error 
}: RiskProfileFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Strategy Risk Profile</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This will determine how aggressive your AI executives will be with their strategy recommendations.
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select your risk appetite</Label>
          <RadioGroup
            value={riskAppetite}
            onValueChange={(value) => setRiskAppetite(value as 'low' | 'medium' | 'high')}
            className="grid grid-cols-1 gap-4 pt-2"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
              <RadioGroupItem value="low" id="risk-low" />
              <Label htmlFor="risk-low" className="flex-1 cursor-pointer">
                <div className="font-medium">Conservative</div>
                <div className="text-sm text-muted-foreground">
                  Focus on stability and predictable growth with minimal risks
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
              <RadioGroupItem value="medium" id="risk-medium" />
              <Label htmlFor="risk-medium" className="flex-1 cursor-pointer">
                <div className="font-medium">Balanced</div>
                <div className="text-sm text-muted-foreground">
                  Mix of stable approaches with calculated risks for better returns
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4 hover:bg-accent">
              <RadioGroupItem value="high" id="risk-high" />
              <Label htmlFor="risk-high" className="flex-1 cursor-pointer">
                <div className="font-medium">Aggressive</div>
                <div className="text-sm text-muted-foreground">
                  Innovative, high-risk, high-reward strategies for maximum growth
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-primary/10 p-4 rounded-lg mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Potential Risk</span>
            <span className="text-sm font-medium">Potential Reward</span>
          </div>
          <Slider
            defaultValue={[
              riskAppetite === 'low' ? 30 : riskAppetite === 'medium' ? 60 : 90
            ]}
            max={100}
            step={1}
            disabled
            className="cursor-default"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">Lower</span>
            <span className="text-xs text-muted-foreground">Higher</span>
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
