
export interface ComplianceContextType {
  isLoaded: boolean;
  error: string | null;
  updatePreference?: (key: string, value: any) => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
}
