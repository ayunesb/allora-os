interface EnhancedVisualizationProps {
    type: "heatmap" | "treemap" | "funnel" | "bubble";
    data: any[];
    title: string;
    description?: string;
    config?: any;
}
export declare function EnhancedVisualization({ type, data, title, description, config }: EnhancedVisualizationProps): JSX.Element;
export {};
