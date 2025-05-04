export interface StatItem {
    name: string;
    value: string;
    change: string;
    up: boolean;
}
interface StatsRowProps {
    stats: StatItem[];
    isLoading: boolean;
}
export declare function StatsRow({ stats, isLoading }: StatsRowProps): JSX.Element;
export {};
