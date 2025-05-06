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
import { setupCompanyIntegrations } from "@/utils/masterAccountIntegrations";
/**
 * Saves onboarding information for a user and sets up external service integrations
 */
export function saveOnboardingInfo(userId, companyName, industry, goals, companyDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!userId) {
                throw new Error("User ID is required");
            }
            if (!companyName || companyName.trim().length < 2) {
                throw new Error("Company name is required and must be at least 2 characters");
            }
            if (!industry) {
                throw new Error("Industry is required");
            }
            if (!goals.length) {
                throw new Error("At least one business goal must be selected");
            }
            console.log("Saving onboarding info:", {
                userId,
                companyName,
                industry,
                goals,
            });
            console.log("Company details:", companyDetails);
            // First, get the authenticated user's session
            const { data: { session }, } = yield supabase.auth.getSession();
            if (!session) {
                throw new Error("No active session found. Please log in again.");
            }
            // Get the user's email for integrations
            const userEmail = session.user.email;
            if (!userEmail) {
                throw new Error("User email is required for account setup.");
            }
            // Check if the user already has a company_id in their profile
            const { data: profileData, error: profileCheckError } = yield supabase
                .from("profiles")
                .select("company_id, company")
                .eq("id", userId)
                .maybeSingle();
            if (profileCheckError && profileCheckError.code !== "PGRST116") {
                console.error("Profile check error:", profileCheckError);
                throw new Error(`Failed to check user profile: ${profileCheckError.message}`);
            }
            let companyId = null;
            // If user already has a company, update it instead of creating a new one
            if (profileData === null || profileData === void 0 ? void 0 : profileData.company_id) {
                console.log("User already has a company, updating existing company:", profileData.company_id);
                // Add communication preferences and executive team enabled to company details
                const enhancedDetails = Object.assign(Object.assign({}, (companyDetails || {})), { goals: goals, communication_preferences: {
                        whatsapp_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.whatsAppEnabled) !== false,
                        email_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.emailEnabled) !== false,
                    }, executive_team_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.executiveTeamEnabled) !== false });
                const { error: updateError } = yield supabase
                    .from("companies")
                    .update({
                    name: companyName,
                    industry: industry,
                    details: enhancedDetails,
                })
                    .eq("id", profileData.company_id);
                if (updateError) {
                    console.error("Company update error:", updateError);
                    throw new Error(`Failed to update company: ${updateError.message}`);
                }
                companyId = profileData.company_id;
            }
            else {
                // Create a new company with the detailed information
                // Include communication preferences and goals
                const enhancedDetails = Object.assign(Object.assign({}, (companyDetails || {})), { goals: goals, communication_preferences: {
                        whatsapp_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.whatsAppEnabled) !== false,
                        email_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.emailEnabled) !== false,
                    }, executive_team_enabled: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.executiveTeamEnabled) !== false });
                const { data: newCompany, error: createError } = yield supabase
                    .from("companies")
                    .insert([
                    {
                        name: companyName,
                        industry: industry,
                        details: enhancedDetails,
                    },
                ])
                    .select("id")
                    .single();
                if (createError) {
                    console.error("Company creation error:", createError);
                    // If there's an RLS error or permission issue, fall back to just setting the profile
                    if (createError.code === "42501" ||
                        ((_a = createError.message) === null || _a === void 0 ? void 0 : _a.includes("permission"))) {
                        console.log("Falling back to profile update only due to permission issue");
                    }
                    else {
                        throw new Error(`Failed to create company: ${createError.message}`);
                    }
                }
                else if (newCompany) {
                    companyId = newCompany.id;
                    console.log("Created new company with ID:", companyId);
                }
            }
            // Update the user's profile with company name, industry, and optionally company_id
            const updateData = {
                company: companyName,
                industry: industry,
                role: "admin",
            };
            // Only add company_id if we successfully created or updated a company
            if (companyId) {
                updateData.company_id = companyId;
                // Set up external service integrations for the company
                console.log("Setting up integrations for company:", companyId);
                try {
                    const integrationResult = yield setupCompanyIntegrations(companyId, companyName, industry, userEmail);
                    if (!integrationResult.success) {
                        console.warn("Warning: Failed to set up some integrations:", integrationResult.error);
                        // Continue with onboarding even if some integrations fail
                    }
                    else {
                        console.log("Integration setup successful");
                    }
                }
                catch (error) {
                    // Don't fail the whole process if integration setup fails
                    console.warn("Error setting up integrations:", error);
                }
            }
            const { error: profileUpdateError } = yield supabase
                .from("profiles")
                .update(updateData)
                .eq("id", userId);
            if (profileUpdateError) {
                console.error("Profile update error:", profileUpdateError);
                throw new Error(`Failed to update profile: ${profileUpdateError.message}`);
            }
            // Store the business goals (in a real app, you would create a goals table)
            console.log("Company goals would be stored:", goals);
            console.log("Onboarding completed successfully!");
            return { success: true };
        }
        catch (error) {
            console.error("Error in saveOnboardingInfo:", error);
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
