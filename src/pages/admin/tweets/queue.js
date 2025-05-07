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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
export default function TweetQueuePage() {
    const [queuedTweets, setQueuedTweets] = useState([]);
    const [newTweetContent, setNewTweetContent] = useState("");
    const [scheduledDate, setScheduledDate] = useState(new Date());
    useEffect(() => {
        const fetchTweets = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Mock fetch for demo purposes
                // const response = await fetch('/api/tweets/queue');
                // const data = await response.json();
                // Simulate API response with mock data
                const mockData = [
                    {
                        id: "1",
                        content: "Excited to announce our new feature!",
                        scheduledFor: "2023-05-15T12:00:00Z",
                        status: "scheduled",
                    },
                    {
                        id: "2",
                        content: "Join our upcoming webinar on growth strategies",
                        scheduledFor: "2023-05-20T15:30:00Z",
                        status: "scheduled",
                    },
                ];
                // Fix the unknown type issue by explicitly typing the data
                setQueuedTweets(mockData);
            }
            catch (error) {
                console.error("Error fetching queued tweets:", error);
                // Handle error state
            }
        });
        fetchTweets();
    }, []);
    const handleDelete = (tweetId) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Properly separate URL from options object
            const url = `/api/tweets/${tweetId}`;
            const options = { method: "DELETE" };
            // Mock API call
            // const response = await fetch(url, options);
            // const result = await response.json();
            // Mock successful response
            const result = { success: true };
            if (result.success) {
                setQueuedTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== tweetId));
                toast({
                    title: "Tweet Removed",
                    description: "The tweet has been removed from the queue.",
                });
            }
        }
        catch (error) {
            console.error("Error deleting tweet:", error);
            toast({
                title: "Error",
                description: "Failed to delete the tweet.",
                variant: "destructive",
            });
        }
    });
    const handleScheduleTweet = () => __awaiter(this, void 0, void 0, function* () {
        if (!newTweetContent || !scheduledDate) {
            toast({
                title: "Error",
                description: "Please enter tweet content and select a date.",
                variant: "destructive",
            });
            return;
        }
        try {
            // Mock API call
            // const response = await fetch('/api/tweets/queue', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     content: newTweetContent,
            //     scheduledFor: scheduledDate.toISOString(),
            //   }),
            // });
            // const data = await response.json();
            // Mock successful response
            const mockNewTweet = {
                id: String(Date.now()),
                content: newTweetContent,
                scheduledFor: scheduledDate.toISOString(),
                status: "scheduled",
            };
            // Update state
            setQueuedTweets((prevTweets) => [...prevTweets, mockNewTweet]);
            setNewTweetContent("");
            setScheduledDate(new Date());
            toast({
                title: "Tweet Scheduled",
                description: "Your tweet has been scheduled successfully.",
            });
        }
        catch (error) {
            console.error("Error scheduling tweet:", error);
            toast({
                title: "Error",
                description: "Failed to schedule the tweet.",
                variant: "destructive",
            });
        }
    });
    return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Tweet Queue" }), _jsxs(Card, { className: "mb-6", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Schedule New Tweet" }), _jsx(CardDescription, { children: "Plan your tweets in advance" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "tweet-content", children: "Tweet Content" }), _jsx(Input, { id: "tweet-content", placeholder: "What's on your mind?", value: newTweetContent, onChange: (e) => setNewTweetContent(e.target.value) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Schedule Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-[240px] justify-start text-left font-normal", !scheduledDate && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), scheduledDate ? (format(scheduledDate, "PPP")) : (_jsx("span", { children: "Pick a date" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "center", side: "bottom", children: _jsx(Calendar, { mode: "single", selected: scheduledDate, onSelect: setScheduledDate, disabled: (date) => date < new Date(), initialFocus: true }) })] })] }), _jsx(Button, { onClick: handleScheduleTweet, children: "Schedule Tweet" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Queued Tweets" }), _jsx(CardDescription, { children: "Manage your scheduled tweets" })] }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Content" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Scheduled For" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: queuedTweets.map((tweet) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: tweet.content }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: format(new Date(tweet.scheduledFor), "PPP p") }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: tweet.status }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDelete(tweet.id), children: _jsx(Trash2, { className: "h-4 w-4" }) }) })] }, tweet.id))) })] }) }) })] })] }));
}
