
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const EventTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-8"></TableHead>
        <TableHead>Event Type</TableHead>
        <TableHead>Webhook</TableHead>
        <TableHead>Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Response</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
};
