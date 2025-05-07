import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Phone, MessageSquare, Video } from "lucide-react";
import { useCommunications } from "@/hooks/useCommunications";
export default function CallsHeader() {
    const { upcomingCommunications, pastCommunications } = useCommunications();
    const stats = useMemo(() => {
        const totalCommunications = upcomingCommunications.length + pastCommunications.length;
        const completedCommunications = pastCommunications.filter((c) => c.status === "completed").length;
        const scheduledCommunications = upcomingCommunications.length;
        const phoneCalls = [
            ...upcomingCommunications,
            ...pastCommunications,
        ].filter((c) => c.type === "phone").length;
        const zoomMeetings = [
            ...upcomingCommunications,
            ...pastCommunications,
        ].filter((c) => c.type === "zoom").length;
        const whatsappChats = [
            ...upcomingCommunications,
            ...pastCommunications,
        ].filter((c) => c.type === "whatsapp").length;
        return {
            totalCommunications,
            completedCommunications,
            scheduledCommunications,
            phoneCalls,
            zoomMeetings,
            whatsappChats,
        };
    }, [upcomingCommunications, pastCommunications]);
    return (_jsxs("div", { className: "flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Client Communications" }), _jsx("p", { className: "text-muted-foreground", children: "Manage all your communications with leads and clients in one place" })] }), _jsxs("div", { className: "grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4", children: [_jsxs("div", { className: "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center", children: [_jsxs("div", { className: "flex items-center space-x-1 text-primary", children: [_jsx(Phone, { className: "h-3 w-3 sm:h-4 sm:w-4" }), _jsx("span", { className: "text-xs sm:text-sm font-medium", children: stats.phoneCalls })] }), _jsx("span", { className: "text-xs text-muted-foreground mt-1 hidden sm:block", children: "Phone Calls" })] }), _jsxs("div", { className: "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center", children: [_jsxs("div", { className: "flex items-center space-x-1 text-primary", children: [_jsx(Video, { className: "h-3 w-3 sm:h-4 sm:w-4" }), _jsx("span", { className: "text-xs sm:text-sm font-medium", children: stats.zoomMeetings })] }), _jsx("span", { className: "text-xs text-muted-foreground mt-1 hidden sm:block", children: "Zoom Meetings" })] }), _jsxs("div", { className: "bg-primary/5 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center text-center", children: [_jsxs("div", { className: "flex items-center space-x-1 text-primary", children: [_jsx(MessageSquare, { className: "h-3 w-3 sm:h-4 sm:w-4" }), _jsx("span", { className: "text-xs sm:text-sm font-medium", children: stats.whatsappChats })] }), _jsx("span", { className: "text-xs text-muted-foreground mt-1 hidden sm:block", children: "WhatsApp Chats" })] })] })] }));
}
