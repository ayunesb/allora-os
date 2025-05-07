import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
export const EventTableHeader = () => {
    return (_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[100px]", children: "Status" }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "Webhook" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "Timestamp" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }));
};
export default EventTableHeader;
