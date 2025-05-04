/**
 * Self-Learning Hook for Allora AI
 *
 * This hook provides functionality to track user actions and system events
 * for continuous learning and improvement of the platform.
 */
import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
import { getLearningInsights } from '@/utils/selfLearning/insights/getLearningInsights';
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
                timestamp: new Date().toISOString()
            };
            // Log the action to console in development
            logger.info(`[Self-Learning] Action tracked: ${actionType}`, {
                category,
                userId: user?.id || 'anonymous',
                companyId: profile?.company_id || 'unknown',
                entityId,
                entityType
            });
            // In a real implementation, we would store this in the database
            // For now, we'll just store it in localStorage for demonstration
            const storedActions = localStorage.getItem('allora_tracked_actions');
            const actions = storedActions ? JSON.parse(storedActions) : [];
            actions.push({
                ...actionData,
                userId: user?.id || 'anonymous',
                companyId: profile?.company_id || 'unknown'
            });
            localStorage.setItem('allora_tracked_actions', JSON.stringify(actions));
            return true;
        }
        catch (error) {
            logger.error('Error tracking action for self-learning', error);
            return false;
        }
    }, [isTracking, user?.id, profile?.company_id]);
    /**
     * Enables or disables action tracking
     */
    const setTrackingEnabled = useCallback((enabled) => {
        setIsTracking(enabled);
        localStorage.setItem('allora_tracking_enabled', String(enabled));
        if (enabled) {
            toast.success('Self-learning tracking enabled');
        }
        else {
            toast.info('Self-learning tracking disabled');
        }
    }, []);
    /**
     * Clears all tracked actions
     */
    const clearTrackedActions = useCallback(() => {
        localStorage.removeItem('allora_tracked_actions');
        toast.success('Self-learning data cleared');
    }, []);
    /**
     * Retrieves user insights based on tracked actions
     */
    const getInsights = useCallback(async () => {
        if (!user?.id) {
            return [];
        }
        try {
            const insights = await getLearningInsights(user.id);
            return insights;
        }
        catch (error) {
            logger.error('Error getting learning insights', error);
            toast.error('Could not load learning insights');
            return [];
        }
    }, [user?.id]);
    /**
     * Retrieves AI recommendations based on user behavior and preferences
     */
    const getRecommendations = useCallback(async () => {
        if (!user?.id) {
            return { strategies: [], executives: [], topics: [] };
        }
        try {
            // This would typically fetch recommendations from an API
            // For now, returning mock data
            return {
                strategies: [
                    { id: "s1", title: "Market Expansion", riskLevel: "medium", score: 85 },
                    { id: "s2", title: "Cost Optimization", riskLevel: "low", score: 75 },
                    { id: "s3", title: "Product Innovation", riskLevel: "high", score: 92 }
                ],
                executives: [
                    { id: "e1", name: "Marketing Director", affinity: 92 },
                    { id: "e2", name: "CFO", affinity: 78 },
                    { id: "e3", name: "CTO", affinity: 65 }
                ],
                topics: [
                    { id: "t1", name: "Digital Marketing", relevance: 95 },
                    { id: "t2", name: "Financial Planning", relevance: 82 },
                    { id: "t3", name: "Technology Stack", relevance: 79 }
                ]
            };
        }
        catch (error) {
            logger.error('Error getting recommendations', error);
            toast.error('Could not load recommendations');
            return { strategies: [], executives: [], topics: [] };
        }
    }, [user?.id]);
    return {
        trackAction,
        isTracking,
        setTrackingEnabled,
        clearTrackedActions,
        getInsights,
        getRecommendations
    };
}
