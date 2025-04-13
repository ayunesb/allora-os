
import React, { useState } from "react";
import { LeadsHeader, LeadsTable } from "@/components/admin/leads";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function LeadsPage() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const [leads, setLeads] = useState([
    { id: 'lead-1', name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.', status: 'new', score: 85, lastContact: '2025-04-01' },
    { id: 'lead-2', name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Solutions', status: 'contacted', score: 72, lastContact: '2025-03-25' },
    { id: 'lead-3', name: 'Bob Johnson', email: 'bob@example.com', company: 'Global Corp', status: 'qualified', score: 90, lastContact: '2025-04-05' }
  ]);
  
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (column: string) => {
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
        onDeleteLead={handleDeleteLead}
        onEditLead={() => {}}
        isMobileView={isMobileView}
      />
    </div>
  );
}
