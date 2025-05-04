import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, MousePointer, CheckCircle, DollarSign, Percent, CreditCard, Activity } from 'lucide-react';
export function MetricCard({ title, value, change, icon, invertChange = false }) {
    // If invertChange is true, positive changes are bad (like costs increasing)
    const isPositive = invertChange ? change < 0 : change > 0;
    const displayChange = Math.abs(change).toFixed(1);
    const getIcon = () => {
        switch (icon) {
            case 'eye':
                return <Eye className="h-4 w-4"/>;
            case 'mouse-pointer':
                return <MousePointer className="h-4 w-4"/>;
            case 'check-circle':
                return <CheckCircle className="h-4 w-4"/>;
            case 'dollar-sign':
                return <DollarSign className="h-4 w-4"/>;
            case 'percent':
                return <Percent className="h-4 w-4"/>;
            case 'credit-card':
                return <CreditCard className="h-4 w-4"/>;
            case 'trending-up':
                return <TrendingUp className="h-4 w-4"/>;
            default:
                return <Activity className="h-4 w-4"/>;
        }
    };
    return (<Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="p-1 rounded-full bg-muted">{getIcon()}</span>
        </div>
        
        <div className="text-2xl font-bold">{value}</div>
        
        {change !== 0 && (<div className={`flex items-center mt-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? (<TrendingUp className="mr-1 h-3 w-3"/>) : (<TrendingDown className="mr-1 h-3 w-3"/>)}
            <span>{displayChange}% vs. previous period</span>
          </div>)}
      </CardContent>
    </Card>);
}
