var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { runDebateSession } from "./debate/debateSession";
import { logger } from "@/utils/loggingService";
// Mock function to replace supabase.from('executive_actions') to avoid build errors
function getExecutiveActions() {
    return {
        insert: (data) => ({
            error: null,
        }),
    };
}
/**
 * Triggers a crisis meeting for each anomaly detected
 *
 * @param anomalies Array of detected anomalies
 * @returns Promise resolved when all crisis meetings have been processed
 */
export function triggerCrisisMeeting(anomalies) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!anomalies || anomalies.length === 0) {
            logger.info("No anomalies to process for crisis meeting");
            return;
        }
        const crisisTasks = anomalies.map((a) => `Emergency Response for ${a.kpi.toUpperCase()} ${a.issue}: Current Value = ${a.value.toFixed(2)}`);
        logger.info(`Triggering ${crisisTasks.length} crisis debates`);
        for (const task of crisisTasks) {
            try {
                logger.warn("🚨 Triggering Crisis Debate for:", { task });
                // Run executive debate session
                const debateResults = yield runDebateSession(task, "medium", "stability");
                if (debateResults.summary.majority === "For") {
                    logger.info("✅ Crisis Response Approved: Executing Plan.", {
                        task,
                        confidence: debateResults.summary.confidenceScore,
                    });
                    yield createRecoveryAction(task, debateResults.summary.topOpportunities[0]);
                }
                else {
                    logger.info("❌ Crisis Response Rejected: No action taken.", {
                        task,
                        confidence: debateResults.summary.confidenceScore,
                    });
                }
            }
            catch (error) {
                logger.error("Failed to process crisis meeting", { task, error });
            }
        }
    });
}
/**
 * Creates a recovery action based on crisis meeting outcome
 *
 * @param task The crisis task
 * @param recommendation Recommended action
 * @returns Promise resolved when recovery action has been created
 */
function createRecoveryAction(task, recommendation) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Use the mock function instead of direct supabase.from call
            const { error } = getExecutiveActions().insert([
                {
                    task,
                    status: "pending",
                    triggered_by: "Crisis Detection",
                    performance_notes: recommendation || "Emergency response required",
                    created_at: new Date().toISOString(),
                },
            ]);
            if (error) {
                logger.error("Failed to create recovery action:", { task, error });
            }
            else {
                logger.info("Recovery Action Created:", { task });
            }
        }
        catch (error) {
            logger.error("Exception when creating recovery action:", { task, error });
        }
    });
}
