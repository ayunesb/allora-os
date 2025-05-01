
import { useContext } from 'react';
import { ComplianceContext } from '@/context/ComplianceContext';
import { ExtendedComplianceContextType } from '@/types/unified-types';

export const useCompliance = (): ExtendedComplianceContextType => {
  const context = useContext(ComplianceContext);

  if (!context) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }

  // Provide default implementations for missing functions
  const extendedContext: ExtendedComplianceContextType = {
    ...context,
    // Add missing properties with default implementations
    isLoaded: context.isLoaded !== undefined ? context.isLoaded : true,
    error: context.error || null,
    checkForUpdates: context.checkForUpdates || (() => console.warn('checkForUpdates not implemented')),
    setAutoUpdate: context.setAutoUpdate || ((v: boolean) => console.warn('setAutoUpdate not implemented', v)),
    isCheckingUpdates: context.isCheckingUpdates || false,
    lastChecked: context.lastChecked || null,
    autoUpdate: context.autoUpdate || false,
    updatePreference: context.updatePreference || ((key: string, value: any) => console.warn('updatePreference not implemented', key, value)),
    pendingUpdates: [],
    isApplyingUpdate: false,
    applyUpdate: async () => {},
    applyAllUpdates: async () => {},
    scheduleComplianceCheck: async () => {},
    enableAutoUpdates: async () => false
  };

  return extendedContext;
};
