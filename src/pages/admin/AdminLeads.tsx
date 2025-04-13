
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
import { useBreakpoint } from '@/hooks/use-mobile';
import { useLeads } from '@/hooks/admin/useLeads';
import { 
  Search, 
  Filter, 
  Loader2, 
  Download, 
  PlusCircle, 
  MoreHorizontal,
  BarChart2
} from "lucide-react";
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
import { LeadsTable, MobileLeadCards, AddLeadDialog } from '@/components/admin/leads';
import { toast } from 'sonner';

export default function AdminLeads() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const { 
    leads, 
    isLoading, 
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    toggleSort,
    handleStatusUpdate,
    handleDelete,
    addLead,
    refetchLeads
  } = useLeads();
  
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  useEffect(() => {
    refetchLeads();
  }, [refetchLeads]);
  
  // Filter leads based on search query and status
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Generate mock analytics data
  const conversionData = [
    { name: 'New', count: leads.filter(l => l.status === 'new').length },
    { name: 'Contacted', count: leads.filter(l => l.status === 'contacted').length },
    { name: 'Qualified', count: leads.filter(l => l.status === 'qualified').length },
    { name: 'Client', count: leads.filter(l => l.status === 'client').length },
    { name: 'Closed', count: leads.filter(l => l.status === 'closed').length }
  ];
  
  const timelineData = [
    { month: 'Jan', leads: 45 },
    { month: 'Feb', leads: 52 },
    { month: 'Mar', leads: 49 },
    { month: 'Apr', leads: 62 },
    { month: 'May', leads: 55 },
    { month: 'Jun', leads: 75 },
    { month: 'Jul', leads: 85 }
  ];
  
  const handleExportLeads = (format: 'csv' | 'pdf') => {
    toast.success(`Exporting leads as ${format.toUpperCase()}...`);
    // Placeholder for actual export functionality
    setTimeout(() => {
      toast.success(`Export completed!`);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>
          <p className="text-muted-foreground mt-1">
            Oversee all leads generated through the platform
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExportLeads('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <AddLeadDialog 
            onLeadAdded={refetchLeads}
            campaigns={[]} // You would fetch campaigns here
            isMobileView={isMobileView}
          />
        </div>
      </div>
      
      <Tabs defaultValue="analytics">
        <TabsList className="mb-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="leads">All Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={conversionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" name="Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lead Growth Timeline</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="leads" stroke="#82ca9d" name="New Leads" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Lead Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Monitor lead generation metrics, conversion rates, and distribution across companies. 
                Track engagement and communication effectiveness.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total Leads</div>
                    <div className="text-2xl font-bold">{leads.length}</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
                    <div className="text-2xl font-bold">
                      {leads.length > 0 
                        ? `${Math.round((leads.filter(l => l.status === 'client').length / leads.length) * 100)}%` 
                        : '0%'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Avg. Response Time</div>
                    <div className="text-2xl font-bold">4.2 hrs</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Lead Quality Score</div>
                    <div className="text-2xl font-bold">7.8/10</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Leads</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExportLeads('csv')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search leads..." 
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
                <>
                  {!isMobileView ? (
                    <LeadsTable 
                      leads={filteredLeads}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={toggleSort}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <MobileLeadCards 
                      leads={filteredLeads}
                      onStatusUpdate={handleStatusUpdate}
                      onDelete={handleDelete}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
