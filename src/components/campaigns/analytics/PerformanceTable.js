import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatNumber, formatCurrency } from '@/utils/formatters';
export function PerformanceTable({ data, totalMetrics }) {
    // Calculate percentages of total for each row if totalMetrics is provided
    const calculatePercentage = (value, total) => {
        if (!total)
            return 0;
        return (value / total) * 100;
    };
    return (<div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">CTR</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Conv. Rate</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">ROI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((channel, index) => (<TableRow key={index}>
              <TableCell className="font-medium">{channel.channelName}</TableCell>
              <TableCell className="text-right">{formatNumber(channel.metrics.impressions)}</TableCell>
              <TableCell className="text-right">{formatNumber(channel.metrics.clicks)}</TableCell>
              <TableCell className="text-right">{(channel.metrics.ctr * 100).toFixed(2)}%</TableCell>
              <TableCell className="text-right">{formatNumber(channel.metrics.conversions)}</TableCell>
              <TableCell className="text-right">{(channel.metrics.conversionRate * 100).toFixed(2)}%</TableCell>
              <TableCell className="text-right">{formatCurrency(channel.metrics.cost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(channel.metrics.revenue)}</TableCell>
              <TableCell className="text-right">{(channel.metrics.roi * 100).toFixed(0)}%</TableCell>
            </TableRow>))}
          
          {totalMetrics && (<TableRow className="font-bold bg-muted/50">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">{formatNumber(totalMetrics.totalImpressions)}</TableCell>
              <TableCell className="text-right">{formatNumber(totalMetrics.totalClicks)}</TableCell>
              <TableCell className="text-right">
                {((totalMetrics.totalClicks / totalMetrics.totalImpressions) * 100).toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">{formatNumber(totalMetrics.totalConversions)}</TableCell>
              <TableCell className="text-right">
                {((totalMetrics.totalConversions / totalMetrics.totalClicks) * 100).toFixed(2)}%
              </TableCell>
              <TableCell className="text-right">{formatCurrency(totalMetrics.totalCost)}</TableCell>
              <TableCell className="text-right">{formatCurrency(totalMetrics.totalRevenue)}</TableCell>
              <TableCell className="text-right">
                {((totalMetrics.totalRevenue / totalMetrics.totalCost - 1) * 100).toFixed(0)}%
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>);
}
