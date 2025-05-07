var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { useLeads } from "@/hooks/admin/useLeads";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function ZoomScheduler() {
    const [selectedLeadId, setSelectedLeadId] = useState("");
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [meetingTime, setMeetingTime] = useState("");
    const [meetingDuration, setMeetingDuration] = useState(30);
    const [meetingAgenda, setMeetingAgenda] = useState("");
    const { leads, isLoading: leadsLoading } = useLeads();
    const { createZoomMeeting, isLoadingMutation } = useCommunications();
    const handleCreateMeeting = () => __awaiter(this, void 0, void 0, function* () {
        if (!selectedLeadId) {
            toast.error("Please select a lead");
            return;
        }
        if (!meetingTitle.trim()) {
            toast.error("Please enter a meeting title");
            return;
        }
        if (!meetingDate || !meetingTime) {
            toast.error("Please enter a meeting date and time");
            return;
        }
        try {
            const startTime = new Date(`${meetingDate}T${meetingTime}`);
            if (isNaN(startTime.getTime())) {
                toast.error("Invalid date or time");
                return;
            }
            const meetingData = {
                topic: meetingTitle,
                startTime: startTime.toISOString(),
                duration: meetingDuration,
                agenda: meetingAgenda || undefined,
            };
            yield createZoomMeeting(selectedLeadId, meetingData);
            // Reset form after successful creation
            setMeetingTitle("");
            setMeetingDate("");
            setMeetingTime("");
            setMeetingAgenda("");
        }
        catch (error) {
            console.error("Error creating Zoom meeting:", error);
        }
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "lead-select", children: "Select Lead" }), _jsxs(Select, { value: selectedLeadId, onValueChange: setSelectedLeadId, disabled: leadsLoading, children: [_jsx(SelectTrigger, { id: "lead-select", children: _jsx(SelectValue, { placeholder: "Select a lead" }) }), _jsx(SelectContent, { children: leads === null || leads === void 0 ? void 0 : leads.map((lead) => (_jsx(SelectItem, { value: lead.id, children: lead.name }, lead.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "meeting-title", children: "Meeting Title" }), _jsx(Input, { id: "meeting-title", placeholder: "Enter meeting title", value: meetingTitle, onChange: (e) => setMeetingTitle(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "meeting-date", children: "Date" }), _jsx(Input, { id: "meeting-date", type: "date", value: meetingDate, onChange: (e) => setMeetingDate(e.target.value), min: new Date().toISOString().split("T")[0] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "meeting-time", children: "Time" }), _jsx(Input, { id: "meeting-time", type: "time", value: meetingTime, onChange: (e) => setMeetingTime(e.target.value) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "meeting-duration", children: "Duration (minutes)" }), _jsxs(Select, { value: meetingDuration.toString(), onValueChange: (value) => setMeetingDuration(parseInt(value)), children: [_jsx(SelectTrigger, { id: "meeting-duration", children: _jsx(SelectValue, { placeholder: "Select duration" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "15", children: "15 minutes" }), _jsx(SelectItem, { value: "30", children: "30 minutes" }), _jsx(SelectItem, { value: "45", children: "45 minutes" }), _jsx(SelectItem, { value: "60", children: "1 hour" }), _jsx(SelectItem, { value: "90", children: "1.5 hours" }), _jsx(SelectItem, { value: "120", children: "2 hours" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "meeting-agenda", children: "Agenda (optional)" }), _jsx(Textarea, { id: "meeting-agenda", placeholder: "Enter meeting agenda", value: meetingAgenda, onChange: (e) => setMeetingAgenda(e.target.value), rows: 3 })] }), _jsx(Button, { onClick: handleCreateMeeting, disabled: isLoadingMutation ||
                    !selectedLeadId ||
                    !meetingTitle ||
                    !meetingDate ||
                    !meetingTime, className: "w-full", children: isLoadingMutation ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Creating Meeting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Video, { className: "mr-2 h-4 w-4" }), "Schedule Zoom Meeting"] })) }), _jsxs("div", { className: "text-xs text-muted-foreground mt-2", children: [_jsx("p", { children: "A calendar invite will be sent to the lead automatically." }), _jsx("p", { children: "You will receive the meeting link by email and it will appear in your timeline." })] })] }));
}
