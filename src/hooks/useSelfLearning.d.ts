/**
 * Self-Learning Hook for Allora AI
 *
 * This hook provides functionality to track user actions and system events
 * for continuous learning and improvement of the platform.
 */
export interface ActionData {
  actionType: string;
  category: string;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}
export declare function useSelfLearning(): {
  trackAction: (
    actionType: string,
    category: string,
    entityId?: string,
    entityType?: string,
    metadata?: Record<string, any>,
  ) => boolean;
  isTracking: boolean;
  setTrackingEnabled: (enabled: boolean) => void;
  clearTrackedActions: () => void;
  getInsights: () => Promise<
    {
      title: string;
      value: string;
      description: string;
    }[]
  >;
  getRecommendations: () => Promise<{
    strategies: {
      id: string;
      title: string;
      riskLevel: string;
      score: number;
    }[];
    executives: {
      id: string;
      name: string;
      affinity: number;
    }[];
    topics: {
      id: string;
      name: string;
      relevance: number;
    }[];
  }>;
};
