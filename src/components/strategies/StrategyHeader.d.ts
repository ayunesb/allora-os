import React from "react";
interface StrategyHeaderProps {
    onNewStrategy: () => void;
    isAnyActionPending?: boolean;
}
declare const StrategyHeader: React.FC<StrategyHeaderProps>;
export default StrategyHeader;
