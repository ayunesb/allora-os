import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
import { toast } from 'sonner';
import { sanitizeInput } from '@/utils/sanitizers';
export function useClearbitTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Look up company information by domain
     */
    const lookupCompany = async (domain) => {
        setIsLoading(true);
        setError(null);
        try {
            const sanitizedDomain = sanitizeInput(domain);
            logger.info('Looking up company information', { domain: sanitizedDomain });
            const { data, error } = await supabase.functions.invoke('clearbit-lookup', {
                body: { type: 'company', query: sanitizedDomain }
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to look up company information';
            logger.error('Error looking up company information', err);
            setError(message);
            toast.error('Failed to fetch company data', { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };
    /**
     * Look up person information by email
     */
    const lookupPerson = async (email) => {
        setIsLoading(true);
        setError(null);
        try {
            const sanitizedEmail = sanitizeInput(email);
            logger.info('Looking up person information', { email: sanitizedEmail });
            const { data, error } = await supabase.functions.invoke('clearbit-lookup', {
                body: { type: 'person', query: sanitizedEmail }
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to look up person information';
            logger.error('Error looking up person information', err);
            setError(message);
            toast.error('Failed to fetch person data', { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        lookupCompany,
        lookupPerson,
        isLoading,
        error
    };
}
