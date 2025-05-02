
/**
 * Extended Compliance Context Type for the Compliance Provider
 */
export interface ExtendedComplianceContextType {
  isLoaded: boolean;
  error: string | null;
  policies?: Record<string, boolean>;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: Date | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
  pendingUpdates: any[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: () => Promise<void>;
  enableAutoUpdates: () => Promise<boolean>;
  isCompliantMode: boolean;
  toggleCompliantMode: () => void;
  hasAcknowledgedTerms: boolean;
  acknowledgeTerms: () => void;
  privacyLevel: 'standard' | 'strict' | 'custom';
  setPrivacyLevel: (level: 'standard' | 'strict' | 'custom') => void;
  dataRetentionDays: number;
  setDataRetentionDays: (days: number) => void;
  loadCompliance: () => void;
  saveCompliance: () => void;
  resetCompliance: () => void;
}
