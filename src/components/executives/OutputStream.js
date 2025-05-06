import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export const OutputStream = ({ text, executive = "AI Assistant" }) => {
    return (_jsxs("div", { className: "bg-muted/30 p-4 rounded-md border overflow-auto max-h-[400px]", children: [_jsxs("div", { className: "mb-2 flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white font-medium", children: executive.charAt(0) }), _jsx("span", { className: "font-medium", children: executive })] }), _jsx("div", { className: "whitespace-pre-wrap text-sm", children: text.split("\n").map((line, index) => (_jsxs(React.Fragment, { children: [line, index < text.split("\n").length - 1 && _jsx("br", {})] }, index))) })] }));
};
