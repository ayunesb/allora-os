import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
export function CampaignLoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        {/* Stats cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-lg shrink-0" />
            ))}
        </div>

        {/* Campaign cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
        </div>
      </div>
    </div>
  );
}
