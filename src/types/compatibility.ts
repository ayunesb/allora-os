
// This file acts as a compatibility layer to ease migration to fixed types

// Re-export all fixed types
export * from './fixed';

// Type aliases for common types
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';

// Add any additional compatibility exports here
