
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCompanyId } from '@/hooks/useCompanyId';
import { toast } from 'sonner';

interface PluginEvent {
  plugin_name: string;
  event: string;
  value: number;
}

export interface PluginImpactData {
  plugin_name: string;
  usage_count: number;
  average_value: number;
  total_value: number;
}

export function usePlugins() {
  const [isLoading, setIsLoading] = useState(false);
  const [pluginImpact, setPluginImpact] = useState<PluginImpactData[]>([]);
  const tenantId = useCompanyId();

  const recordPluginEvent = useCallback(async (event: PluginEvent) => {
    if (!tenantId) {
      console.error('No tenant ID available');
      return;
    }

    try {
      const { error } = await supabase
        .from('plugin_logs')
        .insert({
          tenant_id: tenantId,
          plugin_name: event.plugin_name,
          event: event.event,
          value: event.value
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error recording plugin event:', error);
      toast.error('Failed to record plugin event');
    }
  }, [tenantId]);

  const fetchPluginImpact = useCallback(async (): Promise<PluginImpactData[]> => {
    if (!tenantId) {
      return [];
    }

    setIsLoading(true);
    try {
      // Call the plugin-impact edge function
      const { data, error } = await supabase.functions.invoke('plugin-impact', {
        body: { tenant_id: tenantId }
      });
      
      if (error) throw error;
      setPluginImpact(data || []);
      return data || [];
    } catch (error) {
      console.error('Error fetching plugin impact data:', error);
      toast.error('Failed to load plugin impact data');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [tenantId]);

  return {
    isLoading,
    pluginImpact,
    recordPluginEvent,
    fetchPluginImpact
  };
}
