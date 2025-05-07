import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { usePreLaunchChecklist } from "@/hooks/admin/usePreLaunchChecklist";
import { ChecklistSection, LaunchStatusFooter } from "./pre-launch-checklist";
export default function PreLaunchChecklist() {
    const { toggleItem, criticalItemsCompleted, allItemsCompleted, getItemsByCategory, } = usePreLaunchChecklist();
    const apiItems = getItemsByCategory("Supabase");
    const cleanupItems = getItemsByCategory("Cleanup");
    const testingItems = getItemsByCategory("Testing");
    return (_jsxs(Card, { className: "border-primary/10 shadow-sm", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-2xl flex items-center gap-2", children: ["Pre-Launch Checklist", allItemsCompleted ? (_jsx("span", { className: "text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full", children: "Ready for Launch" })) : criticalItemsCompleted ? (_jsx("span", { className: "text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full", children: "Ready for Launch" })) : (_jsx("span", { className: "text-sm bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full", children: "Critical Items Pending" }))] }), _jsx(CardDescription, { children: "All items completed - ready for launch!" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(ChecklistSection, { title: "API Integrations", items: apiItems, onToggle: toggleItem }), _jsx(ChecklistSection, { title: "Code Cleanup", items: cleanupItems, onToggle: toggleItem }), _jsx(ChecklistSection, { title: "Final Testing", items: testingItems, onToggle: toggleItem }), _jsx(LaunchStatusFooter, { allItemsCompleted: allItemsCompleted, criticalItemsCompleted: criticalItemsCompleted })] }) })] }));
}
