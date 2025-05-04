import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
export function CampaignDetailLoadingState() {
    return (<div className="container mx-auto px-4 py-8">
      <div className="space-y-8 animate-pulse">
        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2"/>
            <Skeleton className="h-5 w-80"/>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32"/>
            <Skeleton className="h-10 w-32"/>
          </div>
        </div>
        
        {/* Status and metadata skeleton */}
        <div className="flex flex-wrap gap-4 items-center">
          <Skeleton className="h-8 w-24 rounded-full"/>
          <Skeleton className="h-6 w-40"/>
          <Skeleton className="h-6 w-32"/>
        </div>
        
        {/* Metrics cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (<Skeleton key={i} className="h-36 rounded-xl"/>))}
        </div>
        
        {/* Chart skeleton */}
        <Skeleton className="h-64 w-full rounded-xl"/>
        
        {/* Additional details skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-8 w-40"/>
            <Skeleton className="h-24 w-full rounded-xl"/>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-40"/>
            <Skeleton className="h-24 w-full rounded-xl"/>
          </div>
        </div>
      </div>
    </div>);
}
