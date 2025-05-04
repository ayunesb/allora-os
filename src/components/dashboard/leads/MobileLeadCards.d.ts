import React from 'react';
import { Lead } from '@/models/lead';
interface MobileLeadCardsProps {
    leads: Lead[];
    onViewLead: (lead: Lead) => void;
    onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
    onDelete: (leadId: string) => Promise<void>;
    getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
    getNextBestAction: (lead: Lead) => string;
}
export declare const MobileLeadCards: React.FC<MobileLeadCardsProps>;
export {};
