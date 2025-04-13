
import React, { useState } from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignHeader, CampaignTable, CreateCampaignDialog } from "@/components/admin/campaigns";
import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, ListFilter, Calendar } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function AdminCampaigns() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);

  return (
    <PageErrorBoundary pageName="Campaign Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <CampaignHeader 
          title="Campaign Management" 
          description="Create, monitor, and manage marketing campaigns"
        />

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="active" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Active
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="flex items-center gap-1">
                <ListFilter className="h-4 w-4" />
                Scheduled
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="w-full md:w-auto flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            New Campaign
          </Button>
        </div>

        <Card>
          <CardHeader className={isMobile ? "px-3 py-4" : ""}>
            <CardTitle className="text-xl font-semibold">
              {activeTab === "active" && "Active Campaigns"}
              {activeTab === "scheduled" && "Scheduled Campaigns"}
              {activeTab === "completed" && "Completed Campaigns"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? "px-3 pb-3" : ""}>
            <TabsContent value="active" className="m-0 pt-2">
              <CampaignTable 
                status="active"
                emptyState={{
                  title: "No active campaigns",
                  description: "You don't have any active campaigns. Create one to start reaching your audience."
                }}
              />
            </TabsContent>
            
            <TabsContent value="scheduled" className="m-0 pt-2">
              <CampaignTable 
                status="scheduled"
                emptyState={{
                  title: "No scheduled campaigns",
                  description: "You don't have any scheduled campaigns. Plan your next campaign in advance."
                }}
              />
            </TabsContent>
            
            <TabsContent value="completed" className="m-0 pt-2">
              <CampaignTable 
                status="completed"
                emptyState={{
                  title: "No completed campaigns",
                  description: "You don't have any completed campaigns yet. Completed campaigns will be shown here."
                }}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>

      <CreateCampaignDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </PageErrorBoundary>
  );
}
