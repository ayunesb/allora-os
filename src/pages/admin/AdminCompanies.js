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
import { CompanyHeader, CompanyTable, CreateCompanyDialog, } from "@/components/admin/companies";
import { EntityListSkeleton } from "@/components/admin/EntityListSkeleton";
import { useCompanyManagement } from "@/hooks/admin/useCompanyManagement";
import { toast } from "sonner";
export default function AdminCompanies() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { companies, isLoading, loadCompanies, updateCompany, deleteCompany } = useCompanyManagement();
    useEffect(() => {
        loadCompanies();
    }, [loadCompanies]);
    const handleViewUsers = (companyId) => {
        // In a real implementation, this would navigate to a filtered users view
        console.log("View users for company:", companyId);
        toast.info(`Viewing users for company ${companyId}`);
    };
    const handleCreateCompany = (companyData) => __awaiter(this, void 0, void 0, function* () {
        try {
            // In a real implementation, this would call an API to create the company
            console.log("Create company:", companyData);
            toast.success("Company created successfully");
            setIsCreateDialogOpen(false);
            loadCompanies();
            return Promise.resolve();
        }
        catch (error) {
            toast.error("Failed to create company");
            return Promise.reject(error);
        }
    });
    const handleEditCompany = (company) => {
        console.log("Edit company:", company);
        toast.info(`Editing company ${company.name}`);
    };
    const handleDeleteCompany = (companyId) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            deleteCompany(companyId);
            toast.success("Company deleted successfully");
        }
    };
    if (isLoading) {
        return _jsx(EntityListSkeleton, {});
    }
    return (_jsx(PageErrorBoundary, { pageName: "Company Management", children: _jsxs("div", { className: "space-y-6", children: [_jsx(CompanyHeader, { onAddCompanyClick: () => setIsCreateDialogOpen(true) }), _jsx(CompanyTable, { companies: companies, isLoading: isLoading, onViewUsers: handleViewUsers, onEditCompany: handleEditCompany, onDeleteCompany: handleDeleteCompany }), _jsx(CreateCompanyDialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, onCreateCompany: handleCreateCompany })] }) }));
}
