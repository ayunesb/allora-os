interface MetricCardProps {
    title: string;
    value: string;
    change: number;
    icon?: string;
    invertChange?: boolean;
}
export declare function MetricCard({ title, value, change, icon, invertChange }: MetricCardProps): JSX.Element;
export {};
