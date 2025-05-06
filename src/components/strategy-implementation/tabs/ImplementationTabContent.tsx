import React from "react";
import { Card, CardContent } from "@/components/ui/card";
const ImplementationTabContent = ({ strategyId, activeTab }) => {
  // Content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab strategyId={strategyId} />;
      case "timeline":
        return <TimelineTab strategyId={strategyId} />;
      case "roi":
        return <RoiTab strategyId={strategyId} />;
      case "resources":
        return <ResourcesTab strategyId={strategyId} />;
      default:
        return <div>Select a tab to view implementation details</div>;
    }
  };
  return <div className="mt-4">{renderContent()}</div>;
};
// Tab components
const OverviewTab = ({ strategyId }) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-lg font-medium mb-2">Implementation Overview</h3>
      <p className="text-muted-foreground">
        This section provides a high-level overview of the strategy
        implementation plan.
      </p>
    </CardContent>
  </Card>
);
const TimelineTab = ({ strategyId }) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-lg font-medium mb-2">Implementation Timeline</h3>
      <p className="text-muted-foreground">
        View the timeline and milestones for this strategy implementation.
      </p>
    </CardContent>
  </Card>
);
const RoiTab = ({ strategyId }) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-lg font-medium mb-2">ROI Tracking</h3>
      <p className="text-muted-foreground">
        Track the return on investment for this strategy.
      </p>
    </CardContent>
  </Card>
);
const ResourcesTab = ({ strategyId }) => (
  <Card>
    <CardContent className="pt-6">
      <h3 className="text-lg font-medium mb-2">Resources & Documents</h3>
      <p className="text-muted-foreground">
        Access resources and documents related to this strategy.
      </p>
    </CardContent>
  </Card>
);
export default ImplementationTabContent;
