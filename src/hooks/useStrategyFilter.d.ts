import { Strategy } from "@/models/strategy";
export declare function useStrategyFilter(strategies?: Strategy[]): {
    searchQuery: string;
    setSearchQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
    riskFilter: string;
    setRiskFilter: import("react").Dispatch<import("react").SetStateAction<string>>;
    sortBy: "risk" | "newest" | "oldest" | "alphabetical";
    setSortBy: import("react").Dispatch<import("react").SetStateAction<"risk" | "newest" | "oldest" | "alphabetical">>;
    sortedStrategies: Strategy[];
};
