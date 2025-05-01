
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardLoadingState() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-md" />
        ))}
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProfileLoadingState() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid gap-6">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    </div>
  );
}

export function FormLoadingState() {
  return (
    <div className="space-y-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32 mt-6" />
    </div>
  );
}
