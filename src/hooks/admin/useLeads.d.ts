import { Lead } from '@/models/lead';
export declare function useLeads(): {
    leads: Lead[];
    isLoading: boolean;
    isAddingLead: boolean;
    error: Error;
    searchQuery: string;
    setSearchQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
    sortBy: "name" | "created_at";
    sortOrder: "desc" | "asc";
    toggleSort: (column: "name" | "created_at") => void;
    handleStatusUpdate: (leadId: string, newStatus: Lead["status"]) => Promise<boolean>;
    handleDelete: (leadId: string) => Promise<boolean>;
    addLead: (leadData: Partial<Lead>) => Promise<any>;
    refetchLeads: () => Promise<void>;
};
