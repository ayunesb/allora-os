var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function useCompanyManagement() {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadCompanies = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            setCompanies(data || []);
        }
        catch (error) {
            console.error("Error loading companies:", error);
            toast.error(`Failed to load companies: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    const updateCompany = useCallback((companyId, data) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { error } = yield supabase
                .from("companies")
                .update(data)
                .eq("id", companyId);
            if (error) {
                throw error;
            }
            toast.success("Company updated successfully");
            yield loadCompanies();
            return true;
        }
        catch (error) {
            console.error("Error updating company:", error);
            toast.error(`Failed to update company: ${error.message}`);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [loadCompanies]);
    const deleteCompany = useCallback((companyId) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { error } = yield supabase
                .from("companies")
                .delete()
                .eq("id", companyId);
            if (error) {
                throw error;
            }
            toast.success("Company deleted successfully");
            yield loadCompanies();
            return true;
        }
        catch (error) {
            console.error("Error deleting company:", error);
            toast.error(`Failed to delete company: ${error.message}`);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [loadCompanies]);
    return {
        companies,
        isLoading,
        loadCompanies,
        updateCompany,
        deleteCompany,
    };
}
