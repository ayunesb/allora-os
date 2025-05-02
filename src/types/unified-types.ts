
// Centralized export — do not override this via remix or code scan
export * from "./fixed/Campaign";
export * from "./fixed/Webhook";
export * from "./fixed/Layout";
export * from "./fixed/Compliance";
export * from "./fixed/Accessibility";
export * from "./fixed/SocialMedia";

// Add missing types needed for compatibility with components
export interface UnifiedExecutiveMessage {
  id: string;
  created_at: string;
  from_executive?: string;
  to_executive?: string;
  content?: string;
  message_content?: string;
  status?: string;
}

export interface KPIMetric {
  id: string;
  type: string;
  value: number;
  recorded_at: string;
}
