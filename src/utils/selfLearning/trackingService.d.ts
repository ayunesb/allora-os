/**
 * Track a user action for the self-learning system
 */
export declare function trackUserAction(userId: string, action: string, category: string, entityId: string, entityType: string, metadata?: Record<string, any>): Promise<void>;
/**
 * Track strategy feedback to improve AI recommendations
 */
export declare function trackStrategyFeedback(userId: string, strategyId: string, isPositive: boolean, metadata?: Record<string, any>): Promise<void>;
/**
 * Track campaign feedback to improve marketing recommendations
 */
export declare function trackCampaignFeedback(userId: string, campaignId: string, isPositive: boolean, metadata?: Record<string, any>): Promise<void>;
/**
 * Track script usage and feedback to improve call/message templates
 */
export declare function trackScriptFeedback(userId: string, scriptId: string, scriptType: 'call' | 'message', action: 'use' | 'approve' | 'reject', metadata?: Record<string, any>): Promise<void>;
