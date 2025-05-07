import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
const AnalyticsDateRangePicker = ({ dateRange, onDateRangeChange, className = "", }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [from, to] = dateRange;
    // Format the date range for display
    const formattedDateRange = React.useMemo(() => {
        if (from && to) {
            return `${format(from, "MMM d, yyyy")} - ${format(to, "MMM d, yyyy")}`;
        }
        if (from) {
            return `From ${format(from, "MMM d, yyyy")}`;
        }
        if (to) {
            return `Until ${format(to, "MMM d, yyyy")}`;
        }
        return "Select date range";
    }, [from, to]);
    return (_jsx("div", { className: className, children: _jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), formattedDateRange] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "range", selected: {
                            from,
                            to,
                        }, onSelect: (range) => {
                            onDateRangeChange([(range === null || range === void 0 ? void 0 : range.from) || null, (range === null || range === void 0 ? void 0 : range.to) || null]);
                            if (range === null || range === void 0 ? void 0 : range.to) {
                                setIsOpen(false);
                            }
                        }, initialFocus: true }) })] }) }));
};
export default AnalyticsDateRangePicker;
