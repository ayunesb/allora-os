import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, MessageSquare, Phone, Clock, History, VideoIcon, Sparkles, BarChart, } from "lucide-react";
import ScrollableTabs from "@/components/ui/scrollable-tabs";
import { HelpTooltip } from "@/components/help/HelpTooltip";
import { HelpButton } from "@/components/help/HelpButton";
export default function CallTabs({ activeTab, onTabChange, isLoading = false, }) {
    const tabs = [
        {
            id: "timeline",
            label: "Timeline",
            icon: Clock,
            tooltip: "View all communications in chronological order",
        },
        {
            id: "upcoming",
            label: "Upcoming",
            icon: Calendar,
            tooltip: "View scheduled calls and meetings",
        },
        {
            id: "history",
            label: "History",
            icon: History,
            tooltip: "View past calls and communication history",
        },
        {
            id: "scripts",
            label: "Call Scripts",
            shortLabel: "Scripts",
            icon: Phone,
            tooltip: "AI-generated call scripts for different scenarios",
        },
        {
            id: "messages",
            label: "Message Templates",
            shortLabel: "Messages",
            icon: MessageSquare,
            tooltip: "Templates for follow-up messages and emails",
        },
        {
            id: "zoom",
            label: "Zoom Tools",
            shortLabel: "Zoom",
            icon: VideoIcon,
            tooltip: "Schedule and manage Zoom meetings",
        },
        {
            id: "ai-assistant",
            label: "AI Assistant",
            shortLabel: "Assistant",
            icon: Sparkles,
            tooltip: "Get AI assistance during calls and meetings",
        },
        {
            id: "analytics",
            label: "Analytics",
            icon: BarChart,
            tooltip: "View call analytics and performance metrics",
        },
    ];
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center px-2", children: [_jsx(HelpTooltip, { content: "Navigate between different call management features", children: _jsx("span", { className: "text-sm font-medium", children: "Call Management" }) }), _jsx(HelpButton, { contextId: "admin.calls", variant: "icon", tooltipText: "Learn more about call features" })] }), _jsx(ScrollableTabs, { tabs: tabs, activeTab: activeTab, onTabChange: onTabChange, isLoading: isLoading, className: "w-full" })] }));
}
