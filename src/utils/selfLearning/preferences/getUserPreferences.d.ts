import { UserPreferences } from "@/hooks/useUserPreferences";
/**
 * Gets the preferences for a specific user
 * @param userId The ID of the user to fetch preferences for
 * @returns The user's preferences or default preferences if none found
 */
export declare function getUserPreferences(
  userId: string,
): Promise<UserPreferences>;
