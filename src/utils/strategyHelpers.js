import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { assessRiskLevel } from '@/utils/riskEngine';
export async function fetchCompanyStrategies(companyId) {
    try {
        const { data, error } = await supabase
            .from('strategies')
            .select('*')
            .eq('company_id', companyId)
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        // Cast the data to ensure it matches the Strategy type
        return (data || []).map(strategy => ({
            ...strategy,
            riskLevel: strategy.risk_level
        }));
    }
    catch (error) {
        console.error('Error fetching strategies:', error.message);
        return [];
    }
}
export async function fetchStrategy(strategyId) {
    try {
        const { data, error } = await supabase
            .from('strategies')
            .select('*')
            .eq('id', strategyId)
            .single();
        if (error) {
            throw error;
        }
        // Cast the data to ensure it matches the Strategy type
        return data ? {
            ...data,
            riskLevel: data.risk_level
        } : null;
    }
    catch (error) {
        console.error('Error fetching strategy:', error.message);
        return null;
    }
}
export async function createStrategy(companyId, title, description, riskLevel) {
    try {
        const { data, error } = await supabase
            .from('strategies')
            .insert([
            {
                company_id: companyId,
                title,
                description,
                risk_level: riskLevel
            }
        ])
            .select()
            .single();
        if (error) {
            throw error;
        }
        toast.success('Strategy created successfully');
        // Cast the data to ensure it matches the Strategy type
        return data ? {
            ...data,
            risk_level: data.risk_level
        } : null;
    }
    catch (error) {
        toast.error(`Failed to create strategy: ${error.message}`);
        return null;
    }
}
export async function generateStrategyFromAnswers(companyId, answers) {
    const riskLevel = assessRiskLevel(answers);
    // Create a basic strategy template instead of using generateStrategy
    const strategyTitle = `${riskLevel} Risk Growth Strategy`;
    const strategyDescription = `This is a ${riskLevel.toLowerCase()} risk strategy generated based on your business profile and risk assessment.`;
    // Now create the strategy with the basic template
    return await createStrategy(companyId, strategyTitle, strategyDescription, riskLevel);
}
export async function updateStrategy(strategyId, updates) {
    try {
        const { error } = await supabase
            .from('strategies')
            .update(updates)
            .eq('id', strategyId);
        if (error) {
            throw error;
        }
        toast.success('Strategy updated successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to update strategy: ${error.message}`);
        return false;
    }
}
export async function deleteStrategy(strategyId) {
    try {
        const { error } = await supabase
            .from('strategies')
            .delete()
            .eq('id', strategyId);
        if (error) {
            throw error;
        }
        toast.success('Strategy deleted successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to delete strategy: ${error.message}`);
        return false;
    }
}
