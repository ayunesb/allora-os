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
 * Checks if the test company exists in the database
 */
export function testCompanyExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("id")
                .eq("name", "Test Company")
                .maybeSingle();
            if (error)
                throw error;
            return !!data;
        }
        catch (error) {
            console.error("Error checking test company:", error);
            return false;
        }
    });
}
/**
 * Gets the test company if it exists
 */
export function getTestCompany() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("*")
                .eq("name", "Test Company")
                .maybeSingle();
            if (error) {
                return {
                    success: false,
                    message: `Error fetching test company: ${error.message}`,
                    errorCode: error.code,
                };
            }
            return {
                success: true,
                data: data,
                message: data ? "Test company found" : "No test company found",
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Error fetching test company: ${error.message}`,
                error: error.message,
            };
        }
    });
}
/**
 * Creates a test company in the database if it doesn't exist
 */
export function ensureTestCompanyExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if company already exists
            const exists = yield testCompanyExists();
            if (exists) {
                const { data } = yield supabase
                    .from("companies")
                    .select("*")
                    .eq("name", "Test Company")
                    .maybeSingle();
                return data;
            }
            // Create test company
            const { data, error } = yield supabase
                .from("companies")
                .insert([
                {
                    name: "Test Company",
                    industry: "Technology",
                    details: {
                        founded: 2023,
                        size: "small",
                        description: "A test company for development purposes",
                    },
                },
            ])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error("Error creating test company:", error);
            return null;
        }
    });
}
