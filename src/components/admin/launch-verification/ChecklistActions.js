import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Save, Download, RefreshCw } from "lucide-react";
export function ChecklistActions({ isSaving, isLoading, onLoadChecklist, onSaveChecklist, }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [_jsx(Button, { onClick: onSaveChecklist, disabled: isSaving, variant: "default", className: "gap-2", children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "h-4 w-4" }), "Save Progress"] })) }), _jsx(Button, { onClick: onLoadChecklist, disabled: isLoading, variant: "outline", className: "gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }), "Loading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "h-4 w-4" }), "Load Saved Progress"] })) })] }));
}
