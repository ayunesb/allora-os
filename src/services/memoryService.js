import { supabase } from '@/integrations/supabase/client';
/**
 * Save an executive decision to memory
 */
export async function saveDecisionToMemory(userId, decision) {
    try {
        const { error } = await supabase.from('executive_memory').insert({
            user_id: userId,
            executive_name: decision.executiveName,
            task: decision.task,
            decision: decision.selectedOption,
            timestamp: new Date().toISOString()
        });
        if (error) {
            console.error('Error saving decision to memory:', error);
            return false;
        }
        console.log('Decision saved to memory successfully');
        return true;
    }
    catch (error) {
        console.error('Failed to save decision to memory:', error);
        return false;
    }
}
/**
 * Fetch recent memories for an executive
 */
export async function fetchRecentMemories(userId, executiveName, limit = 5) {
    try {
        let query = supabase
            .from('executive_memory')
            .select('*')
            .eq('user_id', userId)
            .order('timestamp', { ascending: false })
            .limit(limit);
        if (executiveName) {
            query = query.eq('executive_name', executiveName);
        }
        const { data, error } = await query;
        if (error) {
            console.error('Error fetching memories:', error);
            return [];
        }
        return data || [];
    }
    catch (error) {
        console.error('Failed to fetch memories:', error);
        return [];
    }
}
/**
 * Format memories into a prompt-friendly string
 */
export function formatMemoriesForPrompt(memories) {
    if (!memories.length) {
        return "No previous memory.";
    }
    return memories
        .map((memory) => `Task: ${memory.task} → Decision: ${memory.decision}`)
        .join("\n");
}
