import RiskProfileForm from "@/components/onboarding/RiskProfileForm";
export function RiskProfile({ riskAppetite, setRiskAppetite, executiveTeamEnabled, setExecutiveTeamEnabled, companyName }) {
    return (<RiskProfileForm riskAppetite={riskAppetite} setRiskAppetite={setRiskAppetite} executiveTeamEnabled={executiveTeamEnabled} setExecutiveTeamEnabled={setExecutiveTeamEnabled} companyName={companyName}/>);
}
