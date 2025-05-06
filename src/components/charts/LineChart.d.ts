interface LineChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number, category?: string) => string;
  yAxisWidth?: number;
  className?: string;
}
export declare function LineChart({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  yAxisWidth,
  className,
}: LineChartProps): JSX.Element;
export {};
