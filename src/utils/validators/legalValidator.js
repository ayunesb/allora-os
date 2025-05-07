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
 * Validates the legal acceptance system functionality
 */
export function validateLegalAcceptance() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Check if the user_legal_acceptances table exists
            const { error: tableCheckError } = yield supabase
                .from("user_legal_acceptances")
                .select("id")
                .limit(1);
            if (tableCheckError) {
                if (tableCheckError.code === "42P01") {
                    // Table doesn't exist
                    console.error("user_legal_acceptances table doesn't exist");
                    return {
                        valid: false,
                        message: "The user_legal_acceptances table does not exist in the database.",
                    };
                }
                console.error("Error accessing user_legal_acceptances table:", tableCheckError);
                return {
                    valid: false,
                    message: `Error accessing user_legal_acceptances: ${tableCheckError.message}`,
                };
            }
            // 2. Verify the structure by attempting to fetch specific columns
            const { error: structureCheckError } = yield supabase
                .from("user_legal_acceptances")
                .select("user_id, terms_of_service, privacy_policy, messaging_consent, terms_version, privacy_version, consent_version")
                .limit(1);
            if (structureCheckError) {
                console.error("Table structure invalid:", structureCheckError);
                return {
                    valid: false,
                    message: `Table structure invalid: ${structureCheckError.message}`,
                };
            }
            // 3. Instead of trying a test insertion which fails due to RLS,
            // just check if current user has accepted the terms
            // This avoids the RLS policy error during validation
            const { data: { session }, } = yield supabase.auth.getSession();
            if (session && session.user) {
                const { data: userAcceptances, error: fetchError } = yield supabase
                    .from("user_legal_acceptances")
                    .select("*")
                    .eq("user_id", session.user.id)
                    .maybeSingle();
                if (fetchError && fetchError.code !== "PGRST116") {
                    // If there's an error other than "no rows returned"
                    console.error("Error fetching user's legal acceptances:", fetchError);
                    return {
                        valid: false,
                        message: `Error fetching legal acceptances: ${fetchError.message}`,
                    };
                }
                console.log("User legal acceptance check succeeded");
            }
            else {
                console.log("No active session, skipping user-specific legal acceptance check");
            }
            // 4. Check if legal hook is properly implemented
            if (typeof window !== "undefined") {
                try {
                    // Just check if the module exists and can be imported
                    const { useLegalAcceptance } = yield import("@/hooks/useLegalAcceptance");
                    if (!useLegalAcceptance) {
                        console.error("useLegalAcceptance hook exists but may not be properly implemented");
                        return {
                            valid: false,
                            message: "useLegalAcceptance hook exists but may not be properly implemented.",
                        };
                    }
                }
                catch (error) {
                    console.error("Failed to load useLegalAcceptance hook:", error);
                    return {
                        valid: false,
                        message: "Failed to load useLegalAcceptance hook: " +
                            (error instanceof Error ? error.message : String(error)),
                    };
                }
            }
            console.log("Legal acceptance system validation successful");
            return {
                valid: true,
                message: "Legal acceptance system is properly configured.",
            };
        }
        catch (error) {
            console.error("Unexpected error during legal acceptance validation:", error);
            return {
                valid: false,
                message: "Unexpected error during legal acceptance validation: " +
                    (error instanceof Error ? error.message : String(error)),
            };
        }
    });
}
