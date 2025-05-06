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
import { getTestCompany } from "./testCompanyQueries";
import { createTestCompany } from "./testCompanyCreation";
/**
 * Sets up a test company for the given user email
 */
export function runTestCompanySetup(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate email
            if (!userEmail || !userEmail.includes("@")) {
                return {
                    success: false,
                    message: "Invalid email address provided",
                    errorCode: "VALIDATION_ERROR",
                };
            }
            // Get user profile
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("*")
                .eq("email", userEmail)
                .maybeSingle();
            if (profileError) {
                return {
                    success: false,
                    message: `Error fetching user profile: ${profileError.message}`,
                    errorCode: profileError.code,
                };
            }
            if (!profile) {
                return {
                    success: false,
                    message: "User profile not found",
                    errorCode: "USER_NOT_FOUND",
                };
            }
            // Check if test company already exists
            const existingCompanyResult = yield getTestCompany();
            if (existingCompanyResult.success && existingCompanyResult.data) {
                // Company exists, associate with user
                const { error: updateError } = yield supabase
                    .from("profiles")
                    .update({ company_id: existingCompanyResult.data.id })
                    .eq("id", profile.id);
                if (updateError) {
                    return {
                        success: false,
                        message: `Test company exists but failed to associate with user: ${updateError.message}`,
                        errorCode: updateError.code,
                    };
                }
                return {
                    success: true,
                    message: "Test company already exists",
                    companyId: existingCompanyResult.data.id,
                    companyName: existingCompanyResult.data.name,
                };
            }
            // Create new test company
            const newCompanyResult = yield createTestCompany(profile.id, userEmail);
            if (!newCompanyResult.success) {
                return newCompanyResult;
            }
            // Associate user with new company
            const { error: updateError } = yield supabase
                .from("profiles")
                .update({ company_id: newCompanyResult.companyId })
                .eq("id", profile.id);
            if (updateError) {
                return {
                    success: false,
                    message: `Created company but failed to associate with user: ${updateError.message}`,
                    companyId: newCompanyResult.companyId,
                    companyName: newCompanyResult.companyName,
                    errorCode: "PROFILE_UPDATE_ERROR",
                };
            }
            return {
                success: true,
                message: `Test company "${newCompanyResult.companyName}" created and associated with user`,
                companyId: newCompanyResult.companyId,
                companyName: newCompanyResult.companyName,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Error in test company setup: ${error.message}`,
                error: error.message,
            };
        }
    });
}
