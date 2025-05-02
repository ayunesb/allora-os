
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface CampaignConversionMetricsProps {
  data?: any;
  isLoading?: boolean;
}

const CampaignConversionMetrics: React.FC<CampaignConversionMetricsProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaign Conversion Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading campaign conversion data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Conversion Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Campaign conversion metrics will be displayed here</p>
      </CardContent>
    </Card>
  );
};

export default CampaignConversionMetrics;
