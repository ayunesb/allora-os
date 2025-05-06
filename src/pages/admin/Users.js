var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserManagementHeader } from "@/components/admin/users/UserManagementHeader";
import { UserListSkeleton } from "@/components/admin/users/UserListSkeleton";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import useAdminFunctions from "@/hooks/useAdminFunctions";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function AdminUsers() {
    const { users, loadUsers, isLoading, updateUser, deleteUser } = useAdminFunctions();
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    useEffect(() => {
        // Load users when component mounts
        loadUsers();
        fetchCompanies();
    }, [loadUsers]);
    const fetchCompanies = () => __awaiter(this, void 0, void 0, function* () {
        setLoadingCompanies(true);
        try {
            const { data, error } = yield supabase
                .from("companies")
                .select("id, name")
                .order("name");
            if (error)
                throw error;
            setCompanies(data || []);
        }
        catch (error) {
            console.error("Error fetching companies:", error);
            toast.error("Failed to load companies");
        }
        finally {
            setLoadingCompanies(false);
        }
    });
    const handleDeleteUser = (userId, userName) => {
        // Create a dialog confirming the deletion
        if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
            deleteUser(userId);
            toast.success("User deleted successfully");
        }
    };
    return (_jsxs("div", { className: "animate-fadeIn", children: [_jsx(UserManagementHeader, { companies: companies, loadingCompanies: loadingCompanies, onUserAdded: loadUsers }), _jsxs(Card, { className: `border-white/10 shadow-md ${isMobileView ? "p-2" : ""} bg-[#111827]`, children: [_jsx(CardHeader, { className: `${isMobileView ? "px-3 py-3 pb-1" : "pb-2"}`, children: _jsx(CardTitle, { className: `${isMobileView ? "text-lg" : ""} text-white`, children: "User Accounts" }) }), _jsx(CardContent, { className: isMobileView ? "p-3" : "", children: isLoading ? (_jsx(UserListSkeleton, {})) : (_jsx(UserTable, { users: users, onUpdateUser: updateUser, onDeleteUser: handleDeleteUser })) })] })] }));
}
