interface DecisionFiltersProps {
  executiveFilter: string;
  setExecutiveFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  riskFilter: string;
  setRiskFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}
export declare function DecisionFilters({
  executiveFilter,
  setExecutiveFilter,
  priorityFilter,
  setPriorityFilter,
  riskFilter,
  setRiskFilter,
  searchQuery,
  setSearchQuery,
}: DecisionFiltersProps): JSX.Element;
export {};
