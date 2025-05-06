import { Campaign } from "@/types/unified-types";
interface CampaignDetailHeaderProps {
  campaign: Campaign;
  onBack: () => void;
  onDeploy: () => void;
  isDeploying: boolean;
}
export declare function CampaignDetailHeader({
  campaign,
  onBack,
  onDeploy,
  isDeploying,
}: CampaignDetailHeaderProps): import("react").JSX.Element;
export {};
