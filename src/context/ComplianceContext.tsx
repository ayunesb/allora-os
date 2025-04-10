
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  checkForDocumentUpdates, 
  applyDocumentUpdate, 
  setupAutomaticUpdates, 
  enableAutoUpdatesForDocument 
} from '@/services/complianceService';
import { toast } from 'sonner';

interface ComplianceContextType {
  pendingUpdates: string[];
  isCheckingUpdates: boolean;
  isApplyingUpdate: boolean;
  lastChecked: Date | null;
  checkForUpdates: () => Promise<void>;
  applyUpdate: (documentId: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  setAutoUpdate: (documentId: string, enabled: boolean) => Promise<void>;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export const useCompliance = () => {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
};

interface ComplianceProviderProps {
  children: ReactNode;
}

export const ComplianceProvider: React.FC<ComplianceProviderProps> = ({ children }) => {
  const [pendingUpdates, setPendingUpdates] = useState<string[]>([]);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Check for updates when the component mounts
  useEffect(() => {
    const cleanup = setupAutomaticUpdates((documents) => {
      if (documents.length > 0) {
        setPendingUpdates(documents);
        toast.info(`Updates available for ${documents.length} document(s)`, {
          description: "New regulatory updates are available for some compliance documents."
        });
      }
    });
    
    return cleanup;
  }, []);

  const checkForUpdates = async () => {
    setIsCheckingUpdates(true);
    try {
      const result = await checkForDocumentUpdates();
      setPendingUpdates(result.documentsNeedingUpdate);
      setLastChecked(new Date());
      
      if (result.documentsNeedingUpdate.length > 0) {
        toast.info(`Updates available for ${result.documentsNeedingUpdate.length} document(s)`, {
          description: "New regulatory updates are available for some compliance documents."
        });
      } else {
        toast.success("All documents are up-to-date", {
          description: "Your compliance documents meet the latest regulatory requirements."
        });
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
      toast.error("Failed to check for updates", {
        description: "There was an error checking for document updates. Please try again."
      });
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  const applyUpdate = async (documentId: string) => {
    setIsApplyingUpdate(true);
    try {
      const success = await applyDocumentUpdate(documentId);
      if (success) {
        setPendingUpdates(prev => prev.filter(id => id !== documentId));
        toast.success("Document updated successfully", {
          description: "The document has been updated to the latest version."
        });
      }
    } catch (error) {
      console.error("Error applying update:", error);
      toast.error("Failed to update document", {
        description: "There was an error updating the document. Please try again."
      });
    } finally {
      setIsApplyingUpdate(false);
    }
  };

  const applyAllUpdates = async () => {
    setIsApplyingUpdate(true);
    try {
      const promises = pendingUpdates.map(docId => applyDocumentUpdate(docId));
      await Promise.all(promises);
      
      setPendingUpdates([]);
      toast.success("All documents updated successfully", {
        description: "All compliance documents have been updated to their latest versions."
      });
    } catch (error) {
      console.error("Error applying all updates:", error);
      toast.error("Failed to update all documents", {
        description: "There was an error updating some documents. Please try again."
      });
    } finally {
      setIsApplyingUpdate(false);
    }
  };

  const setAutoUpdate = async (documentId: string, enabled: boolean) => {
    try {
      await enableAutoUpdatesForDocument(documentId, enabled);
      return;
    } catch (error) {
      console.error("Error setting auto-update:", error);
      toast.error("Failed to update setting", {
        description: `Could not ${enabled ? 'enable' : 'disable'} auto-updates for this document.`
      });
    }
  };

  const value = {
    pendingUpdates,
    isCheckingUpdates,
    isApplyingUpdate,
    lastChecked,
    checkForUpdates,
    applyUpdate,
    applyAllUpdates,
    setAutoUpdate
  };

  return (
    <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>
  );
};
