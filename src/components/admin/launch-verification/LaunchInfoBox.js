import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
export function LaunchInfoBox({ title, description, status = "info", children, }) {
    const getStatusColor = () => {
        switch (status) {
            case "success":
                return "border-green-500";
            case "warning":
                return "border-yellow-500";
            case "error":
                return "border-red-500";
            default:
                return "border-blue-500";
        }
    };
    return (_jsx(Card, { className: `border-l-4 ${getStatusColor()}`, children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h3", { className: "font-medium text-lg", children: title }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: description }), children && _jsx("div", { className: "mt-4", children: children })] }) }));
}
