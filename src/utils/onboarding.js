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
import { toast } from "sonner";
/**
 * Create a new tenant and assign the current user as admin
 * @param userId Current user ID
 * @param companyData Company profile data
 * @returns Success status
 */
export function createTenant(userId, companyData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userId) {
            return { success: false, error: "User ID is required" };
        }
        try {
            // First create the tenant
            const { data: tenant, error: tenantError } = yield supabase
                .from("tenants")
                .insert([{ name: companyData.name }])
                .select("id")
                .single();
            if (tenantError)
                throw tenantError;
            const tenantId = tenant.id;
            // Create company profile
            const { error: companyError } = yield supabase
                .from("company_profiles")
                .insert([
                {
                    tenant_id: tenantId,
                    company_name: companyData.name,
                    industry: companyData.industry,
                    website_url: companyData.website_url,
                    target_customer: companyData.target_customer,
                },
            ]);
            if (companyError)
                throw companyError;
            // Associate user with tenant
            const { error: userTenantError } = yield supabase
                .from("tenant_users")
                .insert([
                {
                    tenant_id: tenantId,
                    user_id: userId,
                    role: "admin",
                },
            ]);
            if (userTenantError)
                throw userTenantError;
            // Update user's profile with tenant ID
            const { error: profileError } = yield supabase
                .from("profiles")
                .update({ tenant_id: tenantId, onboarding_complete: true })
                .eq("id", userId);
            if (profileError)
                throw profileError;
            return { success: true, tenantId };
        }
        catch (error) {
            console.error("Error creating tenant:", error);
            return {
                success: false,
                error: error instanceof Error
                    ? error.message
                    : "Unknown error creating tenant",
            };
        }
    });
}
/**
 * Check if onboarding is complete for a user
 * @param userId The user ID to check
 */
export function checkOnboardingStatus(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("onboarding_complete")
                .eq("id", userId)
                .single();
            if (error)
                throw error;
            return !!(data === null || data === void 0 ? void 0 : data.onboarding_complete);
        }
        catch (error) {
            console.error("Error checking onboarding status:", error);
            return false;
        }
    });
}
/**
 * Complete the onboarding process
 */
export function completeOnboarding(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            // Create tenant and company profile
            const result = yield createTenant(userId, {
                name: data.companyName,
                industry: data.industry,
                website_url: data.website || ((_a = data.companyDetails) === null || _a === void 0 ? void 0 : _a.website_url),
                target_customer: (_b = data.companyDetails) === null || _b === void 0 ? void 0 : _b.target_customer,
                risk_appetite: data.riskAppetite,
                goals: data.goals,
            });
            if (!result.success) {
                toast.error("Failed to complete onboarding", {
                    description: result.error || "Please try again",
                });
                return false;
            }
            toast.success("Onboarding completed successfully!");
            return true;
        }
        catch (error) {
            console.error("Error completing onboarding:", error);
            toast.error("Failed to complete onboarding");
            return false;
        }
    });
}
// Recreate the function that was missing and caused the build errors
export function saveOnboardingInfo(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!userId) {
                console.error("No user ID provided for saving onboarding info");
                return false;
            }
            const { error } = yield supabase
                .from("profiles")
                .update(Object.assign({ onboarding_step: data.step, industry: data.industry }, data))
                .eq("id", userId);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error("Error saving onboarding info:", error);
            return false;
        }
    });
}
