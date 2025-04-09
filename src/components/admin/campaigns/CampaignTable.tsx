
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { Campaign } from "@/models/campaign";

interface CampaignTableProps {
  campaigns: Campaign[];
  isLoading: boolean;
}

const CampaignTable = ({ campaigns, isLoading }: CampaignTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No campaigns found. Create your first campaign to get started.
            </TableCell>
          </TableRow>
        ) : (
          campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{campaign.platform || 'Unknown'}</Badge>
              </TableCell>
              <TableCell>{campaign.companies?.name || 'Unknown'}</TableCell>
              <TableCell>${campaign.budget?.toLocaleString() || 0}</TableCell>
              <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CampaignTable;
