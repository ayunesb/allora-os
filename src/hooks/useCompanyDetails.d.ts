export type RiskAppetiteType = 'low' | 'medium' | 'high';
export interface CompanyDetails {
    riskAppetite?: RiskAppetiteType;
    companySize?: string;
    industry?: string;
    [key: string]: any;
}
export declare function useCompanyDetails(companyId?: string): {
    isLoading: boolean;
    riskAppetite: RiskAppetiteType;
    companyDetails: CompanyDetails;
    error: Error;
};
