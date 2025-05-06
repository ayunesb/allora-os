import React from "react";
export interface AnalyticsHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  dateRange?: [Date | null, Date | null];
  onDateRangeChange?: (range: [Date | null, Date | null]) => void;
}
declare const AnalyticsHeader: React.FC<AnalyticsHeaderProps>;
export default AnalyticsHeader;
