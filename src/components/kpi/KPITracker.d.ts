import { KPIMetric } from '@/types/unified-types';
interface KPITrackerProps {
    metrics: KPIMetric[];
    isLoading?: boolean;
}
export declare function KPITracker({ metrics, isLoading }: KPITrackerProps): JSX.Element;
export {};
