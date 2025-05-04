import { Lead } from '@/models/lead';
export declare function useLeadSelection(): {
    selectedLeads: string[];
    selectedCount: number;
    isSelectAll: boolean;
    toggleSelectLead: (leadId: string) => void;
    selectAllLeads: (leads: Lead[]) => void;
    deselectAllLeads: () => void;
    toggleSelectAll: (leads: Lead[]) => void;
    isLeadSelected: (leadId: string) => boolean;
    getSelectedLeads: (allLeads: Lead[]) => Lead[];
    handleLeadSelect: (leadId: string, isSelected: boolean) => void;
    handleSelectAll: (leads: Lead[], isSelected: boolean) => void;
    handleBulkStatusUpdate: (status: Lead["status"]) => Promise<boolean>;
};
