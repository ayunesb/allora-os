
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Plus, Edit, Trash2, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Campaign = {
  id: string;
  name: string;
  status: "active" | "draft" | "ended" | "scheduled";
  startDate: string;
  endDate: string;
  budget: string;
  platform: string;
};

const mockCampaigns: Campaign[] = [
  { 
    id: "1", 
    name: "Q2 Product Launch", 
    status: "active", 
    startDate: "2025-04-01", 
    endDate: "2025-06-30", 
    budget: "$15,000", 
    platform: "Multi-channel" 
  },
  { 
    id: "2", 
    name: "Summer Promotion", 
    status: "draft", 
    startDate: "2025-06-15", 
    endDate: "2025-08-15", 
    budget: "$8,500", 
    platform: "Facebook, Instagram" 
  },
  { 
    id: "3", 
    name: "Black Friday Sale", 
    status: "scheduled", 
    startDate: "2025-11-20", 
    endDate: "2025-11-30", 
    budget: "$25,000", 
    platform: "All platforms" 
  },
  { 
    id: "4", 
    name: "Spring Collection", 
    status: "ended", 
    startDate: "2025-03-01", 
    endDate: "2025-03-31", 
    budget: "$12,000", 
    platform: "Meta Ads" 
  },
];

export default function AdminCampaigns() {
  const renderStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">{status}</Badge>;
      case 'draft':
        return <Badge variant="outline">{status}</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">{status}</Badge>;
      case 'ended':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns = [
    {
      key: "name",
      title: "Campaign Name",
      render: (item: Campaign) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (item: Campaign) => renderStatusBadge(item.status),
    },
    {
      key: "dateRange",
      title: "Date Range",
      hideOnMobile: true,
      render: (item: Campaign) => <span>{item.startDate} to {item.endDate}</span>,
    },
    {
      key: "budget",
      title: "Budget",
      hideOnMobile: true,
      render: (item: Campaign) => <span>{item.budget}</span>,
    },
    {
      key: "platform",
      title: "Platform",
      hideOnMobile: true,
      render: (item: Campaign) => <span>{item.platform}</span>,
    },
  ];

  const mobileColumns = [
    {
      key: "name",
      title: "Campaign",
      render: (item: Campaign) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (item: Campaign) => renderStatusBadge(item.status),
    },
    {
      key: "budget",
      title: "Budget",
      render: (item: Campaign) => <span>{item.budget}</span>,
    },
  ];

  const actions = (item: Campaign) => (
    <div className="flex gap-2 justify-end">
      <Button size="icon" variant="ghost">
        <BarChart className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Campaign Management</TypographyH1>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveTable 
            data={mockCampaigns}
            columns={columns}
            mobileColumns={mobileColumns}
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
