import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DebateContainer from "@/components/debate/DebateContainer";
import AIChatDashboard from "./AIChat";
export default function Debate() {
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Executive Debate" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Generate strategic insights through a simulated debate among AI executives" })] }), _jsxs(Tabs, { defaultValue: "debate", className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "debate", children: "Debate Simulator" }), _jsx(TabsTrigger, { value: "chat", children: "Executive Chat" })] }), _jsx(TabsContent, { value: "debate", className: "space-y-4", children: _jsx(DebateContainer, {}) }), _jsx(TabsContent, { value: "chat", className: "space-y-4", children: _jsx(AIChatDashboard, {}) })] })] }));
}
