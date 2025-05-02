
export interface ExtendedComplianceContextType {
  isCompliant: boolean;
  checkCompliance: () => Promise<boolean>;
  complianceScore: number;
  lastUpdated?: string;
  pendingUpdates?: any[];
  applyAllUpdates?: () => void;
  isApplyingUpdate?: boolean;
  applyUpdate?: (id: string) => void;
}

export interface ExtendedAccessibilityContextType {
  isAccessible: boolean;
  checkAccessibility: () => Promise<boolean>;
  accessibilityScore: number;
  lastChecked?: string;
  screenReaderFriendly?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
  invertColors?: boolean;
  fontSize?: number;
  setFontSize?: (size: number) => void;
  toggleScreenReaderFriendly?: () => void;
  toggleHighContrast?: () => void;
  toggleReducedMotion?: () => void;
  toggleLargeText?: () => void;
  toggleInvertColors?: () => void;
}
