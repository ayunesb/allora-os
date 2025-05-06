import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCompanyId } from "@/hooks/useCompanyId";
import { toast } from "sonner";

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

  const recordPluginEvent = useCallback(
    async (event: PluginEvent) => {
      if (!tenantId) {
        console.error("No tenant ID available");
        return;
      }

      try {
        const { error } = await supabase.from("plugin_logs").insert({
          tenant_id: tenantId,
          plugin_name: event.plugin_name,
          event: event.event,
          value: event.value,
        });

        if (error) throw error;
      } catch (error) {
        console.error("Error recording plugin event:", error);
        toast.error("Failed to record plugin event");
      }
    },
    [tenantId],
  );

  const fetchPluginImpact = useCallback(async (): Promise<
    PluginImpactData[]
  > => {
    if (!tenantId) {
      toast.error("Company ID is required");
      return [];
    }

    const { data, error } = await supabase
      .from("plugin_impact")
      .select("*")
      .eq("company_id", tenantId);

    if (error) {
      toast.error("Plugin data fetch failed");
      return [];
    } else if (Array.isArray(data)) {
      setPluginImpact(data as PluginImpactData[]);
      return data as PluginImpactData[];
    } else {
      toast.error("Unexpected data format");
      return [];
    }
  }, [tenantId]);

  const fetchPlugins = useCallback(async () => {
    try {
      const { data: plugins, error } = await supabase
        .from("plugins")
        .select("id, name, impact_score, xp");

      if (error) throw error;
      return plugins;
    } catch (error) {
      console.error("Error fetching plugins:", error);
      toast.error("Failed to load plugins");
      return [];
    }
  }, []);

  return {
    isLoading,
    pluginImpact,
    recordPluginEvent,
    fetchPluginImpact,
    fetchPlugins,
  };
}
