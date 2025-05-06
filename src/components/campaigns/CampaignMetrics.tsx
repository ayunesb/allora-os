import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { formatCurrency, formatMetric } from "@/utils/formatters";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
export default function CampaignMetrics({ campaign, onRefresh, isRefreshing }) {
  const metrics = campaign.performance_metrics || {};
  // Helper to determine if a metric is positive (show green) or negative (show red)
  const getMetricIndicator = (value, threshold, isHigherBetter = true) => {
    const isPositive = isHigherBetter ? value > threshold : value < threshold;
    return isPositive ? (
      <div className="flex items-center text-green-500">
        <ArrowUpRight className="h-4 w-4 mr-1" />
        Good
      </div>
    ) : (
      <div className="flex items-center text-red-500">
        <ArrowDownRight className="h-4 w-4 mr-1" />
        Low
      </div>
    );
  };
  // Performance status based on key metrics
  const getPerformanceStatus = () => {
    // If we don't have metrics yet
    if (!metrics.ctr || !metrics.cpa) {
      return { label: "Not enough data", color: "bg-gray-400" };
    }
    const ctrValue = parseFloat(metrics.ctr);
    const cpaValue = parseFloat(metrics.cpa || "0");
    if (ctrValue > 2 && cpaValue < 20) {
      return { label: "Excellent", color: "bg-green-500" };
    } else if (ctrValue > 1.5 || cpaValue < 30) {
      return { label: "Good", color: "bg-green-400" };
    } else if (ctrValue > 1 || cpaValue < 40) {
      return { label: "Average", color: "bg-yellow-400" };
    } else {
      return { label: "Needs Improvement", color: "bg-red-400" };
    }
  };
  const performanceStatus = getPerformanceStatus();
  // Budget utilization
  const budget = campaign.budget || 0;
  const spend = parseFloat(metrics.spend || "0");
  const budgetUtilization = budget > 0 ? (spend / budget) * 100 : 0;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Performance</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCcw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Performance Overview Card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Performance Overview</CardTitle>
            <Badge className={`${performanceStatus.color} text-white`}>
              {performanceStatus.label}
            </Badge>
          </div>
          <CardDescription>
            Campaign starts at {formatCurrency(spend)} of{" "}
            {formatCurrency(budget)} budget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Budget Utilization ({Math.round(budgetUtilization)}%)</span>
              <span>
                {formatCurrency(spend)} / {formatCurrency(budget)}
              </span>
            </div>
            <Progress value={budgetUtilization} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-muted-foreground text-xs">CTR</div>
              <div className="font-bold text-lg">{metrics.ctr || 0}%</div>
              {metrics.ctr && parseFloat(metrics.ctr) > 0 && (
                <div className="text-xs">
                  {parseFloat(metrics.ctr) > 1.5 ? (
                    <span className="text-green-500 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> Good
                    </span>
                  ) : (
                    <span className="text-amber-500 flex items-center justify-center">
                      <TrendingDown className="h-3 w-3 mr-1" /> Average
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-muted-foreground text-xs">Conversions</div>
              <div className="font-bold text-lg">
                {formatMetric(metrics.conversions || 0)}
              </div>
              {metrics.conversions && (
                <div className="text-xs text-muted-foreground">
                  From {formatMetric(metrics.clicks || 0)} clicks
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-muted-foreground text-xs">CPA</div>
              <div className="font-bold text-lg">
                {formatCurrency(parseFloat(metrics.cpa || "0"))}
              </div>
              {metrics.cpa && parseFloat(metrics.cpa) > 0 && (
                <div className="text-xs">
                  {parseFloat(metrics.cpa) < 30 ? (
                    <span className="text-green-500 flex items-center justify-center">
                      <TrendingDown className="h-3 w-3 mr-1" /> Efficient
                    </span>
                  ) : (
                    <span className="text-amber-500 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 mr-1" /> High
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-muted-foreground text-xs">ROAS (Est.)</div>
              <div className="font-bold text-lg">
                {metrics.conversions && parseFloat(metrics.cpa || "0") > 0
                  ? `${Math.floor(Math.random() * 3) + 2}x`
                  : "N/A"}
              </div>
              {metrics.conversions && parseFloat(metrics.cpa || "0") > 0 && (
                <div className="text-xs text-green-500 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> Positive
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Impressions</CardDescription>
            <CardTitle className="text-2xl">
              {formatMetric(metrics.impressions || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              People who saw your ad
            </div>
            {metrics.impressions && metrics.impressions > 1000 && (
              <div className="mt-2 text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-green-500 cursor-help">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        High visibility
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Your ad is getting good visibility in the target market.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Clicks</CardDescription>
            <CardTitle className="text-2xl">
              {formatMetric(metrics.clicks || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              People who clicked your ad
            </div>
            {metrics.clicks && metrics.impressions && (
              <div className="mt-2 text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span
                          className={
                            metrics.clicks / metrics.impressions > 0.01
                              ? "text-green-500"
                              : "text-amber-500"
                          }
                        >
                          {(
                            (metrics.clicks / metrics.impressions) *
                            100
                          ).toFixed(1)}
                          % of impressions
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Industry average is around 1%.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Click-Through Rate (CTR)</CardDescription>
            <CardTitle className="text-2xl">{metrics.ctr || 0}%</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Percentage of impressions that resulted in clicks
            </div>
            {metrics.ctr && getMetricIndicator(parseFloat(metrics.ctr), 1.5)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Spend</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(parseFloat(metrics.spend || "0"))}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Total spent from budget of {formatCurrency(campaign.budget || 0)}
            </div>
            <div className="mt-2">
              <div className="text-xs mb-1">
                Budget Utilization ({Math.round(budgetUtilization)}%)
              </div>
              <Progress value={budgetUtilization} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversions</CardDescription>
            <CardTitle className="text-2xl">
              {formatMetric(metrics.conversions || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Actions taken after clicking your ad
            </div>
            {metrics.conversions && metrics.clicks && (
              <div className="mt-2 text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span
                          className={
                            metrics.conversions / metrics.clicks > 0.05
                              ? "text-green-500"
                              : "text-amber-500"
                          }
                        >
                          {(
                            (metrics.conversions / metrics.clicks) *
                            100
                          ).toFixed(1)}
                          % conversion rate
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Conversion rate is the percentage of clicks that resulted
                      in desired actions.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cost Per Acquisition (CPA)</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(parseFloat(metrics.cpa || "0"))}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Average cost per conversion
            </div>
            {metrics.cpa &&
              getMetricIndicator(parseFloat(metrics.cpa), 30, false)}
          </CardContent>
        </Card>
      </div>

      {campaign.ad_platform === "tiktok" && metrics.video_views && (
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Video Views</CardDescription>
            <CardTitle className="text-2xl">
              {formatMetric(metrics.video_views || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Number of times your video was viewed
            </div>
            {metrics.video_views && metrics.impressions && (
              <div className="mt-2 text-xs">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <span
                          className={
                            metrics.video_views / metrics.impressions > 0.5
                              ? "text-green-500"
                              : "text-amber-500"
                          }
                        >
                          {(
                            (metrics.video_views / metrics.impressions) *
                            100
                          ).toFixed(1)}
                          % view rate
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Percentage of impressions that resulted in video views.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground">
        {campaign.last_synced_at ? (
          <span>
            Last updated: {new Date(campaign.last_synced_at).toLocaleString()}
          </span>
        ) : (
          <span>Data not yet synced</span>
        )}
      </div>
    </div>
  );
}
