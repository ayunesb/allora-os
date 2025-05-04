import { User } from '@/types/fixed/User';
import { AuthContextProps } from '@/types/fixed/Auth';
/**
 * Creates a compatibility layer for authentication context
 * This ensures backwards compatibility with different auth implementations
 */
export declare function createAuthCompatibilityLayer(authContext: any): AuthContextProps;
/**
 * Normalizes a user object from various potential sources to ensure it matches
 * the User interface required by the application.
 */
export declare function normalizeUserObject(userObject: any): User | null;
/**
 * Gets the display name for a user
 */
export declare function getUserDisplayName(user: User | null): string;
/**
 * Gets the avatar URL for a user
 */
export declare function getUserAvatar(user: User | null): string;
/**
 * Normalizes a webhook event from different potential sources
 */
export declare function normalizeWebhookEvent(event: any): any;
/**
 * Normalizes an executive message from different potential sources
 */
export declare function normalizeExecutiveMessage(message: any): any;
