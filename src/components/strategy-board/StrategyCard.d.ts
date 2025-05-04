import { Strategy } from "@/models/strategy";
interface StrategyCardProps {
    strategy: Strategy;
    onDebate: (strategy: Strategy) => void;
    onExport: (strategy: Strategy) => void;
    onClick: (strategy: Strategy) => void;
}
export default function StrategyCard({ strategy, onDebate, onExport, onClick }: StrategyCardProps): JSX.Element;
export {};
