import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBreakpoint } from "@/hooks/use-mobile";
export const EventTableHeader = () => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-8" }), _jsx(TableHead, { children: "Event Type" }), _jsx(TableHead, { className: isMobileView ? "hidden md:table-cell" : "", children: "Webhook" }), _jsx(TableHead, { className: isMobileView ? "hidden sm:table-cell" : "", children: "Time" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "Response" }), _jsx(TableHead, { className: isMobileView ? "w-8" : "" })] }) }));
};
