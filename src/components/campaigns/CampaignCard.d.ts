import { Campaign } from "@/models/campaign";
interface CampaignCardProps {
    campaign: Campaign;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onFeedback?: (id: string, isPositive: boolean) => void;
    onExport?: (id: string, format: 'pdf' | 'csv') => void;
}
export default function CampaignCard({ campaign, onEdit, onDelete, onFeedback, onExport }: CampaignCardProps): import("react").JSX.Element;
export {};
