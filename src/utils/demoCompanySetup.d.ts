export interface DemoCompanyOptions {
  name?: string;
  industry?: string;
  size?: string;
  goals?: string[];
  riskAppetite?: "low" | "medium" | "high";
  channels?: string[];
  marketingBudget?: string;
  targetMarkets?: string[];
  isPublic?: boolean;
}
/**
 * Creates a demo company with sample data
 */
export declare function createDemoCompany(
  userId: string,
  options?: DemoCompanyOptions,
): Promise<{
  success: boolean;
  companyId?: string;
  error?: string;
}>;
/**
 * Converts a demo company to a case study (makes it public)
 */
export declare function convertDemoToPublicCaseStudy(
  companyId: string,
): Promise<{
  success: boolean;
  error?: string;
}>;
