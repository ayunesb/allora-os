
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
import { Campaign, Platform, ExecutiveBot } from "@/models/campaign";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

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
  
  useEffect(() => {
    const allExecs = Object.values(executiveBots).flat();
    
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
        executiveBot: data.executiveBot,
        justification: `This ${data.platform} campaign will help you reach your ${data.goal} goals. The target audience matches your business perfectly.`,
        roi: `Expected ROI: ${Math.floor(Math.random() * 300 + 100)}%`
      });
    } else {
      const allExecs = Object.values(executiveBots).flat();
      // Fixed: Use the provided executiveBot name if available, otherwise get random exec name
      const randomExec: string = data.executiveBot || allExecs[Math.floor(Math.random() * allExecs.length)];
      
      createCampaign({
        name: data.name,
        platform: data.platform,
        budget: data.budget,
        status: 'Active',
        executiveBot: randomExec,
        justification: `This ${data.platform} campaign targets your ideal audience for ${data.goal}. Based on your budget of ${data.budget}, I expect strong returns.`,
        roi: `Expected ROI: ${Math.floor(Math.random() * 300 + 100)}%`
      });
      
      trackAction(
        'create_campaign',
        'campaign_management',
        'new-campaign',
        'campaign',
        { 
          name: data.name,
          platform: data.platform,
          // Fixed the type issues with executiveBot
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
      
      trackCampaignView(campaignId, campaign.name);
    }
  };
  
  const handleNewCampaign = () => {
    setEditingCampaignId(null);
    setIsDialogOpen(true);
  };
  
  const handleApproveCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      // Fixed: Extract string name from executiveBot if it's an object
      const execBotName = typeof campaign.executiveBot === 'string' 
        ? campaign.executiveBot 
        : campaign.executiveBot?.name || '';
      
      trackCampaignApprove(
        campaignId, 
        campaign.name, 
        execBotName
      );
      
      toast.success(`Feedback for ${execBotName}'s recommendation recorded`);
      
      setTimeout(() => refetch(), 1000);
    }
  };

  const handleExportCampaign = (campaignId: string, format: 'pdf' | 'csv') => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    toast.success(`Exporting ${campaign.name} as ${format.toUpperCase()}...`);
    
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} export complete`);
    }, 1500);

    // Fixed: Extract string name from executiveBot if it's an object
    const execBotName = typeof campaign.executiveBot === 'string' 
      ? campaign.executiveBot 
      : campaign.executiveBot?.name || '';

    trackAction(
      'export_campaign',
      'campaign_management',
      campaignId,
      'campaign',
      { 
        name: campaign.name,
        format,
        executiveBot: execBotName
      }
    );
  };

  const getWizardDefaultValues = () => {
    if (editingCampaignId) {
      const campaign = campaigns.find(c => c.id === editingCampaignId);
      
      if (campaign) {
        let execName: string | undefined = undefined;
        if (campaign.executiveBot) {
          execName = typeof campaign.executiveBot === 'string' 
            ? campaign.executiveBot 
            : campaign.executiveBot.name;
        }
        
        return {
          name: campaign.name,
          platform: campaign.platform,
          budget: campaign.budget || 1000,
          executiveBot: execName,
          adCopy: campaign.justification || "",
          goal: "leads" as const,
          audience: "Professionals aged 25-45 interested in business growth",
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
      }
    }
    
    return {
      name: "",
      platform: "Google" as Platform,
      budget: 1000,
      goal: "leads" as const,
      audience: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adCopy: "",
    };
  };

  return (
    <Tabs defaultValue="main">
      <TabsContent value="main">
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
      </TabsContent>
    </Tabs>
  );
}
