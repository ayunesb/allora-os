
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Campaign } from '@/models/campaign';

interface CampaignTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CampaignTabs({ activeTab, onTabChange }: CampaignTabsProps) {
  return (
    <Tabs defaultValue={activeTab} className="mb-8" onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="all">All Campaigns</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="meta">Meta</TabsTrigger>
        <TabsTrigger value="tiktok">TikTok</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
