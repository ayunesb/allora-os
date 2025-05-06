import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const CampaignConversionMetrics = ({ data, isLoading = false }) => {
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
