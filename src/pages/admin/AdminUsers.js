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
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { UserManagementHeader, UserTable } from "@/components/admin/users";
import { EntityListSkeleton } from "@/components/admin/EntityListSkeleton";
import { toast } from "sonner";
import { useUserManagement } from "@/hooks/admin/useUserManagement";
export default function AdminUsers() {
    const { users, isLoading, loadUsers, updateUser, deleteUser } = useUserManagement();
    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);
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
    const handleUserAdded = () => {
        toast.success("User added successfully");
        loadUsers();
    };
    const handleUpdateUser = (userId, updates) => {
        updateUser(userId, updates);
        toast.success("User updated");
    };
    const handleDeleteUser = (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
            deleteUser(userId);
            toast.success("User deleted");
        }
    };
    if (isLoading || loadingCompanies) {
        return _jsx(EntityListSkeleton, {});
    }
    return (_jsx(PageErrorBoundary, { pageName: "User Management", children: _jsxs("div", { className: "space-y-6", children: [_jsx(UserManagementHeader, { companies: companies, loadingCompanies: loadingCompanies, onUserAdded: handleUserAdded }), _jsx(UserTable, { users: users, isLoading: isLoading, onUpdateUser: handleUpdateUser, onDeleteUser: handleDeleteUser })] }) }));
}
