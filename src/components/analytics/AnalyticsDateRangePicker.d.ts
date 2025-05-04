import React from 'react';
export interface AnalyticsDateRangePickerProps {
    dateRange: [Date | null, Date | null];
    onDateRangeChange: (range: [Date | null, Date | null]) => void;
    className?: string;
}
declare const AnalyticsDateRangePicker: React.FC<AnalyticsDateRangePickerProps>;
export default AnalyticsDateRangePicker;
