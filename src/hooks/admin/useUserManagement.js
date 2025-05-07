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
export function useUserManagement() {
    const [users, setUsers] = useState([]);
    const [companyUsers, setCompanyUsers] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const loadUsers = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("id, name, email, company_id, role, created_at")
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            // Map the profiles data to match our User type structure
            const mappedUsers = (data || []).map((profile) => ({
                id: profile.id,
                name: profile.name || "",
                email: profile.email || "",
                firstName: "",
                lastName: "",
                company_id: profile.company_id,
                role: profile.role || "user",
                created_at: profile.created_at,
                company: "",
                industry: "",
                app_metadata: {},
            }));
            setUsers(mappedUsers);
        }
        catch (error) {
            console.error("Error loading users:", error);
            toast.error(`Failed to load users: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    const loadCompanyUsers = useCallback((companyId) => __awaiter(this, void 0, void 0, function* () {
        if (!companyId)
            return;
        setIsLoading(true);
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("id, name, email, company_id, role, created_at")
                .eq("company_id", companyId)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            // Map the profiles data to match our User type structure
            const mappedUsers = (data || []).map((profile) => ({
                id: profile.id,
                name: profile.name || "",
                email: profile.email || "",
                firstName: "",
                lastName: "",
                company_id: profile.company_id,
                role: profile.role || "user",
                created_at: profile.created_at,
                company: "",
                industry: "",
                app_metadata: {},
            }));
            setCompanyUsers(mappedUsers);
            setSelectedCompany(companyId);
        }
        catch (error) {
            console.error("Error loading company users:", error);
            toast.error(`Failed to load company users: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    const updateUser = useCallback((userId, data) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { error } = yield supabase
                .from("profiles")
                .update(data)
                .eq("id", userId);
            if (error) {
                throw error;
            }
            toast.success("User updated successfully");
            yield loadUsers();
            if (selectedCompany) {
                yield loadCompanyUsers(selectedCompany);
            }
            return true;
        }
        catch (error) {
            console.error("Error updating user:", error);
            toast.error(`Failed to update user: ${error.message}`);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [loadUsers, loadCompanyUsers, selectedCompany]);
    const deleteUser = useCallback((userId) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const { error } = yield supabase
                .from("profiles")
                .delete()
                .eq("id", userId);
            if (error) {
                throw error;
            }
            toast.success("User deleted successfully");
            yield loadUsers();
            if (selectedCompany) {
                yield loadCompanyUsers(selectedCompany);
            }
            return true;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            toast.error(`Failed to delete user: ${error.message}`);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [loadUsers, loadCompanyUsers, selectedCompany]);
    return {
        users,
        companyUsers,
        selectedCompany,
        isLoading,
        loadUsers,
        loadCompanyUsers,
        updateUser,
        deleteUser,
        setSelectedCompany,
    };
}
