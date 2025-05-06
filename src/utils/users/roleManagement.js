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
 * Updates a user's role within the system
 * @param userId The ID of the user to update
 * @param role The new role to assign
 * @returns Boolean indicating success
 */
export function updateUserRole(userId, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("profiles")
                .update({ role })
                .eq("id", userId);
            if (error) {
                throw error;
            }
            toast.success("User role updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update user role: ${error.message}`);
            return false;
        }
    });
}
