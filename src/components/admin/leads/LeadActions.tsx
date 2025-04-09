
import React from 'react';
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Lead } from '@/models/lead';

type LeadActionsProps = {
  leadId: string;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
};

export const LeadActions: React.FC<LeadActionsProps> = ({ 
  leadId, 
  onStatusUpdate, 
  onDelete 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onStatusUpdate(leadId, 'new')}>
          Mark as New
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate(leadId, 'contacted')}>
          Mark as Contacted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate(leadId, 'qualified')}>
          Mark as Qualified
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate(leadId, 'closed')}>
          Mark as Closed
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(leadId)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
