
import React from 'react';
import { ArrowUpDown } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadActions } from './LeadActions';

type LeadsTableProps = {
  leads: Lead[];
  sortBy: 'name' | 'created_at';
  sortOrder: 'asc' | 'desc';
  onSort: (column: 'name' | 'created_at') => void;
  onDelete: (leadId: string) => Promise<boolean>;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<boolean>;
  // Add the properties used in LeadsPage
  onDeleteLead?: (leadId: string) => void;
  onEditLead?: () => void;
  isMobileView?: boolean;
};

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  sortBy,
  sortOrder,
  onSort,
  onStatusUpdate,
  onDelete,
  onDeleteLead,
  onEditLead,
  isMobileView
}) => {
  // Handle status update with void return to match component props
  const handleStatusUpdate = async (leadId: string, status: Lead['status']) => {
    await onStatusUpdate(leadId, status);
  };

  // Handle delete with void return to match component props
  const handleDelete = async (leadId: string) => {
    if (onDeleteLead) {
      onDeleteLead(leadId);
    } else {
      await onDelete(leadId);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] cursor-pointer" onClick={() => onSort('name')}>
            <div className="flex items-center">
              Name
              <ArrowUpDown className="h-4 w-4 ml-1" />
            </div>
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="cursor-pointer" onClick={() => onSort('created_at')}>
            <div className="flex items-center">
              Created
              <ArrowUpDown className="h-4 w-4 ml-1" />
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              No leads found
            </TableCell>
          </TableRow>
        ) : (
          leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>
              <TableCell>
                {new Date(lead.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <LeadActions 
                  leadId={lead.id} 
                  onStatusUpdate={handleStatusUpdate} 
                  onDelete={handleDelete} 
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
