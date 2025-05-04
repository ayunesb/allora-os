/**
 * Helper function to customize strategy title
 */
export declare function customizeTitle(baseTitle: string, industryContext?: string, primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'): string;
/**
 * Helper function to customize strategy description
 */
export declare function customizeDescription(baseDescription: string, industryContext?: string, companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise'): string;
/**
 * Helper function to customize ROI expectations
 */
export declare function customizeROI(baseROI: string, companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise'): string;
/**
 * Helper function to customize metrics based on industry
 */
export declare function customizeMetrics(baseMetrics: string[], industryContext?: string): string[];
