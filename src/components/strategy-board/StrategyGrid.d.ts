import { Strategy } from "@/models/strategy";
interface StrategyGridProps {
    strategies: Strategy[];
    onDebate: (strategy: Strategy) => void;
    onExport: (strategy: Strategy) => void;
    onViewStrategy: (strategy: Strategy) => void;
}
export default function StrategyGrid({ strategies, onDebate, onExport, onViewStrategy }: StrategyGridProps): JSX.Element;
export {};
