import { User } from '@/types/fixed/User';
export declare function useUserManagement(): {
    users: User[];
    companyUsers: User[];
    selectedCompany: string;
    isLoading: boolean;
    loadUsers: () => Promise<void>;
    loadCompanyUsers: (companyId: string) => Promise<void>;
    updateUser: (userId: string, data: any) => Promise<boolean>;
    deleteUser: (userId: string) => Promise<boolean>;
    setSelectedCompany: import("react").Dispatch<import("react").SetStateAction<string>>;
};
