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
export function fetchStrategyTasks(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("tasks")
                .select("*")
                .eq("strategy_id", strategyId)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            // Cast the data to ensure it matches the Task type
            return (data || []).map((task) => (Object.assign(Object.assign({}, task), { status: task.status })));
        }
        catch (error) {
            console.error("Error fetching tasks:", error.message);
            return [];
        }
    });
}
export function createTask(strategyId_1, title_1) {
    return __awaiter(this, arguments, void 0, function* (strategyId, title, status = "pending") {
        try {
            const { data, error } = yield supabase
                .from("tasks")
                .insert([
                {
                    strategy_id: strategyId,
                    title,
                    status,
                },
            ])
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast.success("Task created successfully");
            // Cast the data to ensure it matches the Task type
            return data
                ? Object.assign(Object.assign({}, data), { status: data.status }) : null;
        }
        catch (error) {
            toast.error(`Failed to create task: ${error.message}`);
            return null;
        }
    });
}
export function updateTaskStatus(taskId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("tasks")
                .update({ status })
                .eq("id", taskId);
            if (error) {
                throw error;
            }
            toast.success("Task status updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update task status: ${error.message}`);
            return false;
        }
    });
}
export function deleteTask(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("tasks").delete().eq("id", taskId);
            if (error) {
                throw error;
            }
            toast.success("Task deleted successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to delete task: ${error.message}`);
            return false;
        }
    });
}
