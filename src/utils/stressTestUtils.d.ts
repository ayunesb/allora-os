export interface StressTestOptions {
    /**
     * Maximum number of concurrent operations
     */
    concurrency: number;
    /**
     * Delay between batches in milliseconds
     */
    delayBetweenBatches?: number;
    /**
     * Batch size for concurrent operations
     */
    batchSize?: number;
    /**
     * Maximum execution time in milliseconds
     */
    timeout?: number;
    /**
     * Whether to log detailed performance metrics
     */
    logPerformance?: boolean;
    /**
     * Function to call on progress updates
     */
    onProgress?: (progress: StressTestProgress) => void;
}
export interface StressTestProgress {
    totalOperations: number;
    completedOperations: number;
    successfulOperations: number;
    failedOperations: number;
    percentComplete: number;
    elapsedTime: number;
    estimatedTimeRemaining?: number;
    currentConcurrency: number;
    averageResponseTime: number;
}
export interface StressTestResult extends StressTestProgress {
    success: boolean;
    message?: string;
    error?: any;
    detailedMetrics: {
        maxResponseTime: number;
        minResponseTime: number;
        p95ResponseTime: number;
        p99ResponseTime: number;
        errorRate: number;
        operationsPerSecond: number;
        totalDuration: number;
        serverErrors: number;
        clientErrors: number;
        timeouts: number;
    };
}
/**
 * Run a stress test on a specified operation
 * @param operation The async function to test
 * @param options Configuration for the stress test
 * @returns Promise that resolves to test results
 */
export declare const runStressTest: <T>(operation: () => Promise<T>, options: StressTestOptions) => Promise<StressTestResult>;
/**
 * Run a performance test on a specific API endpoint
 * @param endpoint The API endpoint URL to test
 * @param method HTTP method to use
 * @param options Stress test configuration
 * @param payload Optional data to send with each request
 * @returns Promise that resolves to test results
 */
export declare const testApiEndpoint: (endpoint: string, method: "GET" | "POST" | "PUT" | "DELETE", options: StressTestOptions, payload?: any) => Promise<StressTestResult>;
