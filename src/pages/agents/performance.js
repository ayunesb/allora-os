import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { fetchAILogs } from "@/lib/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
export default function AgentPerformance() {
    const { data, isLoading } = useQuery(["ai_logs"], fetchAILogs);
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    return (_jsx("div", { className: "space-y-4", children: data === null || data === void 0 ? void 0 : data.map((log) => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "text-sm text-muted-foreground", children: log.created_at }), _jsxs(CardContent, { children: [_jsxs("p", { children: [_jsx("strong", { children: "Agent:" }), " ", log.agent_id] }), _jsxs("p", { children: [_jsx("strong", { children: "Action:" }), " ", log.action] }), _jsx("pre", { className: "text-xs mt-2", children: JSON.stringify(log.output, null, 2) })] })] }, log.id))) }));
}
