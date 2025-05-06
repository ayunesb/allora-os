var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Test utility for the AI Executive Agent
 */
import { runExecutiveAgent } from "./executiveAgent";
import { executiveProfiles } from "./agentProfiles";
/**
 * Run a test of the executive agent system
 */
export function testExecutiveAgent() {
    return __awaiter(this, void 0, void 0, function* () {
        // Select the CEO profile
        const executive = Object.assign(Object.assign({}, executiveProfiles.ceo), { 
            // Add the required properties that are missing
            personality: "Decisive and visionary", decisionStyle: "Strategic and growth-oriented" });
        // Define a test task
        const task = "Launch a new AI-powered marketplace for small businesses";
        // Run the agent with the task
        console.log(`Running test for ${executive.name} (${executive.role})...`);
        console.log(`Task: ${task}`);
        console.log("---");
        try {
            const decision = yield runExecutiveAgent(task, executive, {
                includeRiskAssessment: true,
                marketConditions: "The market is increasingly competitive with several AI solutions emerging in the SMB space.",
            });
            console.log("EXECUTIVE DECISION:");
            console.log(`Selected option: ${decision.selectedOption}`);
            console.log(`Reasoning: ${decision.reasoning}`);
            if (decision.riskAssessment) {
                console.log(`Risk assessment: ${decision.riskAssessment}`);
            }
            return decision;
        }
        catch (error) {
            console.error("Error testing executive agent:", error);
            throw error;
        }
    });
}
// If this file is run directly, execute the test
if (require.main === module) {
    testExecutiveAgent()
        .then(() => console.log("Test completed successfully"))
        .catch((err) => console.error("Test failed:", err))
        .finally(() => process.exit());
}
