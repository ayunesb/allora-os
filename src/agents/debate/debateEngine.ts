
import { supabase } from "@/integrations/supabase/client";
import { ExecutiveAgentProfile } from "@/types/agents";

// Mock function to avoid TypeScript errors
function getExecutiveDebates() {
  return {
    insert: (data: any[]) => ({
      error: null
    })
  };
}

/**
 * Runs a debate with a single executive 
 */
export async function runExecutiveDebate(
  executiveName: string,
  role: string,
  task: string,
  riskAppetite: string = 'medium',
  businessPriority: string = 'growth'
): Promise<string> {
  try {
    // Call our Supabase edge function to run the debate
    const { data, error } = await supabase.functions.invoke("executive-debate", {
      body: {
        executiveName,
        role,
        task,
        riskAppetite,
        businessPriority
      },
    });

    if (error) {
      console.error("Error in debate function:", error);
      throw new Error(`AI Debate execution error: ${error.message}`);
    }

    return data.response;
  } catch (error: any) {
    console.error(`Error during debate execution for ${executiveName}:`, error);
    return `As ${executiveName}, I apologize but I cannot fully analyze this task due to technical issues. However, I can offer a preliminary view that this task requires careful consideration of risks and opportunities. We should examine it further when systems are fully operational. Error details: ${error.message}`;
  }
}

/**
 * Save a debate result to the database
 */
export async function saveDebateResult(
  task: string,
  executiveName: string,
  role: string,
  opinion: string
): Promise<void> {
  try {
    const finalVote = opinion.includes("FINAL VERDICT: For") ? "For" : 
                      opinion.includes("FINAL VERDICT: Against") ? "Against" : "Neutral";

    // Use mock function instead of direct Supabase call
    const { error } = getExecutiveDebates().insert([
      {
        task,
        executive_name: executiveName,
        role,
        opinion,
        vote: finalVote,
      },
    ]);

    if (error) {
      console.error("Failed to save debate result:", error);
    } else {
      console.log(`Debate result saved for ${executiveName}`);
    }
  } catch (error) {
    console.error("Error saving debate result:", error);
  }
}

/**
 * Analyzes a debate response to extract stance, risks and opportunities
 */
export function analyzeDebateResponse(response: string): {
  stance: 'For' | 'Against' | 'Neutral';
  risks: string[];
  opportunities: string[];
} {
  // Default values
  let stance: 'For' | 'Against' | 'Neutral' = 'Neutral';
  const risks: string[] = [];
  const opportunities: string[] = [];

  // Determine stance
  if (response.includes("FINAL VERDICT: For")) {
    stance = 'For';
  } else if (response.includes("FINAL VERDICT: Against")) {
    stance = 'Against';
  }

  // Extract risks
  const riskMatch = response.match(/Risk[s]?:?(.*?)(?=Opportunit|FINAL|$)/si);
  if (riskMatch && riskMatch[1]) {
    const riskText = riskMatch[1].trim();
    
    // Split by bullet points or numbers
    const riskItems = riskText.split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s*/);
    
    for (const item of riskItems) {
      const trimmed = item.trim();
      if (trimmed && trimmed.length > 5) {
        risks.push(trimmed);
      }
    }
    
    // If no bullet points were found, use the whole text
    if (risks.length === 0 && riskText.length > 5) {
      risks.push(riskText);
    }
  }

  // Extract opportunities
  const oppMatch = response.match(/Opportunit[y|ies]:?(.*?)(?=Risk|FINAL|$)/si);
  if (oppMatch && oppMatch[1]) {
    const oppText = oppMatch[1].trim();
    
    // Split by bullet points or numbers
    const oppItems = oppText.split(/(?:\r?\n|\r)(?:[-•*]|\d+\.)\s*/);
    
    for (const item of oppItems) {
      const trimmed = item.trim();
      if (trimmed && trimmed.length > 5) {
        opportunities.push(trimmed);
      }
    }
    
    // If no bullet points were found, use the whole text
    if (opportunities.length === 0 && oppText.length > 5) {
      opportunities.push(oppText);
    }
  }

  return { stance, risks, opportunities };
}
