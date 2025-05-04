import React from 'react';
import { Lead } from '@/models/lead';
interface LeadsContentProps {
    leads: Lead[];
    isMobileView: boolean;
    filteredLeads: Lead[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
    selectedLeads: string[];
    handleLeadSelect: (leadId: string, isSelected: boolean) => void;
    handleSelectAll: (leads: Lead[], isSelected: boolean) => void;
    handleBulkStatusUpdate: (status: Lead['status']) => Promise<boolean | void>;
    handleViewLead: (lead: Lead) => void;
    handleLeadStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
    handleLeadDelete: (leadId: string) => Promise<void>;
    refetchLeads: () => void;
    sortBy: 'name' | 'created_at';
    sortOrder: 'asc' | 'desc';
    toggleSort: (column: 'name' | 'created_at') => void;
    getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
    getNextBestAction: (lead: Lead) => string;
    campaigns: Array<{
        id: string;
        name: string;
    }>;
}
export declare const LeadsContent: React.FC<LeadsContentProps>;
export {};
