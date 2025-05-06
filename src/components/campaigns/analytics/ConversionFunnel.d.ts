export interface ConversionFunnelProps {
  data: {
    impressions: number;
    clicks: number;
    leads?: number;
    opportunities?: number;
    conversions: number;
  };
}
export declare function ConversionFunnel({
  data,
}: ConversionFunnelProps): JSX.Element;
