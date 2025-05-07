import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function PageLoader({ message = "Loading..." }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh]", children: [_jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: message })] }));
}
