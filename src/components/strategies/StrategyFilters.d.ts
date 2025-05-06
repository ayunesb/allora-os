type SortOption = "newest" | "oldest" | "alphabetical" | "risk";
interface StrategyFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: string;
  setRiskFilter: (risk: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}
declare const StrategyFilters: React.FC<StrategyFiltersProps>;
export default StrategyFilters;
