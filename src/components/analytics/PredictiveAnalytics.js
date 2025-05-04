import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, RefreshCw, AlertTriangle, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { toast } from "sonner";
export function PredictiveAnalytics({ onRefresh }) {
    const [selectedMetric, setSelectedMetric] = useState("leads");
    const [timeframe, setTimeframe] = useState("month");
    const [confidenceLevel, setConfidenceLevel] = useState(80);
    const [isLoading, setIsLoading] = useState(false);
    // Sample metrics that can be predicted
    const predictableMetrics = [
        { id: "leads", name: "New Leads" },
        { id: "revenue", name: "Revenue" },
        { id: "conversion", name: "Conversion Rate" },
        { id: "retention", name: "Customer Retention" },
        { id: "engagement", name: "User Engagement" }
    ];
    // Generate sample historical and predicted data
    const generatePredictionData = (metric, timeframe) => {
        const data = [];
        const now = new Date();
        const uncertainty = (100 - confidenceLevel) / 20; // Higher confidence = narrower prediction bands
        // Historical data (past 6 periods)
        for (let i = 6; i >= 1; i--) {
            let label;
            if (timeframe === "month") {
                const pastMonth = new Date(now);
                pastMonth.setMonth(now.getMonth() - i);
                label = pastMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }
            else if (timeframe === "quarter") {
                const pastQuarter = new Date(now);
                pastQuarter.setMonth(now.getMonth() - (i * 3));
                const quarter = Math.floor(pastQuarter.getMonth() / 3) + 1;
                label = `Q${quarter} ${pastQuarter.getFullYear()}`;
            }
            else {
                // year
                label = `${now.getFullYear() - i}`;
            }
            // Base values for different metrics
            let baseValue;
            switch (metric) {
                case "leads":
                    baseValue = 120 + (i * 15) + Math.random() * 30;
                    break;
                case "revenue":
                    baseValue = 20000 + (i * 1000) + Math.random() * 5000;
                    break;
                case "conversion":
                    baseValue = 3 + (i * 0.2) + Math.random() * 1;
                    break;
                case "retention":
                    baseValue = 80 + (i * 0.5) + Math.random() * 5;
                    break;
                case "engagement":
                    baseValue = 45 + (i * 2) + Math.random() * 10;
                    break;
                default:
                    baseValue = 100 + (i * 10) + Math.random() * 20;
            }
            data.push({
                period: label,
                actual: baseValue,
                predicted: baseValue,
                lower: baseValue,
                upper: baseValue
            });
        }
        // Predicted data (next 6 periods)
        for (let i = 1; i <= 6; i++) {
            let label;
            if (timeframe === "month") {
                const futureMonth = new Date(now);
                futureMonth.setMonth(now.getMonth() + i);
                label = futureMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }
            else if (timeframe === "quarter") {
                const futureQuarter = new Date(now);
                futureQuarter.setMonth(now.getMonth() + (i * 3));
                const quarter = Math.floor(futureQuarter.getMonth() / 3) + 1;
                label = `Q${quarter} ${futureQuarter.getFullYear()}`;
            }
            else {
                // year
                label = `${now.getFullYear() + i}`;
            }
            // Predict future values with upward trend + noise
            // Last historical data point
            const lastHistorical = data[data.length - 1].actual || 0;
            // Create growth patterns based on metric type
            let predictedValue;
            let range;
            switch (metric) {
                case "leads":
                    // Leads grow linearly with some seasonal variation
                    predictedValue = lastHistorical + (i * 18) + Math.sin(i) * 15;
                    range = predictedValue * uncertainty * 0.3;
                    break;
                case "revenue":
                    // Revenue grows exponentially
                    predictedValue = lastHistorical * (1 + 0.05 * i + Math.random() * 0.02);
                    range = predictedValue * uncertainty * 0.4;
                    break;
                case "conversion":
                    // Conversion rate grows but plateaus
                    predictedValue = lastHistorical + (1 / (i + 2)) + (Math.random() * 0.5);
                    predictedValue = Math.min(predictedValue, 12); // Cap at 12%
                    range = 2 * uncertainty;
                    break;
                case "retention":
                    // Retention rate improves but plateaus
                    predictedValue = lastHistorical + (i * 0.8) / (1 + i * 0.2) + (Math.random() * 1 - 0.5);
                    predictedValue = Math.min(predictedValue, 98); // Cap at 98%
                    range = 5 * uncertainty;
                    break;
                case "engagement":
                    // Engagement grows with seasonal dips
                    predictedValue = lastHistorical + (i * 2.5) - Math.cos(i) * 8;
                    range = predictedValue * uncertainty * 0.25;
                    break;
                default:
                    predictedValue = lastHistorical + (i * 10) + (Math.random() * 10 - 5);
                    range = predictedValue * uncertainty * 0.3;
            }
            data.push({
                period: label,
                predicted: predictedValue,
                lower: predictedValue - range,
                upper: predictedValue + range
            });
        }
        return data;
    };
    const [predictionData, setPredictionData] = useState(generatePredictionData(selectedMetric, timeframe));
    const regeneratePredictions = () => {
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            const newData = generatePredictionData(selectedMetric, timeframe);
            setPredictionData(newData);
            setIsLoading(false);
            toast.success("Predictive models updated");
        }, 1500);
    };
    // Handle metric change
    const handleMetricChange = (value) => {
        setSelectedMetric(value);
        setPredictionData(generatePredictionData(value, timeframe));
    };
    // Handle timeframe change
    const handleTimeframeChange = (value) => {
        setTimeframe(value);
        setPredictionData(generatePredictionData(selectedMetric, value));
    };
    // Handle confidence level change
    const handleConfidenceLevelChange = (value) => {
        setConfidenceLevel(value[0]);
        // Only regenerate predictions when slider is released
    };
    // Format the y-axis values based on the selected metric
    const formatYAxis = (value) => {
        switch (selectedMetric) {
            case "revenue":
                return `$${(value / 1000).toFixed(0)}k`;
            case "conversion":
            case "retention":
                return `${value.toFixed(1)}%`;
            default:
                return value.toFixed(0);
        }
    };
    // Format tooltip values
    const formatTooltipValue = (value) => {
        switch (selectedMetric) {
            case "revenue":
                return `$${value.toLocaleString()}`;
            case "conversion":
            case "retention":
                return `${value.toFixed(1)}%`;
            default:
                return value.toFixed(0);
        }
    };
    // Get a human-readable metric name
    const getMetricName = () => {
        const metric = predictableMetrics.find(m => m.id === selectedMetric);
        return metric ? metric.name : selectedMetric;
    };
    return (<Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary"/>
          Predictive Analytics
        </CardTitle>
        <CardDescription>
          AI-powered forecasting of future business metrics based on historical data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium mb-1 block">Metric to Predict</label>
            <Select value={selectedMetric} onValueChange={handleMetricChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select metric"/>
              </SelectTrigger>
              <SelectContent>
                {predictableMetrics.map((metric) => (<SelectItem key={metric.id} value={metric.id}>
                    {metric.name}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium mb-1 block">Forecast Timeframe</label>
            <Select value={timeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Confidence Level: {confidenceLevel}%</label>
              <TooltipProvider>
                <TooltipUI>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground"/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Higher confidence levels result in wider prediction ranges. Lower values give narrower ranges but higher uncertainty.
                    </p>
                  </TooltipContent>
                </TooltipUI>
              </TooltipProvider>
            </div>
            <Slider defaultValue={[confidenceLevel]} max={95} min={50} step={5} onValueChange={handleConfidenceLevelChange} onValueCommit={() => setPredictionData(generatePredictionData(selectedMetric, timeframe))} className="mt-2"/>
          </div>
        </div>

        <div className="my-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={predictionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="period"/>
              <YAxis tickFormatter={formatYAxis}/>
              <Tooltip formatter={(value) => [formatTooltipValue(value), getMetricName()]} labelFormatter={(label) => `Period: ${label}`}/>
              <Legend />
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                </linearGradient>
              </defs>
              {/* Historical data */}
              <Area type="monotone" dataKey="actual" stroke="#8884d8" fillOpacity={1} fill="url(#actualGradient)" name="Historical" activeDot={{ r: 8 }} isAnimationActive/>
              {/* Predicted data */}
              <Area type="monotone" dataKey="predicted" stroke="#82ca9d" fillOpacity={1} fill="url(#predictedGradient)" name="Predicted" strokeDasharray="5 5" strokeWidth={2} isAnimationActive/>
              {/* Prediction confidence intervals */}
              <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#rangeGradient)" fillOpacity={1} name="Upper Bound" isAnimationActive hide/>
              <Area type="monotone" dataKey="lower" stroke="transparent" fill="url(#rangeGradient)" fillOpacity={1} name="Lower Bound" isAnimationActive hide/>
              {/* Prediction range */}
              <Area type="monotone" dataKey="upper" stroke="#ffc658" strokeDasharray="3 3" strokeWidth={1} fill="url(#rangeGradient)" fillOpacity={1} name="Confidence Range" isAnimationActive activeDot={false}/>
              <Area type="monotone" dataKey="lower" stroke="#ffc658" strokeDasharray="3 3" strokeWidth={1} fill="transparent" isAnimationActive activeDot={false} hide/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-muted/50 p-3 rounded-md flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5"/>
          <div className="text-sm">
            <span className="font-medium">Note:</span>{" "}
            Predictions are based on historical data and AI modeling. Actual results may vary. The confidence interval ({confidenceLevel}%) indicates the range within which future values are expected to fall.
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={regeneratePredictions} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}/>
          {isLoading ? "Updating..." : "Refresh Forecast"}
        </Button>
      </CardFooter>
    </Card>);
}
