
import React from 'react';
import { formatNumber, formatCurrency } from '@/utils/formatters';

interface ConversionFunnelProps {
  data: {
    impressions: number;
    clicks: number;
    leads?: number;
    opportunities?: number;
    conversions: number;
  };
}

export function ConversionFunnel({ data }: ConversionFunnelProps) {
  // Calculate percentages and drop-offs
  const clickRate = data.clicks / data.impressions;
  const leadRate = data.leads ? data.leads / data.clicks : undefined;
  const opportunityRate = data.opportunities && data.leads ? data.opportunities / data.leads : undefined;
  const conversionRate = data.opportunities ? data.conversions / data.opportunities : data.conversions / data.clicks;
  
  // Calculate widths for funnel visualization
  const maxWidth = 100;
  const clickWidth = maxWidth * 0.8;
  const leadWidth = leadRate ? clickWidth * 0.7 : 0;
  const opportunityWidth = opportunityRate ? leadWidth * 0.6 : 0;
  const conversionWidth = clickWidth * 0.4;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-6">
        {/* Impressions */}
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Impressions</span>
            <span>{formatNumber(data.impressions)}</span>
          </div>
          <div className="h-10 bg-blue-500 rounded-t-md w-full flex items-center justify-center text-white font-medium">
            Impressions
          </div>
        </div>
        
        {/* Clicks */}
        <div className="w-full flex flex-col items-center">
          <div className="h-8 border-l-2 border-r-2 border-dashed border-blue-300 w-0" />
          <div className="h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-300" />
          <div className="flex justify-between text-sm mb-1 w-[80%]">
            <span className="font-medium">Clicks</span>
            <div className="flex space-x-2">
              <span>{formatNumber(data.clicks)}</span>
              <span className="text-gray-500">({(clickRate * 100).toFixed(1)}%)</span>
            </div>
          </div>
          <div 
            className="h-10 bg-green-500 rounded-md flex items-center justify-center text-white font-medium"
            style={{ width: `${clickWidth}%` }}
          >
            Clicks
          </div>
        </div>
        
        {/* Leads (optional) */}
        {data.leads && (
          <div className="w-full flex flex-col items-center">
            <div className="h-8 border-l-2 border-r-2 border-dashed border-green-300 w-0" />
            <div className="h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-green-300" />
            <div className="flex justify-between text-sm mb-1" style={{ width: `${leadWidth}%` }}>
              <span className="font-medium">Leads</span>
              <div className="flex space-x-2">
                <span>{formatNumber(data.leads)}</span>
                <span className="text-gray-500">({(leadRate! * 100).toFixed(1)}%)</span>
              </div>
            </div>
            <div 
              className="h-10 bg-purple-500 rounded-md flex items-center justify-center text-white font-medium"
              style={{ width: `${leadWidth}%` }}
            >
              Leads
            </div>
          </div>
        )}
        
        {/* Opportunities (optional) */}
        {data.opportunities && (
          <div className="w-full flex flex-col items-center">
            <div className="h-8 border-l-2 border-r-2 border-dashed border-purple-300 w-0" />
            <div className="h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-300" />
            <div className="flex justify-between text-sm mb-1" style={{ width: `${opportunityWidth}%` }}>
              <span className="font-medium">Opportunities</span>
              <div className="flex space-x-2">
                <span>{formatNumber(data.opportunities)}</span>
                <span className="text-gray-500">({(opportunityRate! * 100).toFixed(1)}%)</span>
              </div>
            </div>
            <div 
              className="h-10 bg-amber-500 rounded-md flex items-center justify-center text-white font-medium"
              style={{ width: `${opportunityWidth}%` }}
            >
              Opportunities
            </div>
          </div>
        )}
        
        {/* Conversions */}
        <div className="w-full flex flex-col items-center">
          <div className="h-8 border-l-2 border-r-2 border-dashed border-amber-300 w-0" />
          <div className="h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-amber-300" />
          <div className="flex justify-between text-sm mb-1" style={{ width: `${conversionWidth}%` }}>
            <span className="font-medium">Conversions</span>
            <div className="flex space-x-2">
              <span>{formatNumber(data.conversions)}</span>
              <span className="text-gray-500">({(conversionRate * 100).toFixed(1)}%)</span>
            </div>
          </div>
          <div 
            className="h-10 bg-red-500 rounded-b-md flex items-center justify-center text-white font-medium"
            style={{ width: `${conversionWidth}%` }}
          >
            Conversions
          </div>
        </div>
      </div>
    </div>
  );
}
