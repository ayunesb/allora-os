// ⚠️ Do not re-export from 'index.ts' or this will cause circular type errors.
// Always import directly from './fixed/*' or './unified-types'.
// Legacy re-exports for backward compatibility

// Fixed types
import type { User } from './fixed/User';
import type { WebhookEvent, BusinessEventType } from './fixed/Webhook';
import type { ValidationResultsUI, DatabaseTableStatus, ChecklistItem, ChecklistCategory, EnhancedVerificationState } from './fixed/LaunchChecklist';
import type { ExtendedAccessibilityContextType } from './fixed/Accessibility';
import type { AgentOptions, AgentRunOptions, ExecutiveAgentProfile } from './fixed/Agent'; // Ensure these are exported
import type { PatchedStrategy, GeneratedStrategy } from './fixed/Strategy'; // Ensure this is exported

// Unified types
import type { BusinessEventPayload, WebhookResult } from './unified-types';

export type {
  User,
  WebhookEvent,
  BusinessEventType,
  BusinessEventPayload,
  WebhookResult,
  AgentOptions,
  AgentRunOptions,
  ExecutiveAgentProfile,
  ExtendedAccessibilityContextType,
  ValidationResultsUI,
  ChecklistItem,
  ChecklistCategory,
  EnhancedVerificationState,
  DatabaseTableStatus,
  PatchedStrategy,
  GeneratedStrategy,
};
