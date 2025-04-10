
import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lead } from '@/models/lead';

type LeadBulkActionsProps = {
  selectedCount: number;
  onStatusUpdate: (status: Lead['status']) => Promise<boolean | void>;
};

export const LeadBulkActions: React.FC<LeadBulkActionsProps> = ({
  selectedCount,
  onStatusUpdate
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{selectedCount} Selected</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onStatusUpdate('new')}>
          Mark as New
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate('contacted')}>
          Mark as Contacted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate('qualified')}>
          Mark as Qualified
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusUpdate('closed')}>
          Mark as Closed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
