
import React from 'react';

export default function AdminCampaigns() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Campaign Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage all marketing campaigns across the platform
        </p>
      </div>
      
      <div className="bg-primary-foreground border border-border/80 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Campaign Dashboard</h2>
        <p className="text-muted-foreground mb-6">
          View and manage all active campaigns across companies. Monitor performance metrics
          and make adjustments as needed.
        </p>
      </div>
    </div>
  );
}
