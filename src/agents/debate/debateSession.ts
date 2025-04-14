
import { runExecutiveDebate, saveDebateResult, analyzeDebateResponse } from "./debateEngine";
import { DebateSessionResult, DebateEntry, DebateSummary } from "@/types/agents";
import { executiveProfiles } from "@/agents/agentProfiles";
import { ExecutiveAgentProfile } from "@/types/agents";

const executives = [
  { name: "Elon Musk", role: "Chief Executive Officer" },
  { name: "Sheryl Sandberg", role: "Chief Operations Officer" },
  { name: "Warren Buffett", role: "Chief Financial Officer" },
  { name: "Antonio Lucio", role: "Chief Marketing Officer" },
];

/**
 * Run a debate session with multiple executives
 */
export async function runDebateSession(
  task: string,
  riskAppetite: string = 'medium',
  businessPriority: string = 'growth'
): Promise<DebateSessionResult> {
  // Get profiles for executives
  const debateResults: DebateEntry[] = [];
  const allRisks: string[] = [];
  const allOpportunities: string[] = [];

  // Run debates for each executive
  for (const exec of executives) {
    try {
      console.log(`Running debate for ${exec.name} on task: ${task}`);
      
      // Get the executive's opinion
      const response = await runExecutiveDebate(
        exec.name, 
        exec.role, 
        task,
        riskAppetite,
        businessPriority
      );
      
      // Analyze the response
      const { stance, risks, opportunities } = analyzeDebateResponse(response);
      
      // Add risks and opportunities to our collection
      allRisks.push(...risks);
      allOpportunities.push(...opportunities);

      // Save the result
      await saveDebateResult(task, exec.name, exec.role, response);
      
      // Add to our results
      debateResults.push({
        executiveName: exec.name,
        role: exec.role,
        opinion: response,
        stance: stance
      });
      
    } catch (error) {
      console.error(`Error in debate for ${exec.name}:`, error);
      
      // Add a fallback entry
      debateResults.push({
        executiveName: exec.name,
        role: exec.role,
        opinion: `Unable to process debate due to technical issues: ${error}`,
        stance: 'Neutral'
      });
    }
  }

  // Create a summary of the debate
  const summary = summarizeDebate(debateResults, allRisks, allOpportunities);
  
  return {
    task,
    debates: debateResults,
    summary
  };
}

/**
 * Summarize the debate results
 */
export function summarizeDebate(
  debateResults: DebateEntry[],
  risks: string[] = [],
  opportunities: string[] = []
): DebateSummary {
  let forVotes = 0;
  let againstVotes = 0;

  // Count votes
  debateResults.forEach((debate) => {
    if (debate.stance === "For") {
      forVotes += 1;
    } else if (debate.stance === "Against") {
      againstVotes += 1;
    }
  });

  // Determine majority
  let majority: 'For' | 'Against' | 'Tie' = 'Tie';
  if (forVotes > againstVotes) {
    majority = 'For';
  } else if (againstVotes > forVotes) {
    majority = 'Against';
  }

  // Calculate confidence score
  const totalVotes = forVotes + againstVotes;
  const confidenceScore = totalVotes > 0 
    ? Math.max(forVotes, againstVotes) / totalVotes 
    : 0.5;

  // Get top risks and opportunities
  const uniqueRisks = [...new Set(risks)];
  const uniqueOpportunities = [...new Set(opportunities)];

  return {
    totalExecutives: debateResults.length,
    forVotes,
    againstVotes,
    majority,
    confidenceScore,
    topRisks: uniqueRisks.slice(0, 3),
    topOpportunities: uniqueOpportunities.slice(0, 3)
  };
}
