import React from 'react';
import { Lead } from '@/models/lead';
type LeadsTableProps = {
    leads: Lead[];
    sortBy: 'name' | 'created_at';
    sortOrder: 'asc' | 'desc';
    onSort: (column: 'name' | 'created_at') => void;
    onDelete: (leadId: string) => Promise<boolean | void>;
    onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<boolean | void>;
    isMobileView?: boolean;
};
export declare const LeadsTable: React.FC<LeadsTableProps>;
export {};
