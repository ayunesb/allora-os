
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
import { toast } from 'sonner';
import { sanitizeInput } from '@/utils/sanitizers';

export function usePlaidTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get account balances from Plaid
   */
  const getAccountBalances = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Fetching Plaid account balances');
      
      const { data, error } = await supabase.functions.invoke('plaid-tool', {
        body: { action: 'get_balances' }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch Plaid account balances';
      logger.error('Error fetching Plaid account balances', err);
      setError(message);
      toast.error('Failed to fetch balances', { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get recent transactions from Plaid
   */
  const getRecentTransactions = async (days = 7) => {
    setIsLoading(true);
    setError(null);
    
    try {
      logger.info('Fetching Plaid recent transactions', { days });
      
      const { data, error } = await supabase.functions.invoke('plaid-tool', {
        body: { 
          action: 'get_transactions',
          days: sanitizeInput(days.toString())
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data.result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch Plaid transactions';
      logger.error('Error fetching Plaid transactions', err);
      setError(message);
      toast.error('Failed to fetch transactions', { description: message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAccountBalances,
    getRecentTransactions,
    isLoading,
    error
  };
}
