
import React, { useState, useEffect } from 'react';
import { Loader2, PlusCircle, Search, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useBreakpoint } from '@/hooks/use-mobile';
import { supabase } from '@/backend/supabase';

interface Campaign {
  id: string;
  name: string;
  company_id: string;
  company_name: string;
  status_display: 'active' | 'paused' | 'completed'; // Virtual status for UI only
  leads_count: number;
  created_at: string;
}

export default function AdminCampaigns() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  useEffect(() => {
    async function loadCampaigns() {
      setLoading(true);
      try {
        // Get campaigns with company names
        const { data, error } = await supabase
          .from('campaigns')
          .select(`
            id,
            name,
            company_id,
            created_at,
            companies(name)
          `)
          .order(sortBy, { ascending: sortOrder === 'asc' });
          
        if (error) throw error;
        
        // Get lead counts for each campaign and assign default status for UI display
        const campaignsWithMetadata = await Promise.all((data || []).map(async (campaign) => {
          // Here we safely access properties with optional chaining
          if (!campaign) return null;
          
          const { count } = await supabase
            .from('leads')
            .select('id', { count: 'exact' })
            .eq('campaign_id', campaign.id);
            
          return {
            id: campaign.id,
            name: campaign.name,
            company_id: campaign.company_id,
            company_name: campaign.companies?.name || 'Unknown',
            status_display: 'active' as const, // Default status for UI display only
            leads_count: count || 0,
            created_at: campaign.created_at
          };
        }));
        
        // Filter out any null values and set campaigns
        setCampaigns(campaignsWithMetadata.filter(Boolean) as Campaign[]);
      } catch (error: any) {
        console.error('Error loading campaigns:', error.message);
        toast.error('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    }
    
    loadCampaigns();
  }, [sortBy, sortOrder]);
  
  const handleStatusUpdate = async (campaignId: string, statusDisplay: 'active' | 'paused' | 'completed') => {
    try {
      // Since we don't have a status column in the database, we're just updating the UI state
      setCampaigns(campaigns.map(campaign => 
        campaign.id === campaignId ? { ...campaign, status_display: statusDisplay } : campaign
      ));
      
      toast.success(`Campaign status updated to ${statusDisplay}`);
    } catch (error: any) {
      console.error('Error updating campaign status:', error.message);
      toast.error('Failed to update campaign status');
    }
  };
  
  const handleDelete = async (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign? This will also delete all associated leads.')) {
      try {
        const { error } = await supabase
          .from('campaigns')
          .delete()
          .eq('id', campaignId);
          
        if (error) throw error;
        
        setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
        toast.success('Campaign deleted successfully');
      } catch (error: any) {
        console.error('Error deleting campaign:', error.message);
        toast.error('Failed to delete campaign');
      }
    }
  };
  
  const toggleSort = (column: 'name' | 'created_at') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  const filteredCampaigns = searchQuery.trim() === '' 
    ? campaigns 
    : campaigns.filter(campaign => 
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const getStatusColor = (status: 'active' | 'paused' | 'completed') => {
    switch(status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'paused': return 'bg-yellow-500/10 text-yellow-500';
      case 'completed': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-green-500/10 text-green-500';
    }
  };
  
  return (
    <div className="animate-fadeIn space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold`}>
            Campaigns
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage marketing campaigns
          </p>
        </div>
        
        <Button size={isMobileView ? "sm" : "default"} className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search campaigns..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Desktop view */}
          {!isMobileView && (
            <Card className="border-primary/10 shadow-sm overflow-hidden hidden sm:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] cursor-pointer" onClick={() => toggleSort('name')}>
                        <div className="flex items-center">
                          Campaign Name
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort('created_at')}>
                        <div className="flex items-center">
                          Created
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No campaigns found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.name}</TableCell>
                          <TableCell>{campaign.company_name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getStatusColor(campaign.status_display)}`}>
                              {campaign.status_display.charAt(0).toUpperCase() + campaign.status_display.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{campaign.leads_count}</TableCell>
                          <TableCell>
                            {new Date(campaign.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'active')}>
                                  Set as Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'paused')}>
                                  Set as Paused
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'completed')}>
                                  Set as Completed
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(campaign.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
          
          {/* Mobile view */}
          {isMobileView && (
            <div className="space-y-3 block sm:hidden">
              {filteredCampaigns.length === 0 ? (
                <Card className="border-primary/10 shadow-sm">
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No campaigns found
                  </CardContent>
                </Card>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="border-primary/10 shadow-sm overflow-hidden">
                    <CardHeader className="p-3 pb-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base truncate">{campaign.name}</CardTitle>
                        <Badge variant="outline" className={`${getStatusColor(campaign.status_display)} text-xs`}>
                          {campaign.status_display.charAt(0).toUpperCase() + campaign.status_display.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-1 space-y-1">
                      <p className="text-xs truncate text-muted-foreground">{campaign.company_name}</p>
                      <p className="text-xs text-muted-foreground">Leads: {campaign.leads_count}</p>
                      <div className="flex justify-between items-center pt-2 mt-1 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {new Date(campaign.created_at).toLocaleDateString()}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'active')}>
                              Set as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'paused')}>
                              Set as Paused
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'completed')}>
                              Set as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(campaign.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
