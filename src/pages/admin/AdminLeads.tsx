
import React from 'react';

export default function AdminLeads() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground mt-1">
          Oversee all leads generated through the platform
        </p>
      </div>
      
      <div className="bg-primary-foreground border border-border/80 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Lead Analytics</h2>
        <p className="text-muted-foreground mb-6">
          Monitor lead generation metrics, conversion rates, and distribution across companies.
          Track engagement and communication effectiveness.
        </p>
      </div>
    </div>
  );
}
