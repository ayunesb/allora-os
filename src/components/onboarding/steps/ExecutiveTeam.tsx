
import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";

interface ExecutiveTeamProps {
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  riskAppetite: 'low' | 'medium' | 'high';
  companyName: string;
  onComplete: () => void;
  isLoading: boolean;
}

export function ExecutiveTeam({ 
  executiveTeamEnabled, 
  setExecutiveTeamEnabled, 
  riskAppetite, 
  companyName, 
  onComplete, 
  isLoading 
}: ExecutiveTeamProps) {
  return (
    <ExecutiveTeamIntro
      executiveTeamEnabled={executiveTeamEnabled}
      setExecutiveTeamEnabled={setExecutiveTeamEnabled}
      riskAppetite={riskAppetite}
      companyName={companyName}
      onComplete={onComplete}
      isLoading={isLoading}
    />
  );
}
