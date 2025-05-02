
export interface ExtendedComplianceContextType {
  pendingUpdates: string[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => void;
  applyAllUpdates: () => void;
  checkForUpdates: () => void;
  isCheckingUpdates: boolean;
  lastChecked?: string;
}
