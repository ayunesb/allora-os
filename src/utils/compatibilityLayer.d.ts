/**
 * This compatibility layer helps maintain backward compatibility
 * with older code that might be using different property names.
 */
import { Campaign } from "@/types/fixed/Campaign";
import { User } from "@/types/fixed/User";
import { WebhookEvent } from "@/types/fixed/Webhook";
export declare function normalizeCampaign(campaign: Campaign): Campaign;
export declare function normalizeUser(user: any): User | null;
export declare function normalizeWebhookEvent(event: any): WebhookEvent;
export declare function injectPropertiesCompatibility(): void;
