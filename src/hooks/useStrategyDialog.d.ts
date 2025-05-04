import { StrategyFormValues } from "@/components/strategies/StrategyForm";
import { Strategy } from "@/models/strategy";
interface UseStrategyDialogProps {
    strategies: Strategy[];
    createStrategy: (data: {
        title: string;
        description: string;
        riskLevel: 'Low' | 'Medium' | 'High';
    }) => void;
    updateStrategy: (data: {
        id: string;
        title?: string;
        description?: string;
        riskLevel?: 'Low' | 'Medium' | 'High';
    }) => void;
}
export declare function useStrategyDialog({ strategies, createStrategy, updateStrategy }: UseStrategyDialogProps): {
    editingStrategyId: string;
    isDialogOpen: boolean;
    setIsDialogOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    handleCreateOrUpdateStrategy: (data: StrategyFormValues) => void;
    handleNewStrategy: () => void;
    handleEditStrategy: (strategyId: string) => void;
    getDefaultValues: () => {
        title: string;
        description: string;
        riskLevel: "Low" | "Medium" | "High";
    };
};
export {};
