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
 * Deletes a user account and all associated data
 * This is a destructive action that cannot be undone
 */
export function deleteUserAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Starting account deletion process");
            // Call the Supabase Edge Function that will handle the deletion with admin privileges
            const { data, error } = yield supabase.functions.invoke("delete-account", {
                method: "POST",
            });
            if (error) {
                console.error("Error calling delete-account function:", error);
                throw new Error(error.message || "Failed to delete account");
            }
            if (!data.success) {
                throw new Error(data.error || "Failed to delete account");
            }
            // If the deletion was only partial (auth record not deleted), return partial success
            if (data.partial) {
                return {
                    success: true,
                    error: data.error,
                };
            }
            return { success: true };
        }
        catch (error) {
            console.error("Account deletion failed:", error);
            return {
                success: false,
                error: error.message || "An unexpected error occurred during account deletion",
            };
        }
    });
}
