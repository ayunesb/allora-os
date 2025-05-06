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
import "../mocks/executivesMock"; // Import the mock implementation
/**
 * Updates an executive's performance metrics based on action outcomes
 *
 * @param executiveName The name of the executive
 * @param outcome The outcome of the action ('success' or 'failure')
 */
export function updateExecutivePerformance(executiveName, outcome) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First get the executive's current stats
            const { data, error } = yield supabase
                .from("executives")
                .select("*")
                .eq("name", executiveName)
                .single();
            if (error || !data) {
                logger.error(`Executive not found: ${executiveName}`, { error });
                return;
            }
            // Prepare the updates based on outcome
            const updates = {};
            if (outcome === "success") {
                updates.successful_actions = (data.successful_actions || 0) + 1;
                // Every 5 successful actions, increase star rating (max 5)
                if (updates.successful_actions % 5 === 0 && data.star_rating < 5) {
                    updates.star_rating = (data.star_rating || 0) + 1;
                    // Potentially promote the executive based on rating
                    if (updates.star_rating >= 4 && data.level !== "Senior") {
                        updates.level = "Senior";
                        logger.info(`${executiveName} promoted to Senior Executive!`);
                    }
                }
            }
            else if (outcome === "failure") {
                updates.failed_actions = (data.failed_actions || 0) + 1;
                // Every 3 failed actions, decrease star rating (min 1)
                if (updates.failed_actions % 3 === 0 && data.star_rating > 1) {
                    updates.star_rating = data.star_rating - 1;
                    // Potentially demote the executive based on rating
                    if (updates.star_rating <= 2 && data.level === "Senior") {
                        updates.level = "Junior";
                        logger.info(`${executiveName} demoted to Junior Executive.`);
                    }
                }
            }
            // Update the executive record
            const { error: updateError } = yield supabase
                .from("executives")
                .update(updates)
                .eq("name", executiveName);
            if (updateError) {
                logger.error(`Failed to update executive performance: ${executiveName}`, {
                    error: updateError,
                });
            }
            else {
                logger.info(`Updated performance for ${executiveName}: ${outcome}`);
            }
            // Log the performance update in agent_logs (a real table)
            yield supabase.from("agent_logs").insert({
                agent_id: executiveName,
                tenant_id: "development",
                success: outcome === "success",
                xp: outcome === "success" ? 10 : -5,
                task: `Performance update: ${outcome}`,
            });
        }
        catch (err) {
            logger.error("Error in updateExecutivePerformance", { error: err });
        }
    });
}
