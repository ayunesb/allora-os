
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Lead } from "@/models/lead";

export default function AdminLeads() {
  // Mock lead data - in a real application, this would come from Supabase
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      campaign_id: "c1",
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "new",
      created_at: "2023-07-01T00:00:00Z"
    },
    {
      id: "2",
      campaign_id: "c1",
      name: "Sarah Jones",
      email: "sarah@example.com",
      phone: "234-567-8901",
      status: "contacted",
      created_at: "2023-07-15T00:00:00Z"
    },
    {
      id: "3",
      campaign_id: "c2",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "345-678-9012",
      status: "qualified",
      created_at: "2023-08-01T00:00:00Z"
    }
  ]);

  // Helper function to get the appropriate badge style for different statuses
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">New</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">Contacted</Badge>;
      case 'qualified':
        return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">Qualified</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage sales leads
            </p>
          </div>
          <Button>Add New Lead</Button>
        </div>
        
        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div>{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(lead.status)}
                    </TableCell>
                    <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Update</Button>
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
