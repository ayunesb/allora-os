
import { useState } from "react";
import { useCampaigns } from "@/hooks/campaigns/useCampaigns";
import CampaignsList from "@/components/campaigns/CampaignsList";
import CampaignFormDialog, { CampaignFormValues } from "@/components/campaigns/CampaignFormDialog";
import CampaignHeader from "@/components/campaigns/CampaignHeader";

export default function Campaigns() {
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { 
    campaigns, 
    isLoading, 
    createCampaign, 
    isCreating,
    updateCampaign,
    isUpdating,
    deleteCampaign,
    isDeleting 
  } = useCampaigns();
  
  const onSubmit = (data: CampaignFormValues) => {
    if (editingCampaignId) {
      updateCampaign({ 
        id: editingCampaignId, 
        name: data.name, 
        platform: data.platform as any, 
        budget: data.budget 
      });
    } else {
      createCampaign({
        name: data.name,
        platform: data.platform as any,
        budget: data.budget
      });
    }
    
    setIsDialogOpen(false);
    setEditingCampaignId(null);
  };
  
  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setEditingCampaignId(campaignId);
      setIsDialogOpen(true);
    }
  };
  
  const handleNewCampaign = () => {
    setEditingCampaignId(null);
    setIsDialogOpen(true);
  };

  // Get default values for the form based on whether we're editing or creating
  const getFormDefaultValues = () => {
    if (editingCampaignId) {
      const campaign = campaigns.find(c => c.id === editingCampaignId);
      if (campaign) {
        return {
          name: campaign.name,
          platform: (campaign.platform as any) || "Google",
          budget: campaign.budget || 100,
        };
      }
    }
    return {
      name: "",
      platform: "Google",
      budget: 100,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CampaignHeader onNewCampaign={handleNewCampaign} />
      
      <CampaignsList 
        campaigns={campaigns}
        isLoading={isLoading}
        handleEditCampaign={handleEditCampaign}
        deleteCampaign={deleteCampaign}
        onCreateCampaign={handleNewCampaign}
      />
      
      <CampaignFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={onSubmit}
        defaultValues={getFormDefaultValues()}
        isSubmitting={isCreating || isUpdating}
        isEditing={!!editingCampaignId}
      />
    </div>
  );
}
