
export interface ExtendedComplianceContextType {
  isCompliant: boolean;
  checkCompliance: () => Promise<boolean>;
  complianceScore: number;
  lastUpdated?: string;
}

export interface ExtendedAccessibilityContextType {
  isAccessible: boolean;
  checkAccessibility: () => Promise<boolean>;
  accessibilityScore: number;
  lastChecked?: string;
}
