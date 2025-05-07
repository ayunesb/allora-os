var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Phone, Video, MessageSquare, Search, ExternalLink, CheckCircle, XCircle, } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunications } from "@/hooks/communications";
export default function UpcomingCommunications({ communications, isLoading }) {
    const [searchQuery, setSearchQuery] = useState("");
    const { updateCommunicationStatus } = useCommunications();
    const filteredCommunications = communications.filter((comm) => {
        var _a, _b;
        return ((_b = (_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase())) ||
            comm.type.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const sortedCommunications = [...filteredCommunications].sort((a, b) => {
        if (!a.scheduled_at || !b.scheduled_at)
            return 0;
        return (new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
    });
    const getTypeIcon = (type) => {
        switch (type) {
            case "phone":
                return _jsx(Phone, { className: "h-4 w-4 text-blue-600" });
            case "zoom":
                return _jsx(Video, { className: "h-4 w-4 text-purple-600" });
            case "whatsapp":
                return _jsx(MessageSquare, { className: "h-4 w-4 text-green-600" });
            default:
                return null;
        }
    };
    const formatDateTime = (dateString) => {
        if (!dateString)
            return "N/A";
        try {
            return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
        }
        catch (e) {
            return dateString;
        }
    };
    const handleMarkCompleted = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(id, "completed");
        }
        catch (error) {
            console.error("Error marking as completed:", error);
        }
    });
    const handleMarkMissed = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(id, "missed");
        }
        catch (error) {
            console.error("Error marking as missed:", error);
        }
    });
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Upcoming Communications" }), _jsx(CardDescription, { children: "Your scheduled calls, meetings and chats" })] }), _jsxs("div", { className: "relative w-full sm:max-w-xs", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search communications...", className: "pl-8", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }) }), _jsx(CardContent, { children: isLoading ? (_jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" })] })) : sortedCommunications.length === 0 ? (_jsxs("div", { className: "text-center py-8 border rounded-md border-dashed", children: [_jsx("p", { className: "text-muted-foreground", children: "No upcoming communications found" }), searchQuery && (_jsx(Button, { variant: "link", onClick: () => setSearchQuery(""), className: "mt-2", children: "Clear search" }))] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Lead" }), _jsx(TableHead, { children: "Scheduled" }), _jsx(TableHead, { children: "Duration" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: sortedCommunications.map((comm) => {
                                    var _a, _b, _c;
                                    return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [getTypeIcon(comm.type), _jsx("span", { className: "capitalize", children: comm.type })] }) }), _jsx(TableCell, { children: ((_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) || "Unknown" }), _jsx(TableCell, { children: formatDateTime(comm.scheduled_at) }), _jsx(TableCell, { children: ((_b = comm.metadata) === null || _b === void 0 ? void 0 : _b.duration)
                                                    ? `${comm.metadata.duration} minutes`
                                                    : "N/A" }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [comm.meeting_link && (_jsx(Button, { size: "sm", variant: "outline", asChild: true, children: _jsxs("a", { href: comm.meeting_link, target: "_blank", rel: "noopener noreferrer", children: [_jsx(ExternalLink, { className: "h-3 w-3 mr-1" }), "Join"] }) })), comm.type === "whatsapp" && ((_c = comm.leads) === null || _c === void 0 ? void 0 : _c.phone) && (_jsx(Button, { size: "sm", variant: "outline", asChild: true, children: _jsxs("a", { href: `https://wa.me/${comm.leads.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noopener noreferrer", children: [_jsx(MessageSquare, { className: "h-3 w-3 mr-1" }), "Chat"] }) })), _jsxs(Button, { size: "sm", variant: "default", onClick: () => handleMarkCompleted(comm.id), children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Done"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleMarkMissed(comm.id), children: [_jsx(XCircle, { className: "h-3 w-3 mr-1" }), "Missed"] })] }) })] }, comm.id));
                                }) })] }) })) })] }));
}
