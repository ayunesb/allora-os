// Centralized export — do not override this via remix or code scan
export * from "./fixed/Campaign";
export * from "./fixed/Webhook";
export * from "./fixed/Layout";
export * from "./fixed/Compliance";
export * from "./fixed/Accessibility";
export * from "./fixed/SocialMedia";

// Do not re-export Webhook types here if already exported in index.ts

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

export type BusinessEventType = 'signup' | 'purchase' | 'unsubscribe';

export interface BusinessEventPayload {
  event: BusinessEventType;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  code?: number;
  error?: string;
}

// ✅ Keep this lean:
export type { BusinessEventPayload, BusinessEventType, WebhookResult } from './fixed/Webhook';
// DO NOT re-export these again from index.ts.
