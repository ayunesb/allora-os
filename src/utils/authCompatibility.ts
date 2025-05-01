
import { User } from "@/types/fixed/User";
import { UnifiedExecutiveMessage } from "@/types/unified-types";

/**
 * Normalizes user data from different auth sources into a consistent User object
 * This helps handle differences between Supabase Auth user and our application User type
 */
export function normalizeUserObject(userInput: any): User | null {
  if (!userInput) return null;

  // Extract user_metadata from various possible locations
  const userMetadata = userInput.user_metadata || userInput.metadata || {};

  // Create a normalized user object
  const normalizedUser: User = {
    id: userInput.id || '',
    email: userInput.email || '',
    firstName: userMetadata.firstName || userInput.firstName || '',
    lastName: userMetadata.lastName || userInput.lastName || '',
    name: userMetadata.name || userInput.name || 
          `${userMetadata.firstName || userInput.firstName || ''} ${userMetadata.lastName || userInput.lastName || ''}`.trim(),
    role: userInput.role || userMetadata.role || (userInput.app_metadata?.is_admin ? 'admin' : 'user'),
    avatar: userMetadata.avatar || userInput.avatar || '',
    avatar_url: userInput.avatar_url || userMetadata.avatar || '',
    company_id: userInput.company_id || userMetadata.company_id || '',
    company: userInput.company || userMetadata.company || '',
    industry: userInput.industry || userMetadata.industry || '',
    updated_at: userInput.updated_at || new Date().toISOString(),
    created_at: userInput.created_at || new Date().toISOString(),
    app_metadata: userInput.app_metadata || {},
    user_metadata: userInput.user_metadata || userMetadata,
  };

  return normalizedUser;
}

/**
 * Creates a compatibility layer to ensure backward compatibility
 * for code expecting older auth interfaces
 */
export function createAuthCompatibilityLayer(authContext: any) {
  if (!authContext) return { user: null };

  return {
    ...authContext,
    user: normalizeUserObject(authContext.user || authContext.profile),
    profile: normalizeUserObject(authContext.user || authContext.profile),
    isLoading: authContext.loading || false,
    isAuthenticated: !!authContext.user || !!authContext.profile,
    signIn: authContext.login || (() => {}),
    signUp: authContext.signUp || (() => {}),
    signOut: authContext.signOut || authContext.logout || (() => {})
  };
}

/**
 * Normalizes webhook event data to provide consistent access patterns
 */
export function normalizeWebhookEvent(webhookEvent: any): any {
  if (!webhookEvent) return null;

  return {
    ...webhookEvent,
    id: webhookEvent.id || '',
    webhook_id: webhookEvent.webhook_id || '',
    event_type: webhookEvent.eventType || webhookEvent.event_type || '',
    eventType: webhookEvent.eventType || webhookEvent.event_type || '',
    created_at: webhookEvent.created_at || webhookEvent.timestamp || new Date().toISOString(),
    timestamp: webhookEvent.timestamp || webhookEvent.created_at || new Date().toISOString(),
    webhookType: webhookEvent.webhookType || webhookEvent.webhook_type || webhookEvent.type || '',
    type: webhookEvent.type || webhookEvent.webhookType || webhookEvent.webhook_type || '',
    targetUrl: webhookEvent.targetUrl || webhookEvent.url || '',
    url: webhookEvent.targetUrl || webhookEvent.url || '',
    status: webhookEvent.status || 'pending',
    source: webhookEvent.source || ''
  };
}

/**
 * Normalizes executive message for consistent usage across components
 */
export function normalizeExecutiveMessage(msg: any): UnifiedExecutiveMessage {
  return {
    id: msg.id || '',
    content: msg.message_content || msg.content || '',
    message_content: msg.message_content || msg.content || '',
    created_at: msg.created_at || new Date().toISOString(),
    from_executive: msg.from_executive ?? true,
    to_executive: msg.to_executive ?? false,
    status: msg.status ?? 'unread',
  };
}
