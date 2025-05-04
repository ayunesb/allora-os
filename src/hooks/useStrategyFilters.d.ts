import { Strategy } from "@/models/strategy";
type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'risk';
export declare function useStrategyFilters(strategies: Strategy[]): {
    searchQuery: string;
    setSearchQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
    riskFilter: string;
    setRiskFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    sortBy: SortOption;
    setSortBy: import("react").Dispatch<import("react").SetStateAction<SortOption>>;
    filteredAndSortedStrategies: Strategy[];
};
export {};
