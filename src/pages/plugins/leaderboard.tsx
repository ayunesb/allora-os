
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Award, AlertCircle } from "lucide-react";
import { usePlugins } from '@/hooks/usePlugins';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { PluginImpactData } from '@/types/fixed/Plugin';

export default function PluginLeaderboard() {
  const [impactData, setImpactData] = useState<PluginImpactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchPluginImpact } = usePlugins();
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetchPluginImpact();
        
        // Sort by average value (ROI) descending
        const sortedData = [...data].sort((a, b) => 
          (b.average_value || 0) - (a.average_value || 0)
        );
        
        setImpactData(sortedData);
      } catch (err) {
        console.error('Error fetching plugin leaderboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load plugin leaderboard');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [fetchPluginImpact]);
  
  // Format currency with dollar sign
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value || 0);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <DashboardBreadcrumb rootPath="/dashboard" rootLabel="Dashboard" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Plugin ROI Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Compare plugin performance across your organization</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4 text-primary" />
              Top Performing Plugin
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-6 bg-muted animate-pulse rounded" />
            ) : impactData.length > 0 ? (
              <div>
                <div className="text-2xl font-bold">{impactData[0]?.plugin_name || "N/A"}</div>
                <div className="text-sm text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  {formatCurrency(impactData[0]?.average_value || 0)} avg. ROI
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No data available</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total ROI Generated</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-6 bg-muted animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold">
                {formatCurrency(
                  impactData.reduce((sum, plugin) => sum + (plugin.total_value || 0), 0)
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Plugins Used</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-6 bg-muted animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold">
                {new Set(impactData.map(item => item.plugin_name)).size}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Plugin Performance Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="font-medium">Failed to load leaderboard data</p>
              </div>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : impactData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg font-medium text-muted-foreground mb-2">No plugin data available yet</p>
              <p className="text-sm text-muted-foreground">
                Start using plugins to track their performance metrics
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Plugin</TableHead>
                    <TableHead className="text-right">Usage Count</TableHead>
                    <TableHead className="text-right">Avg. ROI</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impactData.map((item, idx) => (
                    <TableRow key={`${item.plugin_name}-${idx}`} className={idx === 0 ? "bg-primary/5" : undefined}>
                      <TableCell>
                        <Badge variant={idx < 3 ? "success" : "outline"} className="w-6 h-6 rounded-full flex items-center justify-center p-0">
                          {idx + 1}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.plugin_name}</TableCell>
                      <TableCell className="text-right">{item.usage_count}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.average_value || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.total_value || 0)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          item.average_value > 10 ? "success" : 
                          item.average_value > 0 ? "outline" : 
                          "secondary"
                        }>
                          {item.average_value > 10 ? "High ROI" : 
                           item.average_value > 0 ? "Positive" : 
                           "Neutral"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
