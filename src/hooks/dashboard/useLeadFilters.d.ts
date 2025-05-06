import { Lead, LeadStatus } from "@/models/lead";
type FilterCriteria = {
  status?: LeadStatus | "all";
  search?: string;
  campaignId?: string;
  startDate?: Date;
  endDate?: Date;
};
export declare function useLeadFilters(initialLeads?: Lead[]): {
  leads: Lead[];
  setLeads: import("react").Dispatch<import("react").SetStateAction<Lead[]>>;
  filters: FilterCriteria;
  updateFilters: (newFilters: Partial<FilterCriteria>) => void;
  resetFilters: () => void;
  filteredLeads: Lead[];
  filterStats: {
    total: number;
    filtered: number;
    percentageShown: number;
    statusCounts: Record<string, number>;
  };
  activeFilter: string;
  setActiveFilter: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
};
export {};
