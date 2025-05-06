import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { usePlugins } from '@/hooks/usePlugins';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';

// Ensure PluginImpactData type is defined and used correctly
type PluginImpactData = {
  plugin_name: string;
  tenant_id: string;
  tenant_name?: string;
  usage_count: number;
  total_value: number;
  average_value: number;
};

export default function PluginImpact() {
    const [impactData, setImpactData] = useState<PluginImpactData[]>([]); // Fix type
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { fetchPluginImpact } = usePlugins();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data: PluginImpactData[] = await fetchPluginImpact(); // Ensure type
                setImpactData(data);
            } catch (err) {
                console.error('Error fetching plugin impact data:', err);
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load plugin impact data. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchPluginImpact]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value || 0);
    };

    return (
        <div className="container py-8">
            <DashboardBreadcrumb
                rootPath="/dashboard"
                rootLabel="Dashboard"
                rootIcon={<Loader2 />} // Replace with the appropriate icon
                currentPath="/plugins/impact"
                currentLabel="Plugin Impact"
            />
            
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
                        <div className="overflow-x-auto">
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
                                            <TableCell className="text-right">{formatCurrency(item.total_value)}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(item.average_value)}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        item.average_value > 10
                                                            ? "success"
                                                            : item.average_value > 0
                                                            ? "outline"
                                                            : "secondary"
                                                    }
                                                    className="badge-class" // Add missing className
                                                >
                                                    {item.average_value > 10
                                                        ? "High ROI"
                                                        : item.average_value > 0
                                                        ? "Positive"
                                                        : "Neutral"}
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
