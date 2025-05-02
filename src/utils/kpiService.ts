
import { supabase } from '@/integrations/supabase/client';
import { KPIMetric } from '@/types/unified-types';

/**
 * Fetches KPI metrics from Supabase
 * @returns Promise<KPIMetric[]>
 */
export const fetchKPIMetrics = async (): Promise<KPIMetric[]> => {
  try {
    const { data, error } = await supabase
      .from('kpi_metrics')
      .select('*')
      .order('recorded_at', { ascending: false })
      .limit(100);
      
    if (error) throw error;
    
    return data as KPIMetric[];
  } catch (error) {
    console.error('Error fetching KPI metrics:', error);
    throw new Error('Failed to fetch KPI metrics');
  }
};

/**
 * Creates a new KPI metric in Supabase
 * @param metric The KPI metric to create
 * @returns Promise<KPIMetric>
 */
export const createKPIMetric = async (
  type: string, 
  value: number,
  strategyId?: string
): Promise<KPIMetric> => {
  try {
    const { data, error } = await supabase
      .from('kpi_metrics')
      .insert({
        type,
        value,
        strategy_id: strategyId,
        recorded_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return data as KPIMetric;
  } catch (error) {
    console.error('Error creating KPI metric:', error);
    throw new Error('Failed to create KPI metric');
  }
};

/**
 * Retrieves KPI metrics for a specific type
 * @param type The metric type to filter by
 * @returns Promise<KPIMetric[]>
 */
export const getKPIMetricsByType = async (type: string): Promise<KPIMetric[]> => {
  try {
    const { data, error } = await supabase
      .from('kpi_metrics')
      .select('*')
      .eq('type', type)
      .order('recorded_at', { ascending: false })
      .limit(30);
      
    if (error) throw error;
    
    return data as KPIMetric[];
  } catch (error) {
    console.error(`Error fetching ${type} metrics:`, error);
    throw new Error(`Failed to fetch ${type} metrics`);
  }
};

/**
 * Calculates growth rate between current and previous values
 * @param current Current metric value
 * @param previous Previous metric value
 * @returns Growth rate as a percentage
 */
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};
