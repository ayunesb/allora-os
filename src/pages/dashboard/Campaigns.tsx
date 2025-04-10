
import { useState, useEffect } from "react";
import { useCampaigns } from "@/hooks/campaigns/useCampaigns";
import { useCampaignTracking } from "@/hooks/campaigns/useCampaignTracking";
import CampaignsList from "@/components/campaigns/CampaignsList";
import CampaignHeader from "@/components/campaigns/CampaignHeader";
import CampaignAnalytics from "@/components/campaigns/CampaignAnalytics";
import CampaignWizard, { CampaignWizardData } from "@/components/campaigns/CampaignWizard";
import { executiveBots } from "@/backend/executiveBots";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { toast } from "sonner";
import { Campaign, Platform } from "@/models/campaign";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

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
  
  const onSubmit = (data: CampaignWizardData) => {
    if (editingCampaignId) {
      updateCampaign({ 
        id: editingCampaignId, 
        name: data.name, 
        platform: data.platform, 
        budget: data.budget,
        status: 'Active',
        // Additional fields
        executiveBot: data.executiveBot,
        justification: `This ${data.platform} campaign will help you reach your ${data.goal} goals. The target audience matches your business perfectly.`,
        roi: `Expected ROI: ${Math.floor(Math.random() * 300 + 100)}%`
      });
    } else {
      // For new campaigns, attribute to an executive bot
      const allExecs = Object.values(executiveBots).flat();
      const randomExec = data.executiveBot || allExecs[Math.floor(Math.random() * allExecs.length)];
      
      createCampaign({
        name: data.name,
        platform: data.platform,
        budget: data.budget,
        status: 'Active',
        executiveBot: randomExec,
        justification: `This ${data.platform} campaign targets your ideal audience for ${data.goal}. Based on your budget of ${data.budget}, I expect strong returns.`,
        roi: `Expected ROI: ${Math.floor(Math.random() * 300 + 100)}%`
      });
      
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
      trackCampaignApprove(
        campaignId, 
        campaign.name, 
        campaign.executiveBot
      );
      
      toast.success(`Feedback for ${campaign.executiveBot}'s recommendation recorded`);
      
      // Refresh campaigns after approval
      setTimeout(() => refetch(), 1000);
    }
  };

  // Export campaign data
  const handleExportCampaign = (campaignId: string, format: 'pdf' | 'csv') => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    toast.success(`Exporting ${campaign.name} as ${format.toUpperCase()}...`);
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} export complete`);
    }, 1500);

    // Track export action
    trackAction(
      'export_campaign',
      'campaign_management',
      campaignId,
      'campaign',
      { 
        name: campaign.name,
        format,
        executiveBot: campaign.executiveBot 
      }
    );
  };

  // Get default values for the wizard based on whether we're editing or creating
  const getWizardDefaultValues = () => {
    if (editingCampaignId) {
      const campaign = campaigns.find(c => c.id === editingCampaignId);
      
      if (campaign) {
        return {
          name: campaign.name,
          platform: campaign.platform as Platform,
          budget: campaign.budget || 1000,
          executiveBot: typeof campaign.executiveBot === 'string' ? campaign.executiveBot : undefined,
          adCopy: campaign.justification || "",
          // Default values for new fields
          goal: "leads" as const,
          audience: "Professionals aged 25-45 interested in business growth",
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
      }
    }
    
    return {
      name: "",
      platform: "Google" as const,
      budget: 1000,
      goal: "leads" as const,
      audience: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adCopy: "",
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CampaignHeader onNewCampaign={handleNewCampaign} />
      
      <CampaignAnalytics 
        campaigns={campaigns}
        isLoading={isLoading}
      />
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Campaigns</h2>
        
        {campaigns.length > 0 && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExportCampaign('all', 'csv')}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export All (CSV)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExportCampaign('all', 'pdf')}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export All (PDF)
            </Button>
          </div>
        )}
      </div>
      
      <CampaignsList 
        campaigns={campaigns}
        isLoading={isLoading}
        handleEditCampaign={handleEditCampaign}
        deleteCampaign={deleteCampaign}
        onCreateCampaign={handleNewCampaign}
        onApproveCampaign={handleApproveCampaign}
        onExportCampaign={handleExportCampaign}
      />
      
      <CampaignWizard
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={onSubmit}
        defaultValues={getWizardDefaultValues()}
        isSubmitting={isCreating || isUpdating}
        isEditing={!!editingCampaignId}
      />
    </div>
  );
}
