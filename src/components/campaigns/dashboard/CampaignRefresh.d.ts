import { Campaign } from '@/models/campaign';
/**
 * Props for campaign refresh operations
 */
interface CampaignRefreshProps {
    /** Array of campaigns to potentially refresh */
    campaigns: Campaign[];
    /** Callback function to execute after refresh completes */
    onComplete: () => Promise<void>;
    /** State setter for refresh status */
    setIsRefreshing: (isRefreshing: boolean) => void;
    /** Current refresh status */
    isRefreshing: boolean;
}
/**
 * Refreshes campaign data from external ad platforms
 *
 * This function syncs data for all deployed and paid campaigns,
 * showing appropriate toast messages for success/failure.
 *
 * @returns Promise that resolves when refresh operation is complete
 */
export declare function refreshCampaignData({ campaigns, onComplete, setIsRefreshing }: Omit<CampaignRefreshProps, 'isRefreshing'>): Promise<void>;
export {};
