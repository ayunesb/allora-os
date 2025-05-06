import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import StrategyForm from "@/components/strategies/StrategyForm";
const IndexPage = () => {
    const [strategies, setStrategies] = useState([]);
    const handleAddStrategy = (newStrategy) => {
        setStrategies([...strategies, newStrategy]);
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "Strategies" }), _jsx(StrategyForm, { onAddStrategy: handleAddStrategy }), _jsx("ul", { children: strategies.map((strategy, index) => (_jsx("li", { children: strategy.name }, index))) })] }));
};
export default IndexPage;
