import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useAIExecutiveDebate() {
    const [isLoading, setIsLoading] = useState(false);
    const [debate, setDebate] = useState(null);
    const [error, setError] = useState(null);
    const generateDebate = async (topic, companyContext, selectedExecutives) => {
        setIsLoading(true);
        setError(null);
        try {
            // Make sure we have at least 2 executives
            if (selectedExecutives.length < 2) {
                throw new Error('Please select at least 2 executives for the debate');
            }
            // Call our Supabase Edge Function
            const { data, error } = await supabase.functions.invoke('ai-executive-debate', {
                body: {
                    topic,
                    companyContext,
                    executives: selectedExecutives
                }
            });
            if (error) {
                throw new Error(`Function error: ${error.message}`);
            }
            if (data.error) {
                throw new Error(data.error);
            }
            setDebate(data.debate);
            toast.success('AI executive debate generated successfully');
            return data.debate;
        }
        catch (err) {
            console.error('Error generating AI executive debate:', err);
            const errorMessage = err.message || 'Failed to generate debate';
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        generateDebate,
        isLoading,
        debate,
        error
    };
}
