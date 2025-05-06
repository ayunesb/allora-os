interface RiskProfileProps {
  riskAppetite: "low" | "medium" | "high";
  setRiskAppetite: (risk: "low" | "medium" | "high") => void;
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  companyName: string;
}
export declare function RiskProfile({
  riskAppetite,
  setRiskAppetite,
  executiveTeamEnabled,
  setExecutiveTeamEnabled,
  companyName,
}: RiskProfileProps): import("react").JSX.Element;
export {};
