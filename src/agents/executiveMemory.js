var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
/**
 * Saves an executive decision to the database
 */
export function saveExecutiveDecision(decision, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("executive_decisions").insert({
                id: decision.id,
                user_id: userId,
                executive_name: decision.executiveName,
                executive_role: decision.executiveRole,
                task: decision.task,
                options: decision.options,
                selected_option: decision.selectedOption,
                reasoning: decision.reasoning,
                risk_assessment: decision.riskAssessment,
                priority: decision.priority,
                created_at: decision.timestamp,
            });
            if (error) {
                throw new Error(`Failed to save executive decision: ${error.message}`);
            }
        }
        catch (error) {
            logger.error("Error saving executive decision:", error);
            throw error;
        }
    });
}
/**
 * Fetches coaching memories for a specific executive
 */
export function fetchCoachingMemories(executiveName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("coaching_insights")
                .select("content")
                .ilike("category", `%${executiveName.toLowerCase()}%`)
                .order("created_at", { ascending: false })
                .limit(5);
            if (error) {
                throw new Error(`Failed to fetch coaching memories: ${error.message}`);
            }
            return data ? data.map((item) => item.content) : [];
        }
        catch (error) {
            logger.error("Error fetching coaching memories:", error);
            return [];
        }
    });
}
/**
 * Fetches recent executive decisions
 */
export function getExecutiveDecisions(userId_1) {
    return __awaiter(this, arguments, void 0, function* (userId, limit = 10) {
        try {
            const { data, error } = yield supabase
                .from("executive_decisions")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false })
                .limit(limit);
            if (error) {
                throw new Error(`Failed to fetch executive decisions: ${error.message}`);
            }
            return data
                ? data.map((item) => ({
                    id: item.id,
                    executiveName: item.executive_name,
                    executiveRole: item.executive_role,
                    task: item.task,
                    options: item.options,
                    selectedOption: item.selected_option,
                    reasoning: item.reasoning,
                    riskAssessment: item.risk_assessment,
                    priority: item.priority,
                    timestamp: item.created_at,
                }))
                : [];
        }
        catch (error) {
            logger.error("Error fetching executive decisions:", error);
            return [];
        }
    });
}
