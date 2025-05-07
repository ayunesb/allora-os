import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function ImplementationTabs({ activeTab, onTabChange }) {
    return (_jsx(Tabs, { value: activeTab, onValueChange: onTabChange, className: "w-full", children: _jsxs(TabsList, { className: "grid grid-cols-4 mb-4", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "tasks", children: "Tasks" }), _jsx(TabsTrigger, { value: "milestones", children: "Milestones" }), _jsx(TabsTrigger, { value: "metrics", children: "Metrics" })] }) }));
}
