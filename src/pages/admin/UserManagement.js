var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { UserManagementHeader, UserTable } from "@/components/admin/users";
import { toast } from "sonner";
import { useUserManagement } from "@/hooks/admin/useUserManagement";
import { Card } from "@/components/ui/card";
import { UserListSkeleton } from "@/components/admin/users/UserListSkeleton";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function UserManagement() {
    const { users, isLoading, loadUsers, updateUser, deleteUser } = useUserManagement();
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
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
            // For this implementation, we'll use a simple mock data
            // In a real implementation, this would fetch from the database
            setTimeout(() => {
                setCompanies([
                    { id: "company-1", name: "Acme Inc." },
                    { id: "company-2", name: "Global Tech" },
                    { id: "company-3", name: "Future Solutions" },
                ]);
                setLoadingCompanies(false);
            }, 500);
        }
        catch (error) {
            console.error("Error fetching companies:", error);
            toast.error("Failed to load companies");
            setLoadingCompanies(false);
        }
    });
    const handleDeleteUser = (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
            deleteUser(userId);
            toast.success("User deleted successfully");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "User Management | Allora AI" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx(UserManagementHeader, { companies: companies, loadingCompanies: loadingCompanies, onUserAdded: loadUsers }), _jsx(Card, { className: `border-white/10 shadow-md ${isMobileView ? "p-2" : ""} bg-[#111827]`, children: isLoading ? (_jsx(UserListSkeleton, {})) : (_jsx(UserTable, { users: users, onUpdateUser: updateUser, onDeleteUser: handleDeleteUser })) })] })] }));
}
