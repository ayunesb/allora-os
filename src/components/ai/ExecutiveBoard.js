import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export default function ExecutiveBoard({ executives, onSelectExecutive }) {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: executives.map((executive) => (_jsx(Card, { className: `cursor-pointer transition-shadow hover:shadow-md ${executive.status === "inactive" ? "opacity-70" : ""}`, onClick: () => onSelectExecutive && onSelectExecutive(executive.id), children: _jsx(CardContent, { className: "p-5", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: executive.avatar, alt: executive.name }), _jsx(AvatarFallback, { children: executive.name.substring(0, 2) })] }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium text-sm", children: executive.name }), _jsx(StatusBadge, { status: executive.status })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: executive.role }), executive.specialties && (_jsxs("div", { className: "flex flex-wrap gap-1.5 mt-2", children: [executive.specialties.slice(0, 2).map((specialty) => (_jsx(Badge, { variant: "outline", className: "text-[0.65rem] px-1.5 py-0", children: specialty }, specialty))), executive.specialties.length > 2 && (_jsxs(Badge, { variant: "outline", className: "text-[0.65rem] px-1.5 py-0", children: ["+", executive.specialties.length - 2] }))] })), executive.lastActivity && (_jsxs("p", { className: "text-[0.65rem] text-muted-foreground mt-2", children: ["Last active: ", executive.lastActivity] }))] })] }) }) }, executive.id))) }));
}
function StatusBadge({ status }) {
    const variants = {
        active: {
            className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        },
        learning: {
            className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        },
        inactive: {
            className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        },
    };
    const statusText = {
        active: "Active",
        learning: "Learning",
        inactive: "Inactive",
    };
    return (_jsxs("span", { className: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${variants[status].className}`, children: [_jsx("span", { className: "mr-1 h-1.5 w-1.5 rounded-full bg-current" }), statusText[status]] }));
}
