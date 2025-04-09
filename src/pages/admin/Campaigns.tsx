import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/models/campaign";
import { Loader2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    platform: 'Email',
    budget: 0,
    company_id: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCampaigns();
    loadCompanies();
  }, []);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      // Get all campaigns with company information
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          companies(name)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Type-cast the data to our Campaign model
      const typedCampaigns: Campaign[] = (data || []).map(campaign => ({
        id: campaign.id,
        company_id: campaign.company_id,
        name: campaign.name,
        platform: campaign.platform || '',
        budget: campaign.budget || 0,
        created_at: campaign.created_at,
        companies: campaign.companies
      }));
      
      setCampaigns(typedCampaigns);
    } catch (error: any) {
      console.error('Error loading campaigns:', error);
      toast.error('Failed to load campaigns: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');
        
      if (error) throw error;
      
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.company_id) {
      toast.error('Name and company are required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: newCampaign.name,
            platform: newCampaign.platform,
            budget: newCampaign.budget,
            company_id: newCampaign.company_id
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      // Get the company name for the new campaign
      const { data: companyData } = await supabase
        .from('companies')
        .select('name')
        .eq('id', newCampaign.company_id)
        .single();
      
      // Create a typed campaign object
      const newTypedCampaign: Campaign = {
        id: data.id,
        company_id: data.company_id,
        name: data.name,
        platform: data.platform || '',
        budget: data.budget || 0,
        created_at: data.created_at,
        companies: companyData
      };
      
      toast.success('Campaign created successfully');
      setCampaigns([newTypedCampaign, ...campaigns]);
      setOpenAddDialog(false);
      setNewCampaign({
        name: '',
        platform: 'Email',
        budget: 0,
        company_id: ''
      });
    } catch (error: any) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Campaign Management</h1>
          <p className="text-muted-foreground mt-2">
            Oversee all marketing campaigns
          </p>
        </div>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name*</Label>
                <Input 
                  id="name" 
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  placeholder="Summer Promotion 2025" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select 
                  value={newCampaign.platform} 
                  onValueChange={(value) => setNewCampaign({...newCampaign, platform: value})}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input 
                  id="budget" 
                  type="number"
                  value={newCampaign.budget.toString()}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: parseFloat(e.target.value) || 0})}
                  placeholder="1000" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company*</Label>
                <Select 
                  value={newCampaign.company_id} 
                  onValueChange={(value) => setNewCampaign({...newCampaign, company_id: value})}
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map(company => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateCampaign}
                disabled={isSubmitting || !newCampaign.name || !newCampaign.company_id}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Active Campaigns</CardTitle>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
