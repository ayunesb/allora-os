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
import { saveCompanyInfo } from "./profileHelpers";
export function updateCompanyDetails(userId, details) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Updating company details for user:", userId);
            // First, get the user's profile to check if they have a company_id
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("company_id, company, industry")
                .eq("id", userId)
                .single();
            if (profileError) {
                console.error("Error fetching profile:", profileError);
                return { success: false, error: "Failed to fetch user profile" };
            }
            // If the user doesn't have a company_id, create one
            if (!profile.company_id) {
                console.log("User has no company, creating one:", details.name);
                const created = yield saveCompanyInfo(userId, details.name, details.industry);
                if (!created) {
                    return { success: false, error: "Failed to create company" };
                }
                // Fetch the profile again to get the new company_id
                const { data: updatedProfile, error: updateProfileError } = yield supabase
                    .from("profiles")
                    .select("company_id")
                    .eq("id", userId)
                    .single();
                if (updateProfileError || !updatedProfile.company_id) {
                    return {
                        success: false,
                        error: "Failed to get company ID after creation",
                    };
                }
                profile.company_id = updatedProfile.company_id;
            }
            // Update the company information
            const { error: companyError } = yield supabase
                .from("companies")
                .update({
                name: details.name,
                industry: details.industry,
                details: Object.assign({ description: details.description, mission: details.mission, vision: details.vision, headquarters: details.headquarters, phone: details.phone }, details.additionalDetails),
            })
                .eq("id", profile.company_id);
            if (companyError) {
                console.error("Error updating company:", companyError);
                return { success: false, error: "Failed to update company details" };
            }
            // Update the profile company name and industry
            const { error: updateError } = yield supabase
                .from("profiles")
                .update({
                company: details.name,
                industry: details.industry,
            })
                .eq("id", userId);
            if (updateError) {
                console.error("Error updating profile company info:", updateError);
                return {
                    success: false,
                    error: "Failed to update profile company information",
                };
            }
            return { success: true };
        }
        catch (error) {
            console.error("Unexpected error updating company details:", error);
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    });
}
export function fetchCompanyDetails(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("details")
                .eq("id", companyId)
                .single();
            if (error) {
                console.error("Error fetching company details:", error);
                return null;
            }
            return (data === null || data === void 0 ? void 0 : data.details) || {};
        }
        catch (error) {
            console.error("Unexpected error fetching company details:", error);
            return null;
        }
    });
}
