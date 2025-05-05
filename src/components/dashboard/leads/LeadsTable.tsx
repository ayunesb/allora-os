import React from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
export const LeadsTable = ({ leads, sortBy, sortOrder, onSort, onViewLead, onStatusUpdate, onDelete, selectedLeads, onLeadSelect, onSelectAll, getLeadScore, getNextBestAction }) => {
    const sortIcon = sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4"/> : <ChevronDown className="ml-2 h-4 w-4"/>;
    const allLeadsSelected = leads.length > 0 && selectedLeads.length === leads.length;
    return (<div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox checked={allLeadsSelected} onCheckedChange={onSelectAll} aria-label="Select all leads"/>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('name')}>
              <div className="flex items-center">
                Name {sortBy === 'name' && sortIcon}
              </div>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Next Action</TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('created_at')}>
              <div className="flex items-center">
                Date Added {sortBy === 'created_at' && sortIcon}
              </div>
            </TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const leadScore = getLeadScore(lead);
            const nextAction = getNextBestAction(lead);
            return (<TableRow key={lead.id}>
                <TableCell>
                  <Checkbox checked={selectedLeads.includes(lead.id)} onCheckedChange={(checked) => onLeadSelect(lead.id, !!checked)} aria-label={`Select ${lead.name}`}/>
                </TableCell>
                <TableCell className="font-medium hover:underline cursor-pointer" onClick={() => onViewLead(lead)}>
                  {lead.name}
                </TableCell>
                <TableCell>
                  {lead.email && <div>{lead.email}</div>}
                  {lead.phone && <div>{lead.phone}</div>}
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status}/>
                </TableCell>
                <TableCell>
                  <LeadScoreBadge score={leadScore}/>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={nextAction}>
                  {nextAction}
                </TableCell>
                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewLead(lead)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'contacted')}>
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'qualified')}>
                        Mark as Qualified
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(lead.id)} className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>);
        })}
        </TableBody>
      </Table>
    </div>);
};
