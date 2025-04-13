
import React, { useState } from "react";
import { LeadsHeader, LeadsTable } from "@/components/admin/leads";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Lead } from "@/models/lead";

export default function LeadsPage() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const [leads, setLeads] = useState<Lead[]>([
    { 
      id: 'lead-1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      companyId: 'company-1', 
      company: 'Acme Corp',
      status: 'new', 
      score: 85, 
      lastContact: '2025-04-01', 
      created_at: '2025-03-15', 
      campaign_id: 'campaign-1' 
    },
    { 
      id: 'lead-2', 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      companyId: 'company-2', 
      company: 'XYZ Inc',
      status: 'contacted', 
      score: 72, 
      lastContact: '2025-03-25', 
      created_at: '2025-03-10', 
      campaign_id: 'campaign-2' 
    },
    { 
      id: 'lead-3', 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      companyId: 'company-3', 
      company: 'Tech Solutions',
      status: 'qualified', 
      score: 90, 
      lastContact: '2025-04-05', 
      created_at: '2025-03-20', 
      campaign_id: 'campaign-1' 
    }
  ]);
  
  const [sortBy, setSortBy] = useState<'name' | 'created_at'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: 'name' | 'created_at') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  
  const handleAddLead = () => {
    console.log('Add lead clicked');
  };
  
  const handleDeleteLead = (leadId: string) => {
    console.log('Delete lead', leadId);
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };
  
  // Add mock implementation for required props
  const handleStatusUpdate = async (leadId: string, status: Lead['status']): Promise<boolean> => {
    console.log('Update lead status', leadId, status);
    return true;
  };
  
  const handleDelete = async (leadId: string): Promise<boolean> => {
    console.log('Delete lead', leadId);
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    return true;
  };
  
  return (
    <div className="space-y-6">
      <LeadsHeader 
        isMobileView={isMobileView}
        onAddLead={handleAddLead}
      />
      <LeadsTable 
        leads={leads}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onEditLead={() => {}}
        isMobileView={isMobileView}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
