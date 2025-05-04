/**
 * Run daily autonomous tasks for all executives
 */
export declare function runDailyExecutiveTasks(): Promise<{
    successCount: number;
    failCount: number;
    total: number;
}>;
