
import React from 'react';
import { LinkedInIntegration as LinkedInIntegrationComponent } from '@/components/linkedin/LinkedInIntegration';

export default function LinkedInIntegration() {
  return (
    <div className="animate-fadeIn space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">LinkedIn Integration</h1>
      <p className="text-muted-foreground">
        Connect your LinkedIn account to import connections as leads.
      </p>
      
      <LinkedInIntegrationComponent />
    </div>
  );
}
