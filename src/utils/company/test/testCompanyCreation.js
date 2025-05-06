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
 * Creates a test company for the given user
 */
export function createTestCompany(userId, userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a company name based on the user's email
            const emailPrefix = userEmail.split("@")[0];
            const companyName = `Test Company - ${emailPrefix}`;
            // Insert the new company
            const { data, error } = yield supabase
                .from("companies")
                .insert([
                {
                    name: companyName,
                    industry: "Technology",
                    details: {
                        founded: new Date().getFullYear(),
                        size: "small",
                        description: "A test company for development purposes",
                        created_for_user: userId,
                    },
                },
            ])
                .select()
                .single();
            if (error) {
                return {
                    success: false,
                    message: `Failed to create test company: ${error.message}`,
                    errorCode: error.code,
                };
            }
            return {
                success: true,
                message: `Test company "${companyName}" created successfully`,
                companyId: data.id,
                companyName: data.name,
                data: data,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Error creating test company: ${error.message}`,
                error: error.message,
            };
        }
    });
}
