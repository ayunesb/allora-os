import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
/**
 * Generate a business strategy from an executive decision
 */
export async function generateStrategy(decision) {
    try {
        // Call our Supabase edge function to generate a strategy
        const { data, error } = await supabase.functions.invoke("generate-strategy", {
            body: {
                decision: decision,
                format: "json"
            },
        });
        if (error) {
            console.error("Error generating strategy:", error);
            throw new Error(`Strategy generation error: ${error.message}`);
        }
        // If we don't have proper data, return a fallback strategy
        if (!data || !data.strategy) {
            return createFallbackStrategy(decision);
        }
        // Format and return the strategy
        return {
            id: uuidv4(),
            title: data.strategy.title || `Strategy for: ${decision.task}`,
            description: data.strategy.description || decision.reasoning,
            implementation_steps: data.strategy.implementation_steps || [
                "Analyze current market position",
                "Develop detailed action plan",
                "Allocate necessary resources",
                "Execute and monitor progress"
            ],
            expected_outcomes: data.strategy.expected_outcomes || [
                "Improved market position",
                "Increased revenue",
                "Enhanced customer satisfaction"
            ],
            timeline: data.strategy.timeline || "3-6 months",
            resources_required: data.strategy.resources_required || "To be determined based on scope",
            risk_level: decision.riskAssessment.includes("high") ? "High" :
                decision.riskAssessment.includes("low") ? "Low" : "Medium",
            created_at: new Date().toISOString(),
            decision_id: decision.id
        };
    }
    catch (error) {
        console.error("Failed to generate strategy:", error);
        return createFallbackStrategy(decision);
    }
}
/**
 * Create a fallback strategy when AI generation fails
 */
function createFallbackStrategy(decision) {
    return {
        id: uuidv4(),
        title: `Strategy for: ${decision.task}`,
        description: decision.reasoning || "Strategy based on executive decision",
        implementation_steps: [
            "Analyze current market position",
            "Develop detailed action plan",
            "Allocate necessary resources",
            "Execute and monitor progress"
        ],
        expected_outcomes: [
            "Improved market position",
            "Increased revenue",
            "Enhanced customer satisfaction"
        ],
        timeline: "3-6 months",
        resources_required: "To be determined based on scope",
        risk_level: decision.riskAssessment.includes("high") ? "High" :
            decision.riskAssessment.includes("low") ? "Low" : "Medium",
        created_at: new Date().toISOString(),
        decision_id: decision.id
    };
}
/**
 * Save a strategy to the database
 */
export async function saveStrategy(strategy, userId) {
    const { data, error } = await supabase
        .from("strategies")
        .insert([
        {
            ...strategy,
            user_id: userId,
        },
    ]);
    if (error) {
        console.error("Failed to save strategy:", error);
        throw new Error(`Failed to save strategy: ${error.message}`);
    }
    return data;
}
