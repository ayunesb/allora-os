
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plugin, PluginLog, PluginImpactData } from '@/types/fixed/Plugin';
import { toast } from 'sonner';
import { useCompanyId } from './useCompanyId';

export const usePlugins = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tenantId = useCompanyId();

  const fetchPlugins = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('plugins')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setPlugins(data || []);
    } catch (err) {
      console.error('Error fetching plugins:', err);
      setError(err instanceof Error ? err.message : 'Failed to load plugins');
    } finally {
      setLoading(false);
    }
  };

  const fetchPluginImpact = async (): Promise<PluginImpactData[]> => {
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

      return data || [];
    } catch (err) {
      console.error('Error fetching plugin impact data:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const recordPluginEvent = async (params: {
    plugin_name: string;
    event: string;
    value: number;
  }) => {
    if (!tenantId) {
      console.error('Cannot record plugin event: No tenant ID available');
      return { success: false };
    }

    try {
      const { error } = await supabase.from('plugin_logs').insert({
        tenant_id: tenantId,
        plugin_name: params.plugin_name,
        event: params.event,
        value: params.value,
      });

      if (error) {
        console.error('Error recording plugin event:', error);
        return { success: false, error };
      }

      return { success: true };
    } catch (err) {
      console.error('Error recording plugin event:', err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchPlugins();
  }, []);

  return {
    plugins,
    loading,
    error,
    fetchPlugins,
    fetchPluginImpact,
    recordPluginEvent,
  };
};
