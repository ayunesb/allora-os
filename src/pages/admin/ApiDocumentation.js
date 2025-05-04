import React from 'react';
import { PageTitle } from '@/components/ui/page-title';
export default function ApiDocumentation() {
    return (<div className="container mx-auto py-6">
      <PageTitle title="API Documentation" description="Documentation for the Allora AI API">
        API Documentation
      </PageTitle>
      
      <div className="mt-6 space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Authentication</h3>
          <p className="text-muted-foreground">Learn about API authentication methods</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Endpoints</h3>
          <p className="text-muted-foreground">Explore available API endpoints</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Examples</h3>
          <p className="text-muted-foreground">Code examples for common API operations</p>
        </div>
      </div>
    </div>);
}
