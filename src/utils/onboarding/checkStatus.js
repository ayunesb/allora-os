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
 * Checks if the user has completed onboarding
 */
export function checkOnboardingStatus(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }
            console.log("Checking onboarding status for user:", userId);
            // Get the user's profile
            const { data: profileData, error: profileError } = yield supabase
                .from("profiles")
                .select("onboarding_completed, company_id")
                .eq("id", userId)
                .single();
            if (profileError) {
                console.error("Error checking onboarding status:", profileError);
                throw profileError;
            }
            // Check if onboarding is completed
            if (profileData === null || profileData === void 0 ? void 0 : profileData.onboarding_completed) {
                console.log("Onboarding completed flag is true");
                return true;
            }
            // If the user has a company ID but onboarding is not marked as completed,
            // check the company record as well
            if (profileData === null || profileData === void 0 ? void 0 : profileData.company_id) {
                console.log("User has company ID, checking company details");
                const { data: companyData, error: companyError } = yield supabase
                    .from("companies")
                    .select("details")
                    .eq("id", profileData.company_id)
                    .single();
                if (companyError) {
                    console.error("Error checking company details:", companyError);
                    // Don't throw error here, just continue to default return
                    console.log("Continuing with default onboarding status");
                }
                else {
                    // Check if onboarding is completed in company details
                    if ((_a = companyData === null || companyData === void 0 ? void 0 : companyData.details) === null || _a === void 0 ? void 0 : _a.onboarding_completed) {
                        console.log("Company onboarding_completed flag is true");
                        return true;
                    }
                }
            }
            console.log("Onboarding not completed for user:", userId);
            // Onboarding not completed
            return false;
        }
        catch (error) {
            console.error("Error in checkOnboardingStatus:", error);
            // Return false in case of error to ensure user can proceed with onboarding
            return false;
        }
    });
}
