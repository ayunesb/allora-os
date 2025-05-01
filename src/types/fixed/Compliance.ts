
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

// Extended compliance context with additional properties
export interface ExtendedComplianceContextType extends ComplianceContextType {
  isLoaded: boolean;
  error: Error | null;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
  pendingUpdates: any[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: () => Promise<void>;
  enableAutoUpdates: () => Promise<boolean>;
}
