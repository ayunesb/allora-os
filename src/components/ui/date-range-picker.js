import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
export function DateRangePicker({ className, value, onChange }) {
    return (_jsx("div", { className: cn("grid gap-2", className), children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: "date", variant: "outline", className: cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), (value === null || value === void 0 ? void 0 : value.from) ? (value.to ? (_jsxs(_Fragment, { children: [format(value.from, "LLL dd, y"), " -", " ", format(value.to, "LLL dd, y")] })) : (format(value.from, "LLL dd, y"))) : (_jsx("span", { children: "Pick a date range" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { initialFocus: true, mode: "range", defaultMonth: value === null || value === void 0 ? void 0 : value.from, selected: value, onSelect: onChange, numberOfMonths: 2 }) })] }) }));
}
