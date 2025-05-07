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
// Creating/fixing the pagination component exports
import React from "react";
import { cn } from "@/lib/utils";
const Pagination = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("nav", Object.assign({ ref: ref, className: cn("mx-auto flex w-full justify-center", className), role: "navigation", "aria-label": "pagination" }, props)));
});
Pagination.displayName = "Pagination";
const PaginationContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("ul", Object.assign({ ref: ref, className: cn("flex flex-wrap items-center gap-1", className) }, props)));
});
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("li", Object.assign({ ref: ref, className: cn("", className) }, props)));
});
PaginationItem.displayName = "PaginationItem";
const PaginationLink = React.forwardRef((_a, ref) => {
    var { className, isActive, size = "icon" } = _a, props = __rest(_a, ["className", "isActive", "size"]);
    return (_jsx("a", Object.assign({ ref: ref, "aria-current": isActive ? "page" : undefined, className: cn("flex h-9 w-9 items-center justify-center rounded-md border text-center text-sm transition-colors hover:bg-accent", isActive && "bg-primary text-primary-foreground hover:bg-primary/90", className) }, props)));
});
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs(PaginationLink, Object.assign({ ref: ref, "aria-label": "Go to previous page", size: "default", className: cn("gap-1", className) }, props, { children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-4 w-4", children: _jsx("path", { d: "M15 18l-6-6 6-6" }) }), _jsx("span", { children: "Previous" })] })));
});
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs(PaginationLink, Object.assign({ ref: ref, "aria-label": "Go to next page", size: "default", className: cn("gap-1", className) }, props, { children: [_jsx("span", { children: "Next" }), _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-4 w-4", children: _jsx("path", { d: "m9 18 6-6-6-6" }) })] })));
});
PaginationNext.displayName = "PaginationNext";
const PaginationEllipsis = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs("span", Object.assign({ ref: ref, "aria-hidden": true, className: cn("flex h-9 w-9 items-center justify-center", className) }, props, { children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-4 w-4", children: [_jsx("circle", { cx: "12", cy: "12", r: "1" }), _jsx("circle", { cx: "19", cy: "12", r: "1" }), _jsx("circle", { cx: "5", cy: "12", r: "1" })] }), _jsx("span", { className: "sr-only", children: "More pages" })] })));
});
PaginationEllipsis.displayName = "PaginationEllipsis";
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
