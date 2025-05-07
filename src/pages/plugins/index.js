var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { usePlugins } from "@/hooks/usePlugins";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PluginLeaderboard } from "@/components/plugins/PluginLeaderboard";
import { executePlugin, installPlugin } from "@/utils/pluginAgent";
import { useCompanyId } from "@/hooks/useCompanyId";
import { toast } from "sonner";
import { Download, Search, BarChart3, Zap, Package } from "lucide-react";
export default function PluginsPage() {
    const { plugins, loading } = usePlugins();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("marketplace");
    const [installingPlugin, setInstallingPlugin] = useState(null);
    const [executingPlugin, setExecutingPlugin] = useState(null);
    const tenantId = useCompanyId();
    // Filter plugins based on search query
    const filteredPlugins = plugins.filter((plugin) => {
        var _a, _b;
        return plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ((_a = plugin.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((_b = plugin.tags) === null || _b === void 0 ? void 0 : _b.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    });
    const handleInstall = (pluginSlug) => __awaiter(this, void 0, void 0, function* () {
        if (!tenantId) {
            toast.error("Cannot install plugin: No tenant ID available");
            return;
        }
        setInstallingPlugin(pluginSlug);
        try {
            const result = yield installPlugin(pluginSlug, tenantId);
            if (result.success) {
                toast.success("Plugin installed successfully");
                setActiveTab("installed");
            }
            else {
                toast.error(`Failed to install plugin: ${result.error}`);
            }
        }
        catch (error) {
            console.error("Error installing plugin:", error);
            toast.error("An error occurred while installing the plugin");
        }
        finally {
            setInstallingPlugin(null);
        }
    });
    const handleExecute = (pluginSlug) => __awaiter(this, void 0, void 0, function* () {
        if (!tenantId) {
            toast.error("Cannot execute plugin: No tenant ID available");
            return;
        }
        setExecutingPlugin(pluginSlug);
        try {
            const result = yield executePlugin(pluginSlug, tenantId);
            if (result.success) {
                toast.success(result.message);
            }
            else {
                toast.error(`Failed to execute plugin: ${result.error}`);
            }
        }
        catch (error) {
            console.error("Error executing plugin:", error);
            toast.error("An error occurred while executing the plugin");
        }
        finally {
            setExecutingPlugin(null);
        }
    });
    const renderPluginCard = (plugin) => {
        var _a;
        return (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { children: plugin.name }), plugin.tags && plugin.tags.length > 0 && (_jsx(Badge, { variant: "outline", children: plugin.tags[0] }))] }), _jsx(CardDescription, { children: plugin.description })] }), _jsx(CardContent, { className: "pb-2", children: _jsx("div", { className: "flex flex-wrap gap-1", children: (_a = plugin.tags) === null || _a === void 0 ? void 0 : _a.slice(1).map((tag) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) }) }), _jsxs(CardFooter, { className: "flex justify-between pt-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: !!executingPlugin, onClick: () => handleExecute(plugin.slug), className: "text-xs", children: executingPlugin === plugin.slug ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner loading-xs mr-2" }), "Executing..."] })) : (_jsxs(_Fragment, { children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Execute"] })) }), _jsx(Button, { size: "sm", disabled: !!installingPlugin, onClick: () => handleInstall(plugin.slug), className: "text-xs", children: installingPlugin === plugin.slug ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "loading loading-spinner loading-xs mr-2" }), "Installing..."] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "h-3 w-3 mr-1" }), "Install"] })) })] })] }, plugin.id));
    };
    return (_jsxs("div", { className: "container mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Plugin Marketplace" }), _jsx("p", { className: "text-muted-foreground", children: "Extend your AI platform with powerful integrations" })] }), _jsx("div", { className: "w-full md:w-auto", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { type: "search", placeholder: "Search plugins...", className: "pl-8 w-full md:w-[250px] lg:w-[300px]", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) })] }), _jsxs(Tabs, { defaultValue: "marketplace", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsxs(TabsTrigger, { value: "marketplace", children: [_jsx(Package, { className: "h-4 w-4 mr-2" }), "Marketplace"] }), _jsxs(TabsTrigger, { value: "installed", children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Installed"] }), _jsxs(TabsTrigger, { value: "analytics", children: [_jsx(BarChart3, { className: "h-4 w-4 mr-2" }), "Analytics"] })] }), _jsx(TabsContent, { value: "marketplace", className: "mt-6", children: loading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => (_jsxs(Card, { className: "animate-pulse", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "h-6 bg-muted rounded w-2/3 mb-2" }), _jsx("div", { className: "h-4 bg-muted rounded w-3/4 opacity-70" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "h-4 bg-muted rounded w-1/4 mb-1" }), _jsx("div", { className: "h-4 bg-muted rounded w-1/3" })] }), _jsx(CardFooter, { className: "flex justify-end", children: _jsx("div", { className: "h-8 bg-muted rounded w-[100px]" }) })] }, i))) })) : filteredPlugins.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(Package, { className: "h-12 w-12 mx-auto text-muted-foreground" }), _jsx("p", { className: "mt-4 text-lg font-medium", children: "No plugins found" }), _jsx("p", { className: "text-muted-foreground", children: "Try a different search query or check back later for new plugins" })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredPlugins.map(renderPluginCard) })) }), _jsx(TabsContent, { value: "installed", className: "mt-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredPlugins.slice(0, 3).map(renderPluginCard) }) }), _jsx(TabsContent, { value: "analytics", className: "mt-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(PluginLeaderboard, {}), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Plugin Performance" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-center text-muted-foreground py-8", children: "Plugin performance analytics coming soon" }) })] })] }) })] })] }));
}
