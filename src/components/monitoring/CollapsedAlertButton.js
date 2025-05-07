import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { AlertStatusIcon } from "./AlertIcon";
export const CollapsedAlertButton = ({ alerts, onClick }) => {
    return (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full p-2", onClick: onClick, children: [_jsx(AlertStatusIcon, { severity: alerts[0].severity }), _jsxs("span", { className: "ml-2", children: [alerts.length, " Alert", alerts.length !== 1 ? "s" : ""] })] }) }));
};
