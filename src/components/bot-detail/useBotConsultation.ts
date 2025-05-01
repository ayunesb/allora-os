
// Fix the useBotConsultation hook to handle reply correctly
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export const useBotConsultation = (botId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const { user } = useAuth();

  const sendConsultation = useCallback(
    async (prompt: string) => {
      if (!user) {
        setError('You must be logged in to consult with bots');
        return null;
      }

      if (!botId) {
        setError('Invalid bot selected');
        return null;
      }

      setIsLoading(true);
      setError(null);
      setResponse(null);

      try {
        // Call the Supabase edge function for bot consultation
        const { data, error } = await supabase.functions.invoke('bot-consultation', {
          body: {
            botId,
            userId: user.id,
            prompt,
          },
        });

        if (error) {
          console.error('Bot consultation error:', error);
          setError(error.message || 'Failed to get response from bot');
          toast.error('Bot consultation failed', {
            description: error.message || 'Unable to process your request',
          });
          return null;
        }

        // Fix the data.reply access
        let botResponse = '';
        if (data && typeof data === 'object') {
          if ('reply' in data) {
            botResponse = data.reply as string;
          } else if (data.data && typeof data.data === 'object' && 'reply' in data.data) {
            botResponse = data.data.reply as string;
          }
        }

        if (!botResponse) {
          throw new Error('Invalid response format from bot');
        }

        setResponse(botResponse);
        return botResponse;
      } catch (err: any) {
        console.error('Bot consultation error:', err);
        setError(err.message || 'An unexpected error occurred');
        toast.error('Bot consultation failed', {
          description: err.message || 'Unable to process your request',
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [botId, user]
  );

  return {
    sendConsultation,
    isLoading,
    error,
    response,
  };
};

export default useBotConsultation;
