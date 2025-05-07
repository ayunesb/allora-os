import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { ImplementationTabs } from "./tabs/ImplementationTabs";
import ImplementationTabContent from "./tabs/ImplementationTabContent";
export function StrategyImplementationTools({ strategyId, strategyName = "Current Strategy", }) {
    const [activeTab, setActiveTab] = useState("overview");
    const handleTabChange = (value) => {
        setActiveTab(value);
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Implementation Tools" }), _jsxs(CardDescription, { children: ["Track and manage the implementation of \"", strategyName, "\""] })] }), _jsxs(CardContent, { children: [_jsx(ImplementationTabs, { activeTab: activeTab, onTabChange: handleTabChange }), _jsx(ImplementationTabContent, { strategyId: strategyId, activeTab: activeTab })] })] }));
}
export default StrategyImplementationTools;
