
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CampaignHeader from '@/components/admin/campaigns/CampaignHeader';
import CampaignTable from '@/components/admin/campaigns/CampaignTable';
import CreateCampaignDialog from '@/components/admin/campaigns/CreateCampaignDialog';
import { useCampaignOperations } from '@/hooks/admin/useCampaignOperations';

export default function AdminCampaigns() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const {
    campaigns,
    companies,
    isLoading,
    isSubmitting,
    error,
    newCampaign,
    updateFormData,
    createCampaign,
    refreshCampaigns
  } = useCampaignOperations();

  const handleCreateCampaign = async () => {
    const success = await createCampaign();
    if (success) {
      setOpenAddDialog(false);
    }
  };

  return (
    <div>
      <CampaignHeader onCreateClick={() => setOpenAddDialog(true)} />
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignTable 
            campaigns={campaigns}
            isLoading={isLoading}
            error={error}
            onRetry={refreshCampaigns}
          />
        </CardContent>
      </Card>

      <CreateCampaignDialog
        open={openAddDialog}
        onOpenChange={setOpenAddDialog}
        formData={newCampaign}
        onChange={updateFormData}
        onSubmit={handleCreateCampaign}
        companies={companies}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
