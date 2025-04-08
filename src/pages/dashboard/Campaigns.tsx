
import { useState } from "react";
import { BarChart, Mail, Video, Globe, Plus, Edit, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const campaignSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  platform: z.enum(["Google", "Facebook", "Instagram", "LinkedIn", "TikTok"]),
  budget: z.coerce.number().min(1, "Budget must be at least 1"),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

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
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      platform: "Google",
      budget: 100,
    },
  });
  
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
    form.reset();
    setEditingCampaignId(null);
  };
  
  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      form.reset({
        name: campaign.name,
        platform: (campaign.platform as any) || "Google",
        budget: campaign.budget || 100,
      });
      setEditingCampaignId(campaignId);
      setIsDialogOpen(true);
    }
  };
  
  const handleNewCampaign = () => {
    form.reset({
      name: "",
      platform: "Google",
      budget: 100,
    });
    setEditingCampaignId(null);
    setIsDialogOpen(true);
  };
  
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

  const renderCampaigns = () => {
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
          <Button onClick={handleNewCampaign} className="allora-button">
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
          </div>
          
          <Button onClick={handleNewCampaign} className="allora-button">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          Create and manage email, video, and ad campaigns
        </p>
        
        {renderCampaigns()}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCampaignId ? "Edit Campaign" : "Create New Campaign"}</DialogTitle>
              <DialogDescription>
                {editingCampaignId ? "Update your campaign details below." : "Fill in the details for your new marketing campaign."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Product Launch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="submit" 
                    disabled={isCreating || isUpdating}
                  >
                    {(isCreating || isUpdating) ? "Saving..." : (editingCampaignId ? "Update Campaign" : "Create Campaign")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
