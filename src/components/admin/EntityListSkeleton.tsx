
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export function EntityListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-10 w-52" />
        <Skeleton className="h-9 w-32" />
      </div>
      
      <div className="rounded-md border border-white/10 overflow-hidden bg-[#111827]">
        <Table>
          <TableHeader className="bg-[#1A1F2C]">
            <TableRow className="border-white/10">
              <TableHead className="h-10 w-[25%]">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="h-10 w-[25%]">
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="h-10 w-[20%]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="h-10 w-[15%]">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="h-10 w-[15%]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/10">
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
