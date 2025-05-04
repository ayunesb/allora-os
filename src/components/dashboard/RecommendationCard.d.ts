import React from 'react';
export interface Recommendation {
    id: string;
    title: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
    category: 'strategy' | 'marketing' | 'sales' | 'operations';
    isImplemented?: boolean;
    aiGenerated?: boolean;
}
interface RecommendationCardProps {
    recommendation: Recommendation;
    onImplement?: (id: string) => void;
    onDismiss?: (id: string) => void;
}
declare const RecommendationCard: React.FC<RecommendationCardProps>;
export default RecommendationCard;
