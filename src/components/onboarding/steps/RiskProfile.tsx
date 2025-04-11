
import RiskProfileForm from "@/components/onboarding/RiskProfileForm";

interface RiskProfileProps {
  riskAppetite: 'low' | 'medium' | 'high';
  setRiskAppetite: (risk: 'low' | 'medium' | 'high') => void;
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  companyName: string;
}

export function RiskProfile({ 
  riskAppetite, 
  setRiskAppetite, 
  executiveTeamEnabled, 
  setExecutiveTeamEnabled, 
  companyName 
}: RiskProfileProps) {
  return (
    <RiskProfileForm
      riskAppetite={riskAppetite}
      setRiskAppetite={setRiskAppetite}
      executiveTeamEnabled={executiveTeamEnabled}
      setExecutiveTeamEnabled={setExecutiveTeamEnabled}
      companyName={companyName}
    />
  );
}
