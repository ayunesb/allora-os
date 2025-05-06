import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageTitle } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
const ExecutiveActions = () => {
    // Sample data - in a real app, this would come from an API
    const actions = [
        {
            id: "1",
            task: "Increase marketing budget for Q2",
            status: "completed",
            executiveName: "CMO",
            completedAt: "2025-04-10T15:30:00Z",
            result: "Increased budget by 15% based on Q1 performance metrics",
        },
        {
            id: "2",
            task: "Review sales team performance",
            status: "pending",
            executiveName: "CEO",
            triggeredBy: "Weekly Review",
        },
        {
            id: "3",
            task: "Optimize cloud infrastructure costs",
            status: "failed",
            executiveName: "CTO",
            error: "Insufficient data to make optimization decision",
        },
    ];
    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (_jsxs(Badge, { className: "bg-green-100 text-green-800 border-green-300", children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), " Completed"] }));
            case "pending":
                return (_jsxs(Badge, { className: "bg-amber-100 text-amber-800 border-amber-300", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), " Pending"] }));
            case "failed":
                return (_jsxs(Badge, { className: "bg-red-100 text-red-800 border-red-300", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), " Failed"] }));
            default:
                return _jsx(Badge, { children: status });
        }
    };
    return (_jsxs("div", { className: "container px-4 py-6", children: [_jsx(PageTitle, { title: "Executive Actions", description: "Track and manage executive decisions and automated actions" }), _jsx("div", { className: "mt-8 space-y-4", children: actions.map((action) => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { className: "text-lg font-medium", children: action.task }), getStatusBadge(action.status)] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Executive:" }), _jsx("span", { className: "font-medium", children: action.executiveName })] }), action.completedAt && (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Completed:" }), _jsx("span", { children: new Date(action.completedAt).toLocaleString() })] })), action.triggeredBy && (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Triggered by:" }), _jsx("span", { children: action.triggeredBy })] })), action.result && (_jsx("div", { className: "mt-4 p-3 bg-green-50 text-green-800 rounded-md text-sm", children: action.result })), action.error && (_jsxs("div", { className: "mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm", children: ["Error: ", action.error] }))] }) })] }, action.id))) })] }));
};
export default ExecutiveActions;
