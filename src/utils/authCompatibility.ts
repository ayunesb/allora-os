
import { User } from '@/types/fixed/User';

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
    updated_at: userObject.updated_at,
    avatar: userObject.avatar,
    avatar_url: userObject.avatar_url || userObject.avatar,
    company: userObject.company || userMetadata?.company || '',
    company_id: userObject.company_id || userMetadata?.company_id || '',
    industry: userObject.industry || userMetadata?.industry || '',
    app_metadata: appMetadata,
    user_metadata: userMetadata,
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
