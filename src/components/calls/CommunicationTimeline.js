import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Phone, MessageSquare, VideoIcon } from "lucide-react";
import CommunicationItem from "./CommunicationItem";
import { Skeleton } from "@/components/ui/skeleton";
export default function CommunicationTimeline({ upcomingCommunications, pastCommunications, isLoading, }) {
    const [activeFilter, setActiveFilter] = useState("all");
    const filterCommunications = (communications, filter) => {
        if (filter === "all")
            return communications;
        return communications.filter((comm) => comm.type === filter);
    };
    const filteredUpcoming = filterCommunications(upcomingCommunications, activeFilter);
    const filteredPast = filterCommunications(pastCommunications, activeFilter);
    // Show only the 5 most recent past communications in the timeline
    const recentPastCommunications = filteredPast.slice(0, 5);
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Communication Timeline" }), _jsx(CardDescription, { children: "Upcoming and recent communications" })] }), _jsx(Tabs, { defaultValue: "all", value: activeFilter, onValueChange: (v) => setActiveFilter(v), children: _jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }), _jsxs(TabsTrigger, { value: "phone", className: "text-xs", children: [_jsx(Phone, { className: "h-3 w-3 mr-1" }), "Phone"] }), _jsxs(TabsTrigger, { value: "zoom", className: "text-xs", children: [_jsx(VideoIcon, { className: "h-3 w-3 mr-1" }), "Zoom"] }), _jsxs(TabsTrigger, { value: "whatsapp", className: "text-xs", children: [_jsx(MessageSquare, { className: "h-3 w-3 mr-1" }), "WhatsApp"] })] }) })] }) }), _jsx(CardContent, { children: isLoading ? (_jsx(TimelineLoading, {})) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-8", children: [_jsxs("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4", children: [_jsx(CalendarDays, { className: "h-4 w-4 mr-2" }), "Upcoming"] }), filteredUpcoming.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md", children: "No upcoming communications" })) : (_jsx("div", { className: "space-y-4", children: filteredUpcoming.map((communication) => (_jsx(CommunicationItem, { communication: communication, isUpcoming: true }, communication.id))) }))] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4", children: "Recent Activity" }), recentPastCommunications.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md", children: "No recent communications" })) : (_jsx("div", { className: "space-y-4", children: recentPastCommunications.map((communication) => (_jsx(CommunicationItem, { communication: communication, isUpcoming: false }, communication.id))) }))] })] })) })] }));
}
function TimelineLoading() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Skeleton, { className: "h-5 w-32 mb-4" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-24 w-full" }), _jsx(Skeleton, { className: "h-24 w-full" })] })] }), _jsxs("div", { children: [_jsx(Skeleton, { className: "h-5 w-32 mb-4" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-24 w-full" }), _jsx(Skeleton, { className: "h-24 w-full" }), _jsx(Skeleton, { className: "h-24 w-full" })] })] })] }));
}
