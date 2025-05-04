interface RiskProfileFormProps {
    riskAppetite: 'low' | 'medium' | 'high';
    setRiskAppetite: (risk: 'low' | 'medium' | 'high') => void;
    executiveTeamEnabled: boolean;
    setExecutiveTeamEnabled: (enabled: boolean) => void;
    companyName: string;
}
export default function RiskProfileForm({ riskAppetite, setRiskAppetite, executiveTeamEnabled, setExecutiveTeamEnabled, companyName }: RiskProfileFormProps): import("react").JSX.Element;
export {};
