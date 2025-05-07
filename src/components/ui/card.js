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
import { cn } from "@/lib/utils"; // Removed unused 'someUtility'
const Card = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsx("div", Object.assign({ className: cn("rounded-2xl border border-white/10 bg-card/70 text-card-foreground backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:shadow-primary/5 group", className) }, props, { children: children })));
};
Card.displayName = "Card";
// Removed empty object type and extended directly
const CardHeader = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("flex flex-col space-y-1.5 p-6", className) }, props)));
});
CardHeader.displayName = "CardHeader";
// Added accessible content for headings
const CardTitle = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs("h3", Object.assign({ ref: ref, className: cn("text-2xl font-bold leading-none tracking-tight text-white font-heading group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-light transition-all duration-500", className) }, props, { children: [children || "Default Title", " "] })));
});
CardTitle.displayName = "CardTitle";
// Removed empty object type and extended directly
const CardDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("p", Object.assign({ ref: ref, className: cn("text-sm text-gray-400", className) }, props)));
});
CardDescription.displayName = "CardDescription";
// Removed empty object type and extended directly
const CardContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("p-6 pt-0 text-gray-300", className) }, props)));
});
CardContent.displayName = "CardContent";
// Removed empty object type and extended directly
const CardFooter = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("flex items-center justify-end gap-4 p-6 pt-0", className) }, props)));
});
CardFooter.displayName = "CardFooter";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, };
