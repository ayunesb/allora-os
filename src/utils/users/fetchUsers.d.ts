import { User } from "@/models/user";
/**
 * Fetches all users belonging to a specific company
 * @param companyId The company ID to fetch users for
 * @returns Array of User objects
 */
export declare function fetchCompanyUsers(companyId: string): Promise<User[]>;
/**
 * Helper function to lookup a user by email and handle errors properly
 * @param email User email to lookup
 * @returns User ID or null if not found
 */
export declare function getUserIdByEmail(email: string): Promise<string | null>;
/**
 * Gets user profile by email with proper error handling and type safety
 * @param email User email to lookup
 * @returns User profile or null if not found
 */
export declare function getUserProfileByEmail(
  email: string,
): Promise<User | null>;
