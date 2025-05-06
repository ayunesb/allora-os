import React from "react";
interface TrendReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  trendData?: {
    title: string;
    content: string;
    insights: string[];
    recommendations: string[];
    relatedStrategies: string[];
    externalLink?: string;
  };
}
declare const TrendReportModal: React.FC<TrendReportModalProps>;
export default TrendReportModal;
