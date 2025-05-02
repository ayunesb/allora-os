
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface StrategyROIBreakdownProps {
  data?: any;
  isLoading?: boolean;
}

const StrategyROIBreakdown: React.FC<StrategyROIBreakdownProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Strategy ROI Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading ROI data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy ROI Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Strategy ROI metrics will be displayed here</p>
      </CardContent>
    </Card>
  );
};

export default StrategyROIBreakdown;
