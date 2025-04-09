
import { useState } from "react";
import { BarChart, Mail, Video, Globe, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign } from "@/models/campaign";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type CampaignsListProps = {
  campaigns: Campaign[];
  isLoading: boolean;
  handleEditCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  onCreateCampaign: () => void;
};

export default function CampaignsList({ 
  campaigns, 
  isLoading, 
  handleEditCampaign, 
  deleteCampaign, 
  onCreateCampaign 
}: CampaignsListProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Google':
        return <Globe className="h-5 w-5" />;
      case 'Facebook':
      case 'Instagram':
        return <Video className="h-5 w-5" />;
      case 'LinkedIn':
      case 'TikTok':
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="dashboard-card">
            <Skeleton className="h-10 w-10 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (campaigns.length === 0) {
    return (
      <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center mb-10">
        <BarChart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">No Campaigns Yet</h3>
        <p className="text-gray-300 mb-6">
          Create your first marketing campaign to promote your business.
        </p>
        <Button onClick={onCreateCampaign} className="allora-button">
          <Plus className="mr-2 h-4 w-4" />
          Create First Campaign
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="dashboard-card flex flex-col">
          <div className="flex items-center mb-4">
            <div className="bg-primary/20 rounded-full p-2 mr-3">
              {getPlatformIcon(campaign.platform || 'Google')}
            </div>
            <span className="text-sm font-medium text-gray-300">
              {campaign.platform || 'Digital'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{campaign.name}</h3>
          <p className="text-gray-400 text-sm mb-4">Budget: ${campaign.budget || 0}</p>
          
          <div className="mt-auto flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleEditCampaign(campaign.id)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    campaign "{campaign.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => deleteCampaign(campaign.id)} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
