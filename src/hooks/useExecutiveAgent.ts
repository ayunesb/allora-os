
import { useState } from 'react';
import { runExecutiveAgentHybrid } from '@/services/executiveWorkflowService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ExecutiveResponse {
  aiResponse: string;
  toolResponses?: Array<{
    tool: string;
    result: string;
    data?: any;
  }>;
  success: boolean;
  error?: string;
}

export interface ExecutiveAgentOptions {
  addToAuditLog?: boolean;
  saveToNotion?: boolean;
  userContext?: Record<string, any>;
}

export const useExecutiveAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ExecutiveResponse | null>(null);
  const { toast } = useToast();

  const executeQuery = async (
    prompt: string, 
    executive: string,
    options: ExecutiveAgentOptions = {}
  ): Promise<ExecutiveResponse> => {
    setIsLoading(true);
    
    try {
      // Step 1: Get response from OpenAI using executive role context
      const aiResponse = await runExecutiveAgentHybrid(prompt, executive);
      
      // Step 2-3: Detect tools and trigger LangChain agent
      const { data, error } = await supabase.functions.invoke('langchain-agent', {
        body: {
          query: aiResponse,
          context: {
            executive,
            ...options.userContext
          }
        }
      });
      
      if (error) {
        throw new Error(`LangChain agent error: ${error.message}`);
      }
      
      let toolResponses = [];
      
      // Step 4: Merge AI + tool results
      if (data.toolCalls && data.toolCalls.length > 0) {
        toolResponses = data.toolCalls.map((call: any) => ({
          tool: call.tool,
          result: data.result,
          data: call.output
        }));
      }
      
      // Step 5: Log to Notion if requested
      if (options.saveToNotion) {
        await supabase.functions.invoke('notion-tool', {
          body: {
            title: `${executive} Decision: ${prompt.substring(0, 50)}...`,
            content: `${aiResponse}\n\nTool Results: ${JSON.stringify(toolResponses, null, 2)}`
          }
        });
      }
      
      // Step 5: Log to audit log if requested
      if (options.addToAuditLog) {
        await supabase.from('executive_actions').insert([{
          executive_name: executive,
          task: prompt,
          result: aiResponse,
          tool_responses: toolResponses,
          created_at: new Date().toISOString()
        }]);
      }
      
      // Step 6: Return full response
      const executiveResponse = {
        aiResponse,
        toolResponses,
        success: true
      };
      
      setResponse(executiveResponse);
      return executiveResponse;
      
    } catch (error: any) {
      console.error('Executive agent execution error:', error);
      
      const errorResponse = {
        aiResponse: `I apologize, but I encountered an error while processing your request: ${error.message}`,
        success: false,
        error: error.message
      };
      
      setResponse(errorResponse);
      
      toast({
        title: 'Execution Error',
        description: error.message,
        variant: 'destructive'
      });
      
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeQuery,
    isLoading,
    response,
    reset: () => setResponse(null)
  };
};
