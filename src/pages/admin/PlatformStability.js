import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, FileText, Save } from "lucide-react";
import { toast } from "sonner";
export default function PlatformStability() {
    const [progress, setProgress] = useState(0);
    const [totalItems] = useState(6);
    const stabilityItems = [
        {
            id: "build",
            text: "Check that the application builds without errors on Vercel or other hosting platforms",
            priority: "critical",
            checked: false,
        },
        {
            id: "supabase",
            text: "Confirm Supabase is connected, healthy, and shows no critical lints",
            priority: "critical",
            checked: false,
        },
        {
            id: "apis",
            text: "Verify Twilio, Stripe, Zoom, Heygen, Postmark, Zapier are connected with test data flows",
            priority: "high",
            checked: false,
        },
        {
            id: "flow",
            text: "Test full flow: Signup → Onboarding → Dashboard → Strategy → Campaigns → Calls → Leads → Payments",
            priority: "high",
            checked: false,
        },
        {
            id: "rls",
            text: "Verify Supabase tables and permissions are secured with Row Level Security activated",
            priority: "critical",
            checked: false,
        },
        {
            id: "errors",
            text: "Ensure the application displays appropriate user feedback for various error scenarios",
            priority: "normal",
            checked: false,
        },
    ];
    const [items, setItems] = useState(stabilityItems);
    const handleToggleItem = (id) => {
        const updatedItems = items.map((item) => item.id === id ? Object.assign(Object.assign({}, item), { checked: !item.checked }) : item);
        setItems(updatedItems);
        setProgress(updatedItems.filter((item) => item.checked).length);
        // Show toast for toggled items
        const item = items.find((item) => item.id === id);
        if (item) {
            const action = !item.checked ? "completed" : "reopened";
            toast.success(`Item ${action}: ${item.text.substring(0, 30)}...`);
        }
    };
    const handleSaveProgress = () => {
        toast.success("Progress saved successfully!");
    };
    return (_jsxs("div", { className: "animate-fadeIn space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold", children: "Platform Stability" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Verify core platform stability and integrations" })] }), _jsx("div", { className: "flex justify-between items-center", children: _jsxs("div", { className: "text-sm text-muted-foreground", children: [progress, "/", totalItems, " Completed"] }) }), _jsx("div", { className: "space-y-4", children: items.map((item) => (_jsx(Card, { className: "border p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { children: _jsx("input", { type: "checkbox", id: item.id, checked: item.checked, onChange: () => handleToggleItem(item.id), className: "h-5 w-5 mt-1 rounded border-gray-300 text-primary focus:ring-primary" }) }), _jsxs("div", { className: "flex flex-col flex-grow", children: [_jsx("label", { htmlFor: item.id, className: `font-medium ${item.checked ? "line-through text-muted-foreground" : ""}`, children: item.text }), item.priority === "high" && (_jsx("span", { className: "mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full w-fit", children: "HIGH" })), item.priority === "critical" && (_jsx("span", { className: "mt-1 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full w-fit", children: "CRITICAL" }))] })] }) }, item.id))) }), _jsxs("div", { className: "flex justify-between pt-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(RotateCw, { className: "h-4 w-4" }), "Load Saved"] }), _jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(FileText, { className: "h-4 w-4" }), "Export"] })] }), _jsxs(Button, { onClick: handleSaveProgress, className: "gap-2", children: [_jsx(Save, { className: "h-4 w-4" }), "Save Progress"] })] })] }));
}
