export interface Strategy {
  id: string;
  title: string;
  description: string;
  name: string;
  riskLevel?: string;
  risk_level?: string;
  primaryFocus?: string;
  secondaryFocus?: string;
  keyActions?: string[];
  // Add any other shared fields
}

export interface GeneratedStrategy extends Strategy {
  generated: boolean;
  analysisFactors: any;
}
