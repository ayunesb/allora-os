import { supabase } from '@/integrations/supabase/client';
import { useExternalLangChainAPI } from '@/utils/langchain/hooks/useExternalLangChainAPI';

// Interface for agent response
interface AgentResponse {
  result: string;
  error?: string;
}

// Re-export existing types or create new ones as needed
export interface CompanyProfile {
  name: string;
  industry: string;
  size?: string;
  founded?: string;
  location?: string;
  website?: string;
  description?: string;
  goals?: string[];
  challenges?: string[];
}

// Get a response from the OpenAI API via Supabase Edge Function
export const getOpenAIResponse = async ({ 
  role, 
  prompt 
}: { 
  role: string; 
  prompt: string 
}): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('openai', {
      body: {
        role,
        prompt,
        model: 'gpt-4o-mini'
      }
    });

    if (error) {
      console.error('Error getting OpenAI response:', error);
      return `Error: ${error.message}`;
    }

    return data?.response || 'No response received';
  } catch (err: any) {
    console.error('Exception in getOpenAIResponse:', err);
    return `Error: ${err.message}`;
  }
};

// Run the executive agent in hybrid mode (AI response + optional tool execution)
export const runExecutiveAgentHybrid = async (executivePrompt: string, executive: string): Promise<string> => {
  // Step 1: Get executive's natural response (OpenAI)
  const aiText = await getOpenAIResponse({ role: executive, prompt: executivePrompt });

  // Step 2: Determine if follow-up action is needed
  const needsExecution = /revenue|schedule|log to notion|check balance|transactions|marketing data|campaign|leads/i.test(aiText);

  let executionOutput = '';
  if (needsExecution) {
    try {
      // Get the API endpoint from localStorage
      const apiEndpoint = localStorage.getItem('langchain_api_endpoint');
      
      if (!apiEndpoint) {
        return aiText + '\n\n⚠️ No LangChain API endpoint configured. Tools execution not available.';
      }
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: aiText,
          context: { executive }
        })
      });

      if (!response.ok) {
        throw new Error(`API error (${response.status}): ${await response.text()}`);
      }

      const data = await response.json();
      executionOutput = `\n\n🛠️ Executed: ${data.result || 'No result returned'}`;
    } catch (err: any) {
      executionOutput = `\n\n❌ Error executing tools: ${err.message}`;
    }
  }

  return aiText + executionOutput;
};
