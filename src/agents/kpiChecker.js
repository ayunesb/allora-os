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
import { logger } from "@/utils/loggingService";
import { generateSelfCoachingNote, saveCoachingNoteToMemory, } from "./selfCoach";
export function checkActionOutcome(actionId, task) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(`Checking outcome for task: ${task}`);
        // Simulated KPI check (replace with real checks)
        const succeeded = Math.random() > 0.3; // 70% chance of success for now
        const outcome = succeeded ? "success" : "failure";
        const notes = succeeded
            ? "Task completed successfully. Target achieved."
            : "Task failed. Metrics below target.";
        // Update action with outcome
        const { data, error } = yield supabase
            .from("executive_actions")
            .update({
            outcome,
            performance_notes: notes,
        })
            .eq("id", actionId);
        if (error) {
            logger.error("Failed to update action outcome", { error });
            return { outcome: "unknown", notes: "Error updating outcome" };
        }
        // Update executive memory with outcome
        yield updateExecutiveMemoryWithOutcome(task, outcome, notes);
        // Get the executive info for the action
        const { data: actionData } = yield supabase
            .from("executive_actions")
            .select("executive_name, executive_role")
            .eq("id", actionId)
            .single();
        const executiveName = (actionData === null || actionData === void 0 ? void 0 : actionData.executive_name) || "System";
        const executiveRole = (actionData === null || actionData === void 0 ? void 0 : actionData.executive_role) || "Executive";
        // Generate self-coaching note
        const coachingNote = yield generateSelfCoachingNote(executiveName, executiveRole, task, outcome, notes);
        // Save coaching note to memory
        yield saveCoachingNoteToMemory(yield getCurrentUserId(), executiveName, task, coachingNote);
        logger.info("Outcome updated successfully", { outcome, notes });
        return { outcome, notes };
    });
}
function updateExecutiveMemoryWithOutcome(task, outcome, notes) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.from("executive_memory").insert([
            {
                user_id: yield getCurrentUserId(),
                executive_name: "System",
                task: `Outcome Analysis for: ${task}`,
                decision: `Result: ${outcome.toUpperCase()} - ${notes}`,
            },
        ]);
        if (error) {
            logger.error("Failed to update executive memory with outcome", { error });
        }
    });
}
// Utility function to get current user ID
function getCurrentUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: { user }, } = yield supabase.auth.getUser();
            return (user === null || user === void 0 ? void 0 : user.id) || "unknown";
        }
        catch (error) {
            logger.error("Failed to get current user", { error });
            return "unknown";
        }
    });
}
