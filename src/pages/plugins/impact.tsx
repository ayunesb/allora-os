
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PluginImpactData {
  tenant_id: string;
  plugin_name: string;
  total_value: number;
  usage_count: number;
  average_value: number;
  tenant_name?: string;
}

export default function PluginImpact() {
  const [impactData, setImpactData] = useState<PluginImpactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPluginImpactData() {
      try {
        setLoading(true);
        
        // Call the edge function to get plugin impact data
        const { data, error } = await supabase.functions.invoke('plugin-impact', {
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          }
        });

        if (error) {
          throw new Error(error.message);
        }

        setImpactData(data || []);
      } catch (err) {
        console.error('Error fetching plugin impact data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load plugin impact data');
      } finally {
        setLoading(false);
      }
    }

    fetchPluginImpactData();
  }, []);

  // Format currency with dollar sign
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Plugin ROI Analysis</h1>
      <p className="text-muted-foreground mb-8">
        Track the impact and return on investment for all activated plugins across your organization.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Plugin Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <p className="font-medium">Error loading data</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : impactData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-2 font-medium">No plugin impact data available</p>
              <p className="text-sm">Activate plugins and use them to start collecting ROI metrics</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plugin</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead className="text-right">Usage</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">Avg. ROI</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {impactData.map((item, idx) => (
                  <TableRow key={`${item.tenant_id}-${item.plugin_name}-${idx}`}>
                    <TableCell className="font-medium">{item.plugin_name}</TableCell>
                    <TableCell>{item.tenant_name || `Tenant ${item.tenant_id.substring(0, 6)}...`}</TableCell>
                    <TableCell className="text-right">{item.usage_count}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.total_value)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.average_value)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.average_value > 10 ? "success" : item.average_value > 0 ? "outline" : "secondary"}>
                        {item.average_value > 10 ? "High ROI" : item.average_value > 0 ? "Positive" : "Neutral"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
