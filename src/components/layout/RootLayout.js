import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout() {
    return (_jsxs("div", { className: "flex min-h-screen bg-background text-foreground", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex flex-1 flex-col overflow-hidden p-6", children: _jsx(Outlet, {}) }), _jsx(Toaster, {})] }));
}
