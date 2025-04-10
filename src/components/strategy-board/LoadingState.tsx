
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  isMobile: boolean;
}

export default function LoadingState({ isMobile }: LoadingStateProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: isMobile ? 3 : 6 }).map((_, index) => (
        <div key={index} className="border border-white/10 bg-black/40 backdrop-blur-md rounded-lg p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap justify-between gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-2 w-full" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
}
