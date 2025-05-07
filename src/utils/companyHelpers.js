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
import { toast } from "sonner";
export function fetchCompany(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("*")
                .eq("id", companyId)
                .single();
            if (error) {
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error("Error fetching company:", error.message);
            return null;
        }
    });
}
export function fetchUserCompany(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("company_id")
                .eq("id", userId)
                .single();
            if (profileError || !profile.company_id) {
                return null;
            }
            return yield fetchCompany(profile.company_id);
        }
        catch (error) {
            console.error("Error fetching user company:", error.message);
            return null;
        }
    });
}
export function updateCompany(companyId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("companies")
                .update(updates)
                .eq("id", companyId);
            if (error) {
                throw error;
            }
            toast.success("Company updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update company: ${error.message}`);
            return false;
        }
    });
}
