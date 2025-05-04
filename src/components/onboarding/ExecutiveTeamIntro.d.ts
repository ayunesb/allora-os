interface ExecutiveTeamIntroProps {
    executiveTeamEnabled: boolean;
    setExecutiveTeamEnabled: (enabled: boolean) => void;
    riskAppetite: 'low' | 'medium' | 'high';
    companyName: string;
    onComplete: () => Promise<void>;
    isLoading: boolean;
}
export default function ExecutiveTeamIntro({ executiveTeamEnabled, setExecutiveTeamEnabled, riskAppetite, companyName, onComplete, isLoading }: ExecutiveTeamIntroProps): JSX.Element;
export {};
