import React from 'react';
import { Campaign } from '@/types/unified-types';
interface CampaignListProps {
    campaigns: Campaign[];
    filteredCampaigns?: Campaign[];
    onCreateCampaign?: () => void;
    isLoading?: boolean;
}
export declare const CampaignList: React.FC<CampaignListProps>;
export {};
