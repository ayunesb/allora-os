
import React, { useState } from "react";
import { CampaignHeader, CampaignTable } from "@/components/admin/campaigns";
import { Campaign, Platform } from "@/models/campaign";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Summer Sale', status: 'Active', budget: 5000, platform: 'Facebook' as Platform, created_at: '2025-06-01', company_id: '1' },
    { id: '2', name: 'Product Launch', status: 'Scheduled', budget: 10000, platform: 'Instagram' as Platform, created_at: '2025-07-15', company_id: '1' },
    { id: '3', name: 'Holiday Special', status: 'Draft', budget: 7500, platform: 'Multiple' as Platform, created_at: '2025-01-01', company_id: '1' }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateCampaign = (campaign: any) => {
    setCampaigns(prev => [...prev, { 
      id: `${prev.length + 1}`, 
      company_id: '1',
      created_at: new Date().toISOString(),
      ...campaign
    }]);
  };
  
  return (
    <div className="space-y-6">
      <CampaignHeader 
        onCreateClick={() => {}}
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
