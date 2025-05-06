import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff, Trash2, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useBreakpoint } from "@/hooks/use-mobile";
export const UserTable = ({ users, isLoading = false, onUpdateUser, onDeleteUser, }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const isTabletView = breakpoint === "tablet";
    if (isLoading) {
        return (_jsx("div", { className: "text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]", children: "Loading users..." }));
    }
    if (users.length === 0) {
        return (_jsx("div", { className: "text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]", children: "No users found" }));
    }
    // For mobile view, use a card-based layout instead of a table
    if (isMobileView) {
        return (_jsx("div", { className: "space-y-4", children: users.map((user) => (_jsxs("div", { className: "border border-white/10 rounded-md p-4 bg-[#111827] shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-[#1E293B] rounded-full p-2 mr-3", children: _jsx(UserIcon, { size: 16, className: "text-[#5A67D8]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-white", children: user.name || "Unnamed User" }), _jsx("p", { className: "text-sm text-gray-400", children: user.email })] })] }), _jsx(Badge, { variant: user.role === "admin" ? "default" : "secondary", className: user.role === "admin" ? "bg-[#5A67D8]" : "bg-gray-600", children: user.role })] }), _jsxs("div", { className: "text-xs text-gray-400 mb-3", children: ["Created: ", new Date(user.created_at).toLocaleDateString()] }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                    const newRole = user.role === "admin" ? "user" : "admin";
                                    onUpdateUser(user.id, { role: newRole });
                                    toast.success(`User role updated to ${newRole}`);
                                }, className: "flex-1 h-8 px-2 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white", children: user.role === "admin" ? (_jsxs(_Fragment, { children: [_jsx(ShieldOff, { className: "h-3 w-3 mr-2" }), "Make User"] })) : (_jsxs(_Fragment, { children: [_jsx(Shield, { className: "h-3 w-3 mr-2" }), "Make Admin"] })) }), _jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 h-8 px-2 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]", onClick: () => onDeleteUser(user.id, user.name || user.email || ""), children: [_jsx(Trash2, { className: "h-3 w-3 mr-2" }), "Delete"] })] })] }, user.id))) }));
    }
    // Regular table for tablet and desktop
    return (_jsx("div", { className: "rounded-md border border-white/10 overflow-x-auto bg-[#111827]", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-[#1A1F2C]", children: _jsxs(TableRow, { className: "border-white/10 hover:bg-transparent", children: [_jsx(TableHead, { className: "text-gray-400", children: "Name" }), _jsx(TableHead, { className: `text-gray-400 ${isTabletView ? "hidden lg:table-cell" : ""}`, children: "Email" }), _jsx(TableHead, { className: "text-gray-400", children: "Role" }), _jsx(TableHead, { className: "hidden md:table-cell text-gray-400", children: "Created" }), _jsx(TableHead, { className: "text-gray-400", children: "Actions" })] }) }), _jsx(TableBody, { children: users.map((user) => (_jsxs(TableRow, { className: "border-white/10 hover:bg-[#1E293B]", children: [_jsx(TableCell, { className: "font-medium text-white", children: user.name || "Unnamed User" }), _jsx(TableCell, { className: `text-gray-300 ${isTabletView ? "hidden lg:table-cell" : ""}`, children: user.email }), _jsx(TableCell, { children: _jsx(Badge, { variant: user.role === "admin" ? "default" : "secondary", className: user.role === "admin" ? "bg-[#5A67D8]" : "bg-gray-600", children: user.role }) }), _jsx(TableCell, { className: "hidden md:table-cell text-gray-300", children: new Date(user.created_at).toLocaleDateString() }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                                const newRole = user.role === "admin" ? "user" : "admin";
                                                onUpdateUser(user.id, { role: newRole });
                                                toast.success(`User role updated to ${newRole}`);
                                            }, className: "h-8 px-2 flex items-center gap-1 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white", children: user.role === "admin" ? (_jsxs(_Fragment, { children: [_jsx(ShieldOff, { className: "h-3 w-3" }), _jsx("span", { className: "hidden sm:inline", children: "Make User" })] })) : (_jsxs(_Fragment, { children: [_jsx(Shield, { className: "h-3 w-3" }), _jsx("span", { className: "hidden sm:inline", children: "Make Admin" })] })) }), _jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-2 flex items-center gap-1 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]", onClick: () => onDeleteUser(user.id, user.name || user.email || ""), children: [_jsx(Trash2, { className: "h-3 w-3" }), _jsx("span", { className: "hidden sm:inline", children: "Delete" })] })] }) })] }, user.id))) })] }) }));
};
