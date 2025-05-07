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
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { CalendarDays, Users, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function UpcomingZoomMeeting() {
    var _a;
    const [hasUpcomingMeeting, setHasUpcomingMeeting] = useState(false);
    const [meetingData, setMeetingData] = useState(null);
    const { profile } = useAuth();
    useEffect(() => {
        // Check if we should show a demo meeting
        const checkForMeeting = () => __awaiter(this, void 0, void 0, function* () {
            if (!(profile === null || profile === void 0 ? void 0 : profile.company_id))
                return;
            try {
                // Check if there are any upcoming meetings in the database
                const { data: meetings, error } = yield supabase
                    .from("zoom_meetings")
                    .select("*")
                    .eq("company_id", profile.company_id)
                    .gt("meeting_time", new Date().toISOString())
                    .order("meeting_time", { ascending: true })
                    .limit(1);
                if (error)
                    throw error;
                if (meetings && meetings.length > 0) {
                    setHasUpcomingMeeting(true);
                    setMeetingData(meetings[0]);
                    return;
                }
                // If no meetings, check feature flags to see if we should create a demo one
                const { data: featureFlags } = yield supabase
                    .from("feature_flags")
                    .select("*")
                    .eq("feature_name", "demo_zoom_meeting")
                    .eq("is_enabled", true)
                    .limit(1);
                if (featureFlags && featureFlags.length > 0) {
                    // Create a demo meeting - 2 days from now
                    const meetingTime = new Date();
                    meetingTime.setDate(meetingTime.getDate() + 2);
                    meetingTime.setHours(10, 0, 0, 0);
                    const demoMeeting = {
                        title: "Strategy Review with AI Executive Team",
                        meeting_time: meetingTime.toISOString(),
                        duration: 45,
                        zoom_url: "https://zoom.us/j/123456789",
                        meeting_id: "123 456 789",
                        password: "allora",
                        host: "AI CEO",
                        company_id: profile.company_id,
                        participants: ["You", "AI CEO", "AI CMO", "AI CTO"],
                    };
                    setHasUpcomingMeeting(true);
                    setMeetingData(demoMeeting);
                }
            }
            catch (error) {
                console.error("Error checking for meetings:", error);
            }
        });
        checkForMeeting();
    }, [profile === null || profile === void 0 ? void 0 : profile.company_id]);
    const handleCopyMeetingId = () => {
        if (meetingData === null || meetingData === void 0 ? void 0 : meetingData.meeting_id) {
            navigator.clipboard.writeText(meetingData.meeting_id);
            toast.success("Meeting ID copied to clipboard");
        }
    };
    const handleJoinMeeting = () => {
        if (meetingData === null || meetingData === void 0 ? void 0 : meetingData.zoom_url) {
            window.open(meetingData.zoom_url, "_blank");
        }
    };
    if (!hasUpcomingMeeting) {
        return null;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };
    return (_jsxs(Card, { className: "shadow-md", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: "Upcoming Strategy Meeting" }), _jsx(CardDescription, { children: "Your next meeting with the AI executive team" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CalendarDays, { className: "h-5 w-5 text-primary mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: (meetingData === null || meetingData === void 0 ? void 0 : meetingData.title) || "Strategy Review" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [meetingData
                                                ? formatDate(meetingData.meeting_time)
                                                : "Loading...", (meetingData === null || meetingData === void 0 ? void 0 : meetingData.duration) ? ` (${meetingData.duration} mins)` : ""] })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Users, { className: "h-5 w-5 text-primary mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Participants" }), _jsx("p", { className: "text-sm text-muted-foreground", children: ((_a = meetingData === null || meetingData === void 0 ? void 0 : meetingData.participants) === null || _a === void 0 ? void 0 : _a.join(", ")) || "AI Executive Team" })] })] }), _jsxs("div", { className: "flex items-center gap-3 mt-2 pt-2 border-t", children: [_jsxs("div", { className: "text-xs bg-primary/10 p-1.5 rounded flex items-center gap-1.5", children: [_jsx("span", { className: "font-medium", children: "ID:" }), " ", (meetingData === null || meetingData === void 0 ? void 0 : meetingData.meeting_id) || "123 456 789", _jsx("button", { onClick: handleCopyMeetingId, className: "text-primary hover:text-primary/80", children: _jsx(Copy, { className: "h-3.5 w-3.5" }) })] }), _jsxs("div", { className: "text-xs bg-primary/10 p-1.5 rounded", children: [_jsx("span", { className: "font-medium", children: "Password:" }), " ", (meetingData === null || meetingData === void 0 ? void 0 : meetingData.password) || "allora"] }), _jsxs(Button, { className: "ml-auto", size: "sm", onClick: handleJoinMeeting, children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-1.5" }), "Join Meeting"] })] })] })] }));
}
