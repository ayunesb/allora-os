
import { User, Bot, WebhookEvent, ExecutiveMessage, WebhookType } from '@/types/unified-types';

/**
 * Ensures a user object has all the required properties for the application
 * by filling in missing values with sensible defaults
 */
export function normalizeUserObject(user: any): User | null {
  if (!user) return null;
  
  return {
    ...user,
    // Ensure these fields are always available
    id: user.id || '',
    email: user.email || '',
    name: user.name || 
          (user.user_metadata ? 
            `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim() : '') || '',
    role: user.role || user.user_metadata?.role || 'user',
    company_id: user.company_id || null,
    company: user.company || null,
    industry: user.industry || null,
    app_metadata: user.app_metadata || { is_admin: user.role === 'admin' },
    user_metadata: user.user_metadata || { firstName: '', lastName: '' },
    avatar_url: user.avatar_url || 
               (user.user_metadata ? user.user_metadata.avatar : null) || null,
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.updated_at || new Date().toISOString(),
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
export function normalizeWebhookEvent(event: any): WebhookEvent {
  if (!event) return null as any;
  
  return {
    ...event,
    eventType: event.eventType || event.event_type || 'unknown',
    event_type: event.event_type || event.eventType || 'unknown',
    webhookType: event.webhookType || event.webhook_type || 'custom' as WebhookType,
    webhook_type: event.webhook_type || event.webhookType || 'custom' as WebhookType,
    url: event.url || event.targetUrl,
    targetUrl: event.targetUrl || event.url,
    timestamp: event.timestamp || event.created_at || new Date().toISOString()
  };
}

/**
 * Ensures bot objects have all required properties
 */
export function normalizeBot(bot: any): Bot | null {
  if (!bot) return null;
  
  return {
    ...bot,
    id: bot.id || '',
    name: bot.name || 'AI Advisor',
    title: bot.title || bot.name || 'AI Advisor',
    expertise: bot.expertise || 'General Business'
  };
}

/**
 * Normalize executive message objects
 */
export function normalizeExecutiveMessage(message: any): ExecutiveMessage {
  if (!message) return null as any;
  
  return {
    ...message,
    id: message.id || '',
    content: message.content || message.message_content || '',
    message_content: message.message_content || message.content || '',
    created_at: message.created_at || new Date().toISOString(),
    status: message.status || 'unread'
  };
}

/**
 * Normalize social media post objects
 */
export function normalizeSocialMediaPost(post: any) {
  if (!post) return null;
  
  return {
    ...post,
    platform: post.platform || 'LinkedIn',
    content_type: post.content_type || 'text',
    status: post.status || 'draft',
    is_approved: post.is_approved !== undefined ? post.is_approved : false,
    created_at: post.created_at || new Date().toISOString(),
    updated_at: post.updated_at || new Date().toISOString()
  };
}
