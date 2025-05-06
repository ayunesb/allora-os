import { KPIMetric } from "@/types/unified-types";
export declare function fetchKPIMetrics(): Promise<KPIMetric[]>;
export declare function createKPIMetric(
  metric: Omit<KPIMetric, "id">,
): Promise<KPIMetric | null>;
export declare function updateKPIMetric(
  id: string,
  updates: Partial<KPIMetric>,
): Promise<KPIMetric | null>;
