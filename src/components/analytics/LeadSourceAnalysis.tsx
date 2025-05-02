
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface LeadSourceAnalysisProps {
  data?: any;
  isLoading?: boolean;
}

const LeadSourceAnalysis: React.FC<LeadSourceAnalysisProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lead Source Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading lead source data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Source Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Lead source analysis will be displayed here</p>
      </CardContent>
    </Card>
  );
};

export default LeadSourceAnalysis;
