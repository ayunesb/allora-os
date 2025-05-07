import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
import { MobileAdminTable } from "@/components/admin/MobileAdminTable";
export default function AuditLogTable({ logs }) {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    if (isMobileView) {
        const columns = [
            {
                key: "timestamp",
                title: "Timestamp",
                render: (log) => (_jsx("span", { className: "font-mono text-xs", children: new Date(log.timestamp).toLocaleString() })),
            },
            {
                key: "user",
                title: "User",
            },
            {
                key: "action",
                title: "Action",
                render: (log) => (_jsx("span", { className: cn("px-2 py-1 rounded-full text-xs", {
                        "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300": log.action === "DATA_ACCESS",
                        "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300": log.action === "DATA_MODIFICATION",
                        "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300": log.action === "AUTHENTICATION",
                        "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300": log.action === "SYSTEM_CHANGE",
                        "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300": log.action === "EXPORT",
                    }), children: log.action })),
            },
            {
                key: "resource",
                title: "Resource",
            },
        ];
        const emptyState = (_jsx("div", { className: "text-center py-8 bg-muted/20 rounded-md", children: "No audit logs match the current filters" }));
        return (_jsx(MobileAdminTable, { data: logs, columns: columns, emptyState: emptyState }));
    }
    return (_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Timestamp" }), _jsx(TableHead, { children: "User" }), _jsx(TableHead, { children: "Action" }), _jsx(TableHead, { children: "Resource" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "Details" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "IP Address" })] }) }), _jsx(TableBody, { children: logs.length > 0 ? (logs.map((log) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono text-xs", children: new Date(log.timestamp).toLocaleString() }), _jsx(TableCell, { children: log.user }), _jsx(TableCell, { children: _jsx("span", { className: cn("px-2 py-1 rounded-full text-xs", {
                                        "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300": log.action === "DATA_ACCESS",
                                        "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300": log.action === "DATA_MODIFICATION",
                                        "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300": log.action === "AUTHENTICATION",
                                        "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300": log.action === "SYSTEM_CHANGE",
                                        "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300": log.action === "EXPORT",
                                    }), children: log.action }) }), _jsx(TableCell, { children: log.resource }), _jsx(TableCell, { className: "hidden md:table-cell", children: log.details }), _jsx(TableCell, { className: "hidden md:table-cell font-mono text-xs", children: log.ip })] }, log.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-24 text-center", children: "No audit logs match the current filters" }) })) })] }) }));
}
