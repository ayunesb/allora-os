
// Export all types from the fixed directory
export * from './fixed/User';
export * from './fixed/Auth';
export * from './fixed/Agent';
export * from './fixed/Webhook';
export * from './fixed/Accessibility';
export * from './fixed/LaunchChecklist';
export * from './fixed/Campaign';
export * from './fixed/Compliance';

// Re-export the WebhookType for compatibility
export { WebhookType } from '@/utils/webhookValidation';

// Re-export any other types needed
export * from './Checklist';

// Define any additional types needed by multiple components
export type { BusinessEventType, WebhookResult } from './fixed/Webhook';

// For webhooks compatibility
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';
