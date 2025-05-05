import React from 'react';
export const CampaignAnalytics = ({ campaign }) => {
    // Format ROI as a percentage string
    const formatRoi = (roi) => {
        if (roi === undefined)
            return 'N/A';
        // Convert number to percentage string
        return `${(roi * 100).toFixed(1)}%`;
    };
    return (<div className="space-y-6">
      <h2 className="text-2xl font-bold">Campaign Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500">ROI</h3>
          <p className="text-2xl font-bold">{formatRoi(campaign.roi)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500">Budget</h3>
          <p className="text-2xl font-bold">${campaign.budget.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm text-gray-500">Health Score</h3>
          <p className="text-2xl font-bold">{campaign.healthScore || 'N/A'}</p>
        </div>
      </div>
    </div>);
};
export default CampaignAnalytics;
