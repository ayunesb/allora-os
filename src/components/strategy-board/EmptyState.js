import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Rocket, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function EmptyState({ onCreateNew }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center p-8 border border-gray-800 bg-gray-900/30 rounded-lg backdrop-blur-sm animate-fadeIn text-center", children: [_jsx("div", { className: "bg-purple-900/20 p-4 rounded-full mb-6", children: _jsx(Rocket, { className: "h-10 w-10 text-purple-400" }) }), _jsx("h3", { className: "text-2xl font-bold mb-3 text-white", children: "No strategies yet" }), _jsx("p", { className: "text-gray-400 text-center mb-8 max-w-md", children: "Let's build your future empire \uD83D\uDE80 Create your first growth strategy with help from your AI Executive Team." }), _jsxs(Button, { onClick: onCreateNew, className: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Your First Strategy"] })] }));
}
