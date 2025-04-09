
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead } from "@/models/lead";
import { Loader2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { updateLeadStatus } from '@/utils/leadHelpers';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<{id: string, name: string}[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    campaign_id: '',
    status: 'new' as 'new' | 'contacted' | 'qualified' | 'closed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadLeads();
    loadCampaigns();
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      // Get all leads from all companies
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          campaigns(name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setLeads(data || []);
    } catch (error: any) {
      console.error('Error loading leads:', error);
      toast.error('Failed to load leads: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id, name')
        .order('name');
        
      if (error) throw error;
      
      setCampaigns(data || []);
    } catch (error: any) {
      console.error('Error loading campaigns:', error);
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: 'new' | 'contacted' | 'qualified' | 'closed') => {
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      // Update the lead in the local state
      setLeads(leads.map(lead => 
        lead.id === leadId ? {...lead, status: newStatus} : lead
      ));
    }
  };
  
  const handleCreateLead = async () => {
    if (!newLead.name || !newLead.campaign_id) {
      toast.error('Name and campaign are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            campaign_id: newLead.campaign_id,
            status: newLead.status
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Lead created successfully');
      setLeads([data, ...leads]);
      setOpenAddDialog(false);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        campaign_id: '',
        status: 'new'
      });
    } catch (error: any) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input 
                  id="name" 
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign*</Label>
                <Select 
                  value={newLead.campaign_id} 
                  onValueChange={(value) => setNewLead({...newLead, campaign_id: value})}
                >
                  <SelectTrigger id="campaign">
                    <SelectValue placeholder="Select campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map(campaign => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newLead.status} 
                  onValueChange={(value: any) => setNewLead({...newLead, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateLead}
                disabled={isSubmitting || !newLead.name || !newLead.campaign_id}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Lead"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No leads found. Add your first lead to get started.
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
                      <TableCell>{lead.campaigns?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        {getStatusBadge(lead.status)}
                      </TableCell>
                      <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Select 
                            value={lead.status} 
                            onValueChange={(value: 'new' | 'contacted' | 'qualified' | 'closed') => 
                              handleUpdateStatus(lead.id, value)
                            }
                          >
                            <SelectTrigger className="h-8 w-32">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
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
