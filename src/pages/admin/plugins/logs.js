var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminOnly from "@/components/AdminOnly";
import { supabase } from "@/integrations/supabase/client";
import { Loading } from "@/components/ui/loading";
export default function PluginLogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalValue, setTotalValue] = useState(0);
    const loadLogs = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const { data, error } = yield supabase
                .from("plugin_logs")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(100);
            if (error)
                throw error;
            // Safely cast data and set state
            const typedLogs = data;
            setLogs(typedLogs);
            // Calculate total value for reporting
            const total = typedLogs.reduce((sum, log) => sum + (log.value || 0), 0);
            setTotalValue(total);
        }
        catch (error) {
            console.error("Error loading plugin logs:", error);
            toast.error("Failed to load plugin logs");
        }
        finally {
            setLoading(false);
        }
    });
    useEffect(() => {
        loadLogs();
    }, []);
    // Define the columns for the responsive table
    const columns = [
        { key: "plugin_name", title: "Plugin" },
        { key: "tenant_id", title: "Tenant", hideOnMobile: true },
        { key: "event", title: "Event" },
        {
            key: "value",
            title: "Value",
            render: (log) => `$${log.value.toFixed(2)}`,
        },
        {
            key: "created_at",
            title: "Date",
            render: (log) => new Date(log.created_at).toLocaleString(),
        },
    ];
    // Mobile-optimized columns
    const mobileColumns = [
        { key: "plugin_name", title: "Plugin" },
        { key: "event", title: "Event" },
        {
            key: "value",
            title: "Value",
            render: (log) => `$${log.value.toFixed(2)}`,
        },
    ];
    return (_jsx(AdminOnly, { children: _jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83E\uDDE9 Plugin Usage Logs" }), _jsx("p", { className: "text-muted-foreground", children: "Track plugin performance and tenant-level ROI activity." })] }), _jsx(Button, { onClick: loadLogs, disabled: loading, children: loading ? "Loading..." : "Refresh" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Revenue Impact" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-2xl font-bold", children: ["$", totalValue.toFixed(2)] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Log Entries" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: logs.length }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Unique Plugins" }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: new Set(logs.map((log) => log.plugin_name)).size }) })] })] }), loading ? (_jsx("div", { className: "flex justify-center p-8", children: _jsx(Loading, { size: "lg", text: "Loading plugin logs..." }) })) : (_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsx(ResponsiveTable, { data: logs, columns: columns, mobileColumns: mobileColumns, emptyState: _jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-muted-foreground", children: "No plugin logs found" }) }) }) }) }))] }) }));
}
