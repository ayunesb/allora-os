
/**
 * Type definitions for the compliance system
 */

export interface ComplianceContextType {
  isLoaded: boolean;
  error: Error | null;
  checkForUpdates?: () => void;
  setAutoUpdate?: (value: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string | null;
}

// Extended compliance context with all required properties
export interface ExtendedComplianceContextType extends ComplianceContextType {
  // Core properties (required)
  isLoaded: boolean;
  error: Error | null;
  
  // Auto-update functionality (required)
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
  
  // Pending updates management (required)
  pendingUpdates: string[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: () => Promise<void>;
  enableAutoUpdates: () => Promise<boolean>;
  
  // Mode toggles and settings
  isCompliantMode: boolean;
  toggleCompliantMode: () => void;
  hasAcknowledgedTerms: boolean;
  acknowledgeTerms: () => void;
  
  // Data retention settings
  privacyLevel: 'standard' | 'strict' | 'custom';
  setPrivacyLevel: (level: 'standard' | 'strict' | 'custom') => void;
  dataRetentionDays: number;
  setDataRetentionDays: (days: number) => void;
  
  // Document management
  loadCompliance: () => void;
  saveCompliance: () => void;
  resetCompliance: () => void;
}
