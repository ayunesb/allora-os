
import { User } from '@/types/fixed/User';

/**
 * Normalizes user objects from various sources into a consistent User type
 * This handles differences between Supabase auth user objects and our internal user model
 */
export function normalizeUserObject(userInput: any): User | null {
  if (!userInput) {
    return null;
  }

  // Start with the base user properties
  const normalizedUser: User = {
    id: userInput.id || '',
    email: userInput.email || '',
  };

  // Handle user metadata which could be in different locations
  if (userInput.user_metadata) {
    normalizedUser.firstName = userInput.user_metadata.firstName || userInput.user_metadata.first_name;
    normalizedUser.lastName = userInput.user_metadata.lastName || userInput.user_metadata.last_name;
    normalizedUser.name = userInput.user_metadata.name || userInput.name;
    normalizedUser.avatar = userInput.user_metadata.avatar;
    normalizedUser.company = userInput.user_metadata.company;
    normalizedUser.company_id = userInput.user_metadata.company_id;
    normalizedUser.industry = userInput.user_metadata.industry;
    normalizedUser.role = userInput.user_metadata.role;
  }

  // Handle app metadata
  if (userInput.app_metadata) {
    normalizedUser.app_metadata = userInput.app_metadata;
  }

  // Handle direct properties
  normalizedUser.avatar_url = userInput.avatar_url || userInput.avatar || normalizedUser.avatar;
  normalizedUser.role = userInput.role || normalizedUser.role;
  normalizedUser.name = userInput.name || normalizedUser.name || [normalizedUser.firstName, normalizedUser.lastName].filter(Boolean).join(' ');
  normalizedUser.company = userInput.company || normalizedUser.company;
  normalizedUser.company_id = userInput.company_id || normalizedUser.company_id;
  normalizedUser.industry = userInput.industry || normalizedUser.industry;
  normalizedUser.created_at = userInput.created_at;

  return normalizedUser;
}

/**
 * Helper function to get display name from a user object
 */
export function getUserDisplayName(user?: User | null): string {
  if (!user) return '';

  return (
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.email
  );
}

/**
 * Helper function to get user avatar URL
 */
export function getUserAvatar(user?: User | null): string {
  if (!user) return '';
  
  return (
    user.avatar_url ||
    user.avatar ||
    user.user_metadata?.avatar ||
    '/placeholder-avatar.png'
  );
}

/**
 * Helper function to check if user is an admin
 */
export function isUserAdmin(user?: User | null): boolean {
  if (!user) return false;
  
  return (
    user.role === 'admin' ||
    user.app_metadata?.is_admin === true
  );
}
