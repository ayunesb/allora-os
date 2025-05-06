import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export const LeadsLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="bg-card p-4">
          <div className="grid grid-cols-7 gap-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border-t p-4">
              <div className="grid grid-cols-7 gap-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[80px] ml-auto" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
