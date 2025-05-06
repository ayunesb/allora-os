interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
}
interface SimplifiedRecommendationsProps {
  recommendations: Recommendation[];
  onApprove: (index: number) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}
export default function SimplifiedRecommendations({
  recommendations,
  onApprove,
  isLoading,
  error,
  onRetry,
}: SimplifiedRecommendationsProps): JSX.Element;
export {};
