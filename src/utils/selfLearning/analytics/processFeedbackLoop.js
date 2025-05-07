/**
 * Process feedback loop to learn from user actions
 */
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
import { getUserPreferences } from "../preferences/getUserPreferences";
import { updateUserPreferences } from "../preferences/updateUserPreferences";
import { analyzeUserBehavior } from "./analyzeUserBehavior";
// Process feedback loop to learn from user actions
export const processFeedbackLoop = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Processing feedback loop for user:", userId);
        // 1. Get recent user actions (last 30 days)
        // Use stored procedure to avoid TypeScript issues
        const { data: recentActions, error: actionsError } = yield supabase.rpc("get_recent_user_actions", {
            p_user_id: userId,
            p_days: 30,
        });
        if (actionsError) {
            console.error("Error fetching recent actions:", actionsError);
            return;
        }
        if (!recentActions || recentActions.length === 0) {
            console.log("No recent actions found for user", userId);
            return;
        }
        console.log(`Found ${recentActions.length} recent actions for analysis`);
        // 2. Get user's current preferences
        const userPreferencesData = yield getUserPreferences(userId);
        // 3. Analyze actions and update user model
        const updatedPreferences = analyzeUserBehavior(recentActions, userPreferencesData);
        // 4. Save updated user preferences if there are any changes
        if (updatedPreferences) {
            console.log("Updating user preferences based on behavior analysis");
            yield updateUserPreferences(userId, updatedPreferences);
        }
        else {
            console.log("No preference updates needed based on analysis");
        }
    }
    catch (error) {
        console.error("Error in processFeedbackLoop:", error);
    }
});
