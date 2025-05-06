import { jsx as _jsx } from "react/jsx-runtime";
import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";
export function ExecutiveTeam({ executiveTeamEnabled, setExecutiveTeamEnabled, riskAppetite, companyName, onComplete, isLoading, }) {
    // Ensure that onComplete is being passed correctly to the ExecutiveTeamIntro component
    return (_jsx(ExecutiveTeamIntro, { executiveTeamEnabled: executiveTeamEnabled, setExecutiveTeamEnabled: setExecutiveTeamEnabled, riskAppetite: riskAppetite, companyName: companyName, onComplete: onComplete, isLoading: isLoading }));
}
