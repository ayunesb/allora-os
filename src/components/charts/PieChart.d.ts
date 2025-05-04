interface PieChartProps {
    data: any[];
    category: string;
    index: string;
    colors?: string[];
    valueFormatter?: (value: number) => string;
    className?: string;
}
export declare function PieChart({ data, category, index, colors, valueFormatter, className }: PieChartProps): JSX.Element;
export {};
