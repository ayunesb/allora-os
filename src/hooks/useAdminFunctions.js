import { useUserManagement } from '@/hooks/admin/useUserManagement';
import { useCompanyManagement } from '@/hooks/admin/useCompanyManagement';
import { useAnalytics } from '@/hooks/admin/useAnalytics';
export default function useAdminFunctions() {
    const userManagement = useUserManagement();
    const companyManagement = useCompanyManagement();
    const analytics = useAnalytics();
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
        systemAnalytics: analytics?.systemAnalytics,
        dashboardAnalytics: analytics?.dashboardAnalytics
    };
}
