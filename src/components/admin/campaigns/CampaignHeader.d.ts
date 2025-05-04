interface CampaignHeaderProps {
    onCreateClick: () => void;
    onCreateCampaign?: (campaign: any) => void;
}
declare const CampaignHeader: ({ onCreateClick, onCreateCampaign }: CampaignHeaderProps) => JSX.Element;
export default CampaignHeader;
