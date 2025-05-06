import { jsx as _jsx } from "react/jsx-runtime";
import RiskProfileForm from "@/components/onboarding/RiskProfileForm";
export function RiskProfile({ riskAppetite, setRiskAppetite, executiveTeamEnabled, setExecutiveTeamEnabled, companyName, }) {
    return (_jsx(RiskProfileForm, { riskAppetite: riskAppetite, setRiskAppetite: setRiskAppetite, executiveTeamEnabled: executiveTeamEnabled, setExecutiveTeamEnabled: setExecutiveTeamEnabled, companyName: companyName }));
}
