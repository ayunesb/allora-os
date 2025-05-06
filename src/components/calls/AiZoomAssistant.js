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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Video, Users, MessageSquare, Copy } from "lucide-react";
const zoomMeetingSchema = z.object({
    topic: z.string().min(3, { message: "Meeting topic is required" }),
    agenda: z.string().optional(),
    duration: z.string().min(1, { message: "Duration is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    time: z.string().min(1, { message: "Time is required" }),
    timezone: z.string().optional(),
});
export default function AiZoomAssistant() {
    const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
    const [meetingLink, setMeetingLink] = useState(null);
    const [botPrompt, setBotPrompt] = useState("");
    const [botMessages, setBotMessages] = useState([
        {
            sender: "AI Assistant",
            content: "I'm your Zoom co-host AI. I can help you set up meetings and prepare talking points based on your company materials. What would you like to discuss with your lead?",
        },
    ]);
    const [isLoadingBot, setIsLoadingBot] = useState(false);
    const { control, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(zoomMeetingSchema),
        defaultValues: {
            topic: "",
            agenda: "",
            duration: "30",
            date: new Date().toISOString().split("T")[0],
            time: "10:00",
            timezone: "America/New_York",
        },
    });
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        setIsCreatingMeeting(true);
        try {
            // Simulating creating a Zoom meeting
            // In a real app, this would call a backend function that uses the Zoom API
            yield new Promise((resolve) => setTimeout(resolve, 1500));
            // Mock success response
            const mockMeetingLink = `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;
            setMeetingLink(mockMeetingLink);
            toast.success("Zoom meeting created successfully!");
        }
        catch (error) {
            console.error("Error creating Zoom meeting:", error);
            toast.error("Failed to create Zoom meeting");
        }
        finally {
            setIsCreatingMeeting(false);
        }
    });
    const sendMessage = () => __awaiter(this, void 0, void 0, function* () {
        if (!botPrompt.trim())
            return;
        const userMessage = { sender: "You", content: botPrompt };
        setBotMessages((prev) => [...prev, userMessage]);
        setBotPrompt("");
        setIsLoadingBot(true);
        try {
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            yield new Promise((resolve) => setTimeout(resolve, 1200));
            const botResponse = {
                sender: "AI Assistant",
                content: "Based on your input, I recommend focusing on the product's ROI and time-saving features during your meeting. Would you like me to prepare some specific talking points based on your company's use cases?",
            };
            setBotMessages((prev) => [...prev, botResponse]);
        }
        catch (error) {
            console.error("Error getting AI response:", error);
            toast.error("Failed to get AI response");
        }
        finally {
            setIsLoadingBot(false);
        }
    });
    const copyToClipboard = () => {
        if (meetingLink) {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied to clipboard");
        }
    };
    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Video, { className: "h-5 w-5 text-blue-600" }), "Create Zoom Meeting"] }), _jsx(CardDescription, { children: "Schedule a Zoom meeting and get AI assistance during the call" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "topic", className: "text-sm font-medium", children: "Meeting Topic" }), _jsx(Controller, { control: control, name: "topic", render: ({ field }) => (_jsx(Input, Object.assign({ id: "topic", placeholder: "Product Demo with Client" }, field))) }), errors.topic && (_jsx("p", { className: "text-xs text-destructive", children: errors.topic.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "agenda", className: "text-sm font-medium", children: "Agenda (Optional)" }), _jsx(Controller, { control: control, name: "agenda", render: ({ field }) => (_jsx(Textarea, Object.assign({ id: "agenda", placeholder: "Discuss product features, pricing, and implementation timeline" }, field))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "date", className: "text-sm font-medium", children: "Date" }), _jsx(Controller, { control: control, name: "date", render: ({ field }) => (_jsx(Input, Object.assign({ id: "date", type: "date" }, field))) }), errors.date && (_jsx("p", { className: "text-xs text-destructive", children: errors.date.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "time", className: "text-sm font-medium", children: "Time" }), _jsx(Controller, { control: control, name: "time", render: ({ field }) => (_jsx(Input, Object.assign({ id: "time", type: "time" }, field))) }), errors.time && (_jsx("p", { className: "text-xs text-destructive", children: errors.time.message }))] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "duration", className: "text-sm font-medium", children: "Duration (minutes)" }), _jsx(Controller, { control: control, name: "duration", render: ({ field }) => (_jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(SelectTrigger, { id: "duration", children: _jsx(SelectValue, { placeholder: "Select duration" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "15", children: "15 minutes" }), _jsx(SelectItem, { value: "30", children: "30 minutes" }), _jsx(SelectItem, { value: "45", children: "45 minutes" }), _jsx(SelectItem, { value: "60", children: "60 minutes" })] })] })) }), errors.duration && (_jsx("p", { className: "text-xs text-destructive", children: errors.duration.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "timezone", className: "text-sm font-medium", children: "Timezone" }), _jsx(Controller, { control: control, name: "timezone", render: ({ field }) => (_jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(SelectTrigger, { id: "timezone", children: _jsx(SelectValue, { placeholder: "Select timezone" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "America/New_York", children: "Eastern Time (ET)" }), _jsx(SelectItem, { value: "America/Chicago", children: "Central Time (CT)" }), _jsx(SelectItem, { value: "America/Denver", children: "Mountain Time (MT)" }), _jsx(SelectItem, { value: "America/Los_Angeles", children: "Pacific Time (PT)" })] })] })) })] })] })] }), _jsx(CardFooter, { children: meetingLink ? (_jsxs("div", { className: "w-full space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 p-2 bg-muted rounded-md", children: [_jsx(Input, { value: meetingLink, readOnly: true, className: "bg-background" }), _jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: copyToClipboard, children: _jsx(Copy, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setMeetingLink(null), children: "Create Another" }), _jsx(Button, { type: "button", children: "Add to Calendar" })] })] })) : (_jsxs(Button, { type: "submit", className: "w-full", disabled: isCreatingMeeting, children: [isCreatingMeeting && (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })), "Create Zoom Meeting"] })) })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-indigo-600" }), "AI Zoom Co-host"] }), _jsx(CardDescription, { children: "Your AI assistant will help during Zoom calls with leads" })] }), _jsxs(CardContent, { className: "h-[400px] flex flex-col", children: [_jsxs("div", { className: "flex-1 overflow-y-auto mb-4 space-y-4", children: [botMessages.map((message, index) => (_jsx("div", { className: `flex ${message.sender === "You" ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `rounded-lg px-4 py-2 max-w-[80%] ${message.sender === "You"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"}`, children: [_jsx("p", { className: "text-xs font-medium mb-1", children: message.sender }), _jsx("p", { className: "text-sm", children: message.content })] }) }, index))), isLoadingBot && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "rounded-lg px-4 py-2 bg-muted", children: _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) }) }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: botPrompt, onChange: (e) => setBotPrompt(e.target.value), placeholder: "Ask your AI co-host...", onKeyDown: (e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                sendMessage();
                                            }
                                        } }), _jsx(Button, { type: "button", onClick: sendMessage, disabled: isLoadingBot || !botPrompt.trim(), children: isLoadingBot ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(MessageSquare, { className: "h-4 w-4" })) })] })] }), _jsx(CardFooter, { className: "border-t pt-4", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Your AI co-host can introduce your company, follow up with questions, and summarize meetings. It learns from your company documents and previous interactions." }) })] })] }));
}
