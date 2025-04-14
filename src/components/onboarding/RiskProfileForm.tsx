
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, ShieldAlert, Zap } from "lucide-react";

interface RiskProfileFormProps {
  riskAppetite: 'low' | 'medium' | 'high';
  setRiskAppetite: (risk: 'low' | 'medium' | 'high') => void;
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  companyName: string;
}

export default function RiskProfileForm({
  riskAppetite,
  setRiskAppetite,
  executiveTeamEnabled,
  setExecutiveTeamEnabled,
  companyName
}: RiskProfileFormProps) {
  const displayCompanyName = companyName || "your company";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Risk Appetite</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select the risk profile that best matches {displayCompanyName}'s approach to growth.
        </p>
      </div>

      <RadioGroup
        value={riskAppetite}
        onValueChange={(value) => setRiskAppetite(value as 'low' | 'medium' | 'high')}
        className="grid gap-4"
      >
        <Card className={`border ${riskAppetite === 'low' ? 'border-risk-low-DEFAULT' : 'border-muted'}`}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <RadioGroupItem value="low" id="risk-low" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-risk-low" />
                  <Label htmlFor="risk-low" className="font-medium">Conservative (Low Risk)</Label>
                </div>
                <div className="text-sm text-muted-foreground pl-7">
                  <p>Prioritize steady, reliable growth with minimal financial risk.</p>
                  <p className="mt-1">Focus on proven strategies and consistent results.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border ${riskAppetite === 'medium' ? 'border-risk-medium-DEFAULT' : 'border-muted'}`}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <RadioGroupItem value="medium" id="risk-medium" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-risk-medium" />
                  <Label htmlFor="risk-medium" className="font-medium">Balanced (Moderate Risk)</Label>
                </div>
                <div className="text-sm text-muted-foreground pl-7">
                  <p>Balance growth opportunities with calculated risks.</p>
                  <p className="mt-1">Mix proven strategies with selective innovation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border ${riskAppetite === 'high' ? 'border-risk-high-DEFAULT' : 'border-muted'}`}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <RadioGroupItem value="high" id="risk-high" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-risk-high" />
                  <Label htmlFor="risk-high" className="font-medium">Aggressive (High Risk)</Label>
                </div>
                <div className="text-sm text-muted-foreground pl-7">
                  <p>Prioritize rapid expansion and breakthrough opportunities.</p>
                  <p className="mt-1">Embrace innovation and disruptive strategies for maximum growth potential.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>
    </div>
  );
}
