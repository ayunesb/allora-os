var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "@/utils/loggingService";
/**
 * Run a stress test on a specified operation
 * @param operation The async function to test
 * @param options Configuration for the stress test
 * @returns Promise that resolves to test results
 */
export const runStressTest = (operation, options) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Date.now();
    const results = [];
    const { concurrency, delayBetweenBatches = 0, batchSize = Math.min(10, concurrency), timeout = 60000, // Default 1 minute timeout
    logPerformance = true, onProgress, } = options;
    // Initialize progress
    const progress = {
        totalOperations: concurrency,
        completedOperations: 0,
        successfulOperations: 0,
        failedOperations: 0,
        percentComplete: 0,
        elapsedTime: 0,
        currentConcurrency: 0,
        averageResponseTime: 0,
    };
    // Performance tracking for detailed metrics
    const responseTimes = [];
    let serverErrors = 0;
    let clientErrors = 0;
    let timeouts = 0;
    logger.info(`Starting stress test with ${concurrency} concurrent operations`, {
        concurrency,
        batchSize,
        delayBetweenBatches,
        timeout,
    });
    try {
        // Create a promise that resolves after timeout
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Stress test timed out after ${timeout}ms`)), timeout);
        });
        // Execute operations in batches
        const executeOperations = () => __awaiter(void 0, void 0, void 0, function* () {
            for (let i = 0; i < concurrency; i += batchSize) {
                const currentBatchSize = Math.min(batchSize, concurrency - i);
                const batchStartTime = Date.now();
                progress.currentConcurrency = currentBatchSize;
                // Update progress
                if (onProgress) {
                    progress.elapsedTime = Date.now() - startTime;
                    progress.percentComplete =
                        (progress.completedOperations / progress.totalOperations) * 100;
                    if (progress.completedOperations > 0) {
                        const operationsPerMs = progress.completedOperations / progress.elapsedTime;
                        const remainingOperations = progress.totalOperations - progress.completedOperations;
                        progress.estimatedTimeRemaining =
                            remainingOperations / operationsPerMs;
                    }
                    onProgress(progress);
                }
                // Execute batch of operations
                const batchPromises = Array.from({ length: currentBatchSize }).map(() => __awaiter(void 0, void 0, void 0, function* () {
                    const operationStart = Date.now();
                    try {
                        yield operation();
                        const duration = Date.now() - operationStart;
                        responseTimes.push(duration);
                        progress.successfulOperations++;
                        return { success: true, duration };
                    }
                    catch (error) {
                        const duration = Date.now() - operationStart;
                        progress.failedOperations++;
                        // Categorize errors
                        if (error.name === "TimeoutError") {
                            timeouts++;
                        }
                        else if (error.status >= 500) {
                            serverErrors++;
                        }
                        else if (error.status >= 400) {
                            clientErrors++;
                        }
                        return {
                            success: false,
                            duration,
                            error,
                            statusCode: error.status,
                        };
                    }
                    finally {
                        progress.completedOperations++;
                    }
                }));
                const batchResults = yield Promise.all(batchPromises);
                results.push(...batchResults);
                // Calculate current metrics
                if (responseTimes.length > 0) {
                    progress.averageResponseTime =
                        responseTimes.reduce((sum, time) => sum + time, 0) /
                            responseTimes.length;
                }
                // Log batch results
                if (logPerformance) {
                    const batchDuration = Date.now() - batchStartTime;
                    logger.info(`Completed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(concurrency / batchSize)}`, {
                        batchSize: currentBatchSize,
                        duration: batchDuration,
                        successRate: batchResults.filter((r) => r.success).length / currentBatchSize,
                        averageResponseTime: batchResults.reduce((sum, r) => sum + r.duration, 0) /
                            currentBatchSize,
                    });
                }
                // Delay between batches if needed
                if (delayBetweenBatches > 0 && i + batchSize < concurrency) {
                    yield new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
                }
            }
        });
        // Run the operations with timeout
        yield Promise.race([executeOperations(), timeoutPromise]);
        // Calculate final metrics
        const totalDuration = Date.now() - startTime;
        responseTimes.sort((a, b) => a - b);
        const p95Index = Math.floor(responseTimes.length * 0.95);
        const p99Index = Math.floor(responseTimes.length * 0.99);
        const finalResult = Object.assign(Object.assign({}, progress), { success: progress.failedOperations === 0, elapsedTime: totalDuration, percentComplete: 100, averageResponseTime: responseTimes.length
                ? responseTimes.reduce((sum, time) => sum + time, 0) /
                    responseTimes.length
                : 0, detailedMetrics: {
                maxResponseTime: responseTimes.length ? Math.max(...responseTimes) : 0,
                minResponseTime: responseTimes.length ? Math.min(...responseTimes) : 0,
                p95ResponseTime: responseTimes.length ? responseTimes[p95Index] : 0,
                p99ResponseTime: responseTimes.length ? responseTimes[p99Index] : 0,
                errorRate: progress.totalOperations
                    ? progress.failedOperations / progress.totalOperations
                    : 0,
                operationsPerSecond: (progress.totalOperations / totalDuration) * 1000,
                totalDuration,
                serverErrors,
                clientErrors,
                timeouts,
            } });
        logger.info(`Stress test completed`, {
            totalOperations: finalResult.totalOperations,
            successRate: finalResult.successfulOperations / finalResult.totalOperations,
            averageResponseTime: finalResult.averageResponseTime,
            duration: finalResult.elapsedTime,
            operationsPerSecond: finalResult.detailedMetrics.operationsPerSecond,
        });
        return finalResult;
    }
    catch (error) {
        const totalDuration = Date.now() - startTime;
        logger.error(`Stress test failed`, error, {
            completedOperations: progress.completedOperations,
            duration: totalDuration,
        });
        return Object.assign(Object.assign({}, progress), { success: false, elapsedTime: totalDuration, error, message: error instanceof Error
                ? error.message
                : "Unknown error during stress test", detailedMetrics: {
                maxResponseTime: responseTimes.length ? Math.max(...responseTimes) : 0,
                minResponseTime: responseTimes.length ? Math.min(...responseTimes) : 0,
                p95ResponseTime: 0,
                p99ResponseTime: 0,
                errorRate: progress.totalOperations
                    ? progress.failedOperations / progress.totalOperations
                    : 1,
                operationsPerSecond: (progress.completedOperations / totalDuration) * 1000,
                totalDuration,
                serverErrors,
                clientErrors,
                timeouts,
            } });
    }
});
/**
 * Run a performance test on a specific API endpoint
 * @param endpoint The API endpoint URL to test
 * @param method HTTP method to use
 * @param options Stress test configuration
 * @param payload Optional data to send with each request
 * @returns Promise that resolves to test results
 */
export const testApiEndpoint = (endpoint_1, ...args_1) => __awaiter(void 0, [endpoint_1, ...args_1], void 0, function* (endpoint, method = "GET", options, payload) {
    logger.info(`Testing API endpoint: ${method} ${endpoint}`, {
        method,
        endpoint,
        concurrency: options.concurrency,
        payload: payload ? true : false,
    });
    const operation = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(endpoint, Object.assign({ method, headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            } }, (payload && { body: JSON.stringify(payload) })));
        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
                message: `Request failed with status: ${response.status}`,
            };
        }
        return yield response.json();
    });
    return runStressTest(operation, options);
});
