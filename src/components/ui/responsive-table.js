import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useBreakpoint } from "@/hooks/use-mobile";
import { MobileAdminTable } from "@/components/admin/MobileAdminTable";
export function ResponsiveTable({ data, columns, mobileColumns, actions, emptyState, className, }) {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    // If mobile view and mobileColumns are provided, use the mobile table
    if (isMobileView) {
        const columnsToUse = mobileColumns || columns.filter((col) => !col.hideOnMobile);
        const defaultEmptyState = (_jsx("div", { className: "text-center py-8 bg-muted/20 rounded-md", children: "No data to display" }));
        return (_jsx(MobileAdminTable, { data: data, columns: columnsToUse, actions: actions, emptyState: emptyState || defaultEmptyState, className: className }));
    }
    // Otherwise use the standard table
    return (_jsx("div", { className: className, children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [columns.map((column) => (_jsx(TableHead, { className: column.hideOnMobile ? "hidden md:table-cell" : undefined, children: column.title }, column.key))), actions && _jsx(TableHead, {})] }) }), _jsx(TableBody, { children: data.length > 0 ? (data.map((item, index) => (_jsxs(TableRow, { children: [columns.map((column) => (_jsx(TableCell, { className: column.hideOnMobile ? "hidden md:table-cell" : undefined, children: column.render ? column.render(item) : item[column.key] }, column.key))), actions && (_jsx(TableCell, { className: "text-right", children: actions(item) }))] }, index)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length + (actions ? 1 : 0), className: "h-24 text-center", children: emptyState || "No data available" }) })) })] }) }));
}
