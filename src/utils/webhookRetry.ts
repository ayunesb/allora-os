
import { WebhookType } from './webhookValidation';
import { logger } from '@/utils/loggingService';
import { WebhookResult } from './webhookUtils';

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffFactor?: number;
  maxDelay?: number;
  jitter?: boolean;
  onRetry?: (attempt: number, delay: number, error?: Error) => void;
}

/**
 * Helper to add jitter to retry delay to prevent thundering herd
 */
const addJitter = (delay: number): number => {
  const jitterFactor = 0.2; // 20% jitter
  const jitterAmount = delay * jitterFactor;
  return delay + (Math.random() * jitterAmount * 2) - jitterAmount;
};

/**
 * Execute a single webhook call
 */
export const executeWebhook = async (
  url: string, 
  payload: any,
  type: WebhookType,
  eventType: string
): Promise<WebhookResult> => {
  try {
    // Log the request
    logger.info(`Executing ${type} webhook for event: ${eventType}`, {
      webhookType: type,
      eventType,
      targetUrl: url.replace(/\/[^/]*$/, '/***') // Redact the end of the URL for security
    });

    // Execute the webhook call with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      mode: 'no-cors', // Use no-cors for cross-origin webhooks
    });
    
    clearTimeout(timeoutId);
    
    // Since we're using no-cors, we can't actually check the response status
    // Instead, we'll assume success unless there's an error thrown
    return {
      success: true,
      message: 'Webhook executed successfully (no-cors mode)',
      statusCode: 200,
      responseData: { mode: 'no-cors' }
    };
  } catch (error: any) {
    // Check if this was an abort error (timeout)
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Webhook execution timed out after 30 seconds',
        error: new Error('Timeout')
      };
    }
    
    return {
      success: false,
      message: error.message || 'Unknown error during webhook execution',
      error
    };
  }
};

/**
 * Execute a webhook with retry logic
 */
export const executeWithRetry = async (
  url: string,
  payload: any,
  type: WebhookType,
  eventType: string,
  options: RetryOptions = {}
): Promise<WebhookResult> => {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    backoffFactor = 2,
    maxDelay = 30000,
    jitter = true,
    onRetry = () => {}
  } = options;
  
  let attempt = 0;
  let lastError: Error | undefined;
  
  while (attempt <= maxRetries) {
    try {
      // Attempt to execute the webhook
      const result = await executeWebhook(url, payload, type, eventType);
      
      // If successful, return the result
      if (result.success) {
        if (attempt > 0) {
          logger.info(`Successfully executed ${type} webhook after ${attempt} retries`);
        }
        return result;
      }
      
      // If not successful but no error was thrown, still consider it an error
      if (result.error) {
        lastError = result.error;
      } else {
        lastError = new Error(result.message || 'Webhook execution failed');
      }
      
      // If we're out of retries, throw the last error
      if (attempt >= maxRetries) {
        throw lastError;
      }
      
    } catch (error: any) {
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
    
    // Log retry attempt
    logger.warn(`Retrying ${type} webhook, attempt ${attempt + 1} of ${maxRetries} after ${actualDelay}ms delay`, {
      webhookType: type,
      eventType,
      attempt: attempt + 1,
      delay: actualDelay,
      error: lastError?.message
    });
    
    // Wait before retrying
    await new Promise(resolve => setTimeout(resolve, actualDelay));
    attempt++;
  }
  
  // We should never reach here, but if we do, return a failure
  return {
    success: false,
    message: lastError?.message || 'Maximum retries exceeded',
    error: lastError
  };
};
