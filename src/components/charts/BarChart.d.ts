interface BarChartProps {
    data: any[];
    categories: string[];
    index: string;
    colors?: string[];
    valueFormatter?: (value: number, category?: string) => string;
    layout?: 'horizontal' | 'vertical';
    className?: string;
}
export declare function BarChart({ data, categories, index, colors, valueFormatter, layout, className }: BarChartProps): JSX.Element;
export {};
