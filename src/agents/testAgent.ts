
/**
 * Test utility for the AI Executive Agent
 */
import { runExecutiveAgent } from './executiveAgent';
import { executiveProfiles } from './agentProfiles';
import { ExecutiveAgentProfile, AgentRunOptions } from '@/types';

/**
 * Run a test of the executive agent system
 */
export async function testExecutiveAgent() {
  // Select the CEO profile
  const executive: ExecutiveAgentProfile = {
    ...executiveProfiles.ceo,
    // Add the required properties that are missing
    personality: "Decisive and visionary",
    decisionStyle: "Strategic and growth-oriented"
  };
  
  // Define a test task
  const task = "Launch a new AI-powered marketplace for small businesses";
  
  // Run the agent with the task
  console.log(`Running test for ${executive.name} (${executive.role})...`);
  console.log(`Task: ${task}`);
  console.log('---');
  
  try {
    const decision = await runExecutiveAgent(
      task,
      executive,
      {
        includeRiskAssessment: true,
        marketConditions: "The market is increasingly competitive with several AI solutions emerging in the SMB space."
      } as AgentRunOptions
    );
    
    console.log('EXECUTIVE DECISION:');
    console.log(`Selected option: ${decision.selectedOption}`);
    console.log(`Reasoning: ${decision.reasoning}`);
    
    if (decision.riskAssessment) {
      console.log(`Risk assessment: ${decision.riskAssessment}`);
    }
    
    return decision;
  } catch (error) {
    console.error('Error testing executive agent:', error);
    throw error;
  }
}

// If this file is run directly, execute the test
if (require.main === module) {
  testExecutiveAgent()
    .then(() => console.log('Test completed successfully'))
    .catch(err => console.error('Test failed:', err))
    .finally(() => process.exit());
}
