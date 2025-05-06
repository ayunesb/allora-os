"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAdminFunctions;
var useUserManagement_1 = require("./useUserManagement");
var useCompanyManagement_1 = require("./useCompanyManagement");
var useAnalytics_1 = require("./useAnalytics");
function useAdminFunctions() {
  var userManagement = (0, useUserManagement_1.useUserManagement)();
  var companyManagement = (0, useCompanyManagement_1.useCompanyManagement)();
  var analytics = (0, useAnalytics_1.useAnalytics)();
  return {
    // User management
    users: userManagement.users,
    companyUsers: userManagement.companyUsers,
    selectedCompany: userManagement.selectedCompany,
    loadUsers: userManagement.loadUsers,
    loadCompanyUsers: userManagement.loadCompanyUsers,
    updateUser: userManagement.updateUser,
    deleteUser: userManagement.deleteUser,
    setSelectedCompany: userManagement.setSelectedCompany,
    // Company management
    companies: companyManagement.companies,
    loadCompanies: companyManagement.loadCompanies,
    updateCompany: companyManagement.updateCompany,
    deleteCompany: companyManagement.deleteCompany,
    // Common state
    isLoading: userManagement.isLoading || companyManagement.isLoading,
    // Analytics
    systemAnalytics: analytics.systemAnalytics,
    dashboardAnalytics: analytics.dashboardAnalytics,
  };
}
