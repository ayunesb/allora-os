import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Phone, Video, MessageSquare, Search, FileText, XCircle, CheckCircle, Clock, } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CommunicationNotes from "./CommunicationNotes";
export default function PastCommunications({ communications, isLoading }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewingNotes, setViewingNotes] = useState(null);
    const filteredCommunications = communications.filter((comm) => {
        var _a, _b;
        return ((_b = (_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase())) ||
            comm.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (comm.notes &&
                comm.notes.toLowerCase().includes(searchQuery.toLowerCase()));
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
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return _jsx(CheckCircle, { className: "h-4 w-4 text-green-600" });
            case "missed":
                return _jsx(XCircle, { className: "h-4 w-4 text-red-600" });
            case "cancelled":
                return _jsx(XCircle, { className: "h-4 w-4 text-gray-600" });
            case "scheduled":
                return _jsx(Clock, { className: "h-4 w-4 text-blue-600" });
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
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Communication History" }), _jsx(CardDescription, { children: "Past calls, meetings and chats with leads" })] }), _jsxs("div", { className: "relative w-full sm:max-w-xs", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search communications...", className: "pl-8", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }) }), _jsxs(CardContent, { children: [isLoading ? (_jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-20 w-full" })] })) : filteredCommunications.length === 0 ? (_jsxs("div", { className: "text-center py-8 border rounded-md border-dashed", children: [_jsx("p", { className: "text-muted-foreground", children: "No past communications found" }), searchQuery && (_jsx(Button, { variant: "link", onClick: () => setSearchQuery(""), className: "mt-2", children: "Clear search" }))] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Lead" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Outcome" }), _jsx(TableHead, { children: "Notes" })] }) }), _jsx(TableBody, { children: filteredCommunications.map((comm) => {
                                        var _a;
                                        return (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [getTypeIcon(comm.type), _jsx("span", { className: "capitalize", children: comm.type })] }) }), _jsx(TableCell, { children: ((_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) || "Unknown" }), _jsx(TableCell, { children: formatDateTime(comm.ended_at || comm.scheduled_at) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(comm.status), _jsx("span", { className: "capitalize", children: comm.status })] }) }), _jsx(TableCell, { children: comm.outcome ? (_jsxs(Badge, { variant: "outline", className: `
                            ${comm.outcome === "follow_up" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                            ${comm.outcome === "opportunity" ? "bg-purple-50 text-purple-700 border-purple-200" : ""}
                            ${comm.outcome === "closed_won" ? "bg-green-50 text-green-700 border-green-200" : ""}
                            ${comm.outcome === "closed_lost" ? "bg-red-50 text-red-700 border-red-200" : ""}
                          `, children: [comm.outcome === "follow_up" ? "Follow-up" : "", comm.outcome === "opportunity" ? "Opportunity" : "", comm.outcome === "closed_won" ? "Closed (Won)" : "", comm.outcome === "closed_lost"
                                                                ? "Closed (Lost)"
                                                                : ""] })) : (_jsx("span", { className: "text-muted-foreground text-sm", children: "None" })) }), _jsx(TableCell, { children: _jsxs(Button, { variant: "ghost", size: "sm", disabled: !comm.notes && !comm.ai_summary, onClick: () => setViewingNotes(comm.id), children: [_jsx(FileText, { className: "h-4 w-4 mr-2" }), "View"] }) })] }, comm.id));
                                    }) })] }) })), viewingNotes && (_jsx(CommunicationNotes, { communicationId: viewingNotes, communications: communications, isLoading: isLoading, onClose: () => setViewingNotes(null) }))] })] }));
}
