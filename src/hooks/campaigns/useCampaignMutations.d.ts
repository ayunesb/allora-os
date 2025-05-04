import { Campaign } from '@/types/unified-types';
export declare function useCampaignMutations(companyId?: string): {
    createCampaign: (campaign: Partial<Campaign>) => Promise<Campaign>;
    isCreating: boolean;
    updateCampaign: (campaign: Campaign) => Promise<Campaign>;
    isUpdating: boolean;
    deleteCampaign: (id: string) => Promise<boolean>;
    isDeleting: boolean;
};
