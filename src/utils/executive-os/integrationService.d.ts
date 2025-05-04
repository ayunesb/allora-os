/**
 * Service to handle the integration of Executive OS capabilities with AI bots
 */
export interface UpgradedExecutiveBot {
    name: string;
    role: string;
    modeledAfter: string;
    personalityTraits: string[];
    thinkingModels: string[];
    decisionFramework: string[];
    delegationLevel: number;
    cognitiveBoost: string;
    mentalModel: string;
    lastIntegrationDate: string;
    strategicFocus: string;
}
/**
 * Integrate Executive OS capabilities with an AI bot
 */
export declare function upgradeExecutiveBot(botName: string, botRole: string): Promise<UpgradedExecutiveBot | null>;
/**
 * Upgrade multiple executive bots at once
 */
export declare function upgradeAllExecutiveBots(executives: Array<{
    name: string;
    role: string;
}>): Promise<{
    success: number;
    failed: number;
    upgraded: UpgradedExecutiveBot[];
}>;
