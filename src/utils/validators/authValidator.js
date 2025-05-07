var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
/**
 * Validates authentication system
 */
export function validateUserAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if authentication is properly configured
            const { data, error } = yield supabase.auth.getSession();
            if (error) {
                return {
                    valid: false,
                    message: `Authentication error: ${error.message}`,
                };
            }
            // This just validates that the auth API is working, not whether a user is logged in
            return {
                valid: true,
                message: "Authentication system is properly configured.",
            };
        }
        catch (error) {
            return {
                valid: false,
                message: "Error validating authentication: " +
                    (error instanceof Error ? error.message : String(error)),
            };
        }
    });
}
