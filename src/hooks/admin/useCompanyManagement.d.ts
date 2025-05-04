import { Company } from '@/models/company';
export declare function useCompanyManagement(): {
    companies: Company[];
    isLoading: boolean;
    loadCompanies: () => Promise<void>;
    updateCompany: (companyId: string, data: any) => Promise<boolean>;
    deleteCompany: (companyId: string) => Promise<boolean>;
};
