
export interface ExtendedComplianceContextType {
  pendingUpdates: string[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => void;
  applyAllUpdates: () => void;
  checkForUpdates: () => void;
  isCheckingUpdates: boolean;
  lastChecked?: string;
  // Add back these fields which are referenced in components
  autoUpdate?: boolean;
  setAutoUpdate?: (value: boolean) => void;
  isLoaded?: boolean;
}
