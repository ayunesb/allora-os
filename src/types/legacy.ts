// ⚠️ Do not re-export from 'index.ts' or this will cause circular type errors.
// Always import directly from './fixed/*' or './unified-types'.
// Legacy re-exports for backward compatibility

// Fixed types
import type { User, AuthContextProps } from './fixed/User';
import type { WebhookType, WebhookEvent } from './fixed/Webhook';
import type { ValidationResultsUI, DatabaseTableStatus, ChecklistItem, ChecklistCategory, EnhancedVerificationState } from './fixed/LaunchChecklist';
import type { ExtendedAccessibilityContextType } from './fixed/Accessibility';
import type { ExecutiveAgentProfile, AgentOptions, AgentRunOptions } from './fixed/Agent';
import type { PatchedStrategy, GeneratedStrategy } from './fixed/Strategy';

// Unified types
import type { BusinessEventType, BusinessEventPayload, WebhookResult } from './unified-types';

export type {
  User,
  AuthContextProps,
  WebhookType,
  WebhookEvent,
  BusinessEventType,
  BusinessEventPayload,
  WebhookResult,
  ExecutiveAgentProfile,
  AgentOptions,
  AgentRunOptions,
  ExtendedAccessibilityContextType,
  ValidationResultsUI,
  ChecklistItem,
  ChecklistCategory,
  EnhancedVerificationState,
  DatabaseTableStatus,
  PatchedStrategy,
  GeneratedStrategy,
};
