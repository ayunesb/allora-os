import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBreakpoint } from "@/hooks/use-mobile";
export const EventTableHeader = () => {
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-8"></TableHead>
        <TableHead>Event Type</TableHead>
        <TableHead className={isMobileView ? "hidden md:table-cell" : ""}>
          Webhook
        </TableHead>
        <TableHead className={isMobileView ? "hidden sm:table-cell" : ""}>
          Time
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Response</TableHead>
        <TableHead className={isMobileView ? "w-8" : ""}></TableHead>
      </TableRow>
    </TableHeader>
  );
};
