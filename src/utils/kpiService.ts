import { supabase } from "@/integrations/supabase/client";
import { KPIMetric } from "@/types/unified-types";
import { toast } from "sonner";

export async function fetchKPIMetrics(): Promise<KPIMetric[]> {
  try {
    const { data, error } = await supabase
      .from("kpi_metrics")
      .select("*")
      .order("recorded_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching KPI metrics:", error);
    toast.error("Failed to load KPI data");
    return [];
  }
}

export async function createKPIMetric(
  metric: Omit<KPIMetric, "id">,
): Promise<KPIMetric | null> {
  try {
    const { data, error } = await supabase
      .from("kpi_metrics")
      .insert(metric)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error creating KPI metric:", error);
    toast.error("Failed to create KPI metric");
    return null;
  }
}

export async function updateKPIMetric(
  id: string,
  updates: Partial<KPIMetric>,
): Promise<KPIMetric | null> {
  try {
    const { data, error } = await supabase
      .from("kpi_metrics")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating KPI metric:", error);
    toast.error("Failed to update KPI metric");
    return null;
  }
}
