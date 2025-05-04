import React, { useState } from "react";
import { CampaignHeader, CampaignTable } from "@/components/admin/campaigns";
export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([
        {
            id: '1',
            name: 'Summer Sale',
            status: 'active',
            budget: 5000,
            platform: 'meta',
            startDate: '2025-06-01'
        },
        {
            id: '2',
            name: 'Product Launch',
            status: 'draft',
            budget: 10000,
            platform: 'tiktok',
            startDate: '2025-07-15'
        },
        {
            id: '3',
            name: 'Holiday Special',
            status: 'draft',
            budget: 7500,
            platform: 'email',
            startDate: '2025-01-01'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const handleCreateCampaign = (campaign) => {
        setCampaigns(prev => [...prev, {
                id: `${prev.length + 1}`,
                startDate: new Date().toISOString(),
                ...campaign
            }]);
    };
    return (<div className="space-y-6">
      <CampaignHeader onCreateClick={() => { }} onCreateCampaign={handleCreateCampaign}/>
      <CampaignTable campaigns={campaigns} isLoading={isLoading} error={null}/>
    </div>);
}
