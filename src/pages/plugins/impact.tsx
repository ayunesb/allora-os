
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPluginImpact } from '@/utils/api/pluginAPI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PluginImpactData {
  tenant_id: string;
  plugin_name: string;
  total_value: number;
  usage_count: number;
  average_value: number;
  tenant_name?: string;
}

export default function PluginImpactPage() {
  const [impactData, setImpactData] = useState<PluginImpactData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadImpactData() {
      try {
        setIsLoading(true);
        const data = await fetchPluginImpact();
        setImpactData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading plugin impact data:", err);
        setError("Failed to load plugin impact data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadImpactData();
  }, []);
  
  const totalPluginValue = impactData.reduce((acc, curr) => acc + curr.total_value, 0);
  const totalUsageCount = impactData.reduce((acc, curr) => acc + curr.usage_count, 0);
  
  // Group by plugin name for the charts
  const pluginData = impactData.reduce((acc, curr) => {
    const existing = acc.find(p => p.plugin_name === curr.plugin_name);
    if (existing) {
      existing.total_value += curr.total_value;
      existing.usage_count += curr.usage_count;
      existing.average_value = existing.total_value / existing.usage_count;
    } else {
      acc.push({
        plugin_name: curr.plugin_name,
        total_value: curr.total_value,
        usage_count: curr.usage_count,
        average_value: curr.usage_count > 0 ? curr.total_value / curr.usage_count : 0,
      });
    }
    return acc;
  }, [] as Array<{plugin_name: string, total_value: number, usage_count: number, average_value: number}>);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Plugin ROI Analysis</h1>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Value Generated</CardTitle>
                <CardDescription>Across all plugins</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">${totalPluginValue.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Usage Count</CardTitle>
                <CardDescription>Plugin activations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalUsageCount.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Value Per Use</CardTitle>
                <CardDescription>ROI per plugin use</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  ${totalUsageCount > 0 ? (totalPluginValue / totalUsageCount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="value">
            <TabsList className="mb-4">
              <TabsTrigger value="value">Total Value</TabsTrigger>
              <TabsTrigger value="usage">Usage Count</TabsTrigger>
              <TabsTrigger value="average">Average Value</TabsTrigger>
            </TabsList>
            
            <TabsContent value="value">
              <Card>
                <CardHeader>
                  <CardTitle>Total Value by Plugin</CardTitle>
                  <CardDescription>Revenue impact per plugin</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pluginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="plugin_name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                      <Bar dataKey="total_value" name="Total Value" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Count by Plugin</CardTitle>
                  <CardDescription>How often each plugin is used</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pluginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="plugin_name" />
                      <YAxis />
                      <Tooltip formatter={(value) => Number(value).toLocaleString()} />
                      <Bar dataKey="usage_count" name="Usage Count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="average">
              <Card>
                <CardHeader>
                  <CardTitle>Average Value per Use</CardTitle>
                  <CardDescription>ROI per plugin activation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pluginData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="plugin_name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                      <Bar dataKey="average_value" name="Average Value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Plugin Impact Details</CardTitle>
              <CardDescription>Breakdown by tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 text-left">Tenant</th>
                      <th className="p-2 text-left">Plugin</th>
                      <th className="p-2 text-right">Value</th>
                      <th className="p-2 text-right">Usage Count</th>
                      <th className="p-2 text-right">Avg. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {impactData.map((item, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/30">
                        <td className="p-2">{item.tenant_name || item.tenant_id}</td>
                        <td className="p-2">{item.plugin_name}</td>
                        <td className="p-2 text-right">${item.total_value.toLocaleString()}</td>
                        <td className="p-2 text-right">{item.usage_count.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          ${item.average_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
