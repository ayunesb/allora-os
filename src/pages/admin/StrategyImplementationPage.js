import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StrategyImplementationTools from "@/components/strategy-implementation/StrategyImplementationTools";
export default function StrategyImplementationPage() {
    const { strategyId } = useParams();
    const [strategyTitle, setStrategyTitle] = useState("Current Strategy");
    useEffect(() => {
        // Fetch strategy details and update the title
        if (strategyId) {
            // Replace this with your actual API call to fetch strategy details
            // Example:
            // fetchStrategyDetails(strategyId)
            //   .then(data => setStrategyTitle(data.title))
            //   .catch(error => console.error("Error fetching strategy details:", error));
        }
    }, [strategyId]);
    // In the return statement, update the StrategyImplementationTools props
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategy Implementation" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Manage the implementation of your growth strategy. Track tasks, milestones, and metrics to ensure successful execution." }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(StrategyImplementationTools, { strategyId: strategyId }) }), _jsx("div", { className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Additional Resources" }) }), _jsx(CardContent, { children: _jsxs("ul", { className: "list-disc pl-5", children: [_jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-500 hover:underline", children: "Documentation" }) }), _jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-500 hover:underline", children: "Support Forum" }) }), _jsx("li", { children: _jsx("a", { href: "#", className: "text-blue-500 hover:underline", children: "Contact Us" }) })] }) })] }) })] })] }));
}
