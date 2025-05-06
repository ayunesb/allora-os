var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
// Fetch all milestones for a strategy
export function fetchStrategyMilestones(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategy_milestones")
                .select("*")
                .eq("strategyId", strategyId)
                .order("dueDate", { ascending: true });
            if (error) {
                throw error;
            }
            return data || [];
        }
        catch (error) {
            console.error("Error fetching strategy milestones:", error.message);
            return [];
        }
    });
}
// Create a new milestone
export function createMilestone(milestone) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategy_milestones")
                .insert([
                Object.assign(Object.assign({}, milestone), { created_at: new Date().toISOString() }),
            ])
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast.success("Milestone created successfully");
            return data;
        }
        catch (error) {
            toast.error(`Failed to create milestone: ${error.message}`);
            return null;
        }
    });
}
// Update a milestone
export function updateMilestone(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("strategy_milestones")
                .update(updates)
                .eq("id", id);
            if (error) {
                throw error;
            }
            toast.success("Milestone updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update milestone: ${error.message}`);
            return false;
        }
    });
}
// Delete a milestone
export function deleteMilestone(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("strategy_milestones")
                .delete()
                .eq("id", id);
            if (error) {
                throw error;
            }
            toast.success("Milestone deleted successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to delete milestone: ${error.message}`);
            return false;
        }
    });
}
// Calculate overall progress for a strategy based on its milestones
export function calculateStrategyProgress(milestones) {
    const totalProgress = milestones.reduce((sum, milestone) => sum + milestone.progress, 0); // Ensure totalProgress is defined
    return Math.round(totalProgress / milestones.length);
}
// Get status color based on implementation status
export function getStatusColor(status) {
    switch (status) {
        case "not_started":
            return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
        case "in_progress":
            return "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300";
        case "completed":
            return "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-300";
        case "delayed":
            return "bg-amber-100 text-amber-700 dark:bg-amber-800/30 dark:text-amber-300";
        default:
            return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"; // Add default case
    }
}
