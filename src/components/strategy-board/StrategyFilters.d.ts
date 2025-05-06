interface StrategyFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  sortBy: "newest" | "oldest" | "alphabetical" | "risk";
  setSortBy: (sort: "newest" | "oldest" | "alphabetical" | "risk") => void;
  onExportAll: () => void;
  isMobile: boolean;
}
export default function StrategyFilters({
  searchQuery,
  setSearchQuery,
  riskFilter,
  setRiskFilter,
  sortBy,
  setSortBy,
  onExportAll,
  isMobile,
}: StrategyFiltersProps): JSX.Element;
export {};
