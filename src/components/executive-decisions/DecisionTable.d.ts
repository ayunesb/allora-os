import { ExecutiveDecision } from "@/types/agents";
interface DecisionTableProps {
    decisions: ExecutiveDecision[];
    loading: boolean;
    error: string | null;
}
export declare function DecisionTable({ decisions, loading, error }: DecisionTableProps): JSX.Element;
export {};
