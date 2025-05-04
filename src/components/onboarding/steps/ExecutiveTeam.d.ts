interface ExecutiveTeamProps {
    executiveTeamEnabled: boolean;
    setExecutiveTeamEnabled: (enabled: boolean) => void;
    riskAppetite: 'low' | 'medium' | 'high';
    companyName: string;
    onComplete: () => Promise<void>;
    isLoading: boolean;
}
export declare function ExecutiveTeam({ executiveTeamEnabled, setExecutiveTeamEnabled, riskAppetite, companyName, onComplete, isLoading }: ExecutiveTeamProps): import("react").JSX.Element;
export {};
