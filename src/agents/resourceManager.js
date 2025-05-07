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
export function allocateResources(executiveName, outcome) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("executives")
                .select("*")
                .eq("name", executiveName)
                .single();
            if (error || !data) {
                logger.error("Executive not found", { executiveName, error });
                return;
            }
            let points = data.resource_points || 100;
            if (outcome === "success") {
                points += 10; // Reward 10 points for success
            }
            else if (outcome === "failure") {
                points -= 15; // Deduct 15 points for failure
            }
            // Keep resource points within bounds
            points = Math.max(0, Math.min(points, 500)); // Between 0 and 500
            const { error: updateError } = yield supabase
                .from("executives")
                .update({ resource_points: points })
                .eq("name", executiveName);
            if (updateError) {
                logger.error("Failed to update resource points", {
                    executiveName,
                    updateError,
                });
            }
            else {
                logger.info(`${executiveName} now has ${points} Resource Points`);
            }
            // Track resource points history for forecasting (using a real table)
            yield supabase
                .from("agent_logs")
                .insert({
                agent_id: executiveName,
                tenant_id: "development",
                xp: points,
                task: `Resource allocation: ${outcome}`,
            })
                .then(({ error }) => {
                if (error) {
                    logger.error("Failed to track resource history", {
                        executiveName,
                        error,
                    });
                }
            });
        }
        catch (err) {
            logger.error("Error in allocateResources", { error: err });
        }
    });
}
export function adjustVoteWeight(points) {
    if (points >= 400)
        return 3; // VIP Executive
    if (points >= 250)
        return 2; // Senior Executive
    return 1; // Regular Executive
}
