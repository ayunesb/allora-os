import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChecklistItem } from "./ChecklistItem";
export function ChecklistSection({ title, items, onToggle }) {
    if (items.length === 0)
        return null;
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: title }), _jsx("div", { className: "space-y-2", children: items.map((item) => (_jsx(ChecklistItem, { item: item, onToggle: onToggle }, item.id))) })] }));
}
