import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import AnalyticsDateRangePicker from './AnalyticsDateRangePicker';
const AnalyticsHeader = ({ isRefreshing, onRefresh, dateRange = [null, null], onDateRangeChange }) => {
    const handleDateRangeChange = (range) => {
        if (onDateRangeChange) {
            onDateRangeChange(range);
        }
    };
    return (<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track performance metrics and campaign results</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        {onDateRangeChange && (<AnalyticsDateRangePicker dateRange={dateRange} onDateRangeChange={handleDateRangeChange} className="w-full sm:w-auto"/>)}
        <Button variant="outline" size="icon" onClick={onRefresh} disabled={isRefreshing}>
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}/>
          <span className="sr-only">Refresh data</span>
        </Button>
      </div>
    </div>);
};
export default AnalyticsHeader;
