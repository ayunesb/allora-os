
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ComplianceContextType } from '@/types/fixed/Compliance';

// Create the context with a default value
export const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

interface ComplianceProviderProps {
  children: ReactNode;
}

export const ComplianceProvider = ({ children }: ComplianceProviderProps) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [autoUpdate, setAutoUpdateState] = useState(false);

  // Function to check for updates
  const checkForUpdates = async () => {
    setIsCheckingUpdates(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastChecked(new Date().toISOString());
    } catch (err) {
      setError('Failed to check for updates');
      console.error('Error checking for updates:', err);
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  // Function to set auto-update preference
  const setAutoUpdate = (value: boolean) => {
    setAutoUpdateState(value);
    // Here you would typically persist this setting to user preferences
  };

  // Function to update a specific preference
  const updatePreference = (key: string, value: any) => {
    console.log(`Updating compliance preference: ${key} to ${value}`);
    // Implement preference update logic here
  };

  const value: ComplianceContextType = {
    isLoaded,
    error,
    checkForUpdates,
    setAutoUpdate,
    isCheckingUpdates,
    lastChecked,
    autoUpdate,
    updatePreference
  };

  return (
    <ComplianceContext.Provider value={value}>
      {children}
    </ComplianceContext.Provider>
  );
};

export const useComplianceContext = () => {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error('useComplianceContext must be used within a ComplianceProvider');
  }
  return context;
};
