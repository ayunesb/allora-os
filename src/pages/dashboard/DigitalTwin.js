import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { RefreshCw, ZoomIn, ZoomOut, RotateCw, ChevronDown, Lightbulb, BarChart3, Clock, Info, } from "lucide-react";
import { toast } from "sonner";
import { performanceMonitor } from "@/utils/performance/performanceMonitor";
export default function DigitalTwin() {
    const { language } = useLanguage();
    const t = getTranslation(language);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showPerformancePanel, setShowPerformancePanel] = useState(false);
    const [performanceStats, setPerformanceStats] = useState({
        fps: 0,
        loadTime: 0,
        lastUpdated: new Date(),
    });
    // Track performance on component load
    useEffect(() => {
        const measureId = performanceMonitor.startMeasure("digital-twin-load", "render");
        // Calculate FPS (simplified version)
        let frameCount = 0;
        let lastTime = performance.now();
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            if (currentTime - lastTime >= 1000) {
                setPerformanceStats((prev) => (Object.assign(Object.assign({}, prev), { fps: Math.round((frameCount * 1000) / (currentTime - lastTime)) })));
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };
        const fpsTracker = requestAnimationFrame(measureFPS);
        return () => {
            performanceMonitor.endMeasure(measureId);
            cancelAnimationFrame(fpsTracker);
        };
    }, []);
    const handleRefresh = () => {
        setIsRefreshing(true);
        // Track refresh performance
        const refreshMeasureId = performanceMonitor.startMeasure("digital-twin-refresh", "interaction");
        // Simulate refresh - in a real app, this would fetch fresh data
        setTimeout(() => {
            setIsRefreshing(false);
            setPerformanceStats((prev) => (Object.assign(Object.assign({}, prev), { lastUpdated: new Date() })));
            const measure = performanceMonitor.endMeasure(refreshMeasureId);
            if (measure === null || measure === void 0 ? void 0 : measure.duration) {
                setPerformanceStats((prev) => (Object.assign(Object.assign({}, prev), { loadTime: Math.round(measure.duration) })));
            }
            toast.success(t.digitalTwin.refreshSuccess || "Data refreshed successfully", {
                description: t.digitalTwin.refreshDescription ||
                    "Latest KPI data has been loaded",
            });
        }, 1500);
    };
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(PageTitle, { title: t.digitalTwin.title, description: t.digitalTwin.description }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Badge, { variant: "outline", className: "px-3 py-1 flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: performanceStats.lastUpdated.toLocaleTimeString() })] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Last data refresh" }) })] }) })] }), _jsxs(Card, { className: "overflow-hidden border-primary/20 shadow-md", children: [_jsxs(CardHeader, { className: "pb-2 flex flex-row justify-between items-center", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(BarChart3, { className: "h-5 w-5 text-primary" }), t.digitalTwin.visualizationTitle || "Real-time KPI Visualization"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8 text-muted-foreground", onClick: () => setShowPerformancePanel(!showPerformancePanel), children: _jsx(Info, { className: "h-4 w-4" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Toggle performance information" }) })] }) }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: isRefreshing, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}` }), isRefreshing
                                                ? t.digitalTwin.refreshing || "Refreshing..."
                                                : t.digitalTwin.refresh || "Refresh Data"] })] })] }), showPerformancePanel && (_jsxs("div", { className: "px-6 pt-2 pb-4 bg-muted/30 flex flex-wrap items-center justify-between gap-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground mr-2", children: "FPS:" }), _jsx("span", { className: performanceStats.fps >= 50
                                                    ? "text-green-500"
                                                    : performanceStats.fps >= 30
                                                        ? "text-amber-500"
                                                        : "text-red-500", children: performanceStats.fps })] }), _jsxs("div", { children: [_jsx("span", { className: "text-muted-foreground mr-2", children: "Load Time:" }), _jsxs("span", { className: performanceStats.loadTime < 300
                                                    ? "text-green-500"
                                                    : performanceStats.loadTime < 1000
                                                        ? "text-amber-500"
                                                        : "text-red-500", children: [performanceStats.loadTime, "ms"] })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Lightbulb, { className: "h-4 w-4 text-amber-500" }), _jsx("span", { className: "text-muted-foreground text-xs", children: t.digitalTwin.performanceTip ||
                                            "Higher FPS means smoother visualization" })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-7 text-xs", onClick: () => setShowPerformancePanel(false), children: _jsx(ChevronDown, { className: "h-4 w-4" }) })] })), _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "h-[70vh] w-full relative", children: [_jsx(DigitalTwinScene, {}), _jsxs("div", { className: "absolute bottom-4 right-4 flex gap-2", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "secondary", size: "icon", className: "backdrop-blur-sm bg-background/80 h-10 w-10", children: _jsx(ZoomIn, { className: "h-5 w-5" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Zoom in (or use scroll wheel)" }) })] }) }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "secondary", size: "icon", className: "backdrop-blur-sm bg-background/80 h-10 w-10", children: _jsx(ZoomOut, { className: "h-5 w-5" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Zoom out (or use scroll wheel)" }) })] }) }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "secondary", size: "icon", className: "backdrop-blur-sm bg-background/80 h-10 w-10", children: _jsx(RotateCw, { className: "h-5 w-5" }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Reset camera position" }) })] }) }), _jsxs(Button, { variant: "secondary", size: "sm", className: "backdrop-blur-sm bg-background/80", onClick: handleRefresh, disabled: isRefreshing, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}` }), isRefreshing ? "Refreshing..." : "Refresh Data"] })] }), _jsx("div", { className: "absolute top-4 left-4", children: _jsxs(Badge, { variant: "outline", className: `px-2 py-1 backdrop-blur-sm ${performanceStats.fps >= 50
                                            ? "bg-green-500/10 text-green-400 border-green-500/30"
                                            : performanceStats.fps >= 30
                                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                : "bg-red-500/10 text-red-400 border-red-500/30"}`, children: [performanceStats.fps, " FPS"] }) })] }) }), _jsx(CardFooter, { className: "text-xs text-muted-foreground pt-2 pb-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Info, { className: "h-4 w-4 text-primary" }), _jsx("p", { children: t.digitalTwin.tooltip ||
                                        "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom." })] }) })] })] }));
}
