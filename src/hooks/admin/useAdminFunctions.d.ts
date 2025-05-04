export default function useAdminFunctions(): {
    users: import("../../types").User[];
    companyUsers: import("../../types").User[];
    selectedCompany: string;
    loadUsers: () => Promise<void>;
    loadCompanyUsers: (companyId: string) => Promise<void>;
    updateUser: (userId: string, data: any) => Promise<boolean>;
    deleteUser: (userId: string) => Promise<boolean>;
    setSelectedCompany: import("react").Dispatch<import("react").SetStateAction<string>>;
    companies: import("../../models/company").Company[];
    loadCompanies: () => Promise<void>;
    updateCompany: (companyId: string, data: any) => Promise<boolean>;
    deleteCompany: (companyId: string) => Promise<boolean>;
    isLoading: boolean;
    systemAnalytics: any;
    dashboardAnalytics: any;
};
