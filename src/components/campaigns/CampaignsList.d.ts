import { Campaign } from "@/models/campaign";
interface CampaignsListProps {
    campaigns: Campaign[];
    isLoading: boolean;
    handleEditCampaign: (id: string) => void;
    deleteCampaign: (id: string) => void;
    onCreateCampaign: () => void;
    onApproveCampaign?: (id: string) => void;
    onExportCampaign?: (id: string, format: 'pdf' | 'csv') => void;
}
export default function CampaignsList({ campaigns, isLoading, handleEditCampaign, deleteCampaign, onCreateCampaign, onApproveCampaign, onExportCampaign }: CampaignsListProps): import("react").JSX.Element;
export {};
