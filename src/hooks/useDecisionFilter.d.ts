import { ExecutiveDecision } from "@/types/agents";
export declare function useDecisionFilter(decisions: ExecutiveDecision[]): {
  executiveFilter: string;
  setExecutiveFilter: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  priorityFilter: string;
  setPriorityFilter: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  riskFilter: string;
  setRiskFilter: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  searchQuery: string;
  setSearchQuery: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  filteredDecisions: ExecutiveDecision[];
};
