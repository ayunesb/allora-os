import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import AnalyticsDateRangePicker from "./AnalyticsDateRangePicker";
const AnalyticsHeader = ({ isRefreshing, onRefresh, dateRange = [null, null], onDateRangeChange, }) => {
    const handleDateRangeChange = (range) => {
        if (onDateRangeChange) {
            onDateRangeChange(range);
        }
    };
    return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Analytics Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Track performance metrics and campaign results" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto", children: [onDateRangeChange && (_jsx(AnalyticsDateRangePicker, { dateRange: dateRange, onDateRangeChange: handleDateRangeChange, className: "w-full sm:w-auto" })), _jsxs(Button, { variant: "outline", size: "icon", onClick: onRefresh, disabled: isRefreshing, children: [_jsx(RefreshCcw, { className: `h-4 w-4 ${isRefreshing ? "animate-spin" : ""}` }), _jsx("span", { className: "sr-only", children: "Refresh data" })] })] })] }));
};
export default AnalyticsHeader;
