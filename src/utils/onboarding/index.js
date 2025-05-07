var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Re-export for simplified imports
export * from "./saveOnboarding";
export * from "./completeOnboarding";
import { supabase } from "@/integrations/supabase/client";
/**
 * Checks if a user has already completed onboarding
 * @param userId The user ID to check
 * @returns Boolean indicating if onboarding is completed
 */
export function checkOnboardingStatus(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!userId)
                return false;
            // First, check the profile table for the onboarding_completed flag
            const { data: profileData, error: profileError } = yield supabase
                .from("profiles")
                .select("onboarding_completed, company_id")
                .eq("id", userId)
                .single();
            if (profileError) {
                console.error("Error checking profile onboarding status:", profileError);
                return false;
            }
            // If the profile has the onboarding_completed flag set, onboarding is completed
            if ((profileData === null || profileData === void 0 ? void 0 : profileData.onboarding_completed) === true) {
                return true;
            }
            // If the profile has a company_id, check the company's onboarding status
            if (profileData === null || profileData === void 0 ? void 0 : profileData.company_id) {
                const { data: companyData, error: companyError } = yield supabase
                    .from("companies")
                    .select("details")
                    .eq("id", profileData.company_id)
                    .single();
                if (companyError) {
                    console.error("Error checking company onboarding status:", companyError);
                    return false;
                }
                // Check if the company has the onboarding_completed flag in its details
                if (((_a = companyData === null || companyData === void 0 ? void 0 : companyData.details) === null || _a === void 0 ? void 0 : _a.onboarding_completed) === true) {
                    return true;
                }
            }
            // If we got here, onboarding is not completed
            return false;
        }
        catch (error) {
            console.error("Error in checkOnboardingStatus:", error);
            return false;
        }
    });
}
