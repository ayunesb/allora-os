
import React, { useState } from "react";
import { CampaignHeader, CampaignTable } from "@/components/admin/campaigns";
import { Campaign, Platform, CampaignStatus } from "@/types/unified-types";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { 
      id: '1', 
      name: 'Summer Sale', 
      status: 'active' as CampaignStatus, 
      budget: 5000, 
      platform: 'meta' as Platform, 
      created_at: '2025-06-01'
    },
    { 
      id: '2', 
      name: 'Product Launch', 
      status: 'draft' as CampaignStatus, 
      budget: 10000, 
      platform: 'tiktok' as Platform, 
      created_at: '2025-07-15'
    },
    { 
      id: '3', 
      name: 'Holiday Special', 
      status: 'draft' as CampaignStatus, 
      budget: 7500, 
      platform: 'email' as Platform, 
      created_at: '2025-01-01'
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateCampaign = (campaign: any) => {
    setCampaigns(prev => [...prev, { 
      id: `${prev.length + 1}`, 
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
        error={null}
      />
    </div>
  );
}
