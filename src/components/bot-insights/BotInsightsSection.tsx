import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BotInsightCard from "./BotInsightCard";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import InsightDetailsDialog from "./InsightDetailsDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeInfo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function BotInsightsSection() {
  const { insights, isLoading, error } = useCompanyInsights();
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  // Handle viewing insight details
  const handleViewDetails = (insight) => {
    setSelectedInsight(insight);
    setDetailsOpen(true);
  };
  // Filter insights based on active tab
  const getFilteredInsights = () => {
    if (activeTab === "all") return insights;
    return insights.filter((insight) => insight.type === activeTab);
  };
  // Loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }
  // Error state
  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader className="text-destructive">
          Error loading insights
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            We encountered a problem while generating insights. Please try again
            later.
          </p>
        </CardContent>
      </Card>
    );
  }
  // No insights available
  if (insights.length === 0) {
    return (
      <Card className="border-dotted">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <BadgeInfo className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No AI insights available</h3>
          <p className="text-muted-foreground max-w-md mb-4">
            To generate executive advisor insights, please complete your company
            details in your profile.
          </p>
          <Button asChild>
            <Link to="/dashboard/profile">Update Company Information</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  const filteredInsights = getFilteredInsights();
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="strategy">Strategies</TabsTrigger>
          <TabsTrigger value="campaign">Campaigns</TabsTrigger>
          <TabsTrigger value="call_script">Call Scripts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredInsights.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <BadgeInfo className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No insights found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any{" "}
                  {activeTab !== "all" ? activeTab + " " : ""}insights. Try
                  selecting a different filter.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInsights.map((insight) => (
                <BotInsightCard
                  key={insight.id}
                  insight={insight}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <InsightDetailsDialog
        insight={selectedInsight}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
