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
import { Lead } from '@/models/lead';
import { supabase } from '@/backend/supabase';
import { fetchCompanyLeads, updateLeadStatus, deleteLead } from '@/utils/leadHelpers';

export default function AdminLeads() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  useEffect(() => {
    async function loadLeads() {
      setLoading(true);
      try {
        // Get all leads across all campaigns
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order(sortBy, { ascending: sortOrder === 'asc' });
          
        if (error) throw error;
        
        setLeads(data || []);
      } catch (error: any) {
        console.error('Error loading leads:', error.message);
        toast.error('Failed to load leads');
      } finally {
        setLoading(false);
      }
    }
    
    loadLeads();
  }, [sortBy, sortOrder]);
  
  const handleStatusUpdate = async (leadId: string, status: Lead['status']) => {
    const success = await updateLeadStatus(leadId, status);
    if (success) {
      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
      ));
    }
  };
  
  const handleDelete = async (leadId: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const success = await deleteLead(leadId);
      if (success) {
        setLeads(leads.filter(lead => lead.id !== leadId));
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
  
  const filteredLeads = searchQuery.trim() === '' 
    ? leads 
    : leads.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const getStatusColor = (status: Lead['status']) => {
    switch(status) {
      case 'new': return 'bg-blue-500/10 text-blue-500';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-500';
      case 'qualified': return 'bg-green-500/10 text-green-500';
      case 'closed': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };
  
  return (
    <div className="animate-fadeIn space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold`}>
            Leads Management
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View and manage all leads
          </p>
        </div>
        
        <Button size={isMobileView ? "sm" : "default"} className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Lead
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
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
                          Name
                          <ArrowUpDown className="h-4 w-4 ml-1" />
                        </div>
                      </TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
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
                    {filteredLeads.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No leads found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getStatusColor(lead.status)}`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(lead.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'new')}>
                                  Mark as New
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'contacted')}>
                                  Mark as Contacted
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'qualified')}>
                                  Mark as Qualified
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'closed')}>
                                  Mark as Closed
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(lead.id)}>
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
              {filteredLeads.length === 0 ? (
                <Card className="border-primary/10 shadow-sm">
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No leads found
                  </CardContent>
                </Card>
              ) : (
                filteredLeads.map((lead) => (
                  <Card key={lead.id} className="border-primary/10 shadow-sm overflow-hidden">
                    <CardHeader className="p-3 pb-1">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base truncate">{lead.name}</CardTitle>
                        <Badge variant="outline" className={`${getStatusColor(lead.status)} text-xs`}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-1 space-y-1">
                      <p className="text-xs truncate text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                      <div className="flex justify-between items-center pt-2 mt-1 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'new')}>
                              Mark as New
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'contacted')}>
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'qualified')}>
                              Mark as Qualified
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, 'closed')}>
                              Mark as Closed
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(lead.id)}>
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
