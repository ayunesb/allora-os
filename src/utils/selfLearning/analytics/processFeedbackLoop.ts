/**
 * Process feedback loop to learn from user actions
 */

import { supabase } from "@/integrations/supabase/client";
import { UserPreferences } from "../types";
import { getUserPreferences } from "../preferences/getUserPreferences";
import { updateUserPreferences } from "../preferences/updateUserPreferences";
import { analyzeUserBehavior } from "./analyzeUserBehavior";

// Process feedback loop to learn from user actions
export const processFeedbackLoop = async (userId: string) => {
  try {
    console.log("Processing feedback loop for user:", userId);

    // 1. Get recent user actions (last 30 days)
    // Use stored procedure to avoid TypeScript issues
    const { data: recentActions, error: actionsError } = await supabase.rpc(
      "get_recent_user_actions",
      {
        p_user_id: userId,
        p_days: 30,
      },
    );

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
    const userPreferencesData = await getUserPreferences(userId);

    // 3. Analyze actions and update user model
    const updatedPreferences = analyzeUserBehavior(
      recentActions,
      userPreferencesData,
    );

    // 4. Save updated user preferences if there are any changes
    if (updatedPreferences) {
      console.log("Updating user preferences based on behavior analysis");
      await updateUserPreferences(userId, updatedPreferences);
    } else {
      console.log("No preference updates needed based on analysis");
    }
  } catch (error) {
    console.error("Error in processFeedbackLoop:", error);
  }
};
