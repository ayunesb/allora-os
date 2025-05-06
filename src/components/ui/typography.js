import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export const PageTitle = ({ title, description, children, className }) => {
    return (_jsxs("div", { className: cn("mb-6", className), children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: title }), description && (_jsx("p", { className: "text-muted-foreground mt-1", children: description })), children] }));
};
// Add the missing typography components
export const TypographyH1 = ({ children, className }) => {
    return (_jsx("h1", { className: cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className), children: children }));
};
export const TypographyP = ({ children, className }) => {
    return (_jsx("p", { className: cn("leading-7 [&:not(:first-child)]:mt-6", className), children: children }));
};
export const TypographySmall = ({ children, className }) => {
    return (_jsx("small", { className: cn("text-sm font-medium leading-none", className), children: children }));
};
