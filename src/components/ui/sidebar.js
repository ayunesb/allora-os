var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
const Sidebar = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("fixed inset-y-0 left-0 z-50 w-64 transition-all duration-300 ease-in-out transform border-r border-border bg-sidebar dark:bg-sidebar shadow-sm", className) }, props)));
});
Sidebar.displayName = "Sidebar";
const SidebarHeader = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("p-4 border-b border-border", className) }, props)));
});
SidebarHeader.displayName = "SidebarHeader";
const SidebarContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("flex-1 overflow-auto p-3", className) }, props)));
});
SidebarContent.displayName = "SidebarContent";
const SidebarFooter = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("p-4 border-t border-border mt-auto", className) }, props)));
});
SidebarFooter.displayName = "SidebarFooter";
const SidebarGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("mb-4 last:mb-0", className) }, props)));
});
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("p", Object.assign({ ref: ref, className: cn("text-xs text-muted-foreground font-medium mb-2 px-2", className) }, props)));
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return _jsx("div", Object.assign({ ref: ref, className: cn("space-y-1", className) }, props));
});
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return _jsx("ul", Object.assign({ ref: ref, className: cn("space-y-1", className) }, props));
});
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return _jsx("li", Object.assign({ ref: ref, className: cn("", className) }, props));
});
SidebarMenuItem.displayName = "SidebarMenuItem";
const SidebarMenuButton = React.forwardRef((_a, ref) => {
    var { className, active, asChild = false } = _a, props = __rest(_a, ["className", "active", "asChild"]);
    const Comp = asChild ? React.Fragment : "div";
    return (_jsx(Comp, Object.assign({}, (asChild ? {} : Object.assign({ ref }, props)), (asChild
        ? {}
        : {
            className: cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground", className),
        }), { children: props.children })));
});
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarContext = React.createContext(undefined);
export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
export function SidebarProvider({ children, defaultExpanded = true }) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    return (_jsx(SidebarContext.Provider, { value: { expanded, setExpanded }, children: children }));
}
export function SidebarTrigger(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    const { expanded, setExpanded } = useSidebar();
    return (_jsxs("button", Object.assign({ type: "button", onClick: () => setExpanded(!expanded), className: cn("inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground", className) }, props, { children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-5 w-5", children: [_jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), _jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), _jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })] }), _jsx("span", { className: "sr-only", children: "Toggle sidebar" })] })));
}
export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, };
import Link from "next/link";
export function SidebarLink() {
    return (_jsxs(Link, { href: "/agents/performance", className: "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Agent Performance" })] }));
}
