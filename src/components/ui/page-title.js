import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageTitle({ children, title, description }) {
    return (_jsxs("div", { className: "space-y-1.5 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight md:text-3xl", title: title, children: children }), description && _jsx("p", { className: "text-muted-foreground", children: description })] }));
}
