import { supabase } from "@/backend/supabase";
// Store a conversation interaction in memory
export async function storeConversationMemory(userId, botId, userMessage, botResponse) {
    try {
        // Get existing memory first
        const existingMemory = await getConversationMemory(userId, botId);
        const memoryId = existingMemory?.id || `memory-${userId}-${botId}`;
        const previousInteractions = existingMemory?.memoryContext.previousInteractions || [];
        // Add new interaction to memory (limiting to last 10 for performance)
        const updatedInteractions = [
            ...previousInteractions,
            `User: ${userMessage}`,
            `${botId}: ${botResponse}`
        ].slice(-10);
        // Create or update memory
        const { error } = await supabase
            .from('conversation_memories')
            .upsert({
            id: memoryId,
            user_id: userId,
            bot_id: botId,
            memory_context: {
                previousInteractions: updatedInteractions,
                userPreferences: existingMemory?.memoryContext.userPreferences || {},
                companyData: existingMemory?.memoryContext.companyData || {}
            },
            last_updated: new Date().toISOString()
        });
        if (error) {
            console.error('Error storing conversation memory:', error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Failed to store conversation memory:', error);
        return false;
    }
}
// Retrieve conversation memory for a specific user and bot
export async function getConversationMemory(userId, botId) {
    try {
        const { data, error } = await supabase
            .from('conversation_memories')
            .select('*')
            .eq('user_id', userId)
            .eq('bot_id', botId)
            .single();
        if (error || !data) {
            if (error && error.code !== 'PGRST116') { // Not "no rows returned" error
                console.error('Error retrieving conversation memory:', error);
            }
            return null;
        }
        return {
            id: data.id,
            userId: data.user_id,
            botId: data.bot_id,
            memoryContext: data.memory_context,
            lastUpdated: new Date(data.last_updated)
        };
    }
    catch (error) {
        console.error('Failed to retrieve conversation memory:', error);
        return null;
    }
}
// Store user preferences in memory context
export async function storeUserPreferences(userId, botId, preferences) {
    try {
        const existingMemory = await getConversationMemory(userId, botId);
        const memoryId = existingMemory?.id || `memory-${userId}-${botId}`;
        const memoryContext = existingMemory?.memoryContext || { previousInteractions: [] };
        const { error } = await supabase
            .from('conversation_memories')
            .upsert({
            id: memoryId,
            user_id: userId,
            bot_id: botId,
            memory_context: {
                ...memoryContext,
                userPreferences: {
                    ...memoryContext.userPreferences,
                    ...preferences
                }
            },
            last_updated: new Date().toISOString()
        });
        if (error) {
            console.error('Error storing user preferences:', error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Failed to store user preferences:', error);
        return false;
    }
}
// Store company data in memory context
export async function storeCompanyData(userId, botId, companyData) {
    try {
        const existingMemory = await getConversationMemory(userId, botId);
        const memoryId = existingMemory?.id || `memory-${userId}-${botId}`;
        const memoryContext = existingMemory?.memoryContext || { previousInteractions: [] };
        const { error } = await supabase
            .from('conversation_memories')
            .upsert({
            id: memoryId,
            user_id: userId,
            bot_id: botId,
            memory_context: {
                ...memoryContext,
                companyData: {
                    ...memoryContext.companyData,
                    ...companyData
                }
            },
            last_updated: new Date().toISOString()
        });
        if (error) {
            console.error('Error storing company data:', error);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Failed to store company data:', error);
        return false;
    }
}
