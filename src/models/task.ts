
export type Task = {
  id: string;
  strategyId: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
};
