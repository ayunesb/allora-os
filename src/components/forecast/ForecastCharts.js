import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const ForecastCharts = ({ forecasts, kpiData, kpiNames }) => {
    // Format data for charts
    const getChartData = (kpiType) => {
        const data = kpiData[kpiType] || [];
        const chartData = data.map((value, index) => ({
            period: `Period ${index + 1}`,
            value
        }));
        // Add forecast point if available
        if (forecasts[kpiType]) {
            chartData.push({
                period: `Forecast`,
                value: forecasts[kpiType],
                isForecast: true
            });
        }
        return chartData;
    };
    return (<div className="grid gap-6">
      {Object.keys(forecasts).map((kpi) => {
            const chartData = getChartData(kpi);
            return (<Card key={kpi}>
            <CardHeader>
              <CardTitle>{kpiNames[kpi] || kpi}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="period"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={(props) => {
                    const { cx, cy, payload } = props;
                    return payload.isForecast ? (<svg x={cx - 8} y={cy - 8} width={16} height={16} fill="red">
                            <circle cx="8" cy="8" r="6"/>
                          </svg>) : (<svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#8884d8">
                            <circle cx="5" cy="5" r="4"/>
                          </svg>);
                }}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>);
        })}
    </div>);
};
export default ForecastCharts;
