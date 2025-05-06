import { jsx as _jsx } from "react/jsx-runtime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertItem } from "./AlertItem";
export const AlertList = ({ alerts, onAcknowledge }) => {
    if (alerts.length === 0) {
        return (_jsx("div", { className: "p-4 text-center text-gray-500", children: "No alerts to display" }));
    }
    return (_jsx(ScrollArea, { className: "h-[250px]", children: _jsx("div", { className: "space-y-3 p-6", children: alerts.map((alert) => (_jsx(AlertItem, { alert: alert, onAcknowledge: onAcknowledge }, alert.id))) }) }));
};
