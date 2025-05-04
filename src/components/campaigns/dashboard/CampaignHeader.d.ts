/**
 * Props for the CampaignHeader component
 */
interface CampaignHeaderProps {
    /** Function to refresh campaign data - returns a Promise */
    onRefresh: () => Promise<void>;
    /** Function to create a new campaign */
    onCreateCampaign: () => void;
    /** Whether campaign data is currently refreshing */
    isRefreshing: boolean;
}
/**
 * CampaignHeader Component
 *
 * Displays the header for the campaign dashboard with title and action buttons
 * for refreshing data and creating new campaigns.
 */
export declare function CampaignHeader({ onRefresh, onCreateCampaign, isRefreshing }: CampaignHeaderProps): JSX.Element;
export {};
