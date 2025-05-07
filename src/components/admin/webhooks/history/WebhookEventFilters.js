import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
const DatePickerWithRange = ({ dateRange, onDateRangeChange }) => {
    const [from, to] = dateRange;
    const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
    const handleSelectDate = (date) => {
        let newDateRange;
        if (!from) {
            newDateRange = [date, null];
        }
        else if (!to) {
            newDateRange = from > date ? [date, from] : [from, date];
            setIsCalendarOpen(false);
        }
        else {
            newDateRange = [date, null];
        }
        onDateRangeChange(newDateRange);
    };
    return (_jsxs(Popover, { open: isCalendarOpen, onOpenChange: setIsCalendarOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "justify-start text-left font-normal w-full", children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), from && to ? (_jsxs(_Fragment, { children: [format(from, "PP"), " - ", format(to, "PP")] })) : (_jsx(_Fragment, { children: "Select date range" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "range", selected: {
                        from,
                        to,
                    }, onSelect: (range) => {
                        onDateRangeChange([(range === null || range === void 0 ? void 0 : range.from) || null, (range === null || range === void 0 ? void 0 : range.to) || null]);
                    }, initialFocus: true }) })] }));
};
export function WebhookEventFilters({ filters, onFilterChange, availableTypes, }) {
    const handleTypeChange = (type) => {
        const webhookType = type;
        const currentTypes = filters.types || [];
        // Toggle the type selection
        const newTypes = currentTypes.includes(webhookType)
            ? currentTypes.filter((t) => t !== webhookType)
            : [...currentTypes, webhookType];
        onFilterChange(Object.assign(Object.assign({}, filters), { types: newTypes }));
    };
    const handleStatusChange = (status) => {
        onFilterChange(Object.assign(Object.assign({}, filters), { status: status }));
    };
    const handleSearchChange = (e) => {
        onFilterChange(Object.assign(Object.assign({}, filters), { search: e.target.value }));
    };
    const handleDateRangeChange = (dateRange) => {
        onFilterChange(Object.assign(Object.assign({}, filters), { dateRange }));
    };
    const clearFilters = () => {
        onFilterChange({
            types: [],
            status: "",
            dateRange: [null, null],
            search: "",
        });
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx("div", { children: _jsx(Input, { placeholder: "Search webhooks...", value: filters.search, onChange: handleSearchChange, className: "w-full" }) }), _jsx("div", { children: _jsxs(Select, { value: filters.status, onValueChange: handleStatusChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "All Statuses" }), _jsx(SelectItem, { value: "success", children: "Success" }), _jsx(SelectItem, { value: "failed", children: "Failed" }), _jsx(SelectItem, { value: "pending", children: "Pending" })] })] }) }), _jsx("div", { children: _jsx(DatePickerWithRange, { dateRange: filters.dateRange, onDateRangeChange: handleDateRangeChange }) }), _jsx("div", { children: _jsxs(Button, { onClick: clearFilters, variant: "outline", className: "w-full", children: [_jsx(X, { className: "h-4 w-4 mr-2" }), "Clear Filters"] }) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: availableTypes.map((type) => (_jsx(Button, { variant: filters.types.includes(type) ? "default" : "outline", size: "sm", onClick: () => handleTypeChange(type), className: "capitalize", children: type }, type))) })] }));
}
export default WebhookEventFilters;
