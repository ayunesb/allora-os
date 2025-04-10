
import { useState, useEffect } from "react";
import { useCampaigns } from "@/hooks/campaigns/useCampaigns";
import { useCampaignTracking } from "@/hooks/campaigns/useCampaignTracking";
import CampaignsList from "@/components/campaigns/CampaignsList";
import CampaignFormDialog, { CampaignFormValues } from "@/components/campaigns/CampaignFormDialog";
import CampaignHeader from "@/components/campaigns/CampaignHeader";
import { executiveBots } from "@/backend/executiveBots";
import { useSelfLearning } from "@/hooks/useSelfLearning";

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
    isDeleting,
    refetch
  } = useCampaigns();
  
  const {
    trackCampaignView,
    trackCampaignApprove
  } = useCampaignTracking();
  
  const { trackAction } = useSelfLearning();
  
  // Attribute campaigns to AI executives if they don't have attribution
  useEffect(() => {
    // Get all executive names flattened into an array
    const allExecs = Object.values(executiveBots).flat();
    
    // Track page view
    trackAction(
      'view_page',
      'page_view',
      'campaigns',
      'page',
      { page: 'campaigns' }
    );
    
  }, [trackAction]);
  
  const onSubmit = (data: CampaignFormValues) => {
    if (editingCampaignId) {
      updateCampaign({ 
        id: editingCampaignId, 
        name: data.name, 
        platform: data.platform as any, 
        budget: data.budget 
      });
    } else {
      // For new campaigns, attribute to an executive bot
      const allExecs = Object.values(executiveBots).flat();
      const randomExec = allExecs[Math.floor(Math.random() * allExecs.length)];
      
      createCampaign({
        name: data.name,
        platform: data.platform as any,
        budget: data.budget,
        // We'll add this to campaign data via Supabase hooks
        // since it's not officially part of the type
        executiveBot: randomExec
      } as any);
      
      // Track the campaign creation with executive attribution
      trackAction(
        'create_campaign',
        'campaign_management',
        'new-campaign',
        'campaign',
        { 
          name: data.name,
          platform: data.platform,
          executiveBot: randomExec 
        }
      );
    }
    
    setIsDialogOpen(false);
    setEditingCampaignId(null);
  };
  
  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setEditingCampaignId(campaignId);
      setIsDialogOpen(true);
      
      // Track campaign edit action
      trackCampaignView(campaignId, campaign.name);
    }
  };
  
  const handleNewCampaign = () => {
    setEditingCampaignId(null);
    setIsDialogOpen(true);
  };
  
  // Handle campaign approval (AI learning feedback)
  const handleApproveCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      // Cast campaign to any to access executiveBot property which is added dynamically
      const executiveBot = (campaign as any).executiveBot;
      
      trackCampaignApprove(
        campaignId, 
        campaign.name, 
        executiveBot
      );
      
      // Refresh campaigns after approval
      setTimeout(() => refetch(), 1000);
    }
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
        campaigns={campaigns as any[]}
        isLoading={isLoading}
        handleEditCampaign={handleEditCampaign}
        deleteCampaign={deleteCampaign}
        onCreateCampaign={handleNewCampaign}
        onApproveCampaign={handleApproveCampaign}
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
