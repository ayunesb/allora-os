/**
 * Self-Learning Hook for Allora AI
 *
 * This hook provides functionality to track user actions and system events
 * for continuous learning and improvement of the platform.
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
import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
import { getLearningInsights } from "@/utils/selfLearning/insights/getLearningInsights";
export function useSelfLearning() {
    const { user, profile } = useAuth();
    const [isTracking, setIsTracking] = useState(true);
    /**
     * Tracks a user action for self-learning purposes
     */
    const trackAction = useCallback((actionType, category, entityId, entityType, metadata) => {
        if (!isTracking)
            return false;
        try {
            const actionData = {
                actionType,
                category,
                entityId,
                entityType,
                metadata,
                timestamp: new Date().toISOString(),
            };
            // Log the action to console in development
            logger.info(`[Self-Learning] Action tracked: ${actionType}`, {
                category,
                userId: (user === null || user === void 0 ? void 0 : user.id) || "anonymous",
                companyId: (profile === null || profile === void 0 ? void 0 : profile.company_id) || "unknown",
                entityId,
                entityType,
            });
            // In a real implementation, we would store this in the database
            // For now, we'll just store it in localStorage for demonstration
            const storedActions = localStorage.getItem("allora_tracked_actions");
            const actions = storedActions ? JSON.parse(storedActions) : [];
            actions.push(Object.assign(Object.assign({}, actionData), { userId: (user === null || user === void 0 ? void 0 : user.id) || "anonymous", companyId: (profile === null || profile === void 0 ? void 0 : profile.company_id) || "unknown" }));
            localStorage.setItem("allora_tracked_actions", JSON.stringify(actions));
            return true;
        }
        catch (error) {
            logger.error("Error tracking action for self-learning", error);
            return false;
        }
    }, [isTracking, user === null || user === void 0 ? void 0 : user.id, profile === null || profile === void 0 ? void 0 : profile.company_id]);
    /**
     * Enables or disables action tracking
     */
    const setTrackingEnabled = useCallback((enabled) => {
        setIsTracking(enabled);
        localStorage.setItem("allora_tracking_enabled", String(enabled));
        if (enabled) {
            toast.success("Self-learning tracking enabled");
        }
        else {
            toast.info("Self-learning tracking disabled");
        }
    }, []);
    /**
     * Clears all tracked actions
     */
    const clearTrackedActions = useCallback(() => {
        localStorage.removeItem("allora_tracked_actions");
        toast.success("Self-learning data cleared");
    }, []);
    /**
     * Retrieves user insights based on tracked actions
     */
    const getInsights = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return [];
        }
        try {
            const insights = yield getLearningInsights(user.id);
            return insights;
        }
        catch (error) {
            logger.error("Error getting learning insights", error);
            toast.error("Could not load learning insights");
            return [];
        }
    }), [user === null || user === void 0 ? void 0 : user.id]);
    /**
     * Retrieves AI recommendations based on user behavior and preferences
     */
    const getRecommendations = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return { strategies: [], executives: [], topics: [] };
        }
        try {
            // This would typically fetch recommendations from an API
            // For now, returning mock data
            return {
                strategies: [
                    {
                        id: "s1",
                        title: "Market Expansion",
                        riskLevel: "medium",
                        score: 85,
                    },
                    { id: "s2", title: "Cost Optimization", riskLevel: "low", score: 75 },
                    {
                        id: "s3",
                        title: "Product Innovation",
                        riskLevel: "high",
                        score: 92,
                    },
                ],
                executives: [
                    { id: "e1", name: "Marketing Director", affinity: 92 },
                    { id: "e2", name: "CFO", affinity: 78 },
                    { id: "e3", name: "CTO", affinity: 65 },
                ],
                topics: [
                    { id: "t1", name: "Digital Marketing", relevance: 95 },
                    { id: "t2", name: "Financial Planning", relevance: 82 },
                    { id: "t3", name: "Technology Stack", relevance: 79 },
                ],
            };
        }
        catch (error) {
            logger.error("Error getting recommendations", error);
            toast.error("Could not load recommendations");
            return { strategies: [], executives: [], topics: [] };
        }
    }), [user === null || user === void 0 ? void 0 : user.id]);
    return {
        trackAction,
        isTracking,
        setTrackingEnabled,
        clearTrackedActions,
        getInsights,
        getRecommendations,
    };
}
