
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCompliance } from '@/context/ComplianceContext';

/**
 * This is a redirector component that handles any compliance-related setup
 * before redirecting to the main compliance dashboard
 */
export default function Compliance() {
  const { pendingUpdates, scheduleComplianceCheck } = useCompliance();
  
  useEffect(() => {
    // Schedule regular compliance check every 5 days
    scheduleComplianceCheck(5).catch(error => {
      console.error("Failed to schedule compliance check:", error);
    });
    
    // Show notification if there are pending updates
    if (pendingUpdates.length > 0) {
      toast.info(`Updates available for ${pendingUpdates.length} document(s)`, {
        description: "New regulatory updates are available for some compliance documents.",
        action: {
          label: "Review",
          onClick: () => window.location.href = '/compliance/reports'
        }
      });
    }
  }, [pendingUpdates, scheduleComplianceCheck]);

  // Redirect to the compliance overview page
  return <Navigate to="/compliance/overview" replace />;
}
