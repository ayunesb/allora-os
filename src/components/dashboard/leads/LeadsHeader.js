import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, MessageSquareText } from "lucide-react";
export const LeadsHeader = ({ isMobileView }) => {
    return (_jsx("div", { className: `${isMobileView ? "px-4" : ""}`, children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Lead Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your leads and track their progress through your sales pipeline" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/dashboard/leads/linkedin", children: [_jsx(Linkedin, { className: "mr-2 h-4 w-4" }), "LinkedIn"] }) }), _jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/dashboard/leads/follow-up-sequences", children: [_jsx(MessageSquareText, { className: "mr-2 h-4 w-4" }), "Follow-up Sequences"] }) })] })] }) }));
};
