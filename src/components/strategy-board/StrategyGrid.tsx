import React from "react";
import StrategyCard from "./StrategyCard";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function StrategyGrid({ strategies, onDebate, onExport, onViewStrategy }) {
    const breakpoint = useBreakpoint();
    // Determine grid columns based on breakpoint
    const getGridClass = () => {
        switch (breakpoint) {
            case 'xs':
            case 'mobile':
                return 'grid-cols-1';
            case 'tablet':
                return 'grid-cols-2';
            case 'laptop':
                return 'grid-cols-2 lg:grid-cols-3';
            case 'desktop':
            default:
                return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3';
        }
    };
    return (<div className={`grid ${getGridClass()} gap-4 sm:gap-6`}>
      {strategies.map((strategy) => (<StrategyCard key={strategy.id} strategy={strategy} onDebate={() => onDebate(strategy)} onExport={() => onExport(strategy)} onClick={() => onViewStrategy(strategy)}/>))}
    </div>);
}
