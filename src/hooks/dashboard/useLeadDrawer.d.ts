import { Lead } from '@/models/lead';
export declare function useLeadDrawer(): {
    isOpen: boolean;
    activeLead: Lead;
    isEditing: boolean;
    isCreating: boolean;
    isLoading: boolean;
    openDrawer: (lead?: Lead) => void;
    closeDrawer: () => void;
    startEditing: () => void;
    cancelEditing: () => void;
    handleStatusChange: (leadId: string, newStatus: string) => Promise<boolean>;
    handleDeleteLead: (leadId: string) => Promise<boolean>;
    handleCreateLead: (leadData: Omit<Lead, "id" | "created_at">) => Promise<Lead>;
    selectedLead: Lead;
    isDrawerOpen: boolean;
    handleViewLead: (lead?: Lead) => void;
    setIsDrawerOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
