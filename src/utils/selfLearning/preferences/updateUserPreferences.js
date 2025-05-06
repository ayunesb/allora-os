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
 * Update user preferences in the database
 */
export function updateUserPreferences(userId, preferences) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Format the preferences to match the database schema
            const formattedPreferences = {
                risk_appetite: preferences.risk_appetite || "medium",
                preferred_executives: preferences.preferred_executives || [],
                favorite_topics: preferences.favorite_topics || [],
                communication_style: preferences.communication_style || "balanced",
                activity_peak_times: preferences.activity_peak_times || [],
                dashboard_preferences: preferences.dashboard_preferences || {},
                last_updated: new Date(),
            };
            // Update the user preferences in Supabase
            const { error } = yield supabase.from("user_preferences").upsert(Object.assign({ user_id: userId }, formattedPreferences), {
                onConflict: "user_id",
            });
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error("Error updating user preferences:", error);
            return false;
        }
    });
}
