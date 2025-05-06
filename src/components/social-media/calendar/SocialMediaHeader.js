import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SocialMediaHeader({ onCreatePost }) {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Social Media Calendar" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Plan, schedule, and manage your social media content" })] }), _jsxs(Button, { onClick: onCreatePost, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Post"] })] }));
}
