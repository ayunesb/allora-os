
import React, { useState } from "react";
import { CampaignHeader, CampaignTable } from "@/components/admin/campaigns";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: '1', name: 'Summer Sale', status: 'active', budget: 5000, platform: 'Facebook', startDate: '2025-06-01', endDate: '2025-06-30' },
    { id: '2', name: 'Product Launch', status: 'scheduled', budget: 10000, platform: 'Instagram', startDate: '2025-07-15', endDate: '2025-08-15' },
    { id: '3', name: 'Holiday Special', status: 'draft', budget: 7500, platform: 'Multiple', startDate: '', endDate: '' }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateCampaign = (campaign: any) => {
    setCampaigns(prev => [...prev, { id: `${prev.length + 1}`, ...campaign }]);
  };
  
  return (
    <div className="space-y-6">
      <CampaignHeader 
        onCreateCampaign={handleCreateCampaign} 
      />
      <CampaignTable 
        campaigns={campaigns}
        isLoading={isLoading}
        onUpdateCampaign={() => {}}
        onDeleteCampaign={() => {}}
        onViewCampaign={() => {}}
      />
    </div>
  );
}
