
import { User as FixedUser } from '@/types/fixed/User';

/**
 * Normalizes user objects from different sources into a consistent User type
 * This ensures all user objects have the required properties regardless of source
 */
export function normalizeUserObject(rawUser: any | null | undefined): FixedUser | null {
  if (!rawUser) return null;
  
  // Ensure all required fields have values, with fallbacks
  return {
    id: rawUser.id || '',
    email: rawUser.email || '',
    firstName: rawUser.firstName || rawUser.user_metadata?.firstName || '',
    lastName: rawUser.lastName || rawUser.user_metadata?.lastName || '',
    name: rawUser.name || 
          rawUser.user_metadata?.name || 
          `${rawUser.user_metadata?.firstName || ''} ${rawUser.user_metadata?.lastName || ''}`.trim() || '',
    role: rawUser.role || rawUser.user_metadata?.role || 'user',
    company_id: rawUser.company_id || '',
    company: rawUser.company || '',
    industry: rawUser.industry || '',
    avatar: rawUser.avatar || rawUser.user_metadata?.avatar || '',
    avatar_url: rawUser.avatar_url || rawUser.user_metadata?.avatar || '',
    created_at: rawUser.created_at || new Date().toISOString(),
    updated_at: rawUser.updated_at || new Date().toISOString(),
    app_metadata: {
      is_admin: rawUser.app_metadata?.is_admin || rawUser.role === 'admin' || false,
      ...(rawUser.app_metadata || {})
    },
    user_metadata: {
      firstName: rawUser.user_metadata?.firstName || '',
      lastName: rawUser.user_metadata?.lastName || '',
      avatar: rawUser.user_metadata?.avatar || rawUser.avatar_url || '',
      name: rawUser.user_metadata?.name || rawUser.name || '',
      role: rawUser.user_metadata?.role || rawUser.role || 'user',
      ...(rawUser.user_metadata || {})
    }
  };
}

/**
 * Normalizes webhook event objects for consistent access
 */
export function normalizeWebhookEvent(event: any): any {
  if (!event) return null;
  
  return {
    ...event,
    eventType: event.eventType || event.event_type || '',
    event_type: event.eventType || event.event_type || '',
    webhookType: event.webhookType || event.webhook_type || '',
    webhook_type: event.webhookType || event.webhook_type || '',
    targetUrl: event.targetUrl || event.url || '',
    url: event.targetUrl || event.url || '',
  };
}

/**
 * Normalizes executive message objects for consistent access
 */
export function normalizeExecutiveMessage(message: any): any {
  if (!message) return null;
  
  return {
    ...message,
    content: message.content || message.message_content || '',
    message_content: message.content || message.message_content || '',
  };
}

/**
 * Creates an compatibility layer for auth contexts to ensure consistent API
 */
export function createAuthCompatibilityLayer(authContext: any) {
  const user = normalizeUserObject(authContext?.user || authContext?.profile);
  
  return {
    user,
    profile: user,
    loading: authContext?.loading || authContext?.isLoading || false,
    isLoading: authContext?.loading || authContext?.isLoading || false,
    hasInitialized: authContext?.hasInitialized || true,
    isEmailVerified: authContext?.isEmailVerified || true,
    isSessionExpired: authContext?.isSessionExpired || false,
    authError: authContext?.authError || null,
    refreshSession: authContext?.refreshSession || (() => Promise.resolve(true)),
    refreshProfile: authContext?.refreshProfile || (() => Promise.resolve())
  };
}
