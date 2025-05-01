
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  checkForDocumentUpdates, 
  applyDocumentUpdate, 
  scheduleRegularComplianceCheck,
  enableAutoUpdatesForDocument
} from '@/services/complianceService';
import { toast } from 'sonner';
import { logComplianceChange } from '@/utils/auditLogger';

interface ComplianceContextType {
  pendingUpdates: string[];
  isApplyingUpdate: boolean;
  applyUpdate: (documentId: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: (intervalDays?: number) => Promise<void>;
  enableAutoUpdates: (documentId: string, enabled: boolean) => Promise<boolean>;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export function ComplianceProvider({ children }: { children: React.ReactNode }) {
  const [pendingUpdates, setPendingUpdates] = useState<string[]>([]);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);

  const handleUpdateAvailable = useCallback((documents: string[]) => {
    setPendingUpdates(prev => {
      // Combine previous and new updates, removing duplicates
      const allUpdates = [...prev, ...documents];
      return [...new Set(allUpdates)];
    });
  }, []);

  useEffect(() => {
    // Initial check for updates when the provider loads
    checkForDocumentUpdates()
      .then(result => {
        if (result.documentsNeedingUpdate.length > 0) {
          setPendingUpdates(result.documentsNeedingUpdate);
        }
      })
      .catch(error => {
        console.error("Error checking for document updates:", error);
      });
  }, []);

  const applyUpdate = async (documentId: string) => {
    try {
      setIsApplyingUpdate(true);
      const success = await applyDocumentUpdate(documentId);
      
      if (success) {
        // Remove the document from pending updates
        setPendingUpdates(prev => prev.filter(id => id !== documentId));
        
        // Log the compliance change
        logComplianceChange(
          'user', // Would be actual user ID in real implementation
          `Applied update to document: ${documentId}`,
          { documentId, updateType: 'manual' }
        );
      }
    } catch (error) {
      console.error(`Error applying update to ${documentId}:`, error);
      toast.error("Failed to apply update", {
        description: `Could not update ${documentId}. Please try again.`
      });
    } finally {
      setIsApplyingUpdate(false);
    }
  };

  const applyAllUpdates = async () => {
    if (pendingUpdates.length === 0) return;
    
    try {
      setIsApplyingUpdate(true);
      
      for (const documentId of pendingUpdates) {
        await applyDocumentUpdate(documentId);
      }
      
      // Log the bulk update
      logComplianceChange(
        'user',
        `Applied updates to ${pendingUpdates.length} documents`,
        { documentCount: pendingUpdates.length, documentIds: pendingUpdates }
      );
      
      // Clear all pending updates
      setPendingUpdates([]);
      
      toast.success(`Updated ${pendingUpdates.length} documents successfully`);
    } catch (error) {
      console.error("Error applying all updates:", error);
      toast.error("Failed to apply all updates", {
        description: "Some documents could not be updated. Please try again."
      });
    } finally {
      setIsApplyingUpdate(false);
    }
  };

  const scheduleComplianceCheck = async (intervalDays = 5) => {
    try {
      await scheduleRegularComplianceCheck(intervalDays, handleUpdateAvailable);
    } catch (error) {
      console.error("Error scheduling compliance check:", error);
      // We don't show a toast here as it's a background operation
    }
  };

  const enableAutoUpdates = async (documentId: string, enabled: boolean) => {
    try {
      return await enableAutoUpdatesForDocument(documentId, enabled);
    } catch (error) {
      console.error("Error enabling auto updates:", error);
      toast.error("Failed to update auto-update settings");
      return false;
    }
  };

  return (
    <ComplianceContext.Provider value={{
      pendingUpdates,
      isApplyingUpdate,
      applyUpdate,
      applyAllUpdates,
      scheduleComplianceCheck,
      enableAutoUpdates,
    }}>
      {children}
    </ComplianceContext.Provider>
  );
}

export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
}
