/**
 * Initializes the auto-executor cron job
 * Runs every 5 minutes to check for pending actions
 */
export declare function initializeAutoExecutorCron(): () => void;
/**
 * Manually triggers the auto-executor to run immediately
 */
export declare function triggerExecutorManually(): Promise<void>;
