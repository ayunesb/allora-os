import React, { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Repeat, Eye } from "lucide-react";
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
export const EventTableRow = ({ event, onViewDetails, onRetry }) => {
    const [expanded, setExpanded] = useState(false);
    const formatTimestamp = (timestamp) => {
        try {
            return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
        }
        catch (e) {
            return 'Invalid date';
        }
    };
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    return (<>
      <TableRow className="group hover:bg-muted/50">
        <TableCell>
          <StatusBadge status={event.status}/>
        </TableCell>
        <TableCell>
          <div className="font-medium">{event.type || 'Unknown'}</div>
          <div className="text-xs text-muted-foreground md:hidden">
            {event.webhook_type}
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {event.webhook_type || 'Unknown'}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatTimestamp(event.timestamp)}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleExpand} className="h-8 w-8">
              {expanded ? (<ChevronUp className="h-4 w-4"/>) : (<ChevronDown className="h-4 w-4"/>)}
              <span className="sr-only">Toggle details</span>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => onViewDetails && onViewDetails(event)} className="h-8 w-8">
              <Eye className="h-4 w-4"/>
              <span className="sr-only">View details</span>
            </Button>
            
            {event.status === 'failed' && (<Button variant="ghost" size="icon" onClick={() => onRetry && onRetry(event)} className="h-8 w-8 text-yellow-500 hover:text-yellow-600">
                <Repeat className="h-4 w-4"/>
                <span className="sr-only">Retry webhook</span>
              </Button>)}
          </div>
        </TableCell>
      </TableRow>
      
      {/* Expanded content */}
      {expanded && (<TableRow>
          <TableCell colSpan={5} className="p-0">
            <div className="p-4 bg-muted/30 border-t border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Request URL</h4>
                  <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                    {event.url || 'N/A'}
                  </pre>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Response</h4>
                  <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                    {event.response || 'No response data'}
                  </pre>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium mb-1">Payload</h4>
                  <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                    {JSON.stringify(event.payload, null, 2) || 'No payload data'}
                  </pre>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>)}
    </>);
};
export default EventTableRow;
