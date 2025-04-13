
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

  // Mock data for campaigns
  const activeCampaigns = [];
  const scheduledCampaigns = [];
  const completedCampaigns = [];

  return (
    <PageErrorBoundary pageName="Campaign Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <CampaignHeader 
          onCreateClick={() => setIsCreateDialogOpen(true)}
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
                campaigns={activeCampaigns}
                isLoading={false}
                error={null}
              />
            </TabsContent>
            
            <TabsContent value="scheduled" className="m-0 pt-2">
              <CampaignTable 
                campaigns={scheduledCampaigns}
                isLoading={false}
                error={null}
              />
            </TabsContent>
            
            <TabsContent value="completed" className="m-0 pt-2">
              <CampaignTable 
                campaigns={completedCampaigns}
                isLoading={false}
                error={null}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>

      <CreateCampaignDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        formData={{
          name: '',
          platform: '',
          budget: 0,
          company_id: ''
        }}
        onChange={() => {}}
        onSubmit={() => {}}
        companies={[]}
        isSubmitting={false}
      />
    </PageErrorBoundary>
  );
}
