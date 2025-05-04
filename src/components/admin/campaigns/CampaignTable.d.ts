import { Campaign } from '@/types/unified-types';
interface CampaignTableProps {
    campaigns: Campaign[];
    isLoading: boolean;
    error?: string | null;
    onRetry?: () => void;
}
declare const CampaignTable: ({ campaigns, isLoading, error, onRetry }: CampaignTableProps) => JSX.Element;
export default CampaignTable;
