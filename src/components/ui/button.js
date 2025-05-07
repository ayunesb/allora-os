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
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export const Button = (_a) => {
    var { children, className, variant = "default", size = "sm" } = _a, props = __rest(_a, ["children", "className", "variant", "size"]);
    return (_jsx("button", Object.assign({ className: cn("btn", variant === "outline" && "btn-outline", size === "lg" && "btn-lg", size === "sm" && "btn-sm", className) }, props, { children: children })));
};
