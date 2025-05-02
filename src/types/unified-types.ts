
import { WebhookEvent } from "./fixed/Webhook";
import { ExtendedComplianceContextType, ExtendedAccessibilityContextType } from "./fixed/Compliance";

export * from "./fixed/Campaign";
export * from "./fixed/Webhook";
export * from "./fixed/Layout";
export * from "./fixed/Compliance";

// Type alias for backward compatibility
export type UnifiedWebhookEvent = WebhookEvent;
