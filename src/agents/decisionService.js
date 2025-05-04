import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';
export async function getExecutiveDecisions() {
    try {
        const { data, error } = await supabase
            .from('executive_decisions')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        return (data || []).map(item => ({
            id: item.id,
            executiveName: item.executive_name,
            executiveRole: item.executive_role,
            task: item.task,
            options: item.options,
            selectedOption: item.selected_option,
            reasoning: item.reasoning,
            riskAssessment: item.risk_assessment,
            timestamp: item.created_at,
            priority: item.priority
        }));
    }
    catch (error) {
        logger.error('Failed to get executive decisions from database', error);
        return [];
    }
}
export async function saveDecisionToDatabase(decision) {
    try {
        const { data, error } = await supabase
            .from('executive_decisions')
            .insert([
            {
                executive_name: decision.executiveName,
                executive_role: decision.executiveRole,
                task: decision.task,
                options: decision.options,
                selected_option: decision.selectedOption,
                reasoning: decision.reasoning,
                risk_assessment: decision.riskAssessment,
                priority: decision.priority,
                created_at: decision.timestamp
            }
        ])
            .select();
        if (error) {
            throw error;
        }
        return data?.[0]?.id || null;
    }
    catch (error) {
        logger.error('Failed to save executive decision to database', error, {
            executiveName: decision.executiveName,
            task: decision.task
        });
        return null;
    }
}
