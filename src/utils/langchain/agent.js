import { logger } from '@/utils/loggingService';
import { supabase } from '@/integrations/supabase/client';
/**
 * Run the LangChain agent with the provided query and context
 */
export async function runLangChainAgent(params) {
    const { query, context = {}, userId, companyId } = params;
    try {
        logger.info('Running LangChain agent', { query, userId, companyId });
        // Call the Supabase Edge Function that runs the agent
        const { data, error } = await supabase.functions.invoke('langchain-agent', {
            body: {
                query,
                context: {
                    ...context,
                    userId,
                    companyId
                }
            }
        });
        if (error) {
            logger.error('LangChain agent error', error);
            return {
                result: '',
                error: `Agent execution failed: ${error.message}`
            };
        }
        logger.info('LangChain agent execution complete', {
            success: true,
            toolCallCount: data.toolCalls?.length || 0
        });
        return {
            result: data.result,
            toolCalls: data.toolCalls
        };
    }
    catch (err) {
        logger.error('LangChain agent execution error', err);
        return {
            result: '',
            error: `Agent execution failed: ${err.message}`
        };
    }
}
/**
 * Execute a specific tool directly without running the full agent
 */
export async function executeAgentTool(toolName, input) {
    try {
        logger.info('Executing agent tool directly', { toolName, input });
        const { data, error } = await supabase.functions.invoke('langchain-tool', {
            body: {
                tool: toolName,
                input
            }
        });
        if (error) {
            logger.error('Tool execution error', error);
            throw new Error(`Tool execution failed: ${error.message}`);
        }
        return data.result;
    }
    catch (err) {
        logger.error('Tool execution error', err);
        throw new Error(`Tool execution failed: ${err.message}`);
    }
}
