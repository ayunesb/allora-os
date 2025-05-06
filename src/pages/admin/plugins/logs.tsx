import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminOnly from '@/components/AdminOnly';
import { supabase } from '@/integrations/supabase/client';
import { Loading } from '@/components/ui/loading';

// Define the type for plugin logs
interface PluginLog {
  plugin_name: string;
  tenant_id: string;
  event: string;
  value: number;
  created_at: string;
}

export default function PluginLogsPage() {
    const [logs, setLogs] = useState<PluginLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalValue, setTotalValue] = useState(0);
    const loadLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('plugin_logs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);
            if (error)
                throw error;
            // Safely cast data and set state
            const typedLogs = data as PluginLog[];
            setLogs(typedLogs);
            // Calculate total value for reporting
            const total = typedLogs.reduce((sum, log) => sum + (log.value || 0), 0);
            setTotalValue(total);
        }
        catch (error) {
            console.error('Error loading plugin logs:', error);
            toast.error('Failed to load plugin logs');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadLogs();
    }, []);
    // Define the columns for the responsive table
    const columns = [
        { key: 'plugin_name', title: 'Plugin' },
        { key: 'tenant_id', title: 'Tenant', hideOnMobile: true },
        { key: 'event', title: 'Event' },
        {
            key: 'value',
            title: 'Value',
            render: (log: PluginLog) => `$${log.value.toFixed(2)}`
        },
        {
            key: 'created_at',
            title: 'Date',
            render: (log: PluginLog) => new Date(log.created_at).toLocaleString()
        }
    ];
    // Mobile-optimized columns
    const mobileColumns = [
        { key: 'plugin_name', title: 'Plugin' },
        { key: 'event', title: 'Event' },
        {
            key: 'value',
            title: 'Value',
            render: (log: PluginLog) => `$${log.value.toFixed(2)}`
        }
    ];
    return (<AdminOnly>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">🧩 Plugin Usage Logs</h1>
            <p className="text-muted-foreground">Track plugin performance and tenant-level ROI activity.</p>
          </div>
          
          <Button onClick={loadLogs} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Log Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unique Plugins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(logs.map(log => log.plugin_name)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {loading ? (<div className="flex justify-center p-8">
            <Loading size="lg" text="Loading plugin logs..."/>
          </div>) : (<Card>
            <CardContent className="p-4">
              <ResponsiveTable data={logs} columns={columns} mobileColumns={mobileColumns} emptyState={<div className="text-center py-8">
                    <p className="text-muted-foreground">No plugin logs found</p>
                  </div>}/>
            </CardContent>
          </Card>)}
      </div>
    </AdminOnly>);
}
