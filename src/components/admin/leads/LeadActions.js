import React from 'react';
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
export const LeadActions = ({ leadId, onStatusUpdate, onDelete }) => {
    const handleStatusUpdate = async (status) => {
        try {
            await onStatusUpdate(leadId, status);
            toast.success(`Lead status updated to ${status}`);
        }
        catch (error) {
            console.error('Failed to update lead status:', error);
            toast.error('Failed to update lead status');
        }
    };
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await onDelete(leadId);
                toast.success('Lead deleted successfully');
            }
            catch (error) {
                console.error('Failed to delete lead:', error);
                toast.error('Failed to delete lead');
            }
        }
    };
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusUpdate('new')}>
          Mark as New
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate('contacted')}>
          Mark as Contacted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate('qualified')}>
          Mark as Qualified
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate('client')}>
          Mark as Client
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate('closed')}>
          Mark as Closed
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
};
