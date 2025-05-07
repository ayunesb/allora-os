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
import { Badge } from "@/components/ui/badge";
import { usePlugins } from "@/hooks/usePlugins";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
const PluginLeaderboard = ({ children, variant = "default", size = "large", }) => {
    const [pluginImpact, setPluginImpact] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchPluginImpact } = usePlugins();
    useEffect(() => {
        const loadPluginImpact = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const impact = yield fetchPluginImpact();
                setPluginImpact(impact.sort((a, b) => b.total_value - a.total_value));
            }
            catch (error) {
                console.error("Error loading plugin impact data:", error);
                toast.error("Failed to load plugin impact data");
            }
            finally {
                setIsLoading(false);
            }
        });
        loadPluginImpact();
    }, [fetchPluginImpact]);
    if (isLoading) {
        return (_jsxs(Card, { className: className, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin ROI Leaderboard" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "flex justify-between items-center animate-pulse", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-5 bg-muted rounded w-1/3 mb-1" }), _jsx("div", { className: "h-4 bg-muted rounded w-1/4 opacity-70" })] }), _jsx("div", { className: "h-6 bg-muted rounded w-16" })] }, i))) }) })] }));
    }
    if (!pluginImpact.length) {
        return (_jsxs(Card, { className: className, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin ROI Leaderboard" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-center text-muted-foreground py-8", children: "No plugin impact data available yet. Install and use plugins to see their ROI." }) })] }));
    }
    return (_jsxs(Card, { className: className, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin ROI Leaderboard" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: pluginImpact.slice(0, 5).map((plugin, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "font-medium", children: [index + 1, "."] }), _jsx("span", { className: "font-medium", children: plugin.plugin_name }), index === 0 && (_jsx(Badge, { variant: "outline", className: "bg-amber-100 text-amber-800 border-amber-200", children: "Top ROI" }))] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [plugin.usage_count, " uses \u2022 Avg. value: $", plugin.average_value.toFixed(2)] })] }), _jsxs("div", { className: "flex items-center text-green-600 font-medium", children: [_jsx(ArrowUp, { className: "h-4 w-4 mr-1" }), "$", plugin.total_value.toFixed(2)] })] }, plugin.plugin_name))) }) })] }));
};
