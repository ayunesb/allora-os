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
import { Loader2, TrendingUp, Award, AlertCircle } from "lucide-react";
import { usePlugins } from "@/hooks/usePlugins";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
export default function PluginLeaderboard() {
    var _a, _b;
    const [impactData, setImpactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { fetchPluginImpact } = usePlugins();
    useEffect(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const data = yield fetchPluginImpact();
                    // Sort by average value (ROI) descending
                    const sortedData = [...data].sort((a, b) => (b.average_value || 0) - (a.average_value || 0));
                    setImpactData(sortedData);
                }
                catch (err) {
                    console.error("Error fetching plugin leaderboard data:", err);
                    setError(err instanceof Error
                        ? err.message
                        : "Failed to load plugin leaderboard");
                }
                finally {
                    setLoading(false);
                }
            });
        }
        fetchData();
    }, [fetchPluginImpact]);
    // Format currency with dollar sign
    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value || 0);
    };
    return (_jsxs("div", { className: "container mx-auto py-8 px-4 sm:px-6", children: [_jsx(DashboardBreadcrumb, { rootPath: "/dashboard", rootLabel: "Dashboard" }), _jsx("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between mb-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Plugin ROI Leaderboard" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Compare plugin performance across your organization" })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center", children: [_jsx(Award, { className: "mr-2 h-4 w-4 text-primary" }), "Top Performing Plugin"] }) }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "h-6 bg-muted animate-pulse rounded" })) : impactData.length > 0 ? (_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold", children: ((_a = impactData[0]) === null || _a === void 0 ? void 0 : _a.plugin_name) || "N/A" }), _jsxs("div", { className: "text-sm text-muted-foreground flex items-center mt-1", children: [_jsx(TrendingUp, { className: "mr-1 h-4 w-4 text-green-500" }), formatCurrency(((_b = impactData[0]) === null || _b === void 0 ? void 0 : _b.average_value) || 0), " avg. ROI"] })] })) : (_jsx("div", { className: "text-sm text-muted-foreground", children: "No data available" })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total ROI Generated" }) }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "h-6 bg-muted animate-pulse rounded" })) : (_jsx("div", { className: "text-2xl font-bold", children: formatCurrency(impactData.reduce((sum, plugin) => sum + (plugin.total_value || 0), 0)) })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Total Plugins Used" }) }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "h-6 bg-muted animate-pulse rounded" })) : (_jsx("div", { className: "text-2xl font-bold", children: new Set(impactData.map((item) => item.plugin_name)).size })) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin Performance Rankings" }) }), _jsx(CardContent, { children: loading ? (_jsx("div", { className: "flex justify-center items-center py-12", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) })) : error ? (_jsxs("div", { className: "bg-destructive/10 text-destructive p-4 rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2" }), _jsx("p", { className: "font-medium", children: "Failed to load leaderboard data" })] }), _jsx("p", { className: "text-sm mt-1", children: error })] })) : impactData.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-lg font-medium text-muted-foreground mb-2", children: "No plugin data available yet" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Start using plugins to track their performance metrics" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Rank" }), _jsx(TableHead, { children: "Plugin" }), _jsx(TableHead, { className: "text-right", children: "Usage Count" }), _jsx(TableHead, { className: "text-right", children: "Avg. ROI" }), _jsx(TableHead, { className: "text-right", children: "Total Value" }), _jsx(TableHead, { children: "Status" })] }) }), _jsx(TableBody, { children: impactData.map((item, idx) => (_jsxs(TableRow, { className: idx === 0 ? "bg-primary/5" : undefined, children: [_jsx(TableCell, { children: _jsx(Badge, { variant: idx < 3 ? "success" : "outline", className: "w-6 h-6 rounded-full flex items-center justify-center p-0", children: idx + 1 }) }), _jsx(TableCell, { className: "font-medium", children: item.plugin_name }), _jsx(TableCell, { className: "text-right", children: item.usage_count }), _jsx(TableCell, { className: "text-right", children: formatCurrency(item.average_value || 0) }), _jsx(TableCell, { className: "text-right", children: formatCurrency(item.total_value || 0) }), _jsx(TableCell, { children: _jsx(Badge, { variant: item.average_value > 10
                                                            ? "success"
                                                            : item.average_value > 0
                                                                ? "outline"
                                                                : "secondary", children: item.average_value > 10
                                                            ? "High ROI"
                                                            : item.average_value > 0
                                                                ? "Positive"
                                                                : "Neutral" }) })] }, `${item.plugin_name}-${idx}`))) })] }) })) })] })] }));
}
