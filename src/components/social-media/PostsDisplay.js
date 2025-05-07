import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "lucide-react";
import { CalendarView } from "./calendar/CalendarView";
import { ListView } from "./list/ListView";
import { Loading } from "@/components/ui/loading";
export function PostsDisplay({ view, posts, currentMonth, isLoading, error, onEditPost, onDeletePost, onSchedulePost, onApprovePost, onCreatePost, onRefresh, }) {
    // Handle loading state
    if (isLoading) {
        return (_jsx("div", { className: "py-12", children: _jsx(Loading, { center: true, text: "Loading posts...", tooltip: "We're retrieving your social media posts. This should only take a moment." }) }));
    }
    // Handle error state
    if (error) {
        return (_jsx(Alert, { variant: "destructive", className: "mb-4", children: _jsxs(AlertDescription, { children: ["Error loading posts: ", error.message, ". Please try again later."] }) }));
    }
    // Handle empty state
    if (posts.length === 0) {
        return (_jsxs("div", { className: "py-12 text-center", children: [_jsx(Calendar, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground" }), _jsx("h3", { className: "text-lg font-medium mb-2", children: "No posts found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: view === "calendar"
                        ? "No posts scheduled for this month."
                        : "You haven't created any posts yet." }), _jsx("button", { onClick: onCreatePost, className: "text-primary hover:underline", children: "Create your first post" })] }));
    }
    // Render the appropriate view
    return view === "calendar" ? (_jsx(CalendarView, { posts: posts, currentMonth: currentMonth, onCreatePost: onCreatePost, onEditPost: onEditPost, onDeletePost: onDeletePost, onSchedulePost: onSchedulePost, onApprovePost: onApprovePost, onRefresh: onRefresh })) : (_jsx(ListView, { posts: posts, onEditPost: onEditPost, onDeletePost: onDeletePost, onSchedulePost: onSchedulePost, onApprovePost: onApprovePost }));
}
