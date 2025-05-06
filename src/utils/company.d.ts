export type CompanyUpdateParams = {
  name: string;
  industry: string;
  description: string;
  mission?: string;
  vision?: string;
  headquarters?: string;
  phone?: string;
  additionalDetails?: Record<string, any>;
};
export declare function updateCompanyDetails(
  userId: string,
  details: CompanyUpdateParams,
): Promise<{
  success: boolean;
  error?: string;
}>;
export declare function fetchCompanyDetails(
  companyId: string,
): Promise<Record<string, any> | null>;
