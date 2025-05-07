"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AgentPerformanceDashboard } from "./AgentPerformanceDashboard";
export const AgentPerformanceModal = ({ open, onClose, pluginName }) => {
    return (_jsx(Dialog, { open: open, onOpenChange: onClose, children: _jsx(DialogContent, { className: "max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: _jsx(AgentPerformanceDashboard, { pluginFilter: pluginName }) }) }));
};
