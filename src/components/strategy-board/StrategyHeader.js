import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function StrategyHeader({ onCreateNew }) {
    return (_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8", children: [_jsxs("div", { className: "mb-4 md:mb-0", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "\uD83D\uDCC8 Your Growth Strategies" }), _jsx("p", { className: "text-gray-400 mt-2", children: "Built by your AI Executive Team. Ready to dominate your market." })] }), _jsx("div", { className: "flex gap-3", children: _jsxs(Button, { onClick: onCreateNew, className: "bg-purple-600 hover:bg-purple-700 transition-all", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create New Strategy"] }) })] }));
}
