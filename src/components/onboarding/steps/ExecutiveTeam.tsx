import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";
export function ExecutiveTeam({ executiveTeamEnabled, setExecutiveTeamEnabled, riskAppetite, companyName, onComplete, isLoading }) {
    // Ensure that onComplete is being passed correctly to the ExecutiveTeamIntro component
    return (<ExecutiveTeamIntro executiveTeamEnabled={executiveTeamEnabled} setExecutiveTeamEnabled={setExecutiveTeamEnabled} riskAppetite={riskAppetite} companyName={companyName} onComplete={onComplete} // This expects a Promise<void> function
     isLoading={isLoading}/>);
}
