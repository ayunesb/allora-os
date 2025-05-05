import { User } from '@/types/fixed/User';
import { AuthContextProps } from '@/types/fixed/Auth';

/**
 * Creates a compatibility layer for authentication context
 * This ensures backwards compatibility with different auth implementations
 */
export function createAuthCompatibilityLayer(authContext: any): AuthContextProps {
  if (!authContext) return { 
    user: null, 
    profile: null,
    isLoading: false,
    loading: false,
    hasInitialized: false,
    isEmailVerified: false,
    isSessionExpired: false,
    authError: null,
    isAuthenticated: false,
    refreshProfile: async () => {},
    refreshSession: async () => Promise.resolve(true),
    signOut: async () => {},
    login: async () => ({ success: false, error: 'Auth context not available' }),
    signIn: async () => ({ success: false, error: 'Auth context not available' }),
    logout: async () => Promise.resolve(),
    session: null
  };
  
  // Extract user from different possible auth context structures
  const user = normalizeUserObject(authContext.user || authContext.profile);
  
  return {
    user,
    profile: normalizeUserObject(authContext.profile) || user,
    isLoading: authContext.loading || authContext.isLoading || false,
    loading: authContext.loading || authContext.isLoading || false, // Include both loading properties
    hasInitialized: authContext.hasInitialized || true,
    isEmailVerified: authContext.isEmailVerified || true,
    isSessionExpired: authContext.isSessionExpired || false,
    authError: authContext.authError || null,
    isAuthenticated: !!user,
    session: authContext.session || null,
    refreshProfile: authContext.refreshProfile || (async () => Promise.resolve()),
    refreshSession: authContext.refreshSession || (async () => Promise.resolve(true)),
    signOut: authContext.signOut || authContext.logout || (async () => Promise.resolve()),
    login: authContext.login || authContext.signIn || (async () => ({ success: false, error: 'Not implemented' })),
    signIn: authContext.signIn || authContext.login || (async () => ({ success: false, error: 'Not implemented' })),
    logout: authContext.logout || authContext.signOut || (async () => Promise.resolve())
  };
}

/**
 * Normalizes a user object from various potential sources to ensure it matches
 * the User interface required by the application.
 */
export function normalizeUserObject(userObject: any): User | null {
  if (!userObject) return null;

  // Extract user metadata from various potential sources
  const userMetadata = userObject.user_metadata || userObject.metadata?.user || {};
  const appMetadata = userObject.app_metadata || userObject.metadata?.app || {};
  
  // Build consistent user object
  const normalizedUser: User = {
      id: userObject.id || '',
      email: userObject.email || '',
      name: userObject.name ||
          userMetadata?.name ||
          `${userObject.firstName || userMetadata?.firstName || ''} ${userObject.lastName || userMetadata?.lastName || ''}`.trim(),
      firstName: userObject.firstName || userMetadata?.firstName || '',
      lastName: userObject.lastName || userMetadata?.lastName || '',
      role: userObject.role ||
          (appMetadata?.is_admin ? 'admin' : 'user'),
      created_at: userObject.created_at || new Date().toISOString(),
      avatar: userObject.avatar,
      avatar_url: userObject.avatar_url || userObject.avatar,
      company: userObject.company || userMetadata?.company || '',
      company_id: userObject.company_id || userMetadata?.company_id || '',
      industry: userObject.industry || userMetadata?.industry || '',
      app_metadata: appMetadata,
      user_metadata: userMetadata,
      tenant_id: ''
  };

  return normalizedUser;
}

/**
 * Gets the display name for a user
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  if (user.name) return user.name;
  if (user.firstName || user.lastName) {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  }
  return user.email.split('@')[0];
}

/**
 * Gets the avatar URL for a user
 */
export function getUserAvatar(user: User | null): string {
  if (!user) return '';
  return user.avatar_url || 
         user.avatar || 
         `https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName(user))}&background=random`;
}

/**
 * Normalizes a webhook event from different potential sources
 */
export function normalizeWebhookEvent(event: any): any {
  if (!event) return null;
  
  return {
    id: event.id || '',
    webhook_id: event.webhook_id || event.webhookId || '',
    event_type: event.event_type || event.eventType || '',
    status: event.status || 'pending',
    created_at: event.created_at || event.timestamp || new Date().toISOString(),
    targetUrl: event.targetUrl || event.url || '',
    webhook_type: event.webhook_type || event.webhookType || event.type || '',
    response: event.response || {},
    payload: event.payload || {},
    timestamp: event.timestamp || event.created_at || new Date().toISOString(),
    source: event.source || '',
    duration: event.duration || 0,
  };
}

/**
 * Normalizes an executive message from different potential sources
 */
export function normalizeExecutiveMessage(message: any): any {
  if (!message) return null;
  
  return {
    id: message.id || '',
    content: message.content || message.message_content || '',
    message_content: message.message_content || message.content || '',
    created_at: message.created_at || message.timestamp || new Date().toISOString(),
    from_executive: message.from_executive || false,
    to_executive: message.to_executive || false,
    status: message.status || 'pending',
  };
}
