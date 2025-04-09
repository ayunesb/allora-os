
import { useState, useCallback } from 'react';
import { FieldValues, UseFormReturn, FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';

type ServerValidationErrors = Record<string, string[]>;

interface UseFormErrorHandlerOptions {
  showToast?: boolean;
  logErrors?: boolean;
}

export function useFormErrorHandler<T extends FieldValues>(
  form: UseFormReturn<T>,
  options: UseFormErrorHandlerOptions = {}
) {
  const { showToast = true, logErrors = true } = options;
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  
  /**
   * Maps server-side validation errors to form fields
   */
  const handleServerValidationErrors = useCallback((
    errors: ServerValidationErrors
  ) => {
    // Clear existing errors first
    setServerErrors({});
    
    // Set field errors from server response
    Object.entries(errors).forEach(([field, messages]) => {
      if (messages && messages.length > 0) {
        form.setError(field as any, {
          type: 'server',
          message: messages[0]
        });
        
        setServerErrors(prev => ({
          ...prev,
          [field]: messages[0]
        }));
      }
    });
    
    if (logErrors) {
      logger.warn('Form validation errors:', errors);
    }
    
    if (showToast) {
      toast.error('Please correct the errors in the form');
    }
  }, [form, logErrors, showToast]);
  
  /**
   * Handle API or submission errors
   */
  const handleSubmissionError = useCallback((error: any) => {
    // Check if this is a validation error with field-specific messages
    if (error.code === 'VALIDATION_ERROR' && error.context?.fieldErrors) {
      handleServerValidationErrors(error.context.fieldErrors);
      return;
    }
    
    // Generic error handling
    if (showToast) {
      toast.error(error.message || 'An error occurred while submitting the form');
    }
    
    if (logErrors) {
      logger.error('Form submission error:', error);
    }
    
    // Set a generic form error
    form.setError('root.serverError', {
      type: 'server',
      message: error.message || 'An error occurred'
    });
    
    setServerErrors(prev => ({
      ...prev,
      form: error.message || 'An error occurred'
    }));
  }, [form, handleServerValidationErrors, logErrors, showToast]);
  
  /**
   * Get a single server error by field name
   */
  const getServerError = useCallback((field: string) => {
    return serverErrors[field];
  }, [serverErrors]);
  
  /**
   * Clear all server errors
   */
  const clearServerErrors = useCallback(() => {
    setServerErrors({});
  }, []);
  
  /**
   * Format client-side validation errors for logging
   */
  const formatClientErrors = useCallback((errors: FieldErrors<T>) => {
    return Object.entries(errors).reduce((acc, [key, value]) => {
      // Fixed type error by safely accessing the error message
      const message = value?.message;
      acc[key] = typeof message === 'string' ? message : 'Invalid value';
      return acc;
    }, {} as Record<string, string>);
  }, []);
  
  return {
    serverErrors,
    getServerError,
    clearServerErrors,
    handleServerValidationErrors,
    handleSubmissionError,
    formatClientErrors
  };
}
