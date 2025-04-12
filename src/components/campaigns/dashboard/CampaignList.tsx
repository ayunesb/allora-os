
import { Campaign } from '@/models/campaign';
import { CampaignCard } from './CampaignCard';
import { CampaignEmptyState } from './CampaignEmptyState';

interface CampaignListProps {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  onCreateCampaign: () => void;
}

export function CampaignList({ campaigns, filteredCampaigns, onCreateCampaign }: CampaignListProps) {
  if (campaigns.length === 0) {
    return <CampaignEmptyState onCreateCampaign={onCreateCampaign} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
