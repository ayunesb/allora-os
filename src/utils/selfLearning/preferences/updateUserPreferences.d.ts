import { UserPreferences } from "../types";
/**
 * Update user preferences in the database
 */
export declare function updateUserPreferences(
  userId: string,
  preferences: Partial<UserPreferences>,
): Promise<boolean>;
