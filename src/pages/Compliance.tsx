
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCompliance } from '@/context/ComplianceContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Compliance() {
  const navigate = useNavigate();
  const { pendingUpdates, scheduleComplianceCheck } = useCompliance();
  
  useEffect(() => {
    // Check if we're on the direct /compliance route
    if (window.location.pathname === '/compliance') {
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
            onClick: () => navigate('/compliance/reports')
          }
        });
      }
      
      // Redirect to the compliance page
      return navigate('/legal/compliance');
    }
  }, [navigate, pendingUpdates, scheduleComplianceCheck]);

  // Redirect to the compliance page
  return <Navigate to="/legal/compliance" replace />;
}
