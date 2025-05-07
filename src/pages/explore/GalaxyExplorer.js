import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, Suspense } from "react";
import GalaxyGraph from "@/components/galaxy/GalaxyGraph";
import InspectorSidebar from "@/components/galaxy/InspectorSidebar";
import PluginInspector from "@/components/galaxy/PluginInspector";
import PluginSkeleton from "@/components/galaxy/PluginSkeleton";
export default function GalaxyExplorer() {
    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const handleNodeClick = (pluginNode) => {
        setSelectedPlugin(pluginNode);
    };
    return (_jsxs("div", { className: "flex h-screen bg-background text-foreground", children: [_jsx("div", { className: "w-3/4", children: _jsx(GalaxyGraph, { onNodeClick: handleNodeClick }) }), _jsx("div", { className: "w-1/4 border-l border-border", children: selectedPlugin ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setSelectedPlugin(null), className: "mb-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg", children: "Reset Selection" }), _jsx(Suspense, { fallback: _jsx(PluginSkeleton, {}), children: _jsx(PluginInspector, { plugin: selectedPlugin }) })] })) : (_jsx(InspectorSidebar, {})) })] }));
}
