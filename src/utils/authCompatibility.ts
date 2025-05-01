
import { UnifiedUser } from '@/types/unified-types';

/**
 * Ensures a user object has all the required properties for the application
 * by filling in missing values with sensible defaults
 */
export function normalizeUserObject(user: any): UnifiedUser | null {
  if (!user) return null;
  
  return {
    ...user,
    // Ensure these fields are always available
    role: user.role || user.user_metadata?.role || 'user',
    company_id: user.company_id || null,
    company: user.company || null,
    industry: user.industry || null,
    app_metadata: user.app_metadata || { is_admin: user.role === 'admin' },
    name: user.name || 
          (user.user_metadata ? 
            `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim() : ''),
    avatar_url: user.avatar_url || 
               (user.user_metadata ? user.user_metadata.avatar : null)
  };
}

/**
 * Creates a facade around auth context to ensure all required properties
 */
export function createAuthCompatibilityLayer(auth: any) {
  if (!auth) return null;
  
  return {
    ...auth,
    user: normalizeUserObject(auth.user),
    profile: normalizeUserObject(auth.profile || auth.user),
    isLoading: auth.isLoading || auth.loading || false,
    loading: auth.loading || auth.isLoading || false
  };
}

/**
 * Ensures webhook events have all properties in both naming styles
 */
export function normalizeWebhookEvent(event: any) {
  if (!event) return null;
  
  return {
    ...event,
    eventType: event.eventType || event.event_type || 'unknown',
    event_type: event.event_type || event.eventType || 'unknown',
    webhookType: event.webhookType || event.webhook_type || 'custom',
    webhook_type: event.webhook_type || event.webhookType || 'custom',
    url: event.url || event.targetUrl,
    targetUrl: event.targetUrl || event.url
  };
}

/**
 * Ensures executive message objects have all required properties
 */
export function normalizeExecutiveMessage(message: any) {
  if (!message) return null;
  
  return {
    ...message,
    from_executive: message.from_executive !== undefined ? message.from_executive : false,
    to_executive: message.to_executive !== undefined ? message.to_executive : false,
    message_content: message.message_content || message.content,
    content: message.content || message.message_content
  };
}

/**
 * Ensures bot objects have all required properties
 */
export function normalizeBot(bot: any) {
  if (!bot) return null;
  
  return {
    ...bot,
    name: bot.name || 'AI Advisor',
    title: bot.title || bot.name || 'AI Advisor',
    expertise: bot.expertise || 'General Business'
  };
}
