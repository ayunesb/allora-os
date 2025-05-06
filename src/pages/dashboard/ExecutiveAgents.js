import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ExecutiveAgents() {
    const navigate = useNavigate();
    const handleCreateAgent = () => {
        navigate("/dashboard/executives/create");
    };
    return (_jsxs("div", { className: "container mx-auto px-4", children: [_jsx(PageTitle, { title: "AI Executive Agents", description: "Manage your AI executive team", children: "AI Executive Agents" }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("div", { children: _jsx(Button, { variant: "outline", children: "All Agents" }) }), _jsxs(Button, { onClick: handleCreateAgent, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Agent"] })] }), _jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("p", { children: "Executive agent functionality is being implemented." }), _jsx("div", { className: "w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2", children: _jsx("div", { className: "h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 ease-in-out", style: { width: `${(agent.xp / agent.maxXp) * 100}%` } }) })] }) })] }));
}
