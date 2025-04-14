
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Anomaly } from "@/agents/anomalyDetector";

interface ForecastAnomaliesProps {
  anomalies: Anomaly[];
  recommendations: Record<string, string>;
  kpiNames: Record<string, string>;
}

const ForecastAnomalies: React.FC<ForecastAnomaliesProps> = ({ 
  anomalies, 
  recommendations,
  kpiNames
}) => {
  if (anomalies.length === 0) {
    return null;
  }

  return (
    <Card className="border-red-500/20 bg-red-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-500">
          <AlertTriangle />
          <span>Anomalies Detected</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {anomalies.map((anomaly) => (
            <Alert key={anomaly.kpi} variant={anomaly.severity === "critical" ? "destructive" : "warning"}>
              <AlertTitle className="flex items-center gap-2">
                {anomaly.issue === "Too High" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="capitalize">{kpiNames[anomaly.kpi] || anomaly.kpi}</span>
                <Badge variant={anomaly.severity === "critical" ? "destructive" : "outline"}>
                  {anomaly.severity}
                </Badge>
              </AlertTitle>
              <AlertDescription>
                <p>Current forecast: {anomaly.value.toFixed(2)}</p>
                <p>Issue: {anomaly.issue}</p>
                {recommendations[anomaly.kpi] && (
                  <p className="mt-2 text-sm font-medium">
                    Recommendation: {recommendations[anomaly.kpi]}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastAnomalies;
