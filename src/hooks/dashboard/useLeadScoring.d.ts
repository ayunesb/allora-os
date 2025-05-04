import { Lead } from '@/models/lead';
type LeadScore = 'hot' | 'warm' | 'cold';
export declare function useLeadScoring(): {
    calculateLeadScore: (lead: Lead) => number;
    getLeadScore: (lead: Lead) => LeadScore;
    getNextBestAction: (lead: Lead) => string;
};
export {};
