import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Info, MessageSquare, PlusCircle, RocketIcon, SparklesIcon, } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
const executiveRoles = [
    {
        role: "ceo",
        title: "CEO Advisor",
        description: "Provides strategic vision and leadership guidance for your business",
        icon: _jsx(RocketIcon, { className: "h-5 w-5" }),
        capabilities: [
            "Develop long-term business strategies",
            "Analyze competitive landscape",
            "Guide overall company direction",
            "Make high-level business recommendations",
        ],
        examples: [
            "What growth strategies should we focus on this quarter?",
            "How can we position ourselves against our competitors?",
            "What are the biggest risks to our business model?",
        ],
    },
    {
        role: "cfo",
        title: "CFO Advisor",
        description: "Offers financial insights and investment guidance",
        icon: _jsx(SparklesIcon, { className: "h-5 w-5" }),
        capabilities: [
            "Analyze financial performance",
            "Create budget projections",
            "Develop risk management strategies",
            "Provide investment advice",
        ],
        examples: [
            "How should we allocate our marketing budget?",
            "What's the ROI potential of this new initiative?",
            "How can we improve our cash flow management?",
        ],
    },
    {
        role: "strategy",
        title: "Strategy Consultant",
        description: "Provides specialized advice on business growth and optimization",
        icon: _jsx(Brain, { className: "h-5 w-5" }),
        capabilities: [
            "Market expansion strategies",
            "Business model innovation",
            "Process optimization",
            "Customer acquisition strategies",
        ],
        examples: [
            "How can we optimize our customer acquisition funnel?",
            "What market segments should we explore next?",
            "How can we improve our operational efficiency?",
        ],
    },
];
export function AIExecutiveExplainer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();
    const handleOpenRoleDialog = (role) => {
        setSelectedRole(role);
        setIsDialogOpen(true);
    };
    const startConversation = () => {
        if (selectedRole) {
            navigate("/dashboard/ai-bots?role=" + selectedRole.role);
            setIsDialogOpen(false);
        }
    };
    const navigateToDebate = () => {
        navigate("/dashboard/ai-bots#debate");
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "bg-muted/30 border rounded-lg p-4", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Info, { className: "h-5 w-5 text-primary mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "How AI Executives Work" }), _jsx("p", { className: "text-muted-foreground", children: "Our AI executives model the thinking and expertise of world-class business leaders. They analyze your business context and provide personalized guidance on strategies, decisions, and growth opportunities." })] })] }) }), _jsx("div", { className: "grid gap-6 md:grid-cols-3", children: executiveRoles.map((role) => (_jsxs(Card, { className: "cursor-pointer hover:border-primary/50 transition-all", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs(CardTitle, { className: "flex items-center text-lg", children: [role.icon, _jsx("span", { className: "ml-2", children: role.title })] }) }), _jsx(CardDescription, { children: role.description })] }), _jsxs(CardContent, { children: [_jsx("h4", { className: "text-sm font-medium mb-2", children: "How they can help:" }), _jsx("ul", { className: "text-sm text-muted-foreground space-y-1", children: role.capabilities.slice(0, 3).map((capability, index) => (_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "mr-2", children: "\u2022" }), _jsx("span", { children: capability })] }, index))) })] }), _jsx(CardFooter, { children: _jsxs(Button, { variant: "outline", className: "w-full", onClick: () => handleOpenRoleDialog(role), children: [_jsx(Info, { className: "mr-2 h-4 w-4" }), "Learn More"] }) })] }, role.role))) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mt-4", children: [_jsxs(Button, { onClick: navigateToDebate, className: "flex-1 max-w-md mx-auto", children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), "Start Executive Board Meeting"] }), _jsxs(Button, { variant: "outline", onClick: () => navigate("/dashboard/ai-bots"), className: "flex-1 max-w-md mx-auto", children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Explore All Executives"] })] }), selectedRole && (_jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center", children: [selectedRole.icon, _jsx("span", { className: "ml-2", children: selectedRole.title })] }), _jsx(DialogDescription, { children: selectedRole.description })] }), _jsxs("div", { className: "py-4", children: [_jsx("h3", { className: "font-medium mb-2", children: "Key capabilities:" }), _jsx("ul", { className: "space-y-1 mb-4", children: selectedRole.capabilities.map((capability, index) => (_jsxs("li", { className: "flex items-start text-sm", children: [_jsx("span", { className: "mr-2", children: "\u2022" }), _jsx("span", { children: capability })] }, index))) }), _jsx("h3", { className: "font-medium mb-2", children: "Example questions to ask:" }), _jsx("ul", { className: "space-y-1", children: selectedRole.examples.map((example, index) => (_jsxs("li", { className: "flex items-start text-sm", children: [_jsx("span", { className: "mr-2", children: "\u2022" }), _jsx("span", { children: example })] }, index))) })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsDialogOpen(false), children: "Close" }), _jsxs(Button, { onClick: startConversation, children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), "Start Conversation"] })] })] }) }))] }));
}
export default AIExecutiveExplainer;
