import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { executiveBots } from "@/backend/executiveBots";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RocketIcon, Sparkles, Brain, DollarSign, Activity, Users, } from "lucide-react";
export default function ExecutiveRoster() {
    const [activeRole, setActiveRole] = useState("ceo");
    const getRoleIcon = (role) => {
        switch (role) {
            case "ceo":
                return _jsx(RocketIcon, { className: "h-5 w-5" });
            case "cfo":
                return _jsx(DollarSign, { className: "h-5 w-5" });
            case "cio":
                return _jsx(Brain, { className: "h-5 w-5" });
            case "cmo":
                return _jsx(Activity, { className: "h-5 w-5" });
            case "chro":
                return _jsx(Users, { className: "h-5 w-5" });
            case "strategy":
                return _jsx(Sparkles, { className: "h-5 w-5" });
            default:
                return _jsx(Brain, { className: "h-5 w-5" });
        }
    };
    const getRoleTitle = (role) => {
        switch (role) {
            case "ceo":
                return "Chief Executive Officers";
            case "cfo":
                return "Chief Financial Officers";
            case "cio":
                return "Chief Information Officers";
            case "cmo":
                return "Chief Marketing Officers";
            case "chro":
                return "Chief HR Officers";
            case "strategy":
                return "Strategy Consultants";
            default:
                return "Executives";
        }
    };
    return (_jsxs("div", { className: "bg-card border rounded-lg p-6", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Full Executive Roster" }), _jsxs(Tabs, { defaultValue: "ceo", onValueChange: setActiveRole, children: [_jsx(TabsList, { className: "mb-4", children: Object.keys(executiveBots).map((role) => (_jsxs(TabsTrigger, { value: role, className: "flex items-center gap-2", children: [getRoleIcon(role), _jsx("span", { className: "capitalize", children: role })] }, role))) }), Object.entries(executiveBots).map(([role, names]) => (_jsx(TabsContent, { value: role, children: _jsxs("div", { className: "bg-muted/30 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [getRoleIcon(role), _jsx("h3", { className: "text-lg font-medium", children: getRoleTitle(role) })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", children: names.map((name) => (_jsxs("div", { className: "bg-background border border-border/50 rounded-md p-3 flex items-center gap-2", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center", children: name.split(" ")[0][0] }), _jsx("span", { children: name })] }, name))) })] }) }, role)))] })] }));
}
