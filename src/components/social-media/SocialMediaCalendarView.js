import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { ViewToggle } from "./calendar/ViewToggle";
export function SocialMediaCalendarView({ posts, onCreatePost, onEditPost, onDeletePost, }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState("calendar");
    // Count posts for the month if in calendar view
    const postCount = posts.length;
    // Function to handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    // Function to filter posts for the selected date
    const getPostsForSelectedDate = () => {
        if (!selectedDate)
            return [];
        return posts.filter((post) => {
            // Safely handle potentially undefined scheduled_date
            if (!post.scheduled_date)
                return false;
            const postDate = new Date(post.scheduled_date);
            return (postDate.getDate() === selectedDate.getDate() &&
                postDate.getMonth() === selectedDate.getMonth() &&
                postDate.getFullYear() === selectedDate.getFullYear());
        });
    };
    // Get posts for the selected date
    const selectedDatePosts = getPostsForSelectedDate();
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4 justify-between", children: [_jsx(ViewToggle, { view: view, onViewChange: setView, postCount: postCount }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(CalendarIcon, { className: "h-4 w-4" }), _jsx("span", { children: selectedDate ? format(selectedDate, "PPP") : "Select date" })] }), _jsx(Button, { onClick: onCreatePost, children: "Create Post" })] })] }), view === "calendar" && (_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx("div", { className: "md:w-1/2", children: _jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: handleDateSelect, className: "rounded-md border" }) }), _jsxs("div", { className: "md:w-1/2", children: [_jsx("h3", { className: "font-medium text-lg mb-4", children: selectedDate
                                            ? format(selectedDate, "MMMM d, yyyy")
                                            : "Selected Date" }), selectedDatePosts.length > 0 ? (_jsx("div", { className: "space-y-3", children: selectedDatePosts.map((post) => (_jsx(Card, { className: "p-3", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: post.title || "Untitled Post" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [post.platform || "All Platforms", " \u2022", " ", post.status || "Draft"] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onEditPost(post.id), children: "Edit" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => onDeletePost(post.id), children: "Delete" })] })] }) }, post.id))) })) : (_jsx("p", { className: "text-muted-foreground", children: "No posts scheduled for this date." }))] })] }) }) })), view === "list" && (
            // List view implementation will go here
            _jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "space-y-4", children: posts.length > 0 ? (posts.map((post) => (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: post.title || "Untitled Post" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [post.platform || "All Platforms", " \u2022", " ", post.status || "Draft"] }), _jsx("p", { className: "text-sm mt-1", children: post.scheduled_date
                                                    ? format(new Date(post.scheduled_date), "PPP")
                                                    : "Not scheduled" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onEditPost(post.id), children: "Edit" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => onDeletePost(post.id), children: "Delete" })] })] }) }, post.id)))) : (_jsx("p", { className: "text-muted-foreground text-center py-8", children: "No posts available." })) }) }) }))] }));
}
