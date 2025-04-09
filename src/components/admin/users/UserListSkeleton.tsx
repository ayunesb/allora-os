
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const UserListSkeleton = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md">
            <div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
