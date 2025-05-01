
import React from 'react';
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const EventTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Status</TableHead>
        <TableHead>Type</TableHead>
        <TableHead className="hidden md:table-cell">Webhook</TableHead>
        <TableHead className="hidden md:table-cell">Timestamp</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default EventTableHeader;
