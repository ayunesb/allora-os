import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Bell, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrendReportModal from "./TrendReportModal";
export default function MarketAlertBanner({ alerts, onDismiss }) {
    const [trendReportOpen, setTrendReportOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    if (!alerts || alerts.length === 0)
        return null;
    const openTrendReport = (alert) => {
        setSelectedAlert(alert);
        setTrendReportOpen(true);
    };
    const closeTrendReport = () => {
        setTrendReportOpen(false);
    };
    return (_jsxs("div", { className: "mb-6 animate-fadeIn", children: [alerts.map((alert) => (_jsxs("div", { className: "relative flex items-center gap-3 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg text-amber-100", children: [_jsx(Bell, { className: "h-5 w-5 text-amber-400 flex-shrink-0 animate-pulse" }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "font-medium", children: ["\uD83D\uDD14 Market Alert: ", alert.message] }), alert.affectedStrategies &&
                                alert.affectedStrategies.length > 0 && (_jsxs("p", { className: "text-sm text-amber-300/70 mt-1", children: ["Affected strategies: ", alert.affectedStrategies.join(", ")] }))] }), _jsxs("div", { className: "flex gap-2 items-center", children: [alert.trendReport && (_jsxs(Button, { variant: "outline", size: "sm", className: "text-xs border-amber-700 bg-amber-900/30 hover:bg-amber-800/40 text-amber-300", onClick: () => openTrendReport(alert), children: ["View AI Trend Report", _jsx(ExternalLink, { className: "ml-1 h-3 w-3" })] })), onDismiss && (_jsxs(Button, { variant: "ghost", size: "sm", className: "text-amber-300 hover:text-amber-100 hover:bg-amber-950/50 h-8 w-8 p-0", onClick: () => onDismiss(alert.id), children: [_jsx("span", { className: "sr-only", children: "Dismiss" }), _jsx(XCircle, { className: "h-5 w-5" })] }))] })] }, alert.id))), _jsx(TrendReportModal, { isOpen: trendReportOpen, onClose: closeTrendReport, trendData: selectedAlert === null || selectedAlert === void 0 ? void 0 : selectedAlert.trendReport })] }));
}
