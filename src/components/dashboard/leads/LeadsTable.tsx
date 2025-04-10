
import React from 'react';
import { ArrowUpDown, MoreHorizontal, Phone, MessageSquare, Video } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadScoreBadge } from './LeadScoreBadge';

type LeadsTableProps = {
  leads: Lead[];
  sortBy: 'name' | 'created_at';
  sortOrder: 'asc' | 'desc';
  onSort: (column: 'name' | 'created_at') => void;
  onViewLead: (lead: Lead) => void;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  selectedLeads: string[];
  onLeadSelect: (leadId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
};

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  sortBy,
  sortOrder,
  onSort,
  onViewLead,
  onStatusUpdate,
  onDelete,
  selectedLeads,
  onLeadSelect,
  onSelectAll,
  getLeadScore,
  getNextBestAction
}) => {
  const allSelected = leads.length > 0 && selectedLeads.length === leads.length;
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={onSelectAll}
                aria-label="Select all leads"
              />
            </TableHead>
            <TableHead className="w-[200px] cursor-pointer" onClick={() => onSort('name')}>
              <div className="flex items-center">
                Name
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="hidden lg:table-cell">Next Action</TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('created_at')}>
              <div className="flex items-center">
                Created
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </div>
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="py-2">
                  <Checkbox 
                    checked={selectedLeads.includes(lead.id)} 
                    onCheckedChange={(checked) => onLeadSelect(lead.id, !!checked)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${lead.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium" onClick={() => onViewLead(lead)}>
                  {lead.name}
                </TableCell>
                <TableCell className="hidden md:table-cell" onClick={() => onViewLead(lead)}>
                  {lead.email || "—"}
                </TableCell>
                <TableCell className="hidden md:table-cell" onClick={() => onViewLead(lead)}>
                  {lead.phone || "—"}
                </TableCell>
                <TableCell onClick={() => onViewLead(lead)}>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell onClick={() => onViewLead(lead)}>
                  <LeadScoreBadge score={getLeadScore(lead)} />
                </TableCell>
                <TableCell className="hidden lg:table-cell" onClick={() => onViewLead(lead)}>
                  <span className="text-sm text-muted-foreground">
                    {getNextBestAction(lead)}
                  </span>
                </TableCell>
                <TableCell onClick={() => onViewLead(lead)}>
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      // This would open a phone dialer or call app
                      window.open(`tel:${lead.phone}`);
                    }}>
                      <Phone className="h-4 w-4 text-blue-600" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      // This would open WhatsApp with the lead's number
                      if (lead.phone) {
                        window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`);
                      }
                    }}>
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </Button>
                    
                    <Button variant="ghost" size="icon" onClick={(e) => {
                      e.stopPropagation();
                      // This would open the Zoom scheduler
                      onViewLead(lead);
                    }}>
                      <Video className="h-4 w-4 text-purple-600" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewLead(lead)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'new')}>
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'contacted')}>
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'qualified')}>
                          Mark as Qualified
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'closed')}>
                          Mark as Closed
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive" 
                          onClick={() => onDelete(lead.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
