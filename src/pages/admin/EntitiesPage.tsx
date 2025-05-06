import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import AdminUsers from "./AdminUsers";
import AdminCompanies from "./AdminCompanies";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { HelpButton } from "@/components/ui/help-button";
import { getHelpContent } from "@/utils/help/helpContent";
export default function EntitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabFromUrl === "companies" ? "companies" : "users",
  );
  // Update the URL when the tab changes
  useEffect(() => {
    if (tabFromUrl !== activeTab) {
      setSearchParams({ tab: activeTab });
    }
  }, [activeTab, setSearchParams, tabFromUrl]);
  // Handle URL parameter changes
  useEffect(() => {
    if (tabFromUrl === "companies" || tabFromUrl === "users") {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  // Get help content for the entities page
  const entitiesHelp = getHelpContent("admin.entities") || {
    id: "admin.entities",
    title: "Entities Management",
    description: "Manage users and companies within the Allora AI platform",
  };
  return (
    <PageErrorBoundary pageName="Entities Management">
      <Helmet>
        <title>Entities Management | Allora AI</title>
      </Helmet>

      <div className="space-y-6 animate-in fade-in duration-500">
        <AdminBreadcrumb />

        <div className="pb-2 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Entities Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage users and companies within the Allora AI platform
            </p>
          </div>

          <HelpButton helpContent={entitiesHelp} variant="outline" size="sm" />
        </div>

        <Tabs
          defaultValue="users"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            <AdminCompanies />
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}
