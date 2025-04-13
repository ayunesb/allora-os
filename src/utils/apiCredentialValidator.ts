import { logger } from '@/utils/loggingService';

export type APIServiceType = 
  | 'stripe' 
  | 'zapier'
  | 'twilio'
  | 'postmark'
  | 'heygen'
  | 'shopify'
  | 'openai'
  | 'custom';

interface ValidationOptions {
  /**
   * Whether to log validation attempts
   */
  logAttempts?: boolean;
  
  /**
   * Whether to redact sensitive information in logs
   */
  redactSensitive?: boolean;
  
  /**
   * Custom validation logic for specific API types
   */
  customValidation?: (credential: string, type: APIServiceType) => Promise<boolean>;
}

/**
 * Pattern-based validation of common API credential formats
 */
const validatePattern = (credential: string, type: APIServiceType): boolean => {
  if (!credential || typeof credential !== 'string' || credential.trim() === '') {
    return false;
  }
  
  // Basic pattern validations based on known API key formats
  switch (type) {
    case 'stripe':
      // Stripe secret keys start with 'sk_' followed by 'test_' or 'live_'
      return /^sk_(test|live)_[A-Za-z0-9]{24,}$/.test(credential);
      
    case 'openai':
      // OpenAI API keys start with 'sk-' followed by alphanumeric characters
      return /^sk-[A-Za-z0-9]{32,}$/.test(credential);
      
    case 'twilio':
      // Twilio auth tokens are 32-character strings
      return /^[A-Za-z0-9]{32}$/.test(credential);
      
    case 'postmark':
      // Postmark server tokens are alphanumeric strings
      return /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(credential);
      
    case 'zapier':
      // Zapier webhook URLs should be valid URLs containing hooks.zapier.com
      try {
        const url = new URL(credential);
        return url.hostname.includes('hooks.zapier.com');
      } catch {
        return false;
      }
      
    case 'shopify':
      // Shopify access tokens are alphanumeric strings
      return /^shpat_[A-Za-z0-9]{32,}$/.test(credential);
      
    case 'heygen':
      // HeyGen API keys (validate basic format)
      return /^[A-Za-z0-9]{40,}$/.test(credential);
      
    case 'custom':
      // For custom APIs, we just check if it's a non-empty string
      return credential.trim().length > 0;
      
    default:
      // Generic validation for unknown API types
      return credential.trim().length > 10;
  }
};

/**
 * Redacts sensitive information for logging
 */
const redactCredential = (credential: string): string => {
  if (!credential) return '';
  
  // Keep first and last 4 characters, redact the rest
  if (credential.length <= 8) {
    return '*'.repeat(credential.length);
  }
  
  return `${credential.substring(0, 4)}${'*'.repeat(credential.length - 8)}${credential.substring(credential.length - 4)}`;
};

/**
 * Validates an API credential for a specific service
 * @param credential The API key, token, or URL to validate
 * @param type The type of API service
 * @param options Validation options
 * @returns Promise that resolves to true if the credential is valid
 */
export const validateApiCredential = async (
  credential: string,
  type: APIServiceType,
  options: ValidationOptions = {}
): Promise<boolean> => {
  const { 
    logAttempts = true, 
    redactSensitive = true,
    customValidation
  } = options;
  
  try {
    // Log validation attempt if enabled
    if (logAttempts) {
      const logValue = redactSensitive ? redactCredential(credential) : credential;
      logger.info(`Validating API credential for service: ${type}`, {
        service: type,
        credential: logValue,
        validationType: customValidation ? 'custom+pattern' : 'pattern'
      });
    }
    
    // Step 1: Perform basic pattern validation
    const isPatternValid = validatePattern(credential, type);
    
    if (!isPatternValid) {
      logger.warn(`API credential for ${type} failed pattern validation`, { service: type });
      return false;
    }
    
    // Step 2: Perform custom validation if provided
    if (customValidation) {
      const isCustomValid = await customValidation(credential, type);
      
      if (logAttempts) {
        if (isCustomValid) {
          logger.info(`API credential for ${type} passed custom validation`, { service: type });
        } else {
          logger.warn(`API credential for ${type} failed custom validation`, { service: type });
        }
      }
      
      return isCustomValid;
    }
    
    return true;
  } catch (error) {
    logger.error(`Error validating API credential for ${type}`, {
      service: type,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
};

/**
 * Makes a test API call to validate credentials
 * @param credential The API credential to test
 * @param type The type of API service
 * @returns Promise that resolves to true if the test call succeeded
 */
export const testApiCredential = async (
  credential: string,
  type: APIServiceType
): Promise<{ valid: boolean; message?: string }> => {
  try {
    // Basic pattern validation first
    const isPatternValid = validatePattern(credential, type);
    if (!isPatternValid) {
      return { 
        valid: false, 
        message: `Invalid format for ${type} credential` 
      };
    }
    
    // Implement API-specific test calls
    switch (type) {
      case 'stripe':
        // For Stripe, we would make a simple API call to list a customer
        // This would be handled in an edge function in a real implementation
        return { 
          valid: true, 
          message: "Stripe credential format is valid. To fully verify, use in an edge function." 
        };
        
      case 'zapier':
        // For Zapier webhooks, try a simple test POST
        try {
          const response = await fetch(credential, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors', // To avoid CORS issues
            body: JSON.stringify({ test: true, timestamp: new Date().toISOString() })
          });
          
          return { 
            valid: true, 
            message: "Zapier webhook URL format is valid and a test call was attempted. Check your Zap to verify it received data." 
          };
        } catch (error) {
          return { 
            valid: false, 
            message: "Zapier webhook URL format is valid but the test call failed." 
          };
        }
        
      case 'twilio':
      case 'postmark':
      case 'heygen':
      case 'shopify':
      case 'openai':
        // These would require secure edge functions to test
        return { 
          valid: true, 
          message: `${type} credential format is valid. To fully verify, test in an edge function.` 
        };
        
      default:
        return { 
          valid: true, 
          message: "Credential format is valid but no specific test is implemented for this service type." 
        };
    }
  } catch (error) {
    logger.error(`Error testing API credential for ${type}`, {
      service: type,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { 
      valid: false, 
      message: `Error testing credential: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};
