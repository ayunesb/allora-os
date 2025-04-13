
import { logger } from '@/utils/loggingService';
import { WebhookType } from '@/utils/webhookValidation';

interface RetryOptions {
  maxRetries: number;
  initialDelay: number; // in milliseconds
  maxDelay?: number; // in milliseconds
  backoffFactor?: number; // exponential backoff multiplier
  retryCondition?: (error: any) => boolean; // custom condition to determine if retry is needed
  onRetry?: (attempt: number, delay: number, error: any) => void; // callback for retry attempts
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 30000, // 30 seconds
  backoffFactor: 2, // exponential backoff
  retryCondition: (error) => {
    // By default, retry on network errors or 5xx status codes
    if (!error) return false;
    
    if (error.name === 'NetworkError' || error.name === 'TimeoutError') return true;
    
    // Retry on certain status codes
    if (error.status && (error.status >= 500 || error.status === 429)) return true;
    
    return false;
  }
};

/**
 * Executes a webhook with automatic retries using exponential backoff
 * @param webhookUrl The URL of the webhook to call
 * @param payload The data to send to the webhook
 * @param type The type of webhook service
 * @param eventType Custom event type description
 * @param options Retry configuration options
 * @returns Promise with the result of the webhook call
 */
export const executeWithRetry = async (
  webhookUrl: string,
  payload: any,
  type: WebhookType,
  eventType: string = 'webhook_call',
  options: Partial<RetryOptions> = {}
): Promise<{ success: boolean; message?: string; eventId?: string }> => {
  // Merge default options with provided options
  const retryOptions: RetryOptions = { ...DEFAULT_RETRY_OPTIONS, ...options };
  
  // Start timer for logging purposes
  const startTime = Date.now();
  let attempt = 0;
  let lastError: any = null;
  
  // Generate a consistent event ID for logging across retries
  const eventId = `wh_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  
  // Log initial attempt
  logger.info(`Starting webhook call to ${type}`, {
    webhookType: type,
    eventType,
    eventId,
    url: webhookUrl
  });
  
  while (attempt <= retryOptions.maxRetries) {
    try {
      if (attempt > 0) {
        // Log retry attempt
        logger.info(`Retry attempt ${attempt} for webhook ${type}`, {
          webhookType: type,
          eventType,
          eventId,
          attempt
        });
      }
      
      // Make the webhook call
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Use conditional mode to handle CORS for services like Zapier
        mode: type === 'zapier' ? 'no-cors' : undefined,
        body: JSON.stringify({
          ...payload,
          _metadata: {
            eventId,
            timestamp: new Date().toISOString(),
            attempt: attempt + 1,
            retryCount: attempt
          }
        }),
      });
      
      // For Zapier with no-cors, we can't read the response
      if (type === 'zapier' && response.type === 'opaque') {
        // Log success with caveat
        logger.info(`Webhook call to ${type} completed (opaque response due to CORS)`, {
          webhookType: type,
          eventType,
          eventId,
          duration: Date.now() - startTime,
          attemptCount: attempt + 1
        });
        
        return {
          success: true,
          message: "Request sent successfully. Note: Due to CORS restrictions, we cannot confirm receipt - check your service dashboard.",
          eventId
        };
      }
      
      // For regular responses, check the status
      if (!response.ok) {
        throw {
          status: response.status,
          statusText: response.statusText,
          message: `HTTP error ${response.status}: ${response.statusText}`
        };
      }
      
      // Try to parse the response JSON
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        // Not all webhooks return JSON
        responseData = { success: true };
      }
      
      // Log success
      logger.info(`Webhook call to ${type} completed successfully`, {
        webhookType: type,
        eventType,
        eventId,
        duration: Date.now() - startTime,
        attemptCount: attempt + 1,
        responseStatus: response.status
      });
      
      return {
        success: true,
        message: "Webhook triggered successfully",
        eventId
      };
      
    } catch (error) {
      lastError = error;
      
      // Check if we should retry based on the error
      const shouldRetry = attempt < retryOptions.maxRetries && 
                          (retryOptions.retryCondition ? retryOptions.retryCondition(error) : true);
      
      if (!shouldRetry) {
        // Log final failure
        logger.error(`Webhook call to ${type} failed permanently`, {
          webhookType: type,
          eventType,
          eventId,
          error: error instanceof Error ? error.message : JSON.stringify(error),
          duration: Date.now() - startTime,
          attemptCount: attempt + 1
        });
        
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        retryOptions.initialDelay * Math.pow(retryOptions.backoffFactor || 1, attempt),
        retryOptions.maxDelay || Number.POSITIVE_INFINITY
      );
      
      // Log retry scheduled
      logger.warn(`Webhook call to ${type} failed, scheduling retry in ${delay}ms`, {
        webhookType: type,
        eventType,
        eventId,
        error: error instanceof Error ? error.message : JSON.stringify(error),
        attempt: attempt + 1,
        nextRetryDelay: delay
      });
      
      // Execute onRetry callback if provided
      if (retryOptions.onRetry) {
        retryOptions.onRetry(attempt + 1, delay, error);
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
  
  // All retries failed
  return {
    success: false,
    message: lastError instanceof Error ? lastError.message : 
             (lastError?.message || "Failed to execute webhook after multiple retries"),
    eventId
  };
};

/**
 * Improved webhook execution function with automatic retry
 * Replaces the previous executeAndLogWebhook function
 */
export const executeWebhook = async (
  url: string,
  payload: any,
  type: WebhookType,
  eventType: string = 'webhook_call',
  options: Partial<RetryOptions> = {}
) => {
  return executeWithRetry(url, payload, type, eventType, options);
};
