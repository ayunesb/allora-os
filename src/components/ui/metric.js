import { jsx as _jsx } from "react/jsx-runtime";
export const Metric = ({ children, className = "" }) => {
    return (_jsx("span", { className: `text-3xl font-bold tabular-nums tracking-tight ${className}`, children: children }));
};
