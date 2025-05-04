export type Task = {
    id: string;
    strategy_id: string;
    title: string;
    status: 'pending' | 'in_progress' | 'completed';
    created_at: string;
};
