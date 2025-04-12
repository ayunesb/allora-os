
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Campaign } from "@/models/campaign";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, FileDown, Filter } from "lucide-react";

export interface CampaignAnalyticsProps {
  campaignName: string;
  isComparison?: boolean;
  campaignId?: string;
  campaigns?: Campaign[];
  isLoading?: boolean;
}

export const CampaignAnalytics: React.FC<CampaignAnalyticsProps> = ({
  campaignName,
  isComparison = false,
  campaignId,
  campaigns = [],
  isLoading = false
}) => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [timeframeData, setTimeframeData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Generate demo data for performance visualization
    const generatePerformanceData = () => {
      // If we have campaigns data, use it to generate performance data
      if (campaigns && campaigns.length > 0) {
        return campaigns.map(campaign => ({
          name: campaign.name.substring(0, 15),
          impressions: campaign.impressions || Math.floor(Math.random() * 10000) + 1000,
          clicks: campaign.clicks || Math.floor(Math.random() * 1000) + 100,
          leads: campaign.leads || Math.floor(Math.random() * 100) + 10,
          conversion: Math.floor(Math.random() * 30) + 5,
          roi: parseInt(campaign.roi?.replace(/\D/g, '') || '0') || Math.floor(Math.random() * 400) + 100,
        }));
      }
      
      // Default demo data
      return [
        { name: 'Facebook Ads', impressions: 5240, clicks: 684, leads: 42, conversion: 22, roi: 320 },
        { name: 'LinkedIn Ads', impressions: 3800, clicks: 492, leads: 36, conversion: 18, roi: 280 },
        { name: 'Google Ads', impressions: 6100, clicks: 732, leads: 58, conversion: 24, roi: 350 },
        { name: 'Email', impressions: 4200, clicks: 620, leads: 45, conversion: 30, roi: 420 },
      ];
    };
    
    // Generate demo data for timeframe visualization
    const generateTimeframeData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      return months.map(month => ({
        name: month,
        impressions: Math.floor(Math.random() * 8000) + 2000,
        clicks: Math.floor(Math.random() * 1200) + 300,
        leads: Math.floor(Math.random() * 100) + 20,
      }));
    };
    
    setPerformanceData(generatePerformanceData());
    setTimeframeData(generateTimeframeData());
  }, [campaigns]);
  
  if (isLoading) {
    return (
      <Card className="w-full mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  const handleExport = (format: 'csv' | 'pdf') => {
    // Placeholder for export functionality
    console.log(`Exporting analytics in ${format} format`);
  };
  
  return (
    <Card className="w-full mb-8">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{campaignName} Analytics</CardTitle>
            <div className="flex mt-2">
              <Badge variant="outline" className="mr-2">Last 30 days</Badge>
              {isComparison && <Badge variant="outline" className="bg-blue-50">Comparison View</Badge>}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Performance Overview</TabsTrigger>
            <TabsTrigger value="timeframe">Timeframe Analysis</TabsTrigger>
            <TabsTrigger value="attribution">Attribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
                  <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                  <Bar dataKey="leads" fill="#ffc658" name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="timeframe" className="pt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeframeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#8884d8" name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
                  <Line type="monotone" dataKey="leads" stroke="#ffc658" name="Leads" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="attribution" className="pt-4">
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Cross-Campaign Attribution</h3>
                <p className="text-gray-500 mb-4">Analyze how different campaigns contribute to conversions.</p>
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Configure Attribution Model
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
