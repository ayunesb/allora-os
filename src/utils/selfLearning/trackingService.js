var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
/**
 * Track a user action for the self-learning system
 */
export function trackUserAction(userId_1, action_1, category_1, entityId_1, entityType_1) {
    return __awaiter(this, arguments, void 0, function* (userId, action, category, entityId, entityType, metadata = {}) {
        try {
            const timestamp = new Date().toISOString();
            // Store in Supabase if available
            try {
                yield supabase.rpc("insert_user_action", {
                    p_user_id: userId,
                    p_action: action,
                    p_category: category,
                    p_entity_id: entityId,
                    p_entity_type: entityType,
                    p_metadata: metadata,
                    p_timestamp: timestamp,
                });
            }
            catch (error) {
                console.error("Error storing user action in Supabase:", error);
                // Fallback to local storage
                const storedActions = JSON.parse(localStorage.getItem("user_actions") || "[]");
                storedActions.push({
                    userId,
                    action,
                    category,
                    entityId,
                    entityType,
                    metadata,
                    timestamp,
                });
                localStorage.setItem("user_actions", JSON.stringify(storedActions));
            }
        }
        catch (error) {
            console.error("Error tracking user action:", error);
        }
    });
}
/**
 * Track strategy feedback to improve AI recommendations
 */
export function trackStrategyFeedback(userId_1, strategyId_1, isPositive_1) {
    return __awaiter(this, arguments, void 0, function* (userId, strategyId, isPositive, metadata = {}) {
        return trackUserAction(userId, isPositive ? "strategy_approve" : "strategy_reject", "strategy_feedback", strategyId, "strategy", Object.assign(Object.assign({}, metadata), { rating: isPositive ? "positive" : "negative" }));
    });
}
/**
 * Track campaign feedback to improve marketing recommendations
 */
export function trackCampaignFeedback(userId_1, campaignId_1, isPositive_1) {
    return __awaiter(this, arguments, void 0, function* (userId, campaignId, isPositive, metadata = {}) {
        return trackUserAction(userId, isPositive ? "campaign_approve" : "campaign_reject", "campaign_feedback", campaignId, "campaign", Object.assign(Object.assign({}, metadata), { rating: isPositive ? "positive" : "negative" }));
    });
}
/**
 * Track script usage and feedback to improve call/message templates
 */
export function trackScriptFeedback(userId_1, scriptId_1, scriptType_1, action_1) {
    return __awaiter(this, arguments, void 0, function* (userId, scriptId, scriptType, action, metadata = {}) {
        return trackUserAction(userId, `script_${action}`, "script_feedback", scriptId, `${scriptType}_script`, metadata);
    });
}
