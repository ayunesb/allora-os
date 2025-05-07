var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
/**
 * Generate a business strategy from an executive decision
 */
export function generateStrategy(decision) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call our Supabase edge function to generate a strategy
            const { data, error } = yield supabase.functions.invoke("generate-strategy", {
                body: {
                    decision: decision,
                    format: "json",
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
                    "Execute and monitor progress",
                ],
                expected_outcomes: data.strategy.expected_outcomes || [
                    "Improved market position",
                    "Increased revenue",
                    "Enhanced customer satisfaction",
                ],
                timeline: data.strategy.timeline || "3-6 months",
                resources_required: data.strategy.resources_required || "To be determined based on scope",
                risk_level: decision.riskAssessment.includes("high")
                    ? "High"
                    : decision.riskAssessment.includes("low")
                        ? "Low"
                        : "Medium",
                created_at: new Date().toISOString(),
                decision_id: decision.id,
            };
        }
        catch (error) {
            console.error("Failed to generate strategy:", error);
            return createFallbackStrategy(decision);
        }
    });
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
            "Execute and monitor progress",
        ],
        expected_outcomes: [
            "Improved market position",
            "Increased revenue",
            "Enhanced customer satisfaction",
        ],
        timeline: "3-6 months",
        resources_required: "To be determined based on scope",
        risk_level: decision.riskAssessment.includes("high")
            ? "High"
            : decision.riskAssessment.includes("low")
                ? "Low"
                : "Medium",
        created_at: new Date().toISOString(),
        decision_id: decision.id,
    };
}
/**
 * Save a strategy to the database
 */
export function saveStrategy(strategy, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.from("strategies").insert([
            Object.assign(Object.assign({}, strategy), { user_id: userId }),
        ]);
        if (error) {
            console.error("Failed to save strategy:", error);
            throw new Error(`Failed to save strategy: ${error.message}`);
        }
        return data;
    });
}
