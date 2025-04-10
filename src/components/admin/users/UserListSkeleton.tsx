
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBreakpoint } from '@/hooks/use-mobile';

export const UserListSkeleton = () => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  if (isMobileView) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="border border-white/10 rounded-md p-4 bg-[#111827]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-[#1E293B]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px] bg-[#1E293B]" />
                  <Skeleton className="h-3 w-[100px] bg-[#1E293B]" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full bg-[#1E293B]" />
            </div>
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-8 w-full bg-[#1E293B]" />
              <Skeleton className="h-8 w-full bg-[#1E293B]" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="rounded-md border border-white/10 overflow-hidden bg-[#111827]">
      <Table>
        <TableHeader className="bg-[#1A1F2C]">
          <TableRow className="border-white/10">
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className="text-gray-400">Email</TableHead>
            <TableHead className="text-gray-400">Role</TableHead>
            <TableHead className="hidden md:table-cell text-gray-400">Created</TableHead>
            <TableHead className="text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="border-white/10">
              <TableCell><Skeleton className="h-5 w-[140px] bg-[#1E293B]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[200px] bg-[#1E293B]" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-full bg-[#1E293B]" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24 bg-[#1E293B]" /></TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-24 bg-[#1E293B]" />
                  <Skeleton className="h-8 w-20 bg-[#1E293B]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
