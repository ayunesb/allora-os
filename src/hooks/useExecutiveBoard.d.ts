export type ExecutiveRole =
  | "ceo"
  | "coo"
  | "cfo"
  | "cio"
  | "cmo"
  | "chro"
  | "strategy"
  | "operations"
  | "research"
  | "sales";
export type RiskLevel = "Low" | "Medium" | "High";
export type ExecutiveBot = {
  id: string;
  name: string;
  role: string;
  title: string;
  specialization: string[];
  optimization: string;
  avatar: string;
  riskAppetite: RiskLevel;
};
export declare function useExecutiveBoard(): {
  executives: ExecutiveBot[];
  filteredExecutives: ExecutiveBot[];
  searchQuery: string;
  setSearchQuery: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  roleFilter: string;
  setRoleFilter: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  riskFilter: "all" | RiskLevel;
  setRiskFilter: import("react").Dispatch<
    import("react").SetStateAction<"all" | RiskLevel>
  >;
  getExecutivesByRole: (role: string) => ExecutiveBot[];
  getExecutivesByRisk: (risk: RiskLevel) => ExecutiveBot[];
};
