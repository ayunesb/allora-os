
import { supabase } from "@/integrations/supabase/client";
import { promptTemplates } from "@/agents/promptTemplates";

export interface ExecutiveDebateResponse {
  executiveName: string;
  role: string;
  opinion: string;
  stance: "For" | "Against" | "Neutral";
  risks: string[];
  opportunities: string[];
}

export async function runExecutiveDebate(
  executiveName: string,
  role: string,
  task: string,
  riskAppetite: string = "medium",
  businessPriority: string = "growth"
): Promise<ExecutiveDebateResponse> {
  try {
    // Call our Supabase edge function to process the debate
    const { data, error } = await supabase.functions.invoke('executive-think', {
      body: {
        prompt: `
You are ${executiveName}, a ${role} at Allora AI.

The company is considering the following strategic decision:
Task: ${task}

Risk Appetite: ${riskAppetite}
Business Priority: ${businessPriority}

Please provide:
- Your Argument FOR or AGAINST the task.
- Two Risks and two Opportunities you see.
- End your answer with: FINAL VERDICT: [For/Against].

Be strategic and critical in your thinking, leveraging your expertise as ${role}.
`,
        executiveName,
        executiveRole: role,
        userPreferences: {
          riskAppetite,
          focusArea: businessPriority
        }
      }
    });

    if (error) {
      console.error('Error in debate engine:', error);
      throw new Error(`AI Debate error: ${error.message}`);
    }

    const content = data.content;
    
    // Parse the response to extract the stance
    let stance: "For" | "Against" | "Neutral" = "Neutral";
    if (content.toLowerCase().includes("final verdict: for")) {
      stance = "For";
    } else if (content.toLowerCase().includes("final verdict: against")) {
      stance = "Against";
    }

    // Extract risks and opportunities (simplified parsing)
    const risks: string[] = [];
    const opportunities: string[] = [];
    
    const lines = content.split('\n');
    let capturingRisks = false;
    let capturingOpportunities = false;
    
    for (const line of lines) {
      if (line.toLowerCase().includes("risk")) {
        capturingRisks = true;
        capturingOpportunities = false;
        continue;
      } else if (line.toLowerCase().includes("opportunit")) {
        capturingRisks = false;
        capturingOpportunities = true;
        continue;
      } else if (line.toLowerCase().includes("verdict") || line.toLowerCase().includes("conclusion")) {
        capturingRisks = false;
        capturingOpportunities = false;
      }
      
      const trimmedLine = line.trim();
      if (capturingRisks && trimmedLine.length > 0 && trimmedLine.match(/^[-•*]|^\d+\./)) {
        risks.push(trimmedLine.replace(/^[-•*]|\d+\.\s*/, '').trim());
      } else if (capturingOpportunities && trimmedLine.length > 0 && trimmedLine.match(/^[-•*]|^\d+\./)) {
        opportunities.push(trimmedLine.replace(/^[-•*]|\d+\.\s*/, '').trim());
      }
    }

    return {
      executiveName,
      role,
      opinion: content,
      stance,
      risks: risks.length > 0 ? risks : ["Uncertain risk assessment"],
      opportunities: opportunities.length > 0 ? opportunities : ["Uncertain opportunity assessment"]
    };
  } catch (error) {
    console.error(`Error during ${executiveName}'s debate:`, error);
    
    // Return a fallback response on error
    return {
      executiveName,
      role,
      opinion: `I apologize, but I was unable to properly analyze this task due to technical issues.`,
      stance: "Neutral",
      risks: ["Unable to assess risks due to technical error"],
      opportunities: ["Unable to assess opportunities due to technical error"]
    };
  }
}
