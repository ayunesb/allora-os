import { CallScript } from './types';
/**
 * Generates AI-created call scripts based on company insights
 */
export declare function createAiGeneratedScripts(insights: any[], companyName: string, industry: string): CallScript[];
/**
 * Generates executive team collaborative scripts
 */
export declare function createExecutiveCollectiveScripts(companyName: string, industry: string, companySize: string, riskAppetite: string): CallScript[];
