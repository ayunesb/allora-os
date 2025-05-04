import { Task } from '@/models/task';
export declare function fetchStrategyTasks(strategyId: string): Promise<Task[]>;
export declare function createTask(strategyId: string, title: string, status?: 'pending' | 'in_progress' | 'completed'): Promise<Task | null>;
export declare function updateTaskStatus(taskId: string, status: 'pending' | 'in_progress' | 'completed'): Promise<boolean>;
export declare function deleteTask(taskId: string): Promise<boolean>;
