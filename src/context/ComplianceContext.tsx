
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { ExtendedComplianceContextType } from '@/types/unified-types';

// Create context with default values
export const ComplianceContext = createContext<ExtendedComplianceContextType>({
  isLoaded: false,
  error: null,
  checkForUpdates: () => {},
  setAutoUpdate: () => {},
  isCheckingUpdates: false,
  lastChecked: null,
  pendingUpdates: [],
  isApplyingUpdate: false,
  applyUpdate: async () => null,
  applyAllUpdates: async () => null,
  scheduleComplianceCheck: async () => {},
  enableAutoUpdates: async () => false
});

export interface ComplianceProviderProps {
  children: ReactNode;
}

export const ComplianceProvider = ({ children }: ComplianceProviderProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [pendingUpdates, setPendingUpdates] = useState<string[]>([]);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState<boolean>(false);
  const [autoUpdate, setAutoUpdateState] = useState<boolean>(false);
  
  // Check for updates
  const checkForUpdates = () => {
    setIsCheckingUpdates(true);
    
    // Simulate API call
    setTimeout(() => {
      setLastChecked(new Date().toISOString());
      setPendingUpdates(['gdpr-update', 'ccpa-update']);
      setIsCheckingUpdates(false);
      toast.info('Compliance updates found');
    }, 1500);
  };
  
  // Set auto-update preference
  const setAutoUpdate = (value: boolean) => {
    setAutoUpdateState(value);
    
    // Simulate API call
    toast.success(value ? 'Auto-updates enabled' : 'Auto-updates disabled');
  };
  
  // Apply a specific update
  const applyUpdate = async (documentId: string) => {
    setIsApplyingUpdate(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Remove from pending updates
      setPendingUpdates(pendingUpdates.filter(id => id !== documentId));
      toast.success(`Update ${documentId} applied successfully`);
      
      return { success: true };
    } catch (err) {
      setError(`Failed to apply update ${documentId}`);
      toast.error(`Failed to apply update ${documentId}`);
      return { success: false, error: err };
    } finally {
      setIsApplyingUpdate(false);
    }
  };
  
  // Apply all updates
  const applyAllUpdates = async () => {
    setIsApplyingUpdate(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear pending updates
      setPendingUpdates([]);
      toast.success('All updates applied successfully');
      
      return { success: true };
    } catch (err) {
      setError('Failed to apply updates');
      toast.error('Failed to apply updates');
      return { success: false, error: err };
    } finally {
      setIsApplyingUpdate(false);
    }
  };
  
  // Schedule compliance check
  const scheduleComplianceCheck = async (intervalDays = 30) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Compliance check scheduled every ${intervalDays} days`);
    } catch (err) {
      setError('Failed to schedule compliance check');
      toast.error('Failed to schedule compliance check');
    }
  };
  
  // Enable auto-updates for a document
  const enableAutoUpdates = async (documentId: string, enabled: boolean) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Auto-updates ${enabled ? 'enabled' : 'disabled'} for ${documentId}`);
      return true;
    } catch (err) {
      toast.error(`Failed to ${enabled ? 'enable' : 'disable'} auto-updates for ${documentId}`);
      return false;
    }
  };
  
  // Update preference wrapper
  const updatePreference = (key: string, value: any) => {
    if (key === 'autoUpdate') {
      setAutoUpdate(value);
    }
  };
  
  // On mount, simulate loading data
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoaded(true);
      } catch (err) {
        setError('Failed to load compliance data');
      }
    };
    
    loadData();
  }, []);
  
  return (
    <ComplianceContext.Provider
      value={{
        isLoaded,
        error,
        checkForUpdates,
        setAutoUpdate,
        isCheckingUpdates,
        lastChecked,
        pendingUpdates,
        isApplyingUpdate,
        applyUpdate,
        applyAllUpdates,
        scheduleComplianceCheck,
        enableAutoUpdates,
        autoUpdate,
        updatePreference
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
};

// Create a hook for easy access to the compliance context
export const useCompliance = () => {
  return useContext(ComplianceContext);
};
