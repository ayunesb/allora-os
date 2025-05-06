import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
export function MobileAdminTable({ data, columns, actions, emptyState, className, }) {
    if (data.length === 0 && emptyState) {
        return _jsx(_Fragment, { children: emptyState });
    }
    return (_jsx("div", { className: cn("space-y-3", className), children: data.map((item, index) => (_jsx(Card, { className: "overflow-hidden shadow-sm", children: _jsxs(CardContent, { className: "p-0", children: [columns.map((column) => (_jsxs("div", { className: "flex justify-between items-center p-3 border-b last:border-b-0", children: [_jsx("span", { className: "text-sm font-medium text-muted-foreground", children: column.title }), _jsx("span", { className: "text-sm text-right", children: column.render ? column.render(item) : item[column.key] })] }, column.key))), actions && (_jsx("div", { className: "p-3 bg-muted/20 flex justify-end", children: actions(item) }))] }) }, index))) }));
}
