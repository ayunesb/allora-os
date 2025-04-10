
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBreakpoint } from '@/hooks/use-mobile';

export const EventTableHeader: React.FC = () => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-8"></TableHead>
        <TableHead>Event Type</TableHead>
        <TableHead>Webhook</TableHead>
        <TableHead>Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Response</TableHead>
        <TableHead className={isMobileView ? "w-8" : ""}></TableHead>
      </TableRow>
    </TableHeader>
  );
};
