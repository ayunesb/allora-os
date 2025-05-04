/**
 * Hook for social media post actions like scheduling and approving
 */
export declare function usePostActions(refreshPosts: () => void): {
    schedule: (postId: string) => Promise<{
        success: boolean;
        error?: string;
    } | {
        success: boolean;
        error: any;
    }>;
    approve: (postId: string, notes?: string) => Promise<{
        success: boolean;
        error?: string;
    } | {
        success: boolean;
        error: any;
    }>;
    actionLoading: string;
};
