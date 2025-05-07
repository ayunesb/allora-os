import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
export default function AdminLayout({ children }) {
    return (_jsxs("div", { className: "flex min-h-screen flex-col", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1", children: [_jsx(Sidebar, {}), _jsx(ScrollArea, { className: "h-screen w-full", children: _jsx("main", { className: "flex-1 p-4 md:p-6", children: children !== null && children !== void 0 ? children : _jsx(Outlet, {}) }) })] })] }));
}
