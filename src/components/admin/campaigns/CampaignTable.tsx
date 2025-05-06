import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from '@/utils/formatters';

// Define the type for a single campaign
interface Campaign {
  id: string;
  name: string;
  companies?: { name: string };
  platform: string;
  budget?: number;
}

// Define the props for the CampaignTable component
interface CampaignTableProps {
  campaigns: Campaign[];
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
}

// Ensure TableHead and TableCell accept children of type React.ReactNode
interface TableHeadProps {
  children: React.ReactNode;
}

interface TableCellProps {
  children: React.ReactNode;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, isLoading, error, onRetry }) => {
    // Loading state with skeletons
    if (isLoading) {
        return (<div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((i) => (<TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-[150px]"/></TableCell>
                <TableCell><Skeleton className="h-5 w-[120px]"/></TableCell>
                <TableCell><Skeleton className="h-6 w-[100px]"/></TableCell>
                <TableCell><Skeleton className="h-5 w-[80px]"/></TableCell>
              </TableRow>))}
          </TableBody>
        </Table>
      </div>);
    }
    // Error state
    if (error) {
        return (<div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-md my-4">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2"/>
        <h3 className="text-lg font-medium text-red-800">Failed to load campaigns</h3>
        <p className="text-red-600 mb-4">{error}</p>
        {onRetry && (<button onClick={onRetry} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors">
            Try Again
          </button>)}
      </div>);
    }
    // Empty state
    if (campaigns.length === 0) {
        return (<div className="flex flex-col items-center justify-center p-6 bg-muted/40 border border-border rounded-md my-4">
        <h3 className="text-lg font-medium mb-1">No campaigns found</h3>
        <p className="text-muted-foreground mb-4">Create your first campaign to get started.</p>
      </div>);
    }
    // Data table
    return (<Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaigns.map((campaign) => {
            // Type cast to handle potential companies property
            const campaignWithCompany = campaign;
            return (<TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                {campaignWithCompany.companies?.name || '-'}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {campaign.platform}
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(campaign.budget || 0)}</TableCell>
            </TableRow>);
        })}
      </TableBody>
    </Table>);
};
export default CampaignTable;
