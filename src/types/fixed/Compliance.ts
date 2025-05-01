
export interface ComplianceContextType {
  isLoaded: boolean;
  error: string | null;
  updatePreference?: (key: string, value: any) => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate?: boolean;
  pendingUpdates?: string[];
  isApplyingUpdate?: boolean;
  applyUpdate?: (documentId: string) => Promise<boolean>;
  applyAllUpdates?: () => Promise<boolean>;
  scheduleComplianceCheck?: (intervalDays?: number) => Promise<void>;
  enableAutoUpdates?: (documentId: string, enabled: boolean) => Promise<boolean>;
}
