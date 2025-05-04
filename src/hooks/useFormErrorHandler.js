import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
export function useFormErrorHandler(form, options = {}) {
    const { showToast = true, logErrors = true } = options;
    const [serverErrors, setServerErrors] = useState({});
    /**
     * Maps server-side validation errors to form fields
     */
    const handleServerValidationErrors = useCallback((errors) => {
        // Clear existing errors first
        setServerErrors({});
        // Set field errors from server response
        Object.entries(errors).forEach(([field, messages]) => {
            if (messages && messages.length > 0) {
                form.setError(field, {
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
    const handleSubmissionError = useCallback((error) => {
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
    const getServerError = useCallback((field) => {
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
    const formatClientErrors = useCallback((errors) => {
        return Object.entries(errors).reduce((acc, [key, value]) => {
            // Fixed type error by safely accessing the error message
            const message = value?.message;
            acc[key] = typeof message === 'string' ? message : 'Invalid value';
            return acc;
        }, {});
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
