var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserPreferences } from "../preferences/getUserPreferences";
import { calculateLearningProgress, getFocusArea } from "./insightUtils";
/**
 * Get user learning insights based on their interaction history
 */
export function getLearningInsights(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const preferences = yield getUserPreferences(userId);
            // Prepare insights based on learned preferences
            const insights = [
                {
                    title: "Risk Appetite",
                    value: preferences.riskAppetite.charAt(0).toUpperCase() +
                        preferences.riskAppetite.slice(1),
                    description: "Based on your strategy selections and decisions",
                },
                {
                    title: "Favorite Executives",
                    value: preferences.preferredExecutives.length > 0
                        ? preferences.preferredExecutives[0]
                        : "No data yet",
                    description: "The executive whose advice you value most",
                },
                {
                    title: "Learning Progress",
                    value: calculateLearningProgress(preferences) + "/10",
                    description: "How well we understand your preferences",
                },
                {
                    title: "Focus Area",
                    value: getFocusArea(preferences),
                    description: "Your most common interaction with the platform",
                },
            ];
            return insights;
        }
        catch (error) {
            console.error("Error generating learning insights:", error);
            return [
                {
                    title: "Risk Appetite",
                    value: "Medium",
                    description: "Based on your strategy selections and decisions",
                },
                {
                    title: "Learning Progress",
                    value: "0/10",
                    description: "How well we understand your preferences",
                },
                {
                    title: "Usage Pattern",
                    value: "No pattern",
                    description: "When you tend to use the platform most",
                },
                {
                    title: "Behavioral Pattern",
                    value: "No data",
                    description: "Your most common interaction with the platform",
                },
            ];
        }
    });
}
