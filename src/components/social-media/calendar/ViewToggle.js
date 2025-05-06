import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarIcon, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function ViewToggle({ view, onViewChange, postCount }) {
    // Create a typed wrapper function for onViewChange
    const handleViewChange = (value) => {
        if (value === "calendar" || value === "list") {
            onViewChange(value);
        }
    };
    return (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Tabs, { value: view, onValueChange: handleViewChange, children: _jsxs(TabsList, { children: [_jsxs(TabsTrigger, { value: "calendar", children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), "Calendar"] }), _jsxs(TabsTrigger, { value: "list", children: [_jsx(List, { className: "mr-2 h-4 w-4" }), "List"] })] }) }), postCount > 0 && (_jsxs(Badge, { variant: "outline", children: [postCount, " post", postCount !== 1 ? "s" : ""] }))] }));
}
