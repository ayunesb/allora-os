"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompaniesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var companies_1 = require("@/components/admin/companies");
function CompaniesPage() {
  // Update the company data to match the required model.Company type
  var _a = (0, react_1.useState)([
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
    ]),
    companies = _a[0],
    setCompanies = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var handleAddCompany = function () {
    console.log("Add company clicked");
  };
  var handleViewUsers = function (companyId) {
    console.log("View users for company", companyId);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(companies_1.CompanyHeader, {
        onAddCompanyClick: handleAddCompany,
      }),
      (0, jsx_runtime_1.jsx)(companies_1.CompanyTable, {
        companies: companies,
        isLoading: isLoading,
        onViewUsers: handleViewUsers,
      }),
    ],
  });
}
