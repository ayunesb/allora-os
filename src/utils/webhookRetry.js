import { logger } from '@/utils/loggingService';
/**
 * Helper to add jitter to retry delay to prevent thundering herd
 */
const addJitter = (delay) => {
    const jitterFactor = 0.2; // 20% jitter
    const jitterAmount = delay * jitterFactor;
    return delay + (Math.random() * jitterAmount * 2) - jitterAmount;
};
/**
 * Execute a single webhook call with improved error handling and logging
 */
export const executeWebhook = async (url, payload, type, eventType) => {
    try {
        // Log the request with security measures
        logger.info(`Executing ${type} webhook for event: ${eventType}`, {
            webhookType: type,
            eventType,
            targetUrl: url.replace(/\/[^/]*$/, '/***') // Redact the end of the URL for security
        });
        // Execute the webhook call with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        const startTime = performance.now();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
                mode: 'no-cors', // Use no-cors for cross-origin webhooks
            });
            const endTime = performance.now();
            const duration = endTime - startTime;
            logger.info(`Webhook execution completed in ${duration.toFixed(2)}ms`, {
                webhookType: type,
                eventType,
                duration
            });
            // Since we're using no-cors, we can't actually check the response status
            // Instead, we'll assume success unless there's an error thrown
            return {
                success: true,
                message: 'Webhook executed successfully (no-cors mode)',
                statusCode: 200,
                responseData: { mode: 'no-cors' },
                duration
            };
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    catch (error) {
        // Enhanced error handling with more context
        const errorDetails = {
            webhookType: type,
            eventType,
            errorType: error.name,
            errorMessage: error.message,
            stack: error.stack
        };
        // Check if this was an abort error (timeout)
        if (error.name === 'AbortError') {
            logger.warn(`Webhook execution timed out after 30 seconds`, errorDetails);
            return {
                success: false,
                message: 'Webhook execution timed out after 30 seconds',
                error: new Error('Timeout')
            };
        }
        // Network errors
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            logger.error(`Network error during webhook execution`, errorDetails);
            return {
                success: false,
                message: 'Network error: unable to reach webhook URL',
                error
            };
        }
        // Generic error fallback
        logger.error(`Webhook execution failed with error: ${error.message}`, errorDetails);
        return {
            success: false,
            message: error.message || 'Unknown error during webhook execution',
            error
        };
    }
};
/**
 * Execute a webhook with enhanced retry logic and performance monitoring
 */
export const executeWithRetry = async (url, payload, type, eventType, options = {}) => {
    const { maxRetries = 3, initialDelay = 1000, backoffFactor = 2, maxDelay = 30000, jitter = true, onRetry = () => { } } = options;
    let attempt = 0;
    let lastError;
    // Create a performance span for the entire retry operation
    const retrySpan = logger.time(`webhook_retry_${type}_${eventType}`, {
        webhookType: type,
        eventType,
        maxRetries
    });
    while (attempt <= maxRetries) {
        try {
            // Attempt to execute the webhook
            const result = await executeWebhook(url, payload, type, eventType);
            // If successful, return the result
            if (result.success) {
                if (attempt > 0) {
                    logger.info(`Successfully executed ${type} webhook after ${attempt} retries`);
                }
                // Close the performance span
                retrySpan();
                return result;
            }
            // If not successful but no error was thrown, still consider it an error
            if (result.error) {
                lastError = result.error;
            }
            else {
                lastError = new Error(result.message || 'Webhook execution failed');
            }
            // If we're out of retries, throw the last error
            if (attempt >= maxRetries) {
                throw lastError;
            }
        }
        catch (error) {
            lastError = error;
            // If we're out of retries, throw the error
            if (attempt >= maxRetries) {
                throw error;
            }
        }
        // Calculate delay with exponential backoff
        const delay = Math.min(initialDelay * Math.pow(backoffFactor, attempt), maxDelay);
        const actualDelay = jitter ? addJitter(delay) : delay;
        // Call onRetry callback
        onRetry(attempt + 1, actualDelay, lastError);
        // Log retry attempt with more context
        logger.warn(`Retrying ${type} webhook, attempt ${attempt + 1} of ${maxRetries} after ${actualDelay}ms delay`, {
            webhookType: type,
            eventType,
            attempt: attempt + 1,
            delay: actualDelay,
            error: lastError?.message,
            retryStrategy: 'exponential_backoff_with_jitter'
        });
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, actualDelay));
        attempt++;
    }
    // Close the performance span
    retrySpan();
    // We should never reach here, but if we do, return a failure
    return {
        success: false,
        message: lastError?.message || 'Maximum retries exceeded',
        error: lastError
    };
};
