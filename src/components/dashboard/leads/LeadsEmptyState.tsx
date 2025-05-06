import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";
import { AddLeadDialog } from "@/components/admin/leads/AddLeadDialog";
import { useCampaigns } from "@/hooks/campaigns";
export const LeadsEmptyState = () => {
  const { campaigns } = useCampaigns();
  const formattedCampaigns = campaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
  }));
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">No Leads Yet</CardTitle>
        <CardDescription>
          Start building your leads database to track potential customers
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6 py-8">
        <div className="rounded-full bg-primary/10 p-6">
          <UserPlus className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center max-w-md">
          <p className="mb-4">
            Add your first lead to start managing your sales pipeline. You can
            manually add leads or import them from a CSV file.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <AddLeadDialog
          onLeadAdded={() => {}}
          campaigns={formattedCampaigns}
          isMobileView={false}
        />
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import from CSV
        </Button>
      </CardFooter>
    </Card>
  );
};
