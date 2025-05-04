export interface ChecklistItem {
    id: string;
    name: string;
    description?: string;
    status: 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';
    details?: string;
    statusMessage?: string;
    isRequired?: boolean;
}
export interface ChecklistCategory {
    id: string;
    name: string;
    description?: string;
    items: ChecklistItem[];
}
