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
import { toast } from "sonner";
/**
 * Removes a user from a company by updating their company_id to null
 * @param userId The ID of the user to remove
 * @returns Boolean indicating success
 */
export function removeUserFromCompany(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("profiles")
                .update({ company_id: null })
                .eq("id", userId);
            if (error) {
                throw error;
            }
            toast.success("User removed from company");
            return true;
        }
        catch (error) {
            console.error("Error removing user from company:", error.message);
            toast.error(`Failed to remove user: ${error.message}`);
            return false;
        }
    });
}
/**
 * Invites a user to join a company and assigns them a role (DEPRECATED)
 * This is a legacy function that is maintained for backward compatibility.
 * For new code, use the inviteUserToCompany function from invitations.ts instead.
 *
 * @deprecated Use inviteUserToCompany from invitations.ts instead
 * @param userEmail The email of the user to invite
 * @param companyId The company ID to assign the user to
 * @param role The role to assign to the user
 * @returns Boolean indicating success
 */
export function assignUserToCompany(userEmail_1, companyId_1) {
    return __awaiter(this, arguments, void 0, function* (userEmail, companyId, role = "user") {
        try {
            // This is a simplified version for the demo
            // In production, you would send an email invitation
            const { data: userData, error: userError } = yield supabase
                .from("profiles")
                .select("id")
                .eq("email", userEmail)
                .single();
            if (userError) {
                if (userError.code === "PGRST116") {
                    toast.error(`User with email ${userEmail} not found`);
                }
                else {
                    toast.error(`Error finding user: ${userError.message}`);
                }
                return false;
            }
            const { error: updateError } = yield supabase
                .from("profiles")
                .update({
                company_id: companyId,
                role,
            })
                .eq("id", userData.id);
            if (updateError) {
                toast.error(`Failed to update user: ${updateError.message}`);
                return false;
            }
            toast.success("User successfully added to company");
            return true;
        }
        catch (error) {
            console.error("Error inviting user to company:", error);
            toast.error(`Failed to invite user: ${error.message}`);
            return false;
        }
    });
}
