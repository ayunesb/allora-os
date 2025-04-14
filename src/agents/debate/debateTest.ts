
import { runDebateSession } from "./debateSession";

/**
 * Test function to run a full executive debate session
 */
export async function testDebateSession() {
  console.log("Starting Executive Debate Test...");
  
  const task = "Launch a new AI subscription plan globally next month";
  
  console.log(`Debating task: "${task}"`);
  
  try {
    const result = await runDebateSession(task, "medium", "growth");
    
    console.log("\n------ DEBATE RESULTS ------");
    console.log(`Task: ${result.task}`);
    console.log(`Total executives: ${result.summary.totalExecutives}`);
    console.log(`For votes: ${result.summary.forVotes}`);
    console.log(`Against votes: ${result.summary.againstVotes}`);
    // Calculate neutral votes instead of trying to access a non-existent property
    const neutralVotes = result.summary.totalExecutives - (result.summary.forVotes + result.summary.againstVotes);
    console.log(`Neutral votes: ${neutralVotes}`);
    console.log(`Majority: ${result.summary.majority}`);
    console.log(`Confidence Score: ${(result.summary.confidenceScore * 100).toFixed(1)}%`);
    
    console.log("\nTop Risks:");
    result.summary.topRisks.forEach((risk, i) => console.log(`${i+1}. ${risk}`));
    
    console.log("\nTop Opportunities:");
    result.summary.topOpportunities.forEach((opp, i) => console.log(`${i+1}. ${opp}`));
    
    console.log("\nExecutive Opinions:");
    result.debates.forEach(debate => {
      console.log(`\n${debate.executiveName} (${debate.role}): ${debate.stance}`);
      
      // Log a condensed version of the opinion for testing
      const condensedOpinion = debate.opinion
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 3)
        .join(' ');
      console.log(`Opinion: ${condensedOpinion}...`);
    });
    
    if (result.summary.majority === "For") {
      console.log("\n✅ Decision Approved by Majority!");
    } else if (result.summary.majority === "Against") {
      console.log("\n❌ Decision Blocked by Executives!");
    } else {
      console.log("\n⚠️ Executive Team is Split on Decision!");
    }
    
    return result;
  } catch (error) {
    console.error("Error during debate test:", error);
    throw error;
  }
}

// Uncomment to run the test directly
// testDebateSession().catch(console.error);
