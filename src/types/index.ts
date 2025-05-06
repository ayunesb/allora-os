// Export base types
export * from "./fixed/User";
export * from "./fixed/Auth";
export * from "./fixed/Agent";
export * from "./fixed/Accessibility";
export * from "./fixed/Compliance";
export * from "./fixed/LaunchChecklist";
export * from "./fixed/Campaign";
export * from "./fixed/Message";
export * from "./fixed/Bot";
export * from "./fixed/SocialMedia";
export * from "./fixed/Strategy";
export * from "./fixed/Webhook";

// Unified + compatibility types
export * from "./unified-types";
// Explicitly re-export required members from './compatibility'
// export { CompatibilityBusinessEventType } from './compatibility'; // Removed due to missing export

// Webhook utility compatibility
export {
  validateWebhookUrlFormat,
  testWebhook,
  sanitizeWebhookUrl,
} from "@/utils/webhookValidation";

// Social media types (explicit)
export type {
  SocialPlatform,
  ContentType,
  PostStatus,
  SocialMediaPost,
  SocialMediaCalendarFilters,
} from "./unified-types";

// Checklist types (explicit)
export type { ChecklistCategory, ChecklistItem } from "./fixed/LaunchChecklist";

// Legacy types that are NOT already exported above
export type {
  ExecutiveAgentProfile,
  AgentOptions,
  AgentRunOptions,
  ExtendedAccessibilityContextType,
} from "./legacy";

// ✅ KEEP CLEAN RE-EXPORTS ONLY
export { WebhookType } from "./fixed/Webhook";
export * from "./fixed/Agent";
export * from "./fixed/Webhook";
export * from "./unified-types";

// Explicitly re-export Webhook types to resolve ambiguity
export {
  WebhookEvent,
  BusinessEventType,
  BusinessEventPayload,
  WebhookResult,
} from "./fixed/Webhook";
