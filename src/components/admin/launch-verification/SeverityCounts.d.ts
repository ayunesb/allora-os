interface SeverityCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
}
interface SeverityCountsProps {
  counts: SeverityCount;
}
export declare function SeverityCounts({
  counts,
}: SeverityCountsProps): JSX.Element;
export {};
