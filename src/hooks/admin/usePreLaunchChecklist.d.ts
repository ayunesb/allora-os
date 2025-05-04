export interface ChecklistItem {
    id: string;
    category: string;
    task: string;
    completed: boolean;
    critical: boolean;
}
export declare function usePreLaunchChecklist(): {
    checklistItems: ChecklistItem[];
    toggleItem: (id: string) => void;
    criticalItemsCompleted: boolean;
    allItemsCompleted: boolean;
    getItemsByCategory: (category: string) => ChecklistItem[];
};
