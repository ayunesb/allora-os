
// This file acts as a compatibility layer to ease migration to fixed types

import * as FixedTypes from './fixed';

// Re-export all fixed types to their original locations
export const User = FixedTypes.User;
export const AuthContextProps = FixedTypes.AuthContextProps;
export const AccessibilityContextType = FixedTypes.AccessibilityContextType;
export const WebhookType = FixedTypes.WebhookType;
export const BusinessEventType = FixedTypes.BusinessEventType;
export const WebhookEvent = FixedTypes.WebhookEvent;
export const WebhookResult = FixedTypes.WebhookResult;
export const LaunchProgressProps = FixedTypes.LaunchProgressProps;
export const ValidationResultsUI = FixedTypes.ValidationResultsUI;
export const ValidationResultItemProps = FixedTypes.ValidationResultItemProps;
export const LaunchInfoProps = FixedTypes.LaunchInfoProps;
export const LaunchInfoBoxProps = FixedTypes.LaunchInfoBoxProps;

// Type aliases for common types
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';
