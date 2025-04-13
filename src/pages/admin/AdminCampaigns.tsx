
import React, { useState, useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCampaignOperations } from '@/hooks/admin/useCampaignOperations';
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Search, 
  BarChart2, 
  Activity, 
  Loader2, 
  Filter, 
  Download, 
  PlusCircle, 
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  CheckCircle 
} from "lucide-react";

export default function AdminCampaigns() {
  const { profile } = useAuth();
  const companyId = profile?.company_id || '';
  const { campaigns, isLoading, fetchCampaigns, deleteCampaign } = useCampaignOperations(companyId);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);
  
  // Filter campaigns based on search query and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Generate mock performance data for the dashboard
  const performanceData = [
    { name: 'Jan', impressions: 4000, clicks: 2400, leads: 400 },
    { name: 'Feb', impressions: 3000, clicks: 1398, leads: 210 },
    { name: 'Mar', impressions: 2000, clicks: 9800, leads: 290 },
    { name: 'Apr', impressions: 2780, clicks: 3908, leads: 340 },
    { name: 'May', impressions: 1890, clicks: 4800, leads: 450 },
    { name: 'Jun', impressions: 2390, clicks: 3800, leads: 410 },
    { name: 'Jul', impressions: 3490, clicks: 4300, leads: 380 },
  ];
  
  const platformData = [
    { name: 'Facebook', campaigns: 65, leads: 420 },
    { name: 'Google', campaigns: 45, leads: 380 },
    { name: 'LinkedIn', campaigns: 35, leads: 290 },
    { name: 'Email', campaigns: 28, leads: 240 },
    { name: 'TikTok', campaigns: 15, leads: 160 },
  ];
  
  const handleStatusUpdate = (campaignId: string, newStatus: string) => {
    // In a real implementation, this would update the campaign status in the database
    toast.success(`Campaign status updated to ${newStatus}`);
  };
  
  const handleDeleteCampaign = async (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      const result = await deleteCampaign(campaignId);
      if (result.success) {
        toast.success('Campaign deleted successfully');
      } else {
        toast.error(`Failed to delete campaign: ${result.error}`);
      }
    }
  };
  
  const handleExportCampaigns = (format: 'csv' | 'pdf') => {
    toast.success(`Exporting campaigns as ${format.toUpperCase()}...`);
    // Placeholder for actual export functionality
    setTimeout(() => {
      toast.success(`Export completed!`);
    }, 1500);
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-500/10 text-green-500';
      case 'Draft': return 'bg-gray-500/10 text-gray-500';
      case 'Paused': return 'bg-yellow-500/10 text-yellow-500';
      case 'Completed': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Campaign Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all marketing campaigns across the platform
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExportCampaigns('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="impressions" stroke="#8884d8" />
                      <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="leads" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Campaigns by Platform</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={platformData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="campaigns" fill="#8884d8" name="Campaigns" />
                      <Bar dataKey="leads" fill="#82ca9d" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search campaigns..." 
                  className="pl-9 mb-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Created</TableHead>
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
                        filteredCampaigns.slice(0, 5).map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{campaign.platform}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(campaign.status || 'Draft')}>
                                {campaign.status || 'Draft'}
                              </Badge>
                            </TableCell>
                            <TableCell>${campaign.budget?.toLocaleString() || '0'}</TableCell>
                            <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteCampaign(campaign.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <CardTitle>All Campaigns</CardTitle>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" onClick={() => setSelectedStatus('all')}>
                  All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedStatus('Active')}>
                  Active
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedStatus('Draft')}>
                  Draft
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedStatus('Paused')}>
                  Paused
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search campaigns..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign Name</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Created</TableHead>
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
                            <TableCell>{campaign.platform}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(campaign.status || 'Draft')}>
                                {campaign.status || 'Draft'}
                              </Badge>
                            </TableCell>
                            <TableCell>${campaign.budget?.toLocaleString() || '0'}</TableCell>
                            <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  {campaign.status === 'Active' ? (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'Paused')}>
                                      <PauseCircle className="mr-2 h-4 w-4" />
                                      Pause Campaign
                                    </DropdownMenuItem>
                                  ) : campaign.status === 'Paused' ? (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'Active')}>
                                      <PlayCircle className="mr-2 h-4 w-4" />
                                      Resume Campaign
                                    </DropdownMenuItem>
                                  ) : campaign.status === 'Draft' ? (
                                    <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'Active')}>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Activate Campaign
                                    </DropdownMenuItem>
                                  ) : null}
                                  <DropdownMenuItem onClick={() => handleDeleteCampaign(campaign.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">127,493</div>
                      <p className="text-muted-foreground">Total Impressions</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">9,847</div>
                      <p className="text-muted-foreground">Total Clicks</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1,283</div>
                      <p className="text-muted-foreground">Total Leads</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
