// Replace "destructive" with "danger" in the Progress component variant
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
export default function ForecastCards({ forecasts = [] }) {
    // If no forecasts provided, use these demo forecasts
    const demoForecasts = [
        {
            title: 'Revenue Forecast',
            subtitle: 'Monthly recurring revenue',
            currentValue: 12600,
            targetValue: 15000,
            growth: 12.5,
            variant: 'default'
        },
        {
            title: 'Customer Acquisition',
            subtitle: 'New customers this quarter',
            currentValue: 42,
            targetValue: 50,
            growth: 8.3,
            variant: 'success'
        },
        {
            title: 'Churn Rate',
            subtitle: 'Monthly customer churn',
            currentValue: 4.2,
            targetValue: 3.0,
            growth: -2.1,
            variant: 'danger' // Changed from 'destructive' to 'danger'
        },
        {
            title: 'Average Deal Size',
            subtitle: 'Average revenue per account',
            currentValue: 1840,
            targetValue: 2000,
            growth: 5.2,
            variant: 'warning'
        },
    ];
    const items = forecasts.length > 0 ? forecasts : demoForecasts;
    return (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((item, index) => (<ForecastCard key={index} {...item}/>))}
    </div>);
}
function ForecastCard({ title, subtitle, currentValue, targetValue, growth, variant = 'default' }) {
    const progress = Math.min(Math.round((currentValue / targetValue) * 100), 100);
    const isPositiveGrowth = growth >= 0;
    // Format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };
    // Format value based on title (different formats for different metrics)
    const formatValue = (value) => {
        if (title.toLowerCase().includes('revenue') ||
            title.toLowerCase().includes('deal size') ||
            title.toLowerCase().includes('arpu')) {
            return formatCurrency(value);
        }
        else if (title.toLowerCase().includes('churn') ||
            title.toLowerCase().includes('rate')) {
            return `${value}%`;
        }
        else {
            return value.toLocaleString();
        }
    };
    return (<Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{formatValue(currentValue)}</div>
            <p className="text-xs text-muted-foreground">
              Target: {formatValue(targetValue)}
            </p>
          </div>
          <div className={cn("flex items-center gap-1 text-sm", isPositiveGrowth ? "text-green-600" : "text-red-600")}>
            {isPositiveGrowth ? (<ArrowUpRight className="h-4 w-4"/>) : (<ArrowDownRight className="h-4 w-4"/>)}
            <span>{Math.abs(growth)}%</span>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mt-4" variant={variant}/>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1"/>
            <span>{progress}% of target</span>
          </div>
        </div>
      </CardContent>
    </Card>);
}
