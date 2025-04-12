import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Calendar } from 'react-day-picker';
import { addDays, format } from "date-fns";
import { Campaign } from "@/models/campaign";
import { useCampaigns } from "@/hooks/campaigns";
import { Skeleton } from "@/components/ui/skeleton";
import { exportToCSV, exportToPDF } from "@/utils/exportUtils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface AnalyticsData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

const mockAnalyticsData: AnalyticsData[] = [
  { date: '2023-01-01', impressions: 1000, clicks: 100, conversions: 10, spend: 25 },
  { date: '2023-01-08', impressions: 1200, clicks: 110, conversions: 12, spend: 30 },
  { date: '2023-01-15', impressions: 1500, clicks: 130, conversions: 15, spend: 35 },
  { date: '2023-01-22', impressions: 1800, clicks: 160, conversions: 20, spend: 40 },
  { date: '2023-01-29', impressions: 2000, clicks: 180, conversions: 25, spend: 45 },
  { date: '2023-02-05', impressions: 2200, clicks: 200, conversions: 30, spend: 50 },
  { date: '2023-02-12', impressions: 2500, clicks: 230, conversions: 35, spend: 55 },
  { date: '2023-02-19', impressions: 2800, clicks: 260, conversions: 40, spend: 60 },
  { date: '2023-02-26', impressions: 3000, clicks: 280, conversions: 45, spend: 65 },
];

interface AdvancedCampaignAnalyticsProps {
  campaign: Campaign;
}

export default function AdvancedCampaignAnalytics({ campaign }: AdvancedCampaignAnalyticsProps) {
  const { campaignId } = useParams();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');
  const { campaigns } = useCampaigns();

  const campaignData = campaigns?.find((c) => c.id === campaignId);

  const formatDateForAnalytics = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };

  const fetchAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock data fetching - replace with actual API call
      const filteredData = mockAnalyticsData.filter(item => {
        const itemDate = new Date(item.date);
        return (dateRange.from && itemDate >= dateRange.from) && (dateRange.to && itemDate <= dateRange.to);
      });
      setAnalyticsData(filteredData);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange.from, dateRange.to]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const handleExport = () => {
    if (!campaign) return;

    if (exportFormat === 'csv') {
      exportToCSV(analyticsData, `campaign_analytics_${campaign.id}`);
    } else if (exportFormat === 'pdf') {
      exportToPDF(analyticsData, `campaign_analytics_${campaign.id}`, "Campaign Analytics");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">Advanced Analytics</CardTitle>
        <div className="space-x-2">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'csv' | 'pdf')}
            className="border rounded px-2 py-1"
          >
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
          <Button onClick={handleExport} disabled={isLoading}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Range</CardTitle>
          <CardDescription>Select a date range to analyze campaign performance.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DateRangePicker
            onChange={(range) => {
              // Ensure 'to' property is always set (with fallback to 'from' if missing)
              setDateRange({ 
                from: range.from, 
                to: range.to || range.from 
              });
            }}
            value={{
              from: dateRange.from,
              to: dateRange.to,
            }}
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>Visual representation of key metrics over the selected period.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[300px]" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="impressions" stroke="#8884d8" fill="#8884d8" name="Impressions" />
                <Area type="monotone" dataKey="clicks" stroke="#82ca9d" fill="#82ca9d" name="Clicks" />
                <Area type="monotone" dataKey="conversions" stroke="#ffc658" fill="#ffc658" name="Conversions" />
                <Area type="monotone" dataKey="spend" stroke="#a45de3" fill="#a45de3" name="Spend" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
