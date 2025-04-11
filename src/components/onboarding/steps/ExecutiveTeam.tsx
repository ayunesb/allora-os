
import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";

interface ExecutiveTeamProps {
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  riskAppetite: 'low' | 'medium' | 'high';
  companyName: string;
  onComplete: () => Promise<void>;
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
  // Ensure that onComplete is being passed correctly to the ExecutiveTeamIntro component
  return (
    <ExecutiveTeamIntro
      executiveTeamEnabled={executiveTeamEnabled}
      setExecutiveTeamEnabled={setExecutiveTeamEnabled}
      riskAppetite={riskAppetite}
      companyName={companyName}
      onComplete={onComplete} // This expects a Promise<void> function
      isLoading={isLoading}
    />
  );
}
