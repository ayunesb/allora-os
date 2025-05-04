import { syncCampaignData } from '@/services/campaignService';
import { toast } from 'sonner';
/**
 * Refreshes campaign data from external ad platforms
 *
 * This function syncs data for all deployed and paid campaigns,
 * showing appropriate toast messages for success/failure.
 *
 * @returns Promise that resolves when refresh operation is complete
 */
export async function refreshCampaignData({ campaigns, onComplete, setIsRefreshing }) {
    setIsRefreshing(true);
    try {
        // Only refresh deployed campaigns
        const deployedCampaigns = campaigns.filter(c => c.deployment_status === 'deployed' && c.payment_status === 'paid');
        if (deployedCampaigns.length === 0) {
            await onComplete();
            toast.success('Campaign list refreshed');
            return;
        }
        // Sync data for each deployed campaign
        for (const campaign of deployedCampaigns) {
            await syncCampaignData(campaign.id);
        }
        // Refetch campaigns
        await onComplete();
        toast.success('Campaign data refreshed');
    }
    catch (error) {
        console.error('Error refreshing campaign data:', error);
        toast.error('Failed to refresh campaign data');
        // Provide more detailed error information when available
        if (error instanceof Error) {
            console.error('Error details:', error.message);
        }
    }
    finally {
        setIsRefreshing(false);
    }
}
