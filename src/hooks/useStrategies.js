import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/backend/supabase';
import { handleApiError } from '@/utils/api/errorHandling';
export function useStrategies() {
    const [strategies, setStrategies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useAuthState();
    const { profile } = useAuth();
    const fetchStrategies = useCallback(async () => {
        if (!profile?.company_id) {
            setStrategies([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Query strategies by company_id instead of user_id
            const { data, error } = await supabase
                .from('strategies')
                .select('*')
                .eq('company_id', profile.company_id)
                .order('created_at', { ascending: false });
            if (error) {
                throw error;
            }
            // If there's no data yet, create demo strategies with AI executive attribution
            if (!data || data.length === 0) {
                const demoStrategies = generateDemoStrategies(profile.company_id, profile?.industry);
                setStrategies(demoStrategies);
            }
            else {
                // Add executive attribution if missing
                const strategiesWithExecs = data.map((strategy) => {
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
        }
        catch (err) {
            console.error('Error fetching strategies:', err);
            setError(err);
            // Don't show toast for initial load to avoid duplicate error messages
            // The error state will be displayed in the UI
        }
        finally {
            setIsLoading(false);
        }
    }, [profile?.company_id, profile?.industry]);
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
    const generateDemoStrategies = (companyId, industry) => {
        // Customize demo strategies based on industry
        const industryName = industry || 'Technology';
        return [
            {
                id: 'demo-1',
                title: `${industryName} Market Expansion`,
                description: `Strategically expand into adjacent ${industryName.toLowerCase()} markets where existing capabilities can be leveraged with minimal additional investment.`,
                company_id: companyId,
                risk: 'Medium',
                riskLevel: 'Medium',
                risk_level: 'Medium',
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
                company_id: companyId,
                risk: 'Low',
                riskLevel: 'Low',
                risk_level: 'Low',
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
                company_id: companyId,
                risk: 'High',
                riskLevel: 'High',
                risk_level: 'High',
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
    const createStrategy = useCallback(async (strategyData) => {
        if (!profile?.company_id) {
            toast.error('Company profile not found');
            return null;
        }
        setIsCreating(true);
        try {
            // Add executive attribution if not provided
            const executiveBot = strategyData.executiveBot || getRandomExecutive();
            // Ensure both risk and riskLevel are set for compatibility
            const riskValue = strategyData.risk || strategyData.riskLevel || strategyData.risk_level || 'Medium';
            const { data, error } = await supabase
                .from('strategies')
                .insert([
                {
                    ...strategyData,
                    company_id: profile.company_id,
                    risk: riskValue,
                    riskLevel: riskValue,
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
        }
        catch (err) {
            console.error('Error creating strategy:', err);
            handleApiError(err, { customMessage: 'Failed to create strategy' });
            return null;
        }
        finally {
            setIsCreating(false);
        }
    }, [profile?.company_id, fetchStrategies]);
    const updateStrategy = useCallback(async (strategyId, updates) => {
        if (!profile?.company_id) {
            toast.error('Company profile not found');
            return false;
        }
        setIsUpdating(true);
        try {
            // Ensure risk field is updated when riskLevel changes
            if (updates.riskLevel && !updates.risk) {
                updates.risk = updates.riskLevel;
            }
            else if (updates.risk && !updates.riskLevel) {
                updates.riskLevel = updates.risk;
            }
            const { error } = await supabase
                .from('strategies')
                .update(updates)
                .eq('id', strategyId)
                .eq('company_id', profile.company_id);
            if (error) {
                throw error;
            }
            toast.success('Strategy updated successfully');
            // Update the local state
            setStrategies(prev => prev.map(strategy => strategy.id === strategyId ? { ...strategy, ...updates } : strategy));
            return true;
        }
        catch (err) {
            console.error('Error updating strategy:', err);
            handleApiError(err, { customMessage: 'Failed to update strategy' });
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    }, [profile?.company_id]);
    const deleteStrategy = useCallback(async (strategyId) => {
        if (!profile?.company_id) {
            toast.error('Company profile not found');
            return false;
        }
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('strategies')
                .delete()
                .eq('id', strategyId)
                .eq('company_id', profile.company_id); // Filter by company_id instead of user_id
            if (error) {
                throw error;
            }
            toast.success('Strategy deleted successfully');
            // Update the local state
            setStrategies(prev => prev.filter(strategy => strategy.id !== strategyId));
            return true;
        }
        catch (err) {
            console.error('Error deleting strategy:', err);
            handleApiError(err, { customMessage: 'Failed to delete strategy' });
            return false;
        }
        finally {
            setIsDeleting(false);
        }
    }, [profile?.company_id]);
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
        refetch: fetchStrategies
    };
}
