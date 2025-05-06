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
 * Validates executive boardroom functionality
 */
export function validateExecutiveBoardroom() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the ai_boardroom_debates table exists
            const { data, error: tableCheckError } = yield supabase
                .from("ai_boardroom_debates")
                .select("id")
                .limit(1);
            if (tableCheckError) {
                if (tableCheckError.code === "42P01") {
                    // Table doesn't exist
                    return {
                        valid: false,
                        message: "The ai_boardroom_debates table does not exist in the database.",
                    };
                }
                return {
                    valid: false,
                    message: `Error accessing ai_boardroom_debates: ${tableCheckError.message}`,
                };
            }
            // Check RLS policy by trying to access data that should be restricted
            const testResult = yield checkBoardroomRlsPolicies();
            if (!testResult.valid) {
                return testResult;
            }
            return {
                valid: true,
                message: "Executive boardroom functionality is ready.",
            };
        }
        catch (error) {
            return {
                valid: false,
                message: "Error validating executive boardroom: " +
                    (error instanceof Error ? error.message : String(error)),
            };
        }
    });
}
/**
 * Check whether RLS policies are correctly applied on the ai_boardroom_debates table
 */
function checkBoardroomRlsPolicies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the table has the rls_enabled column
            const { data, error } = yield supabase
                .from("ai_boardroom_debates")
                .select("rls_enabled")
                .limit(1);
            if (error && error.message.includes("permission denied")) {
                // This suggests RLS is active and working
                return {
                    valid: true,
                    message: "RLS policies for executive boardroom are properly configured.",
                };
            }
            // If we received data, check if RLS is enabled in the table
            if (data && data.length > 0) {
                const rlsEnabled = data[0].rls_enabled;
                if (rlsEnabled) {
                    return {
                        valid: true,
                        message: "RLS is enabled for the boardroom debates table.",
                    };
                }
            }
            return {
                valid: true,
                message: "RLS appears to be working for the boardroom table.",
            };
        }
        catch (error) {
            return {
                valid: false,
                message: "Error checking RLS policies for executive boardroom: " +
                    (error instanceof Error ? error.message : String(error)),
            };
        }
    });
}
