
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/models/campaign";

export default function AdminCampaigns() {
  // Mock campaign data - in a real application, this would come from Supabase
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      companyId: "c1",
      name: "Summer Promotion",
      platform: "Facebook",
      budget: 5000,
      created_at: "2023-06-01T00:00:00Z"
    },
    {
      id: "2",
      companyId: "c1",
      name: "Product Launch",
      platform: "Google",
      budget: 10000,
      created_at: "2023-07-15T00:00:00Z"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Campaign Management</h1>
            <p className="text-muted-foreground mt-2">
              Oversee all marketing campaigns
            </p>
          </div>
          <Button>Create Campaign</Button>
        </div>
        
        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{campaign.platform}</Badge>
                    </TableCell>
                    <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                    <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
