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
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { usePlugins } from "@/hooks/usePlugins";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
export default function PluginImpact() {
    const [impactData, setImpactData] = useState([]); // Fix type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { fetchPluginImpact } = usePlugins();
    useEffect(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const data = yield fetchPluginImpact(); // Ensure type
                    setImpactData(data);
                }
                catch (err) {
                    console.error("Error fetching plugin impact data:", err);
                    setError(err instanceof Error
                        ? err.message
                        : "Failed to load plugin impact data. Please try again later.");
                }
                finally {
                    setLoading(false);
                }
            });
        }
        fetchData();
    }, [fetchPluginImpact]);
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value || 0);
    };
    return (_jsxs("div", { className: "container py-8", children: [_jsx(DashboardBreadcrumb, { rootPath: "/dashboard", rootLabel: "Dashboard", rootIcon: _jsx(Loader2, {}), currentPath: "/plugins/impact", currentLabel: "Plugin Impact" }), _jsx("h1", { className: "text-3xl font-bold mb-6", children: "Plugin ROI Analysis" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Track the impact and return on investment for all activated plugins across your organization." }), _jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin Performance Metrics" }) }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "flex justify-center items-center py-12", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) })) : error ? (_jsxs("div", { className: "bg-destructive/10 text-destructive p-4 rounded-md", children: [_jsx("p", { className: "font-medium", children: "Error loading data" }), _jsx("p", { className: "text-sm", children: error })] })) : impactData.length === 0 ? (_jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [_jsx("p", { className: "mb-2 font-medium", children: "No plugin impact data available" }), _jsx("p", { className: "text-sm", children: "Activate plugins and use them to start collecting ROI metrics" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Plugin" }), _jsx(TableHead, { children: "Tenant" }), _jsx(TableHead, { className: "text-right", children: "Usage" }), _jsx(TableHead, { className: "text-right", children: "Total Value" }), _jsx(TableHead, { className: "text-right", children: "Avg. ROI" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: impactData.map((item, idx) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: item.plugin_name }), _jsx(TableCell, { children: item.tenant_name ||
                                                        `Tenant ${item.tenant_id.substring(0, 6)}...` }), _jsx(TableCell, { className: "text-right", children: item.usage_count }), _jsx(TableCell, { className: "text-right", children: formatCurrency(item.total_value) }), _jsx(TableCell, { className: "text-right", children: formatCurrency(item.average_value) }), _jsx(TableCell, { children: _jsx(Badge, { variant: item.average_value > 10
                                                            ? "success"
                                                            : item.average_value > 0
                                                                ? "outline"
                                                                : "secondary", className: "badge-class" // Add missing className
                                                        , children: item.average_value > 10
                                                            ? "High ROI"
                                                            : item.average_value > 0
                                                                ? "Positive"
                                                                : "Neutral" }) })] }, `${item.tenant_id}-${item.plugin_name}-${idx}`))) })] }) })) })] })] }));
}
