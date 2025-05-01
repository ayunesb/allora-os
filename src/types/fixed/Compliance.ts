
export interface ComplianceContextType {
  pendingUpdates: string[];
  checkForUpdates: () => void;
  applyUpdate: (documentId: string) => Promise<void>;
  setAutoUpdate: (documentId: string, enabled: boolean) => Promise<void>;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
}
