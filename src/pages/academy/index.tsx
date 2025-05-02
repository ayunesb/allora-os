import React, { useEffect, useState } from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { PageTitle } from '@/components/ui/page-title';
import { GraduationCap } from 'lucide-react';

export default function AcademyIndex() {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container px-4 py-6">
      <DashboardBreadcrumb 
        rootPath="/academy" 
        rootLabel="Academy" 
        rootIcon={<GraduationCap className="h-4 w-4" />}
      />
      
      <PageTitle>
        Academy Content
      </PageTitle>
      
      {/* Academy content would go here */}
      <div className="grid gap-6">
        {isReady ? (
          <p>Academy content loaded successfully!</p>
        ) : (
          <p>Loading academy content...</p>
        )}
      </div>
    </div>
  );
}
