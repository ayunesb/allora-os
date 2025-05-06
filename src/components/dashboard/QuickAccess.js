import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { BarChart3, Users, LineChart, Briefcase, Phone, PieChart, TrendingUp, } from "lucide-react";
import { useNavigate } from "react-router-dom";
const QuickAccess = () => {
    const navigate = useNavigate();
    const links = [
        {
            title: "Executives",
            description: "Manage your AI executive team",
            icon: _jsx(Users, { className: "h-5 w-5" }),
            path: "/dashboard/executives",
        },
        {
            title: "Leads",
            description: "View and manage your leads",
            icon: _jsx(Users, { className: "h-5 w-5" }),
            path: "/dashboard/leads",
        },
        {
            title: "Campaigns",
            description: "Create and manage campaigns",
            icon: _jsx(Briefcase, { className: "h-5 w-5" }),
            path: "/dashboard/campaigns",
        },
        {
            title: "Analytics",
            description: "View analytics and insights",
            icon: _jsx(BarChart3, { className: "h-5 w-5" }),
            path: "/dashboard/analytics",
        },
        {
            title: "Strategies",
            description: "Browse and implement strategies",
            icon: _jsx(LineChart, { className: "h-5 w-5" }),
            path: "/dashboard/strategies",
        },
        {
            title: "Calls",
            description: "Schedule and manage calls",
            icon: _jsx(Phone, { className: "h-5 w-5" }),
            path: "/dashboard/calls",
        },
        {
            title: "Risk Analysis",
            description: "Risk assessment heatmap",
            icon: _jsx(PieChart, { className: "h-5 w-5" }),
            path: "/dashboard/risk-heatmap",
        },
        {
            title: "Forecasting",
            description: "KPI predictions & anomaly detection",
            icon: _jsx(TrendingUp, { className: "h-5 w-5" }),
            path: "/dashboard/forecast",
        },
    ];
    const handleNavigate = (path) => {
        navigate(path);
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Quick Access" }), _jsx(CardDescription, { children: "Access key features and tools" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: links.map((link) => (_jsxs("div", { className: "p-4 flex flex-col items-center justify-center rounded-lg border bg-card text-card-foreground shadow hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer", onClick: () => handleNavigate(link.path), children: [_jsx("div", { className: "mb-2 rounded-full p-2 bg-primary/10", children: link.icon }), _jsx("div", { className: "text-sm font-medium text-center", children: link.title })] }, link.title))) }) })] }));
};
export default QuickAccess;
