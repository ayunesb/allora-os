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
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";
import { Phone, Video, MessageSquare, Calendar, ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, Edit, ExternalLink, } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/communications";
import CommunicationStatusSelector from "./CommunicationStatusSelector";
export default function CommunicationItem({ communication, isUpcoming }) {
    var _a;
    const [isOpen, setIsOpen] = useState(false);
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [notes, setNotes] = useState(communication.notes || "");
    const { updateCommunicationStatus } = useCommunications();
    const getTypeIcon = () => {
        switch (communication.type) {
            case "phone":
                return _jsx(Phone, { className: "h-4 w-4" });
            case "zoom":
                return _jsx(Video, { className: "h-4 w-4" });
            case "whatsapp":
                return _jsx(MessageSquare, { className: "h-4 w-4" });
            default:
                return _jsx(Calendar, { className: "h-4 w-4" });
        }
    };
    const getStatusBadge = () => {
        switch (communication.status) {
            case "scheduled":
                return (_jsx(Badge, { variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200", children: "Scheduled" }));
            case "completed":
                return (_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: "Completed" }));
            case "missed":
                return (_jsx(Badge, { variant: "outline", className: "bg-red-50 text-red-700 border-red-200", children: "Missed" }));
            case "cancelled":
                return (_jsx(Badge, { variant: "outline", className: "bg-gray-50 text-gray-700 border-gray-200", children: "Cancelled" }));
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
    const getLeadName = () => {
        var _a;
        return ((_a = communication.leads) === null || _a === void 0 ? void 0 : _a.name) || "Unknown Lead";
    };
    const handleSaveNotes = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(communication.id, communication.status, notes);
            setIsEditingNotes(false);
        }
        catch (error) {
            console.error("Error saving notes:", error);
        }
    });
    const handleMarkCompleted = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(communication.id, "completed");
        }
        catch (error) {
            console.error("Error marking as completed:", error);
        }
    });
    const handleMarkMissed = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(communication.id, "missed");
        }
        catch (error) {
            console.error("Error marking as missed:", error);
        }
    });
    return (_jsx("div", { className: `border rounded-lg p-3 ${communication.status === "scheduled"
            ? "border-blue-200 bg-blue-50/30"
            : communication.status === "completed"
                ? "border-green-200 bg-green-50/30"
                : communication.status === "missed"
                    ? "border-red-200 bg-red-50/30"
                    : "border-gray-200 bg-gray-50/30"}`, children: _jsxs(Collapsible, { open: isOpen, onOpenChange: setIsOpen, children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `p-2 rounded-full ${communication.type === "phone"
                                        ? "bg-blue-100 text-blue-700"
                                        : communication.type === "zoom"
                                            ? "bg-purple-100 text-purple-700"
                                            : "bg-green-100 text-green-700"}`, children: getTypeIcon() }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-sm", children: getLeadName() }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [communication.type.charAt(0).toUpperCase() +
                                                    communication.type.slice(1), " ", communication.type === "zoom"
                                                    ? "Meeting"
                                                    : communication.type === "whatsapp"
                                                        ? "Chat"
                                                        : "Call"] }), _jsxs("div", { className: "flex items-center mt-1 space-x-2", children: [_jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { className: "text-xs text-muted-foreground", children: formatDateTime(communication.scheduled_at) })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [getStatusBadge(), _jsx(CollapsibleTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: isOpen ? (_jsx(ChevronUp, { className: "h-4 w-4" })) : (_jsx(ChevronDown, { className: "h-4 w-4" })) }) })] })] }), _jsxs(CollapsibleContent, { className: "pt-3 mt-3 border-t", children: [isUpcoming && communication.status === "scheduled" && (_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "space-x-2", children: [communication.meeting_link && (_jsx(Button, { size: "sm", variant: "outline", asChild: true, children: _jsxs("a", { href: communication.meeting_link, target: "_blank", rel: "noopener noreferrer", children: [_jsx(ExternalLink, { className: "h-3 w-3 mr-1" }), "Join Meeting"] }) })), communication.type === "whatsapp" &&
                                            ((_a = communication.leads) === null || _a === void 0 ? void 0 : _a.phone) && (_jsx(Button, { size: "sm", variant: "outline", asChild: true, children: _jsxs("a", { href: `https://wa.me/${communication.leads.phone.replace(/[^0-9]/g, "")}`, target: "_blank", rel: "noopener noreferrer", children: [_jsx(MessageSquare, { className: "h-3 w-3 mr-1" }), "Open WhatsApp"] }) }))] }), _jsxs("div", { className: "space-x-2", children: [_jsxs(Button, { size: "sm", variant: "default", onClick: handleMarkCompleted, children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Mark Completed"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: handleMarkMissed, children: [_jsx(XCircle, { className: "h-3 w-3 mr-1" }), "Mark Missed"] })] })] })), !isUpcoming && (_jsx(CommunicationStatusSelector, { communicationId: communication.id, currentStatus: communication.status, currentOutcome: communication.outcome })), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h5", { className: "text-sm font-medium", children: "Notes" }), !isEditingNotes ? (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setIsEditingNotes(true), children: [_jsx(Edit, { className: "h-3 w-3 mr-1" }), "Edit"] })) : (_jsxs("div", { className: "space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsEditingNotes(false), children: "Cancel" }), _jsx(Button, { variant: "default", size: "sm", onClick: handleSaveNotes, children: "Save" })] }))] }), !isEditingNotes ? (_jsx("p", { className: "text-sm text-muted-foreground", children: communication.notes || "No notes available" })) : (_jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Enter notes about this communication...", className: "w-full", rows: 3 }))] }), communication.ai_summary && (_jsxs("div", { className: "mt-4 p-3 bg-primary-foreground/50 rounded-md border border-primary/10", children: [_jsx("h5", { className: "text-sm font-medium mb-2", children: "AI Summary" }), _jsx("p", { className: "text-sm text-muted-foreground", children: communication.ai_summary })] }))] })] }) }));
}
