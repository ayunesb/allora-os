var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
/**
 * Fetches all users belonging to a specific company
 * @param companyId The company ID to fetch users for
 * @returns Array of User objects
 */
export function fetchCompanyUsers(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("id, name, company, company_id, role, created_at")
                .eq("company_id", companyId)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            return (data || []).map((profile) => (Object.assign(Object.assign({}, profile), { email: "", role: profile.role })));
        }
        catch (error) {
            console.error("Error fetching company users:", error.message);
            return [];
        }
    });
}
/**
 * Helper function to lookup a user by email and handle errors properly
 * @param email User email to lookup
 * @returns User ID or null if not found
 */
export function getUserIdByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Can't directly query auth.users table, so we need a different approach
            // Use the auth API to get user information by email
            const response = yield fetch(`${window.location.origin}/api/get-user-by-email?email=${encodeURIComponent(email)}`);
            const data = yield response.json();
            if (!data.success || !data.userId) {
                console.error("Error finding user by email:", data.error);
                return null;
            }
            return data.userId;
        }
        catch (error) {
            console.error("Unexpected error looking up user by email:", error);
            return null;
        }
    });
}
/**
 * Gets user profile by email with proper error handling and type safety
 * @param email User email to lookup
 * @returns User profile or null if not found
 */
export function getUserProfileByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = yield getUserIdByEmail(email);
            if (!userId) {
                console.error(`No user found with email: ${email}`);
                return null;
            }
            // Explicitly select fields without 'email' since it doesn't exist in the profiles table
            const { data: profileData, error: profileError } = yield supabase
                .from("profiles")
                .select("id, name, company, company_id, role, created_at")
                .eq("id", userId)
                .single();
            if (profileError) {
                console.error("Error finding user profile:", profileError);
                return null;
            }
            // Check if we have valid profile data before continuing
            if (!profileData) {
                return null;
            }
            // Create a User object with the profile data and add the email
            return {
                id: profileData.id,
                name: profileData.name,
                company_id: profileData.company_id,
                role: profileData.role,
                created_at: profileData.created_at,
                email: email, // Add the email from the parameter
            };
        }
        catch (error) {
            console.error("Unexpected error in getUserProfileByEmail:", error);
            return null;
        }
    });
}
