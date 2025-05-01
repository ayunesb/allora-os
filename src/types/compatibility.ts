
// This file acts as a compatibility layer to ease migration to fixed types

import * as FixedTypes from './fixed';

// Re-export all fixed types to their original locations
export const User = FixedTypes.User;
export const AuthContextProps = FixedTypes.AuthContextProps;
export const AgentOptions = FixedTypes.AgentOptions;
export const AgentRunOptions = FixedTypes.AgentRunOptions;
export const WebhookType = FixedTypes.WebhookType;
export const BusinessEventType = FixedTypes.BusinessEventType;
export const BusinessEventPayload = FixedTypes.BusinessEventPayload;
export const WebhookEvent = FixedTypes.WebhookEvent;
export const WebhookResult = FixedTypes.WebhookResult;
export const AccessibilityContextType = FixedTypes.AccessibilityContextType;
export const ChecklistItem = FixedTypes.ChecklistItem;
export const ChecklistCategory = FixedTypes.ChecklistCategory;
export const Campaign = FixedTypes.Campaign;

// Type utilities that might be needed
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';

// Add any missing types from the original files here
