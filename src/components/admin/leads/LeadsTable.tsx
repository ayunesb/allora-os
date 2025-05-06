import React from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadActions } from "./LeadActions";
export const LeadsTable = ({
  leads,
  sortBy,
  sortOrder,
  onSort,
  onStatusUpdate,
  onDelete,
  isMobileView,
}) => {
  // Handle status update with void return to match component props
  const handleStatusUpdate = async (leadId, status) => {
    await onStatusUpdate(leadId, status);
  };
  // Handle delete with void return to match component props
  const handleDelete = async (leadId) => {
    await onDelete(leadId);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[200px] cursor-pointer"
            onClick={() => onSort("name")}
          >
            <div className="flex items-center">
              Name
              <ArrowUpDown className="h-4 w-4 ml-1" />
            </div>
          </TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => onSort("created_at")}
          >
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
            <TableCell
              colSpan={6}
              className="text-center py-8 text-muted-foreground"
            >
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
