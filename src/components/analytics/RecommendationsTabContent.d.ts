import React from "react";
interface RecommendationsTabContentProps {
  recommendations: {
    strategies: any[];
    topics: string[];
    executives: string[];
  };
}
declare const RecommendationsTabContent: React.FC<RecommendationsTabContentProps>;
export default RecommendationsTabContent;
