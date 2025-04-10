
import { useState, useEffect, useCallback } from 'react';
import { Strategy } from '@/models/strategy';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/backend/supabase';

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthState();
  const { profile } = useAuth();

  const fetchStrategies = useCallback(async () => {
    if (!user) {
      setStrategies([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // If there's no data yet, create demo strategies with AI executive attribution
      if (!data || data.length === 0) {
        const demoStrategies = generateDemoStrategies(user.id, profile?.industry);
        setStrategies(demoStrategies);
      } else {
        // Add executive attribution if missing
        const strategiesWithExecs = data.map((strategy: Strategy) => {
          if (!strategy.executiveBot) {
            return {
              ...strategy,
              executiveBot: getRandomExecutive()
            };
          }
          return strategy;
        });
        
        setStrategies(strategiesWithExecs);
      }
    } catch (err: any) {
      console.error('Error fetching strategies:', err);
      setError(err);
      toast.error('Failed to load strategies');
    } finally {
      setIsLoading(false);
    }
  }, [user, profile?.industry]);

  const getRandomExecutive = () => {
    const executives = [
      "Elon Musk",
      "Steve Jobs",
      "Jeff Bezos",
      "Warren Buffett",
      "Satya Nadella",
      "Bill Gates",
      "Tim Cook"
    ];
    return executives[Math.floor(Math.random() * executives.length)];
  };

  const generateDemoStrategies = (userId: string, industry?: string): Strategy[] => {
    // Customize demo strategies based on industry
    const industryName = industry || 'Technology';
    
    return [
      {
        id: 'demo-1',
        title: `${industryName} Market Expansion`,
        description: `Strategically expand into adjacent ${industryName.toLowerCase()} markets where existing capabilities can be leveraged with minimal additional investment.`,
        user_id: userId,
        riskLevel: 'Medium',
        tags: ['growth', 'expansion'],
        created_at: new Date().toISOString(),
        executiveBot: 'Elon Musk',
        impact: 'High',
        timeframe: '6-12 months'
      },
      {
        id: 'demo-2',
        title: 'Operational Excellence Program',
        description: 'Implement a systematic review of all operational processes to identify and eliminate inefficiencies, reduce costs, and improve quality.',
        user_id: userId,
        riskLevel: 'Low',
        tags: ['operations', 'efficiency'],
        created_at: new Date(Date.now() - 86400000).toISOString(),
        executiveBot: 'Tim Cook',
        impact: 'Medium',
        timeframe: '3-6 months'
      },
      {
        id: 'demo-3',
        title: 'Strategic Innovation Initiative',
        description: 'Establish a dedicated innovation lab to explore disruptive technologies and business models that could create new revenue streams.',
        user_id: userId,
        riskLevel: 'High',
        tags: ['innovation', 'growth'],
        created_at: new Date(Date.now() - 172800000).toISOString(),
        executiveBot: 'Steve Jobs',
        impact: 'Very High',
        timeframe: '12-18 months'
      }
    ];
  };

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  const createStrategy = useCallback(async (strategyData: Omit<Strategy, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) {
      toast.error('You must be logged in to create a strategy');
      return null;
    }

    setIsCreating(true);

    try {
      // Add executive attribution if not provided
      const executiveBot = strategyData.executiveBot || getRandomExecutive();
      
      const { data, error } = await supabase
        .from('strategies')
        .insert([
          {
            ...strategyData,
            user_id: user.id,
            executiveBot,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast.success('Strategy created successfully');
      
      if (data && data.length > 0) {
        setStrategies(prev => [data[0], ...prev]);
        return data[0];
      }
      
      // Refetch to ensure we have the latest data
      fetchStrategies();
      return null;
    } catch (err: any) {
      console.error('Error creating strategy:', err);
      toast.error('Failed to create strategy');
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [user, fetchStrategies]);

  const updateStrategy = useCallback(async (strategyId: string, updates: Partial<Omit<Strategy, 'id' | 'user_id' | 'created_at'>>) => {
    if (!user) {
      toast.error('You must be logged in to update a strategy');
      return false;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('strategies')
        .update(updates)
        .eq('id', strategyId)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Strategy updated successfully');
      
      // Update the local state
      setStrategies(prev => 
        prev.map(strategy => 
          strategy.id === strategyId ? { ...strategy, ...updates } : strategy
        )
      );
      
      return true;
    } catch (err: any) {
      console.error('Error updating strategy:', err);
      toast.error('Failed to update strategy');
      return false;
    } finally {
      setIsUpdating(false);
    }
  }, [user]);

  const deleteStrategy = useCallback(async (strategyId: string) => {
    if (!user) {
      toast.error('You must be logged in to delete a strategy');
      return false;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', strategyId)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Strategy deleted successfully');
      
      // Update the local state
      setStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
      
      return true;
    } catch (err: any) {
      console.error('Error deleting strategy:', err);
      toast.error('Failed to delete strategy');
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [user]);

  const refetch = useCallback(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  return {
    strategies,
    isLoading,
    error,
    createStrategy,
    isCreating,
    updateStrategy,
    isUpdating,
    deleteStrategy,
    isDeleting,
    refetch
  };
}
