
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead } from "@/models/lead";
import { Loader2 } from 'lucide-react';
import { fetchCompanyLeads } from '@/utils/leadHelpers';

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you would fetch leads for all companies
        // This is a simplified implementation
        const allCompanyLeads: Lead[] = [];
        
        // Fetch leads for some example companies
        // In a real implementation, you would first fetch all companies and then fetch leads for each
        const companyLeads1 = await fetchCompanyLeads('company-1');
        const companyLeads2 = await fetchCompanyLeads('company-2');
        
        allCompanyLeads.push(...companyLeads1, ...companyLeads2);
        setLeads(allCompanyLeads);
      } catch (error) {
        console.error('Error loading leads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeads();
  }, []);

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
    <div className="container mx-auto px-4 pt-6 pb-12">
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
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
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
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
