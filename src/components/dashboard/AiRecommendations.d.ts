export interface Recommendation {
    id: string | number;
    title: string;
    description: string;
    type: string;
    executiveBot: {
        name: string;
        role: string;
    };
    expectedImpact: number;
    timeframe: string;
}
interface AiRecommendationsProps {
    recommendations: Recommendation[];
    onApprove: (index: number) => void;
}
export default function AiRecommendations({ recommendations, onApprove }: AiRecommendationsProps): import("react").JSX.Element;
export {};
