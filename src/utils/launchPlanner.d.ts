/**
 * Launch planner utility for business launch preparation
 */
interface LaunchStep {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    isRequired: boolean;
    order: number;
    category: 'api' | 'data' | 'user' | 'compliance' | 'security';
}
interface LaunchCategory {
    id: string;
    name: string;
    description: string;
    steps: LaunchStep[];
    completedSteps: number;
    totalSteps: number;
    requiredSteps: number;
    completedRequiredSteps: number;
}
interface LaunchPlan {
    categories: LaunchCategory[];
    isReady: boolean;
    completedSteps: number;
    totalSteps: number;
    completedRequiredSteps: number;
    totalRequiredSteps: number;
}
/**
 * Main function to check if all launch requirements are met
 */
export declare function checkLaunchReadiness(): Promise<{
    isReady: boolean;
    plan: LaunchPlan;
}>;
/**
 * Mark a launch step as completed
 */
export declare function completeStep(stepId: string): Promise<{
    success: boolean;
    message: string;
}>;
/**
 * Verify a specific launch requirement
 */
export declare function verifyRequirement(id: string): Promise<{
    valid: boolean;
    message: string;
}>;
export {};
