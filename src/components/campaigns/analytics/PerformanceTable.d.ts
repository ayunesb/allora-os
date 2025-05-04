import { ChannelPerformance } from '@/types/analytics';
export interface PerformanceTableProps {
    data: ChannelPerformance[];
    totalMetrics: {
        totalImpressions: number;
        totalClicks: number;
        totalConversions: number;
        totalCost: number;
        totalRevenue: number;
    } | null;
}
export declare function PerformanceTable({ data, totalMetrics }: PerformanceTableProps): JSX.Element;
