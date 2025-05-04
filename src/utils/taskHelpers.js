import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
export async function fetchStrategyTasks(strategyId) {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('strategy_id', strategyId)
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        // Cast the data to ensure it matches the Task type
        return (data || []).map(task => ({
            ...task,
            status: task.status
        }));
    }
    catch (error) {
        console.error('Error fetching tasks:', error.message);
        return [];
    }
}
export async function createTask(strategyId, title, status = 'pending') {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert([
            {
                strategy_id: strategyId,
                title,
                status
            }
        ])
            .select()
            .single();
        if (error) {
            throw error;
        }
        toast.success('Task created successfully');
        // Cast the data to ensure it matches the Task type
        return data ? {
            ...data,
            status: data.status
        } : null;
    }
    catch (error) {
        toast.error(`Failed to create task: ${error.message}`);
        return null;
    }
}
export async function updateTaskStatus(taskId, status) {
    try {
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', taskId);
        if (error) {
            throw error;
        }
        toast.success('Task status updated successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to update task status: ${error.message}`);
        return false;
    }
}
export async function deleteTask(taskId) {
    try {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);
        if (error) {
            throw error;
        }
        toast.success('Task deleted successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to delete task: ${error.message}`);
        return false;
    }
}
