import { Lead } from '@/models/lead';
export declare function useLeadOperations(companyId?: string): {
    isLoading: boolean;
    error: string;
    fetchLeads: () => Promise<any[]>;
    updateLeadStatus: (leadId: string, status: Lead["status"]) => Promise<boolean>;
    deleteLead: (leadId: string) => Promise<boolean>;
    createLead: (data: Partial<Lead>) => Promise<any>;
};
