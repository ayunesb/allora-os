
import React from 'react';

export function CampaignLoadingState() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="flex justify-between">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-8 bg-muted rounded w-32"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
        <div className="h-10 bg-muted rounded w-full"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-48 bg-muted rounded"></div>
          <div className="h-48 bg-muted rounded"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}
