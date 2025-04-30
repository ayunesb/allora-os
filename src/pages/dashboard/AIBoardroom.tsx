
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageTitle } from "@/components/ui/typography";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

export default function AiBoardroom() {
  return (
    <>
      <Helmet>
        <title>AI Boardroom - Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <DashboardBreadcrumb />
        
        <PageTitle 
          title="AI Executive Boardroom"
          description="Strategic discussions and insights from your AI executive team"
        />
        
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold">Executive Discussions</h2>
              <p className="text-muted-foreground">
                Your AI executive team discusses business strategies and provides actionable insights based on your company data.
              </p>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="italic text-muted-foreground">
                  Connect with your executive team to start receiving strategic insights and recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
