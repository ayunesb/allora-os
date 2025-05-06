import React, { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import DigitalTwinScene from "@/components/digital-twin/DigitalTwinScene";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RefreshCw,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronDown,
  Lightbulb,
  BarChart3,
  Clock,
  Info,
} from "lucide-react";
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
    const measureId = performanceMonitor.startMeasure(
      "digital-twin-load",
      "render",
    );
    // Calculate FPS (simplified version)
    let frameCount = 0;
    let lastTime = performance.now();
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setPerformanceStats((prev) => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
        }));
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
    const refreshMeasureId = performanceMonitor.startMeasure(
      "digital-twin-refresh",
      "interaction",
    );
    // Simulate refresh - in a real app, this would fetch fresh data
    setTimeout(() => {
      setIsRefreshing(false);
      setPerformanceStats((prev) => ({
        ...prev,
        lastUpdated: new Date(),
      }));
      const measure = performanceMonitor.endMeasure(refreshMeasureId);
      if (measure?.duration) {
        setPerformanceStats((prev) => ({
          ...prev,
          loadTime: Math.round(measure.duration),
        }));
      }
      toast.success(
        t.digitalTwin.refreshSuccess || "Data refreshed successfully",
        {
          description:
            t.digitalTwin.refreshDescription ||
            "Latest KPI data has been loaded",
        },
      );
    }, 1500);
  };
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageTitle
          title={t.digitalTwin.title}
          description={t.digitalTwin.description}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="px-3 py-1 flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                <span>{performanceStats.lastUpdated.toLocaleTimeString()}</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last data refresh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="overflow-hidden border-primary/20 shadow-md">
        <CardHeader className="pb-2 flex flex-row justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t.digitalTwin.visualizationTitle || "Real-time KPI Visualization"}
          </CardTitle>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() =>
                      setShowPerformancePanel(!showPerformancePanel)
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle performance information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing
                ? t.digitalTwin.refreshing || "Refreshing..."
                : t.digitalTwin.refresh || "Refresh Data"}
            </Button>
          </div>
        </CardHeader>

        {showPerformancePanel && (
          <div className="px-6 pt-2 pb-4 bg-muted/30 flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-muted-foreground mr-2">FPS:</span>
                <span
                  className={
                    performanceStats.fps >= 50
                      ? "text-green-500"
                      : performanceStats.fps >= 30
                        ? "text-amber-500"
                        : "text-red-500"
                  }
                >
                  {performanceStats.fps}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground mr-2">Load Time:</span>
                <span
                  className={
                    performanceStats.loadTime < 300
                      ? "text-green-500"
                      : performanceStats.loadTime < 1000
                        ? "text-amber-500"
                        : "text-red-500"
                  }
                >
                  {performanceStats.loadTime}ms
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-muted-foreground text-xs">
                {t.digitalTwin.performanceTip ||
                  "Higher FPS means smoother visualization"}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowPerformancePanel(false)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        <CardContent className="p-0">
          <div className="h-[70vh] w-full relative">
            <DigitalTwinScene />

            {/* Controls overlay */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="backdrop-blur-sm bg-background/80 h-10 w-10"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom in (or use scroll wheel)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="backdrop-blur-sm bg-background/80 h-10 w-10"
                    >
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zoom out (or use scroll wheel)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="backdrop-blur-sm bg-background/80 h-10 w-10"
                    >
                      <RotateCw className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset camera position</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="secondary"
                size="sm"
                className="backdrop-blur-sm bg-background/80"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
            </div>

            {/* Performance indicator */}
            <div className="absolute top-4 left-4">
              <Badge
                variant="outline"
                className={`px-2 py-1 backdrop-blur-sm ${
                  performanceStats.fps >= 50
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : performanceStats.fps >= 30
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {performanceStats.fps} FPS
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-2 pb-4">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <p>
              {t.digitalTwin.tooltip ||
                "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom."}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
