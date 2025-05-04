import { Campaign } from "@/models/campaign";
interface CampaignMetricsProps {
    campaign: Campaign;
    onRefresh: () => void;
    isRefreshing: boolean;
}
export default function CampaignMetrics({ campaign, onRefresh, isRefreshing }: CampaignMetricsProps): import("react").JSX.Element;
export {};
