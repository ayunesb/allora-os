import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CompanyHeader, CompanyTable } from "@/components/admin/companies";
export default function CompaniesPage() {
    // Update the company data to match the required model.Company type
    const [companies, setCompanies] = useState([
        {
            id: "company-1",
            name: "Acme Inc.",
            industry: "Technology",
            created_at: "2025-01-15",
        },
        {
            id: "company-2",
            name: "Global Tech",
            industry: "Manufacturing",
            created_at: "2025-02-20",
        },
        {
            id: "company-3",
            name: "Future Solutions",
            industry: "Healthcare",
            created_at: "2025-03-10",
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const handleAddCompany = () => {
        console.log("Add company clicked");
    };
    const handleViewUsers = (companyId) => {
        console.log("View users for company", companyId);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(CompanyHeader, { onAddCompanyClick: handleAddCompany }), _jsx(CompanyTable, { companies: companies, isLoading: isLoading, onViewUsers: handleViewUsers })] }));
}
