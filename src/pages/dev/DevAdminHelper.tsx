import React from 'react';
import { PageTitle } from '@/components/ui/page-title';
export default function DevAdminHelper() {
    return (<div className="container mx-auto py-6">
      <PageTitle title="Developer Admin Helper" description="Tools for development and debugging">
        Developer Admin Helper
      </PageTitle>
      
      <div className="mt-6 space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Developer Tools</h3>
          <p className="text-muted-foreground">Various tools to assist with development and debugging</p>
        </div>
      </div>
    </div>);
}
