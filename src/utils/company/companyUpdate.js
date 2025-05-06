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
 * Updates or creates a company record with detailed information
 */
export function updateCompanyDetails(userId, companyDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Starting company update process for user:", userId);
            console.log("Company details:", companyDetails);
            // First, check if the user already has a company
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("company_id, company")
                .eq("id", userId)
                .single();
            if (profileError && profileError.code !== "PGRST116") {
                console.error("Error fetching profile:", profileError);
                throw profileError;
            }
            let companyId = profile === null || profile === void 0 ? void 0 : profile.company_id;
            console.log("User company_id:", companyId);
            const extraDetails = Object.assign({ description: companyDetails.description, mission: companyDetails.mission, vision: companyDetails.vision, headquarters: companyDetails.headquarters, phone: companyDetails.phone, website: companyDetails.website, email: companyDetails.email, businessModel: companyDetails.businessModel, marketInfo: companyDetails.marketInfo, products: companyDetails.products, team: companyDetails.team, financials: companyDetails.financials, techStack: companyDetails.techStack, legalEntity: companyDetails.legalEntity, stage: companyDetails.stage }, companyDetails.additionalDetails);
            // If user has a company, update it
            if (companyId) {
                console.log("Updating existing company:", companyId);
                const { error: updateError } = yield supabase
                    .from("companies")
                    .update({
                    name: companyDetails.name,
                    industry: companyDetails.industry,
                    details: extraDetails,
                })
                    .eq("id", companyId);
                if (updateError) {
                    console.error("Company update error:", updateError);
                    throw updateError;
                }
                console.log("Company updated successfully");
                // Update the profile with company name and industry
                const { error: profileUpdateError } = yield supabase
                    .from("profiles")
                    .update({
                    company: companyDetails.name,
                    industry: companyDetails.industry,
                })
                    .eq("id", userId);
                if (profileUpdateError) {
                    console.error("Profile update error:", profileUpdateError);
                    throw profileUpdateError;
                }
                console.log("User profile updated successfully");
                return { success: true, companyId };
            }
            // Create new company if user doesn't have one
            console.log("Creating new company for user:", userId);
            const { data: companyData, error: companyError } = yield supabase
                .from("companies")
                .insert([
                {
                    name: companyDetails.name,
                    industry: companyDetails.industry,
                    details: extraDetails,
                },
            ])
                .select("id")
                .single();
            if (companyError) {
                console.error("Company creation error:", companyError);
                throw companyError;
            }
            companyId = companyData.id;
            console.log("New company created with ID:", companyId);
            // Update the user profile with company_id and set as admin
            const { error: profileUpdateError } = yield supabase
                .from("profiles")
                .update({
                company: companyDetails.name,
                industry: companyDetails.industry,
                company_id: companyId,
                role: "admin",
            })
                .eq("id", userId);
            if (profileUpdateError) {
                console.error("Profile update error:", profileUpdateError);
                throw profileUpdateError;
            }
            console.log("User profile updated with new company ID");
            return { success: true, companyId };
        }
        catch (error) {
            console.error(`Failed to update company details:`, error);
            return {
                success: false,
                error: error.message ||
                    "An unexpected error occurred updating company details",
            };
        }
    });
}
