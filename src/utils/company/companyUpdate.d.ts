import { CompanyCreationResult, CompanyUpdateOptions } from "./types";
/**
 * Updates or creates a company record with detailed information
 */
export declare function updateCompanyDetails(
  userId: string,
  companyDetails: CompanyUpdateOptions,
): Promise<CompanyCreationResult>;
