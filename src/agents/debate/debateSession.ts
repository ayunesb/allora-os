
import { runExecutiveDebate, type ExecutiveDebateResponse } from "./debateEngine";
import { executiveBots } from "@/backend/executiveBots";

// Convert the executive bots into a format usable for debates
const getExecutivesForDebate = () => {
  const executives = [];
  
  for (const [role, names] of Object.entries(executiveBots)) {
    if (names.length > 0) {
      executives.push({
        name: names[0],
        role: role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      });
    }
  }
  
  // Limit to 5 executives for reasonable debate time
  return executives.slice(0, 5);
};

export interface DebateSessionResult {
  task: string;
  debates: ExecutiveDebateResponse[];
  summary: DebateSummary;
  timestamp: string;
}

export interface DebateSummary {
  totalExecutives: number;
  forVotes: number;
  againstVotes: number;
  neutralVotes: number;
  majority: "For" | "Against" | "Tie";
  confidenceScore: number; // 0-1 scale of consensus
  topRisks: string[];
  topOpportunities: string[];
}

export async function runDebateSession(
  task: string,
  riskAppetite: string = "medium", 
  businessPriority: string = "growth",
  customExecutives?: Array<{name: string, role: string}>
): Promise<DebateSessionResult> {
  const executives = customExecutives || getExecutivesForDebate();
  const debateResults: ExecutiveDebateResponse[] = [];

  // Run debates in parallel for efficiency
  const debatePromises = executives.map(exec => 
    runExecutiveDebate(exec.name, exec.role, task, riskAppetite, businessPriority)
  );
  
  const results = await Promise.all(debatePromises);
  debateResults.push(...results);

  const summary = summarizeDebate(debateResults);
  
  return {
    task,
    debates: debateResults,
    summary,
    timestamp: new Date().toISOString(),
  };
}

export function summarizeDebate(debateResults: ExecutiveDebateResponse[]): DebateSummary {
  let forVotes = 0;
  let againstVotes = 0;
  let neutralVotes = 0;
  const allRisks: string[] = [];
  const allOpportunities: string[] = [];

  debateResults.forEach((debate) => {
    if (debate.stance === "For") {
      forVotes += 1;
    } else if (debate.stance === "Against") {
      againstVotes += 1;
    } else {
      neutralVotes += 1;
    }
    
    // Collect all risks and opportunities
    if (debate.risks && Array.isArray(debate.risks)) {
      allRisks.push(...debate.risks);
    }
    
    if (debate.opportunities && Array.isArray(debate.opportunities)) {
      allOpportunities.push(...debate.opportunities);
    }
  });

  // Calculate confidence score (0-1)
  const totalVotes = debateResults.length;
  const confidenceScore = Math.max(forVotes, againstVotes) / totalVotes;

  // Determine majority
  let majority: "For" | "Against" | "Tie";
  if (forVotes > againstVotes) {
    majority = "For";
  } else if (againstVotes > forVotes) {
    majority = "Against";
  } else {
    majority = "Tie";
  }

  // Find top risks and opportunities using frequency count
  const riskCounts = countFrequency(allRisks);
  const opportunityCounts = countFrequency(allOpportunities);
  
  const topRisks = Object.entries(riskCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([risk]) => risk);
    
  const topOpportunities = Object.entries(opportunityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([opportunity]) => opportunity);

  return {
    totalExecutives: totalVotes,
    forVotes,
    againstVotes,
    neutralVotes,
    majority,
    confidenceScore,
    topRisks,
    topOpportunities
  };
}

// Helper function to count frequency of items
function countFrequency(items: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  
  items.forEach(item => {
    // Normalize the string for better matching
    const normalizedItem = item.toLowerCase().trim();
    if (normalizedItem) {
      counts[normalizedItem] = (counts[normalizedItem] || 0) + 1;
    }
  });
  
  return counts;
}
