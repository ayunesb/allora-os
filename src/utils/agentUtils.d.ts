/**
 * Utilities for formatting and standardizing agent personalities and decision styles
 */
export declare const XP_THRESHOLDS: {
    v1: number;
    v2: number;
    v3: number;
};
/**
 * Get a formatted decision style string based on the executive's style
 */
export declare function getDecisionStyle(style?: string): string;
/**
 * Get a formatted personality string based on the executive's personality
 */
export declare function getPersonality(personality?: string): string;
export declare function applyAgentVote(agentId: string, vote: 'up' | 'down'): Promise<void>;
